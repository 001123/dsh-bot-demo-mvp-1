# Plan — Landing page Tết Âm lịch 2027 (Đinh Mùi) · Issue #1

- Trạng thái: **DRAFT — chờ user duyệt ở GATE 1c** (chưa có label `arch-approved`)
- Người soạn: Architect (ARCH) · Người thực thi: CodeReader (CODE) · Ngày: 2026-10-11
- Nguồn gốc: Architect viết lại bản này. Trong workspace trước đó có nhiều bản nháp bị **nhiều tác nhân sửa chồng lên nhau** (kể cả một cảnh báo nói rằng file "không do Architect viết", và một bản nói ngược lại). Bản có hiệu lực là bản trên `main` sau commit chứa file này — kiểm bằng `get_commit ... full_patch`.
- Stack đã chốt (nguồn: ADR §0): **Astro thường (KHÔNG Starlight) + Tailwind CSS**, deploy **GitHub Pages**, **repo public**, base path `/dsh-bot-demo-mvp-1/`
- Đáp án đã có: Q1(a) chúc Tết · Q2(a) không thương hiệu, theme đỏ–vàng · Q3(a) team viết nội dung mẫu · Q4 = **có đếm ngược** · Q5 = deploy công khai
- Còn thiếu (không chặn T1–T6): Q6 deadline · Q7 âm lịch · Q8 trình duyệt tối thiểu

> ⛔ **GATE 1c chưa qua.** CodeReader **không** được tạo file sản phẩm nào cho tới khi user duyệt plan này và có label `arch-approved`.

## 0. Điều kiện tiên quyết

| # | Điều kiện | Ai | Trạng thái |
|---|---|---|---|
| P1 | Q1/Q2/Q3/Q4 trả lời | user | ✅ xong |
| P2 | Repo public để Pages chạy trên account Free | user | ✅ xong — repo `"visibility": "public"`, Architect kiểm chứng độc lập bằng API không đăng nhập |
| P3 | User duyệt thay đổi phạm vi (deploy công khai) | user | ⏳ chờ (đã chuyển in-scope ở spec `515db703`) |
| P4 | User duyệt plan này ở GATE 1c | user | ⏳ chờ |
| P5 | Deploy thật lên Pages | user | ⏳ chờ chữ **"Duyệt"** ở GATE 2 |

## 1. Kiến trúc

- **Astro SSG, KHÔNG Starlight**: 1 route `/` từ `src/pages/index.astro` ⇒ AC1, AC8. Không `src/content/docs`, không `src/content.config.ts`, không file override theme tài liệu.
- **Tailwind CSS** áp trực tiếp lên component tự viết (`src/components/*.astro`); không cần override `--sl-color-*`.
- **Nội dung**: hero (Tết Nguyên đán 2027 · Đinh Mùi · 06/02/2027 thứ Bảy · tất niên 05/02/2027) + ≥3 khối (ý nghĩa Tết, phong tục, lời chúc) — văn bản tiếng Việt thật, không placeholder (Q1a, Q3a).
- **Theme**: đỏ–vàng truyền thống, không logo/thương hiệu (Q2a); khai trong Tailwind theme + CSS variable.
- **Đếm ngược (Q4 = có)**: island `client:load`, tính từ `Date` client tới `2027-02-06T00:00:00+07:00`, không gọi API/backend, có fallback text tĩnh khi tắt JS.
- **JS tối thiểu**: chỉ island đếm ngược; phần còn lại render tĩnh để giữ AC9.
- **Assets**: SVG/CSS tự vẽ hoặc ảnh có giấy phép (ghi nguồn trong README) — tránh R3; mọi `<img>` có `alt` tiếng Việt (AC5).
- **Base path**: `site: 'https://001123.github.io'`, `base: '/dsh-bot-demo-mvp-1'`; test AC1/AC5 phải chạy trên đường dẫn có base, không chỉ `localhost:4321/`.

## 2. Task

### T1 — Khởi tạo Astro + Tailwind
- **File tạo**: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`, `.gitignore`, `README.md`
- **Nội dung**: cài `astro` + `@astrojs/tailwind` (hoặc Tailwind v4 qua plugin Vite — chốt **một** phiên bản); khai `site` + `base`; pin phiên bản.
- **Test**: `npm ci && npm run build` PASS; `npm run preview` mở được `http://localhost:4321/dsh-bot-demo-mvp-1/`.
- **Phụ thuộc**: P4.

