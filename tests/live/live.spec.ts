import { expect, test } from '@playwright/test'
import { LIVE_URL } from '../../playwright.live.config'
import { site } from '../../src/content/site'

// Live smoke run against the deployed GitHub Pages site — the counterpart to the hermetic
// `tests/e2e` suite. Everything before this checked the built artifact we hold locally; this
// file checks what the internet actually serves, JavaScript included.
//
// It runs from `tests/live` with `playwright.live.config.ts` (no webServer, no local port) so
// `npm test` stays offline and other sessions keep their previews on 4321/4322.
//
//   LIVE_URL=https://001123.github.io/dsh-bot-demo-mvp-1/ \
//     npx playwright test -c playwright.live.config.ts --workers=1
const PAGE_URL = LIVE_URL

const dayLabel = (days: number) => site.countdown.labelTemplate.replace('{X}', String(days))
const DAY_LABEL_RE = new RegExp(`^${site.countdown.labelTemplate.replace('{X}', '\\d+')}$`)

/** Collect console errors and uncaught page errors for the duration of a test. */
function watchForProblems(page: import('@playwright/test').Page): string[] {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
  return problems
}

/** Wait for the layout to settle before measuring widths (same reason as responsive.spec.ts). */
async function settle(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts?.ready
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    })
  })
}

test('live/AC1 — the public page answers 200 with the expected document head', async ({ page }) => {
  const response = await page.goto(PAGE_URL, { waitUntil: 'load' })

  expect(response?.status(), 'the deployed page must answer 200 to an anonymous visitor').toBe(200)
  expect(response?.headers()['content-type'] ?? '').toContain('text/html')

  await expect(page).toHaveTitle(site.title)
  expect(await page.getAttribute('html', 'lang'), '<html lang> must be vi').toBe('vi')

  // Guard against a blank or error page passing the status check.
  await expect(page.locator('h1')).toBeVisible()
  await expect(page.locator('h2')).toHaveCount(3)
  await expect(page.locator('body')).toContainText('Tết Nguyên đán Đinh Mùi 2027')
  expect(await page.locator('img').count(), 'AC5 đạt do không dùng ảnh raster').toBe(0)
})

test('live/AC6 — no console error or page error on load, and after scrolling to the end', async ({
  page,
}) => {
  const problems = watchForProblems(page)

  await page.goto(PAGE_URL, { waitUntil: 'load' })
  await expect(page.locator('[data-countdown]')).toBeVisible()

  // Walk down the page so any lazy work runs, then give it a beat.
  await page.evaluate(() => window.scrollTo(0, document.body.scrollHeight))
  await page.waitForTimeout(1_000)

  expect(problems, 'the live page must log no error').toEqual([])
})

test('live/AC10 — the countdown shows a real day count with the visitor clock', async ({ page }) => {
  const problems = watchForProblems(page)

  await page.goto(PAGE_URL, { waitUntil: 'load' })

  const output = page.locator('[data-countdown]')
  await expect(output).toBeVisible()

  const text = ((await output.textContent()) ?? '').trim()
  expect(text, 'the island must fill the [data-countdown] slot').toMatch(DAY_LABEL_RE)

  // Cross-check the number the island printed against the milestone in site.ts. One day of
  // tolerance: the label is computed on load and the test reads it a moment later, so a run
  // that straddles a day boundary may legitimately differ by one.
  const shown = Number(text.match(/\d+/)?.[0])
  const expected = Math.ceil((Date.parse(site.countdown.targetIso) - Date.now()) / 86_400_000)
  test.info().annotations.push({
    type: 'live/AC10',
    description: `shown = ${shown} days, computed = ${expected} days`,
  })
  console.log(`[live/AC10] shown=${shown} computed=${expected}`)
  expect(Math.abs(shown - expected)).toBeLessThanOrEqual(1)

  expect(problems, 'the live page must log no error').toEqual([])
})

// `page.clock.install` must run BEFORE `page.goto`, so the island computes with the faked clock.
const FAKED_MOMENTS = [
  {
    name: 'before Tết, 2027-01-20',
    iso: '2027-01-20T00:00:00+07:00',
    expected: dayLabel(17),
  },
  {
    name: 'just past the milestone, 2027-02-06T00:00:01+07:00',
    iso: '2027-02-06T00:00:01+07:00',
    expected: site.countdown.afterMilestone,
  },
] as const

