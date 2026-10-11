import { expect, test } from '@playwright/test'
import { BASE } from '../../playwright.config'
import { site } from '../../src/content/site'

// T7 — the countdown (AC10). Expected strings are built from src/content/site.ts, which is
// docs/content.md verbatim, so a copy change cannot silently pass here.
const PAGE_URL = `${BASE}/`
const dayLabel = (days: number) => site.countdown.labelTemplate.replace('{X}', String(days))

// Plan bản 10 asks for the day label to be asserted as a REGEX, because `{X}` is a slot the
// page fills with a number, not a literal string. Built from the template so it still tracks
// docs/content.md.
const DAY_LABEL_RE = new RegExp(`^${site.countdown.labelTemplate.replace('{X}', '\\d+')}$`)

// Every fake instant is written with an explicit +07:00 offset, so it names an absolute
// moment in time and not a wall-clock reading — that is what AC10 pins down.
const MILESTONE = site.countdown.targetIso // 2027-02-06T00:00:00+07:00

const MOMENTS = [
  {
    name: '1 — before Tết, 2027-01-20',
    iso: '2027-01-20T00:00:00+07:00',
    expected: dayLabel(17),
    countsDays: true,
  },
  {
    name: '2 — lower bound 2027-02-05T23:59:59+07:00 (rounded up)',
    iso: '2027-02-05T23:59:59+07:00',
    expected: dayLabel(1),
    countsDays: true,
  },
  {
    name: '3 — just past the milestone, 2027-02-06T00:00:01+07:00',
    iso: '2027-02-06T00:00:01+07:00',
    expected: site.countdown.afterMilestone,
    countsDays: false,
  },
  {
    name: '4 — after Tết, 2027-02-10',
    iso: '2027-02-10T00:00:00+07:00',
    expected: site.countdown.afterMilestone,
    countsDays: false,
  },
] as const

/** Collect console errors and uncaught page errors for the duration of a test. */
function watchForProblems(page: import('@playwright/test').Page): string[] {
  const problems: string[] = []
  page.on('console', (message) => {
    if (message.type() === 'error') problems.push(`console: ${message.text()}`)
  })
  page.on('pageerror', (error) => problems.push(`pageerror: ${error.message}`))
  return problems
}

test.describe('the countdown (AC10)', () => {
  for (const moment of MOMENTS) {
    test(`${moment.name}`, async ({ page }) => {
      const problems = watchForProblems(page)

      // Fake the visitor's clock before the page runs, so the island computes on load.
      await page.clock.install({ time: new Date(moment.iso) })
      await page.goto(PAGE_URL)

      const output = page.locator('[data-countdown]')
      await expect(output).toBeVisible()
      await expect(output).toHaveText(moment.expected)
      if (moment.countsDays) await expect(output).toHaveText(DAY_LABEL_RE)
      // A past milestone must never turn into a negative day count.
      await expect(output).not.toHaveText(/-/)

      expect(problems, 'console must stay clean (AC6)').toEqual([])
    })
  }

  // MINOR-1: exactly on the milestone. The implementation tests `remaining <= 0`, so the
  // milestone instant itself counts as passed — this test locks that behaviour in, rather
  // than leaving the boundary to interpretation.
  test('5 — exactly on the milestone, 2027-02-06T00:00:00+07:00', async ({ page }) => {
    const problems = watchForProblems(page)

    await page.clock.install({ time: new Date(MILESTONE) })
    await page.goto(PAGE_URL)

    const output = page.locator('[data-countdown]')
    await expect(output).toHaveText(site.countdown.afterMilestone)
    await expect(output).not.toHaveText(/\d/)

    expect(problems, 'console must stay clean (AC6)').toEqual([])
  })

  test('6 — the clock stops ticking after the milestone', async ({ page }) => {
    await page.clock.install({ time: new Date('2027-02-06T00:00:01+07:00') })
    await page.goto(PAGE_URL)

    const output = page.locator('[data-countdown]')
    await expect(output).toHaveText(site.countdown.afterMilestone)

    // Several tick intervals later the text is still the greeting, with no day count.
    await page.clock.runFor(5 * 60_000)
    await expect(output).toHaveText(site.countdown.afterMilestone)
    await expect(output).not.toHaveText(/\d/)
  })

  // Crosses the milestone while the clock is running: the page is loaded BEFORE the milestone
  // and must switch over by itself, with no reload. The suite's fixed-instant cases cannot
  // catch a tick that never re-evaluates.
  test('7 — crosses the milestone live, without a reload', async ({ page }) => {
    const problems = watchForProblems(page)

    await page.clock.install({ time: new Date('2027-02-05T23:59:59+07:00') })
    await page.goto(PAGE_URL)

    const output = page.locator('[data-countdown]')
    await expect(output).toHaveText(dayLabel(1))

    // Two minutes of ticking covers the milestone instant.
    await page.clock.runFor(120_000)

    await expect(output).toHaveText(site.countdown.afterMilestone)
    await expect(output).not.toHaveText(/\d/)
    await expect(output).not.toHaveText(/-/)

    expect(problems, 'console must stay clean (AC6)').toEqual([])
  })
})

// The label must depend on the absolute instant, never on the visitor's own time zone.
// America/New_York is 12 hours behind +07:00, so a wall-clock implementation would land on a
// different date and report a different number of days.
test.describe('the label does not depend on the visitor time zone', () => {
  test.use({ timezoneId: 'America/New_York' })

  test('8 — 2027-01-20 still reads 17 days in America/New_York', async ({ page }) => {
    const problems = watchForProblems(page)

    await page.clock.install({ time: new Date('2027-01-20T00:00:00+07:00') })
    await page.goto(PAGE_URL)

    const output = page.locator('[data-countdown]')
    await expect(output).toHaveText(dayLabel(17))
    await expect(output).toHaveText(DAY_LABEL_RE)

    expect(problems, 'console must stay clean (AC6)').toEqual([])
  })
})

test.describe('the static fallback in the served HTML', () => {
  // NOTE on how this is checked, and why not by looking at the rendered <noscript>:
  // Playwright turns script execution off with a CDP emulation flag, but the HTML parser's
  // "scripting is enabled" flag is decided when the document is parsed and stays ON. The
  // parser therefore treats <noscript> content as raw text and never renders it — through
  // CDP the element is present but invisible even though JavaScript cannot run. That is a
  // limitation of the emulation, not of the page.
  // So AC10's static fallback is asserted where it is authoritative: in the HTML the server
  // actually returns (which is also what AC8 asks for).

  test('9 — the served HTML carries the <noscript> fallback', async ({ request }) => {
    const response = await request.get(PAGE_URL)
    expect(response.status()).toBe(200)

    const html = await response.text()
    expect(html, 'a <noscript> region must exist').toContain('<noscript>')
    expect(html, 'the fallback string must be in the served HTML').toContain(
      site.countdown.noscriptFallback,
    )
  })
})

test.describe('with JavaScript disabled', () => {
  // `test.use` sits at the top of its own describe: it configures every test in the block
  // and does not depend on declaration order relative to tests that need JavaScript.
  test.use({ javaScriptEnabled: false })

  test('10 — the page still loads and does not overflow at 375px', async ({ page }) => {
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
