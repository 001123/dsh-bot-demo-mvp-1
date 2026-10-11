import { defineConfig } from '@playwright/test'

// Pages serves this project under a base path (astro.config.mjs `base`), so every URL the
// browser touches carries that prefix — testing at the root would hide a missing base
// (risk R1, and the AC5 assertion form).
//
// PORT: deliberately NOT Astro's default 4321. Several Bots share this workspace and each
// may have its own checkout with `astro preview` running (review-t1/, review-code/), and
// that default port is first-come-first-served. A test that lands on someone else's server
// silently validates a different revision — during T7 that produced six failures against a
// checkout that had no countdown at all. Override with E2E_PORT when needed.
const PORT = Number(process.env.E2E_PORT ?? 4399)
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
  // `reuseExistingServer: false` on purpose: if our own port is occupied we want a loud
  // failure, never a quiet run against a foreign server.
  // A fresh build every run, because `astro preview` serves `dist/`.
  webServer: {
    command: `npm run build && npm run preview -- --port ${PORT}`,
    url: `${ORIGIN}${BASE}/`,
    reuseExistingServer: false,
    timeout: 120_000,
  },
})
