// @ts-check
import { defineConfig } from 'astro/config'
import tailwindcss from '@tailwindcss/vite'

// GitHub Pages serves this repository at https://001123.github.io/dsh-bot-demo-mvp-1/
// `site` and `base` must stay in sync with that URL (plan T1, risk R1): without `base`
// every asset 404s on Pages, which would break AC5.
export default defineConfig({
  site: 'https://001123.github.io',
  base: '/dsh-bot-demo-mvp-1',
  vite: {
    plugins: [tailwindcss()],
  },
})
