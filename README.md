# dsh-bot-demo-mvp-1

Demo MVP 1 — SDLC gate walkthrough (Chief / Analyst / Architect / CodeReader)

Landing page cho Tết Nguyên đán 2027 (Đinh Mùi) — trang tĩnh, một URL.

Sản phẩm demo để chạy thử quy trình SDLC có gate. Baseline spec: `docs/spec.md`
(commit `dbea4b9`). Kế hoạch thực thi: `docs/plan.md`. Chuỗi hiển thị trên trang:
`docs/content.md` — **nguồn duy nhất**, không tự viết text ngoài file đó.

## Công nghệ

- **Astro 7.3.8** — static site generation, một route `/`.
- **Tailwind CSS 4.3.3** (qua plugin Vite `@tailwindcss/vite`) — theme đỏ–vàng.
- **GitHub Pages** — deploy tại `/dsh-bot-demo-mvp-1/`.

## Yêu cầu

- Node.js >= 22.12.0 (Astro 7 yêu cầu tối thiểu `22.12.0`).
- npm >= 9.6.5.

## Chạy local

```sh
npm ci
npm run dev
```

## Build và xem trước

```sh
npm run build
npm run preview
```

Trang Pages phục vụ dưới base path, nên URL xem trước là:

```
http://localhost:4321/dsh-bot-demo-mvp-1/
```

`site` và `base` được khai trong `astro.config.mjs`. Quên `base` ⇒ CSS/ảnh 404 trên
Pages ⇒ vi phạm AC5.
