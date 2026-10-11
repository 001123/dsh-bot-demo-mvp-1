import { defineConfig } from '@playwright/test'

// Live smoke config — talks to the PUBLIC deployment, not to a local build.
//
//   LIVE_URL=https://001123.github.io/dsh-bot-demo-mvp-1/ \
//     npx playwright test -c playwright.live.config.ts --workers=1
//
// Deliberately NOT the default `playwright.config.ts`:
//   * NO `webServer`. The AC1–AC10 suite owns port 4399; ports 4321/4322 belong to other
//     sessions' running previews. Nothing here may start, reuse, or touch a local server.
//   * `testDir` is `tests/live`, so the hermetic suite in `tests/e2e` never picks this file up
//     (`npm test` must not depend on the internet).
//   * `--workers=1` keeps the recorded numbers and the network log readable.
const LIVE_URL = process.env.LIVE_URL ?? 'https://001123.github.io/dsh-bot-demo-mvp-1/'

export { LIVE_URL }

export default defineConfig({
  testDir: './tests/live',
  fullyParallel: false,
  retries: 0,
  reporter: [['list']],
  use: {
    baseURL: LIVE_URL,
  },
})
