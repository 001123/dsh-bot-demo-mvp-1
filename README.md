# dsh-bot-demo-mvp-1

Demo MVP 1 — SDLC gate walkthrough (Chief / Analyst / Architect / CodeReader)

Landing page cho Tết Nguyên đán 2027 (Đinh Mùi) — trang tĩnh, một URL.

Sản phẩm demo để chạy thử quy trình SDLC có gate. Baseline spec: `docs/spec.md`
(commit `fb4b5f9`, blob `87e5c0f6`). Kế hoạch thực thi: `docs/plan.md` (bản 7,
blob `e6561ef6`). Chuỗi hiển thị trên trang: `docs/content.md` — **nguồn duy nhất**,
không tự viết text ngoài file đó.

## Công nghệ

- **Astro 7.3.8** — static site generation, một route `/`.
- **Tailwind CSS 4.3.3** (qua plugin Vite `@tailwindcss/vite`) — theme đỏ–vàng.
- **GitHub Pages** — deploy tại `/dsh-bot-demo-mvp-1/`.

## Yêu cầu

- Node.js >= 22.12.0 (Astro 7 yêu cầu tối thiểu `22.12.0`).
- npm >= 9.6.5.

## Chạy local

```sh
npm ci --include=dev
npm run dev
```

> **Vì sao có `--include=dev`:** `tailwindcss` và `@tailwindcss/vite` nằm ở
> `devDependencies` (build tooling, không phải dependency runtime). npm tự bỏ qua
> `devDependencies` khi biến môi trường `NODE_ENV=production` — và một số host dựng
> sẵn biến đó. Khi đó `npm ci` trần sẽ cài thiếu Tailwind và `astro build` chết ngay:
>
> ```
> Cannot find module '@tailwindcss/vite' imported from '.../astro.config.mjs'
> ```
>
> Bằng chứng đo trên host này (2026-10-11): `npm ci` → **không** có `node_modules/tailwindcss`
> → build FAIL; `npm ci --include=dev` → build PASS. Trên CI không đặt `NODE_ENV=production`
> thì `npm ci` trần vẫn đủ; thêm cờ này vô hại ở cả hai trường hợp.

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
