# dsh-bot-demo-mvp-1

Demo MVP 1 — SDLC gate walkthrough (Chief / Analyst / Architect / CodeReader)

Landing page cho Tết Nguyên đán 2027 (Đinh Mùi) — trang tĩnh, một URL.

Sản phẩm demo để chạy thử quy trình SDLC có gate. Baseline spec: `docs/spec.md` trên
`main`, commit `bd3406c`, blob `75ecee11`. Kế hoạch thực thi: `docs/plan.md` bản 10,
blob `7a7f52bd`. Chuỗi hiển thị trên trang: `docs/content.md` (blob `f750f977`) —
**nguồn duy nhất**, không tự viết text ngoài file đó.

## Công nghệ

- **Astro 7.3.8** — static site generation, một route `/`.
- **Tailwind CSS 4.3.3** (qua plugin Vite `@tailwindcss/vite`) — theme đỏ–vàng.
- **GitHub Pages** — deploy tại `/dsh-bot-demo-mvp-1/`.

## Yêu cầu

- Node.js >= 22.12.0 (Astro 7 yêu cầu tối thiểu `22.12.0`).
- npm >= 9.6.5.

## Chạy local

```sh
npm install --include=dev
npm run dev
```

> **Vì sao `npm install` và vì sao có `--include=dev`:**
>
> 1. **Không có `package-lock.json` trong repo** — theo quyết định của user (`"1 dùng npm i"`,
>    plan bản 10, P7). Vì vậy `npm ci` không dùng được ở đây; lệnh đúng là `npm install`.
>    Hệ quả là **nợ kỹ thuật**: 3 dependency trực tiếp (`astro`, `tailwindcss`,
>    `@tailwindcss/vite`) được **pin tuyệt đối**, nhưng dependency gián tiếp thì không
>    (plan bản 10, rủi ro R3).
> 2. `tailwindcss` và `@tailwindcss/vite` nằm ở `devDependencies` (build tooling, không phải
>    dependency runtime). npm bỏ qua `devDependencies` khi `NODE_ENV=production`, và một số
>    host dựng sẵn biến đó. Khi đó cài thiếu Tailwind và `astro build` chết ngay:
>
> ```
> Cannot find module '@tailwindcss/vite' imported from '.../astro.config.mjs'
> ```
>
> Bằng chứng đo trên host này (2026-10-11): `npm ci` → **không** có `node_modules/tailwindcss`
> → build FAIL; `npm install --include=dev` → build PASS. Trên CI không đặt `NODE_ENV=production`
> thì `npm install` trần vẫn đủ; thêm cờ này vô hại ở cả hai trường hợp.

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
Pages ⇒ vi phạm AC5. Cùng lý do đó, favicon được khai bằng đường dẫn có base:
`/dsh-bot-demo-mvp-1/favicon.svg`.

## Test

```sh
npx playwright install --with-deps chromium   # lần đầu trên máy mới
npm run test:e2e
```

Bằng chứng cho gate — chạy tuần tự (`workers=1`) để giảm nhiễu tranh chấp tài nguyên:

```sh
npm run test:e2e:gate
```

Bộ **live** — chạy trên **bản đã deploy**, **cần internet**, khác hẳn bộ hermetic ở trên (bộ
hermetic tự dựng build local trong port riêng):

```sh
# mặc định trỏ https://001123.github.io/dsh-bot-demo-mvp-1/ — đổi bằng LIVE_URL
npm run test:e2e:live
```

Nó nằm ở `tests/live/` với config riêng `playwright.live.config.ts` (**không** `webServer`,
**không** cổng cục bộ), nên `npm test` vẫn chạy offline và không dẫm vào preview của Bot khác.
Số đo navigation trong bộ này là **thời gian đường mạng** (DNS/CDN/TTFB) trên bản deploy —
**không** phải verdict AC9; verdict AC9 do bộ local (`tests/e2e/landing.spec.ts`) quyết định.

Test **không** dựa vào retry để xanh. `retries` chỉ bật trong CI để giảm nhiễu hạ tầng, còn
các phép đo được làm ổn định ngay trong test: mục AC4 chờ layout settle
(`document.fonts.ready` + hai `requestAnimationFrame`) trước khi đọc `scrollWidth`, và in số
đo mỗi lần chạy.

Test chạy trên port riêng (mặc định `4399`, đổi bằng `E2E_PORT`) và **không** tái sử dụng
server đang chạy: workspace này được nhiều Bot dùng chung, mỗi Bot có thể có checkout riêng
đang chạy `astro preview` ở port mặc định 4321, và một test trỏ nhầm vào đó sẽ kiểm định
sai revision.
