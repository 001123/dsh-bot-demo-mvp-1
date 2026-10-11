import { expect, test } from '@playwright/test'
import { BASE } from '../../playwright.config'

// T5 — responsive check for AC4: at 375px and 1440px the page must not scroll sideways.
// Navigate with the base path spelled out; see the CAUTION note in playwright.config.ts.
const PAGE_URL = `${BASE}/`

const VIEWPORTS = [
  { name: 'mobile-375x812', width: 375, height: 812 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
] as const

/**
 * Wait for the layout to settle before measuring.
 *
 * Architect saw this test fail once in seven full-suite runs, and pass on every isolated or
 * repeated run — the signature of measuring too early rather than a product bug: reading
 * `scrollWidth` between a style change and the next layout pass can catch an intermediate
 * state. Two animation frames put the read after the pending layout, and `document.fonts.ready`
 * covers a late webfont swap that would change text metrics.
 */
async function settle(page: import('@playwright/test').Page): Promise<void> {
  await page.evaluate(async () => {
    await document.fonts?.ready
    await new Promise<void>((resolve) => {
      requestAnimationFrame(() => requestAnimationFrame(() => resolve()))
    })
  })
}

for (const viewport of VIEWPORTS) {
  test(`T5/AC4 — no horizontal scroll at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })

    const response = await page.goto(PAGE_URL)
    expect(response?.status(), 'page must answer 200 under the base path').toBe(200)

    // Guard against a blank or wrong page passing the width check for the wrong reason.
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h2')).toHaveCount(3)

    await settle(page)

    const measured = await page.evaluate(() => ({
      documentScrollWidth: document.documentElement.scrollWidth,
      documentClientWidth: document.documentElement.clientWidth,
      bodyScrollWidth: document.body.scrollWidth,
    }))

    // Always record the numbers: if this ever fails again the report carries the measurement
    // instead of leaving the next person to guess.
    const line = `[AC4] ${viewport.name} scroll=${measured.documentScrollWidth} client=${measured.documentClientWidth} bodyScroll=${measured.bodyScrollWidth}`
    console.log(line)
    test.info().annotations.push({ type: 'AC4', description: line })

    expect(measured.documentScrollWidth, line).toBeLessThanOrEqual(measured.documentClientWidth)

    await page.screenshot({
      path: `test-results/t5-${viewport.name}.png`,
      fullPage: true,
    })
  })
}
