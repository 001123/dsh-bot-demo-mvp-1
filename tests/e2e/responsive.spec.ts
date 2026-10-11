import { expect, test } from '@playwright/test'
import { BASE } from '../../playwright.config'

// T5 — responsive check for AC4: at 375px and 1440px the page must not scroll sideways.
// Navigate with the base path spelled out; see the CAUTION note in playwright.config.ts.
const PAGE_URL = `${BASE}/`

const VIEWPORTS = [
  { name: 'mobile-375x812', width: 375, height: 812 },
  { name: 'desktop-1440x900', width: 1440, height: 900 },
] as const

for (const viewport of VIEWPORTS) {
  test(`T5/AC4 — no horizontal scroll at ${viewport.name}`, async ({ page }) => {
    await page.setViewportSize({ width: viewport.width, height: viewport.height })

    const response = await page.goto(PAGE_URL)
    expect(response?.status(), 'page must answer 200 under the base path').toBe(200)

    // Guard against a blank or wrong page passing the width check for the wrong reason.
    await expect(page.locator('h1')).toBeVisible()
    await expect(page.locator('h2')).toHaveCount(3)

    const measured = await page.evaluate(() => ({
      documentScrollWidth: document.documentElement.scrollWidth,
      documentClientWidth: document.documentElement.clientWidth,
    }))

    expect(
      measured.documentScrollWidth,
      `documentElement scrollWidth (${measured.documentScrollWidth}) must be <= clientWidth (${measured.documentClientWidth})`,
    ).toBeLessThanOrEqual(measured.documentClientWidth)

    await page.screenshot({
      path: `test-results/t5-${viewport.name}.png`,
      fullPage: true,
    })
  })
}