### T2 — Layout + theme đỏ–vàng
- **File tạo**: `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- **Nội dung**: `<html lang="vi">`, title/description, palette đỏ–vàng (Q2a), footer đơn giản; không sidebar, không search, không nút theme.
- **Test**: build không warning; DOM không có `<form>` và không có `<a href="#">` rỗng (AC7).
- **Phụ thuộc**: T1.

### T3 — Hero + 3 khối nội dung (AC2, AC3, AC8)
- **File tạo/sửa**: `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/ContentBlock.astro`, `src/content/site.ts`
- **Nội dung**: hero đủ 4 chuỗi ngày Tết; ≥3 khối có tiêu đề + đoạn văn tiếng Việt; giọng chúc Tết (Q1a); nội dung team viết (Q3a).
- **Test**: `grep` trên `dist/` thấy đủ chuỗi ngày Tết; không khớp `Lorem ipsum|TODO`; Playwright đọc DOM — AC2/AC3/AC8.
- **Phụ thuộc**: T2.

### T4 — Hình ảnh/minh hoạ + `alt` (AC5)
- **File tạo**: `public/` (SVG tự vẽ / ảnh có giấy phép), chèn vào component
- **Test**: mọi `<img>` có `alt` tiếng Việt không rỗng; Playwright network log không có response ≥400 cho ảnh.
- **Phụ thuộc**: T3.

### T5 — Responsive 375 / 1440 (AC4)
- **File sửa**: `src/styles/global.css`, class Tailwind trong component
- **Test**: Playwright ở 375×812 và 1440×900: `scrollWidth <= clientWidth`; lưu screenshot 2 viewport cho review.
- **Phụ thuộc**: T3, T4.

### T6 — Bộ test tự động (map AC)
- **File tạo**: `playwright.config.ts`, `tests/e2e/landing.spec.ts`, script `test:e2e`
- **Nội dung**:
  - AC1: GET `/dsh-bot-demo-mvp-1/` = 200, context ẩn danh, không redirect login.
  - AC2/AC8: 4 chuỗi ngày Tết có trong HTML thô **và** trong DOM.
  - AC3: ≥3 khối nội dung; không placeholder.
  - AC4: 2 viewport như T5.
  - AC5: `alt` non-empty; không ảnh lỗi.
  - AC6: gom `console` error + `pageerror` khi tải **và** sau khi scroll hết trang; assert rỗng.
  - AC7: không `form`/`input[type=email]`/iframe thanh toán; `<a href>` không rỗng, không `"#"`.
  - AC9: `performance.getEntriesByType('navigation')[0].duration < 3000` trên preview local — **ghi số đo thật**, không assert cứng nếu CI chậm.
  - AC10: xem T7.
- **Test**: `npx playwright test` PASS trên `npm run preview`.
- **Phụ thuộc**: T3–T5.

### T7 — Đếm ngược tới mùng 1 Tết (Q4 = có ⇒ BẮT BUỘC · AC10)
- **File tạo**: `src/components/Countdown.astro` (island `client:load`)
- **Nội dung**: tính từ `Date` client tới `2027-02-06T00:00:00+07:00`; không API/backend; fallback text tĩnh khi tắt JS; sau ngày Tết hiển thị "Chúc mừng năm mới".
- **Test**: Playwright `clock` ở 3 mốc (trước Tết · đúng ngày · sau Tết), console sạch ở cả 3; AC8 vẫn đạt vì nội dung chính nằm trong HTML.
- **Phụ thuộc**: AC10 do Analyst soạn, Chief push vào spec; T6.

### T8 — README
- **File sửa**: `README.md`
- **Nội dung**: Node, `npm ci`, `npm run dev`, `npm run build && npm run preview`, chạy test, URL preview có base path, nguồn/giấy phép ảnh.
- **Test**: CodeReader chạy lại từng lệnh trên máy sạch.
- **Phụ thuộc**: T1, T6.

### T9 — Workflow GitHub Pages (chỉ tạo file, **không** bật deploy)
- **File tạo**: `.github/workflows/deploy-pages.yml`
- **Nội dung**: build Astro → upload artifact Pages; trigger `workflow_dispatch` trước; chỉ đổi sang `push: main` nếu user đồng ý.
- **Test**: lint YAML / dry-run nếu có; **không** chạy deploy, không bật Pages.
- **Gate**: chỉ chạy sau chữ **"Duyệt"** ở GATE 2. CodeReader không tự bật Pages, không tự merge.

## 3. Test plan tổng hợp

| AC | Cách kiểm | Tool | Ai |
|---|---|---|---|
| AC1 | GET trang = 200, ẩn danh, có base path | Playwright + `curl -I` | CODE, ARCH chạy lại |
| AC2 | 4 chuỗi ngày Tết trong HTML thô + DOM | `grep dist/` + Playwright | CODE, ARCH |
| AC3 | ≥3 khối nội dung, không placeholder | Playwright + regex | CODE, ARCH |
| AC4 | 375/1440 không cuộn ngang | Playwright viewport + screenshot | CODE, ARCH |
| AC5 | `alt` tiếng Việt, không 404 (trên đường dẫn có base) | Playwright network + DOM | CODE, ARCH |
| AC6 | console/pageerror rỗng khi tải + scroll | Playwright listener | CODE, ARCH |
| AC7 | không form/input; `<a href>` hợp lệ | Playwright DOM query | CODE, ARCH |
| AC8 | nội dung chính có trong HTML trả về | `curl` + Playwright | CODE, ARCH |
| AC9 | navigation duration < 3000ms, ghi số thật | Playwright performance | CODE ghi số, ARCH đối chiếu |
| AC10 | đếm ngược 3 mốc thời gian, console sạch | Playwright clock | CODE, ARCH |

Review độc lập của Architect: chạy lại `npm ci && npm run build && npx playwright test` trên **đúng commit**, không tin báo cáo suông.

## 4. Rủi ro

| # | Rủi ro | Mức | Xử lý |
|---|---|---|---|
| R1 | Quên `base` ⇒ 404 CSS/ảnh trên Pages | Cao nếu quên | T1 khai ngay; AC5 test trên đường dẫn có base |
| R2 | Đếm ngược làm JS phình, ảnh hưởng AC9/AC6 | Trung bình | 1 island nhỏ; đo AC9 thật; fallback khi tắt JS |
| R3 | Lệch phiên bản Astro/Tailwind (v4 vs v3) | Trung bình | Pin + commit lockfile; `npm ci` trong CI |
| R4 | Bản quyền ảnh (R3 của spec) | Trung bình | Chỉ SVG/CSS tự vẽ hoặc ảnh có giấy phép ghi nguồn |
| R5 | Nguồn của D2/D4 (Astro thường, Q4 = có) là relay của Analyst, chưa có xác nhận ở kênh chung | Trung bình | Đã ghi nguồn ở ADR §0; nếu user phủ nhận ⇒ revert 1 commit, bỏ T7/AC10 |
| R6 | Q6/Q7/Q8 đến muộn | Thấp | Q6 xếp lại thứ tự; Q7 = 1 chuỗi trong hero; Q8 mặc định Chrome/Safari/Firefox 2 bản gần nhất |
| R7 | Deploy bị kích hoạt sớm | Cao về quy trình | T9 chỉ tạo file; chạy workflow chỉ sau chữ "Duyệt" ở GATE 2 |
| R8 | File trong workspace bị nhiều tác nhân sửa chồng (đã xảy ra nhiều lần) | Trung bình | Chốt bản trên `main` sau mỗi commit; trước khi ghi luôn đọc SHA mới nhất; mỗi file một chủ |

## 5. Rollback

- Chưa deploy ⇒ rollback = không merge, xoá branch, không bật Pages.
- Sau deploy ⇒ Pages giữ bản build trước; rollback = revert commit trên `main` rồi chạy lại workflow.
- Không DB/migration ⇒ không có rollback dữ liệu.

## 6. Khi nào plan được coi là CHỐT

Khi: (1) user duyệt thay đổi phạm vi deploy (P3), (2) user duyệt plan ở GATE 1c (P4) — Architect thêm label `arch-approved` vào Issue #1, CodeReader bắt đầu T1. Deploy thật vẫn phải chờ chữ **"Duyệt"** ở GATE 2 (P5).