for (const moment of FAKED_MOMENTS) {
  test(`live/AC10 — with a faked clock at ${moment.name}`, async ({ page }) => {
    const problems = watchForProblems(page)

    await page.clock.install({ time: new Date(moment.iso) })
    await page.goto(PAGE_URL, { waitUntil: 'load' })

    const output = page.locator('[data-countdown]')
    await expect(output).toBeVisible()
    await expect(output).toHaveText(moment.expected)
    await expect(output).not.toHaveText(/-/)

    expect(problems, 'the live page must log no error').toEqual([])
  })
}

const VIEWPORTS = [
  { name: 'mobile-375x812', width: 375, height: 812 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
] as const

for (const viewport of VIEWPORTS) {
  test(`live/AC4 — no horizontal scroll at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })

    const response = await page.goto(PAGE_URL, { waitUntil: 'load' })
    expect(response?.status()).toBe(200)

    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h2')).toHaveCount(3)

    await settle(page)

    const measured = await page.evaluate(() => ({
      documentScrollWidth: document.documentElement.scrollWidth,
      documentClientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }))

    const line = `[live/AC4] ${viewport.name} scroll=${measured.documentScrollWidth} client=${measured.documentClientWidth} bodyScroll=${measured.bodyScrollWidth}`
    console.log(line)
    test.info().annotations.push({ type: 'live/AC4', description: line })

    expect(measured.documentScrollWidth, line).toBeLessThanOrEqual(measured.documentClientWidth)
  })
}

test('live/AC5 — every URL the live page references answers < 400', async ({ page, request }) => {
  const response = await request.get(PAGE_URL)
  expect(response.status()).toBe(200)
  const html = await response.text()

  const references = new Set<string>()
  for (const match of html.matchAll(/(?:href|src)="([^"]+)"/g)) references.add(match[1])

  // `srcset` is a comma-separated candidate list: keep the URL part of each candidate.
  for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
      const url = candidate.trim().split(/\s+/)[0]
      if (url !== '') references.add(url)
    }
  }

  // Stylesheets reference assets too (fonts, background images).
  for (const sheet of html.matchAll(/href="([^"]+\.css)"/g)) {
    const css = await (await request.get(new URL(sheet[1], PAGE_URL).href)).text()
    for (const url of css.matchAll(/url\(\s*['"]?([^'")]+)['"]?\s*\)/g)) references.add(url[1])
  }

  // On the live site the references are already absolute paths under the repository name
  // (`/dsh-bot-demo-mvp-1/...`), so resolve them against the deployed URL instead of assuming
  // the local build's relative shape.
  const checked = [...references]
    .filter((url) => !/^(data:|mailto:|tel:|javascript:|#)/.test(url))
    .map((url) => new URL(url, PAGE_URL).href)

  expect(checked.length, 'the page must reference something').toBeGreaterThan(0)

  const broken: string[] = []
  for (const url of checked) {
    const res = await request.get(url)
    if (res.status() >= 400) broken.push(`${res.status()} ${url}`)
  }

  console.log(`[live/AC5] checked ${checked.length} referenced URLs, broken = ${broken.length}`)
  test.info().annotations.push({
    type: 'live/AC5',
    description: `checked ${checked.length} URLs on ${new URL(PAGE_URL).origin}`,
  })

  expect(broken, 'a referenced URL that 404s on the deployed site is a violation').toEqual([])
})

test('live/AC9 — record the real navigation duration of the deployed page', async ({ page }) => {
  await page.goto(PAGE_URL, { waitUntil: 'load' })

  const duration = await page.evaluate(() => {
    const entry = performance.getEntriesByType('navigation')[0] as
      | PerformanceNavigationTiming
      | undefined
    return entry?.duration ?? -1
  })

  // Same rule as the local suite: record the real number, and keep the budget loose so a slow
  // network leg cannot become a second source of false reds.
  const budget = Number(process.env.LIVE_BUDGET_MS ?? 8000)

  const line = `[live/AC9] navigation duration = ${duration.toFixed(1)} ms (budget ${budget} ms)`
  console.log(line)
  test.info().annotations.push({ type: 'live/AC9', description: line })

  expect(duration).toBeGreaterThan(0)
  expect(duration, line).toBeLessThan(budget)
})
