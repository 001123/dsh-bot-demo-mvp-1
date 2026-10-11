// Tailwind CSS v4 is configured CSS-first (see src/styles/global.css).
// This file is loaded from the stylesheet with `@config` and keeps the page palette in
// one place so later tasks (T2 theme, T5 responsive) extend tokens instead of editing CSS.
/** @type {import('tailwindcss').Config} */
export default {
  theme: {
    extend: {
      colors: {
        // Traditional Vietnamese Tết palette: đỏ (red) + vàng (gold). Q2(a): no brand colors.
        tet: {
          red: '#c8102e',
          'red-dark': '#9b0d23',
          'red-deep': '#7a0a1c',
          gold: '#f2c14e',
          'gold-light': '#ffd97a',
          cream: '#fff8e7',
          ink: '#2b1410',
        },
      },
    },
  },
}
