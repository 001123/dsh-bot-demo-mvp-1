import { defineConfig } from '@playwright/test'

// Pages serves this project under a base path (astro.config.mjs `base`), so every URL the
// browser touches carries that prefix — testing at the root would hide a missing base
// (risk R1, and the AC5 assertion form).
const PORT = 4321
const BASE = '/dsh-bot-demo-mvp-1'
const ORIGIN = `http://localhost:${PORT}`

// CAUTION: `baseURL` is deliberately the ORIGIN only, without the base path.
// Playwright resolves `page.goto('/')` with `new URL()`, and an absolute path REPLACES the
// path of baseURL — `new URL('/', ORIGIN + BASE)` is `${ORIGIN}/`. A spec written that way
// silently loads Astro's 404 page instead of this site, and its assertions fail (or, worse,
// pass) for the wrong reason. Specs therefore navigate with `BASE + '/'` explicitly.
export { BASE }

export default defineConfig({
  testDir: './tests/e2e',
  fullyParallel: true,
  forbidOnly: !!process.env.CI,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: ORIGIN,
  },
  // A fresh build every run: `astro preview` serves `dist/`, and a stale `dist/` would
  // silently validate the previous revision.
  webServer: {
    command: 'npm run build && npm run preview',
    url: `${ORIGIN}${BASE}/`,
    reuseExistingServer: !process.env.CI,
    timeout: 120_000,
  },
})
