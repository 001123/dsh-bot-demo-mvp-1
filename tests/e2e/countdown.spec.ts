import { expect, test } from '@playwright/test'
import { BASE } from '../../playwright.config'
import { site } from '../../src/content/site'

// T7 — the countdown (AC10). Expected strings are built from src/content/site.ts, which is
// docs/content.md verbatim, so a copy change cannot silently pass here.
const PAGE_URL = `${BASE}/`
const dayLabel = (days: number) => site.countdown.labelTemplate.replace('{X}', String(days))

const MOMENTS = [
  { name: '1 — before Tết, 2027-01-20', iso: '2027-01-20T00:00:00+07:00', expected: dayLabel(17) },
  {
    name: '2 — lower bound 2027-02-05T23:59:59+07:00 (rounded up)',
    iso: '2027-02-05T23:59:59+07:00',
    expected: dayLabel(1),
  },
  {
    name: '3 — just past the milestone, 2027-02-06T00:00:01+07:00',
    iso: '2027-02-06T00:00:01+07:00',
    expected: site.countdown.afterMilestone,
  },
  {
    name: '4 — after Tết, 2027-02-10',
    iso: '2027-02-10T00:00:00+07:00',
    expected: site.countdown.afterMilestone,
  },
] as const

for (const moment of MOMENTS) {
  test(`T7/AC10 — ${moment.name}`, async ({ page }) => {
    const problems: string[] = []
    page.on('console', (message) => {
      if (message.type() === 'error') problems.push(`console: ${message.text()}`)
    })
    page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))

    // Fake the visitor's clock before the page runs, so the island computes on load.
    await page.clock.install({ time: new Date(moment.iso) })
    await page.goto(PAGE_URL)

    const output = page.locator('[data-countdown]')
    await expect(output).toBeVisible()
    await expect(output).toHaveText(moment.expected)
    // A past milestone must never turn into a negative day count.
    await expect(output).not.toHaveText(/-/)

    expect(problems, 'console must stay clean (AC6)').toEqual([])
  })
}

test('T7/AC10 — the clock stops ticking after the milestone', async ({ page }) => {
  await page.clock.install({ time: new Date('2027-02-06T00:00:01+07:00') })
  await page.goto(PAGE_URL)

  const output = page.locator('[data-countdown]')
  await expect(output).toHaveText(site.countdown.afterMilestone)

  // Several tick intervals later the text is still the greeting, with no day count.
  await page.clock.runFor(5 * 60_000)
  await expect(output).toHaveText(site.countdown.afterMilestone)
  await expect(output).not.toHaveText(/\d/)
})

test.describe('with JavaScript disabled', () => {
  // NOTE on how this is checked, and why not by looking at the rendered <noscript>:
  // Playwright turns script execution off with a CDP emulation flag, but the HTML parser's
  // "scripting is enabled" flag is decided when the document is parsed and stays ON. The
  // parser therefore treats <noscript> content as raw text and never renders it — through
  // CDP the element is present but invisible even though JavaScript cannot run. That is a
  // limitation of the emulation, not of the page.
  // So AC10's static fallback is asserted where it is authoritative: in the HTML the
  // server actually returns (which is also what AC8 asks for).

  test('T7/AC10 — the served HTML carries the <noscript> fallback', async ({ request }) => {
    const response = await request.get(PAGE_URL)
    expect(response.status()).toBe(200)

    const html = await response.text()
    expect(html, 'a <noscript> region must exist').toContain('<noscript>')
    expect(html, 'the fallback string must be in the served HTML').toContain(
      site.countdown.noscriptFallback,
    )
  })

  test.use({ javaScriptEnabled: false })

  test('T7/AC10 — the page still loads and does not overflow at 375px', async ({ page }) => {
    await page.setViewportSize({ width: 375, height: 812 })
    await page.goto(PAGE_URL)

    await expect(page.locator('h1')).toBeVisible()

    const measured = await page.evaluate(() => ({
      scroll: document.documentElement.scrollWidth,
      client: document.documentElement.clientWidth,
    }))
    expect(measured.scroll).toBeLessThanOrEqual(measured.client)
  })
})
