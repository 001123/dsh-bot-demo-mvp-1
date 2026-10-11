import { expect, test } from '@playwright/test'
import { BASE } from '../../playwright.config'
import { site } from '../../src/content/site'

// T6 — the AC1–AC9 suite. AC10 lives in countdown.spec.ts, AC4's viewport matrix in
// responsive.spec.ts.
//
// Two rules from docs/content.md (blob f750f977) and plan bản 10 that shape this file:
//   1. Assert AC2 on the case-independent anchor `tháng Giêng năm Đinh Mùi`. The hero spells
//      it "mùng" mid-sentence while the <noscript> fallback capitalises it, so a verbatim
//      grep for the capitalised form would fail on a correct page.
//   2. Assert on DECODED text (DOM), never on raw HTML alone: Astro renders the three Lời
//      chúc quotes as `&quot;`, and a raw comparison reports false drift.
const PAGE_URL = `${BASE}/`

const HERO_STRINGS = [
  'Tết 2027 Happier',
  'Tết Nguyên đán Đinh Mùi 2027',
  '06/02/2027',
  '05/02/2027',
  'Tất niên',
  site.hero.lunarAnchor,
] as const

// Literals the plan forbids asserting:
//   - `Tất niên 05/02/2027` does not exist in docs/content.md (only `Tất niên: thứ Sáu, ...`)
//   - `Tết Nguyên đán 2027` is NOT in the hero; that short string lives in Block 1 only.
const FORBIDDEN = ['Tất niên 05/02/2027'] as const

const PLACEHOLDER_RE = /Lorem ipsum|TODO/

test('AC1 — the page answers 200 under the base path, anonymously, with no login redirect', async ({
  page,
}) => {
  const response = await page.goto(PAGE_URL)
  expect(response?.status(), 'AC1 requires no 4xx/5xx').toBe(200)
  // Stayed on this page: no redirect to a login or auth route, and the base path is intact.
  expect(page.url().endsWith(PAGE_URL)).toBe(true)
  expect(page.url()).not.toMatch(/login|signin|sign-in|auth/i)
  // Nothing login-shaped should be reachable from this page (AC7 also bans forms).
  await expect(page.locator('form')).toHaveCount(0)
})

test('AC2/AC8 — the hero strings are in the raw HTML the server returns', async ({ request }) => {
  const response = await request.get(PAGE_URL)
  expect(response.status()).toBe(200)
  const html = await response.text()

  for (const text of HERO_STRINGS) {
    expect(html, `raw HTML must carry: ${text}`).toContain(text)
  }

  for (const text of FORBIDDEN) {
    expect(html, `forbidden literal must not be asserted or present: ${text}`).not.toContain(text)
  }

  expect(html).not.toMatch(PLACEHOLDER_RE)
})

test('AC2/AC8 — the same hero strings are in the rendered DOM, on decoded text', async ({
  page,
}) => {
  await page.goto(PAGE_URL)

  const hero = page.locator('section').first()
  const heroText = await hero.innerText()

  for (const text of HERO_STRINGS) {
    expect(heroText, `hero must show: ${text}`).toContain(text)
  }

  // Scope trap: the short string exists in Block 1, never in the hero.
  expect(heroText, 'Tết Nguyên đán 2027 belongs to Block 1, not the hero').not.toContain(
    'Tết Nguyên đán 2027',
  )
  expect(await page.locator('body').innerText()).toContain('Tết Nguyên đán 2027')
})

test('AC3 — at least three content blocks, no placeholder copy', async ({ page }) => {
  await page.goto(PAGE_URL)

  const blocks = page.locator('h2')
  expect(await blocks.count()).toBeGreaterThanOrEqual(3)

  for (const heading of site.blocks) {
    const section = page.locator('section').filter({ hasText: heading.heading })
    await expect(section.first()).toContainText(heading.paragraphs[0])
  }

  expect(await page.locator('body').innerText()).not.toMatch(PLACEHOLDER_RE)
})

test('AC5 — every URL the page references answers < 400, and no <img> lacks alt', async ({
  page,
  request,
}) => {
  const response = await request.get(PAGE_URL)
  const html = await response.text()

  const references = new Set<string>()
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) references.add(match[1])

  // `srcset` is a comma-separated candidate list ("img-2x.png 2x, img-1x.png 1x"): take the
  // URL part of each candidate. The page ships no raster image today, so this is future-proofing —
  // adding a responsive image later must not slip past the AC5 check.
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0]
      if (url !== '') references.add(url)
    }
  }

  // Stylesheets can reference assets too (background images, fonts).
  for (const sheet of html.matchAll(/href="([^"]+\.css)"/g)) {
    const css = await (await request.get(sheet[1])).text()
    for (const url of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) references.add(url[1])
  }

  const local = [...references].filter((url) => !/^(https?:|data:|mailto:|#)/.test(url))
  expect(local.length, 'the page must reference something').toBeGreaterThan(0)

  const broken: string[] = []
  for (const url of local) {
    const target = url.startsWith('/') ? url : `${BASE}/${url}`
    const res = await request.get(target)
    if (res.status() >= 400) broken.push(`${res.status()} ${url}`)
  }
  expect(broken, 'a referenced URL that 404s is a violation, even when the cause is a missing base').toEqual([])

  // Branch (b) of the plan: the page ships no raster image. Inline SVG decoration is not an
  // <img>, so there is nothing to carry alt text — assert that stays true.
  const images = await page.locator('img').count()
  expect(images, 'AC5 đạt do không dùng ảnh raster').toBe(0)
})

test('AC6 — console and page errors stay empty on load and after scrolling', async ({ page }) => {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))

  await page.goto(PAGE_URL)
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(500)

  expect(problems).toEqual([])
})

test('AC7 — no data-collecting controls, no empty href, no payment iframe', async ({ page }) => {
  await page.goto(PAGE_URL)

  await expect(page.locator('form')).toHaveCount(0)
  await expect(page.locator('input[type="email"]')).toHaveCount(0)
  await expect(page.locator('iframe')).toHaveCount(0)

  const links = page.locator('a')
  const count = await links.count()
  for (let index = 0; index < count; index += 1) {
    const href = await links.nth(index).getAttribute('href')
    expect(href ?? '', 'a link must not have an empty or "#" href').not.toMatch(/^(#?)$/)
  }
})

test('AC9 — navigation timing stays under the 3 s budget (local preview)', async ({ page }) => {
  await page.goto(PAGE_URL, { waitUntil: 'load' })

  const duration = await page.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    return entry?.duration ?? -1
  })

  // The plan asks for the real number to be recorded, not for a hard CI gate.
  test.info().annotations.push({
    type: 'AC9',
    description: `navigation duration = ${duration.toFixed(1)} ms (budget 3000 ms, local preview)`,
  })
  console.log(`AC9 navigation duration: ${duration.toFixed(1)} ms`)

  expect(duration).toBeGreaterThan(0)
  expect(duration, 'AC9 budget on local preview').toBeLessThan(3000)
})
