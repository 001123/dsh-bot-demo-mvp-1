# Plan — Landing page Tết Âm lịch 2027 (Đinh Mùi) · Issue #1

- Trạng thái: **DRAFT — khung plan, CHƯA chốt. Chờ user trả lời Q1–Q4** (GATE 1c chưa qua)
- Người soạn: Architect (ARCH) · Người thực thi: CodeReader (CODE)
- Ngày: 2026-10-11
- Stack đã chốt ở GATE 1b: **Astro + Starlight + Tailwind CSS**, deploy **GitHub Pages**, **repo public** (ADR `docs/adr/0001-stack.md`, commit `c24ac6d`)
- Baseline spec: `docs/spec.md` trên `main` (commit `79d917c`, blob `165601395fd0f6b017284b5120cf361cdc42f3d2`)

> ⛔ **GATE 1c chưa qua.** File này là khung để user duyệt sớm phần kỹ thuật. CodeReader **không** được tạo file sản phẩm nào cho tới khi user duyệt plan và có label `arch-approved`.

## 0. Điều kiện tiên quyết (phải xong trước khi implement)

| # | Điều kiện | Ai làm | Trạng thái |
|---|---|---|---|
| P1 | User trả lời **Q1, Q2, Q3, Q4** (mục 6) | user | ⏳ chờ |
| P2 | Repo đổi sang **public** (Settings → General → Danger Zone) để Pages chạy trên account Free | user | ⏳ chờ (Chief đã báo user) |
| P3 | User chốt **đổi phạm vi**: deploy URL công khai (spec §5 đang out-of-scope) | user | ⏳ chờ |
| P4 | User duyệt plan này ở GATE 1c | user | ⏳ chờ |
| P5 | Deploy thật lên Pages chỉ sau chữ **"Duyệt"** ở GATE 2 | user | ⏳ chờ |

Chưa xong P1–P4 thì không task nào bắt đầu.

## 1. Thay đổi phạm vi cần user duyệt (ghi rõ, không âm thầm)

- Spec §5 ghi: *"Deploy lên domain thật (chỉ cần chạy được local/URL demo) — trừ khi user trả lời Q5"*. User đã trả lời Q5 = cần URL công khai ⇒ **phạm vi mở rộng thêm 1 mục**: workflow GitHub Pages + bật Pages trong repo settings.
- Hệ quả: repo thành **public** ⇒ toàn bộ source, spec, ADR, plan ai cũng xem được. Với demo này chấp nhận được, nhưng user cần biết trước khi mình ghi bất cứ file nào.
- Không có thay đổi phạm vi nào khác. Đếm ngược (Q4) nếu = "có" sẽ do Analyst bổ sung AC vào spec **trước** khi task T7 bắt đầu.

## 2. Kiến trúc dự kiến

- **Astro (SSG) + Starlight** render ra HTML tĩnh. 1 route duy nhất `/` (Starlight splash template) ⇒ đạt AC1, AC8.
- **Tailwind CSS** chỉ áp cho phần page/component do mình viết trong `src/`. Component của Starlight phải override bằng CSS custom property (`--sl-color-*`) — đúng cảnh báo trong ADR §7.2 và CodeReader đã xác nhận.
- **Starlight tắt phần thừa** để không vi phạm AC7: `pagefind: false` (không UI tìm kiếm), ẩn sidebar/pagination/"Edit page"/social links. Dùng `template: splash`.
- **Không JS nặng**: mặc định Astro/Starlight gần như không JS. Chỉ thêm island nếu Q4 = có đếm ngược.
- **Assets**: SVG/CSS tự vẽ hoặc ảnh có giấy phép, đặt trong `public/` — tránh R3 (bản quyền). Mọi `<img>` phải có `alt` tiếng Việt (AC5).
- **Base path**: Pages phục vụ tại `/dsh-bot-demo-mvp-1/` ⇒ bắt buộc khai `site` + `base` trong `astro.config.mjs`, nếu không CSS/ảnh 404 (vi phạm AC5).

## 3. Danh sách task

Ước lượng thời gian là cho CodeReader; thứ tự là thứ tự thực thi.

### T1 — Khởi tạo dự án Astro + Starlight + Tailwind
- **File tạo**: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`, `.gitignore`, `README.md`
- **Nội dung**: cài Astro + `@astrojs/starlight` + `@astrojs/tailwind` (hoặc Tailwind v4 qua plugin Vite, chốt theo bản Astro hiện hành); khai `site: 'https://001123.github.io'`, `base: '/dsh-bot-demo-mvp-1'`.
- **Test**: `npm run build` PASS; `npm run preview` mở được `http://localhost:4321/dsh-bot-demo-mvp-1/`.
- **Phụ thuộc**: P1–P4.

### T2 — Cấu hình Starlight cho landing (không phải docs)
- **File sửa**: `astro.config.mjs`, `src/content.config.ts` (nếu cần), `src/styles/starlight-overrides.css`
- **Nội dung**: `template: splash`; tắt `pagefind`; ẩn sidebar/pagination/edit link; đặt title "Tết Nguyên đán 2027 — Đinh Mùi"; lang `vi`; theme đỏ–vàng qua biến `--sl-color-accent*` (theo Q2).
- **Test**: build không warning; DOM không còn `<site-search>`, không link `#` rỗng (AC7).
- **Phụ thuộc**: T1.

### T3 — Hero + nội dung theo AC2/AC3
- **File tạo/sửa**: `src/pages/index.mdx` (hoặc `src/content/docs/index.mdx`), `src/components/Hero.astro`, `src/components/ContentBlock.astro`
- **Nội dung**: hero có đủ "Tết Nguyên đán 2027", "Đinh Mùi", "06/02/2027 (thứ Bảy)", "Tất niên 05/02/2027"; ≥3 khối: giới thiệu/ý nghĩa Tết, phong tục, lời chúc Tết — văn bản tiếng Việt thật, không placeholder (theo Q1/Q3).
- **Test**: kiểm tra chuỗi trong HTML build (`grep` trên `dist/`) — AC2, AC3, AC8; không có "Lorem ipsum"/"TODO".
- **Phụ thuộc**: T2.

### T4 — Hình ảnh/minh hoạ + `alt`
- **File tạo**: `public/` (SVG tự vẽ hoặc ảnh có giấy phép), sửa component để chèn ảnh
- **Test**: mọi `<img>` có `alt` tiếng Việt không rỗng; không request 404 (kiểm bằng Playwright network log) — AC5.
- **Phụ thuộc**: T3.

### T5 — Responsive 375px / 1440px
- **File sửa**: `src/styles/global.css`, class Tailwind trong component
- **Test**: Playwright ở 375×812 và 1440×900 — `document.documentElement.scrollWidth <= clientWidth`; chụp screenshot 2 viewport để review — AC4.
- **Phụ thuộc**: T3, T4.

### T6 — Bộ test tự động (bắt buộc, không thủ công)
- **File tạo**: `playwright.config.ts`, `tests/e2e/landing.spec.ts`, `package.json` script `test:e2e`
- **Nội dung test** (map AC):
  - AC1: GET `/` trả 200, không redirect login; chạy bằng context ẩn danh.
  - AC2/AC8: các chuỗi ngày Tết + tiêu đề có trong HTML thô **và** trong DOM.
  - AC3: đếm ≥3 heading khối nội dung; không khớp regex `Lorem ipsum|TODO`.
  - AC4: như T5, 2 viewport.
  - AC5: mọi `img` có `alt` non-empty; không response ≥400 cho ảnh.
  - AC6: gom `console` error + `pageerror` khi tải và sau khi scroll hết trang; assert rỗng.
  - AC7: không có `form`, `input[type=email]`, `iframe` thanh toán; mọi `<a href>` không rỗng và không `=="#"`.
  - AC9: đo `performance.getEntriesByType('navigation')[0].duration < 3000` trên preview local, ghi lại số đo thật vào báo cáo (không assert cứng nếu CI chậm — ghi nhận + đánh giá).
- **Test**: `npx playwright test` PASS trên `npm run preview`.
- **Phụ thuộc**: T3–T5.

### T7 — (chỉ khi Q4 = "có") Đếm ngược tới mùng 1 Tết
- **File tạo**: `src/components/Countdown.astro` (island `client:load`)
- **Nội dung**: tính từ `Date()` phía client tới `2027-02-06T00:00:00+07:00`; **không** gọi API/backend; có fallback text tĩnh khi JS tắt; khi đã qua ngày Tết hiển thị "Chúc mừng năm mới".
- **Test**: Playwright giả lập thời gian (clock API) ở 3 mốc: trước Tết, đúng ngày, sau Tết; console không lỗi ở cả 3 mốc; AC8 vẫn đạt vì phần nội dung chính nằm trong HTML.
- **Phụ thuộc**: AC bổ sung của Analyst đã được Chief push vào spec; T6.

### T8 — README hướng dẫn chạy local
- **File sửa**: `README.md`
- **Nội dung**: yêu cầu Node, `npm install`, `npm run dev`, `npm run build && npm run preview`, cách chạy test; ghi rõ URL preview có base path.
- **Test**: làm theo README trên máy sạch (CodeReader tự chạy lại từng lệnh).
- **Phụ thuộc**: T1, T6.

### T9 — Workflow GitHub Pages (chỉ tạo file; **không** bật deploy)
- **File tạo**: `.github/workflows/deploy-pages.yml`
- **Nội dung**: build Astro rồi upload artifact Pages; trigger `workflow_dispatch` (thủ công) trước, chỉ đổi sang `push: main` nếu user đồng ý.
- **Test**: YAML lint + `act`/dry-run nếu có; **không** chạy deploy.
- **Gate**: chỉ chạy workflow sau chữ **"Duyệt"** ở GATE 2. CodeReader không tự bật Pages, không tự merge, không tự push workflow chạy.

## 4. Test plan tổng hợp (map AC → cách kiểm → ai kiểm)

| AC | Cách kiểm | Tool | Ai chạy |
|---|---|---|---|
| AC1 | GET `/` = 200, ẩn danh, có base path | Playwright + `curl -I` | CODE, ARCH chạy lại |
| AC2 | 4 chuỗi ngày Tết trong HTML thô + DOM | `grep dist/` + Playwright | CODE, ARCH |
| AC3 | ≥3 khối nội dung, không placeholder | Playwright + regex | CODE, ARCH |
| AC4 | 375px & 1440px không cuộn ngang | Playwright viewport + screenshot | CODE, ARCH |
| AC5 | `alt` tiếng Việt, không 404 ảnh | Playwright network + DOM | CODE, ARCH |
| AC6 | console/pageerror rỗng khi tải + scroll | Playwright listener | CODE, ARCH |
| AC7 | không form/input; `<a href>` hợp lệ, không `#` | Playwright DOM query | CODE, ARCH |
| AC8 | nội dung chính có trong HTML trả về | `curl` + Playwright | CODE, ARCH |
| AC9 | navigation duration < 3000ms trên preview local | Playwright performance | CODE ghi số, ARCH đối chiếu |
| AC10 (nếu có, do Q4) | đếm ngược 3 mốc thời gian, không lỗi console | Playwright clock | CODE, ARCH |

Review độc lập của Architect sẽ chạy lại `npm ci && npm run build && npx playwright test` trên đúng commit, không tin báo cáo suông.

## 5. Rủi ro của plan và cách xử lý

| # | Rủi ro | Mức | Cách xử lý |
|---|---|---|---|
| R1 | Starlight thêm UI thừa (search/sidebar) vi phạm AC7 | Trung bình | T2 tắt tường minh; test AC7 bắt được |
| R2 | Tailwind không áp được vào component Starlight ⇒ giao diện lệch, phải viết CSS override | Trung bình | Chấp nhận; override qua `--sl-color-*`; nếu phát sinh nhiều, báo user đổi sang Astro trơn (ADR mới) |
| R3 | Quên `base` ⇒ 404 CSS/ảnh trên Pages | Cao nếu quên | T1 khai ngay; test AC5 trên **đường dẫn có base**, không chỉ localhost gốc |
| R4 | Pages không chạy vì repo còn private | Cao | P2 phải xong trước T9; kiểm bằng `curl -I` URL Pages sau deploy |
| R5 | Q1–Q4 đến muộn hoặc đổi giữa chừng | Trung bình | Không bắt đầu T3 khi thiếu Q1/Q3; nếu đổi sau khi có code thì phải qua gate lại |
| R6 | Bản quyền ảnh (R3 của spec) | Trung bình | Chỉ dùng SVG/CSS tự vẽ hoặc ảnh có giấy phép ghi nguồn trong README |
| R7 | Build Astro/Tailwind lệch phiên bản (Tailwind v4 vs v3) | Thấp | Chốt 1 phiên bản trong `package.json`, commit lockfile |

## 6. Câu hỏi chặn plan (chờ user)

| Mã | Câu hỏi | Ảnh hưởng nếu chưa trả lời |
|---|---|---|
| Q1 | Mục đích trang: (a) chúc Tết cá nhân/tổ chức · (b) thông tin văn hoá · (c) landing chiến dịch/sản phẩm | Nội dung + CTA của T3; (c) cần thêm URL CTA thật |
| Q2 | Thương hiệu/theme: (a) không thương hiệu, đỏ–vàng · (b) logo + bảng màu riêng · (c) chỉ tên đơn vị, giữ đỏ–vàng | Cấu hình theme T2, asset T4 |
| Q3 | Nguồn nội dung: (a) team viết mẫu · (b) user gửi text · (c) user gửi text + ảnh | Ai viết nội dung T3; (c) cần xử lý ảnh + bản quyền |
| Q4 | Đếm ngược tới mùng 1 Tết: có / không | Có ⇒ bật T7 + Analyst bổ sung AC trước |
| Q6 | Deadline mong muốn | Thứ tự task (hiện đang xếp T1→T9) |
| Q7 | Ngày hiển thị: chỉ dương lịch hay thêm âm lịch ("Mùng 1 tháng Giêng") | 1 chuỗi trong hero |
| Q8 | Trình duyệt tối thiểu | Cấu hình target build (mặc định: Chrome/Safari/Firefox 2 bản gần nhất) |

## 7. Rollback

- Chưa deploy ⇒ rollback = không merge/không bật Pages; xoá branch.
- Sau khi deploy: Pages giữ bản build trước đó ⇒ rollback = revert commit trên `main` rồi chạy lại workflow deploy; ghi rõ trong GATE 2.
- Không có DB/migration ⇒ không có rollback dữ liệu.

## 8. Khi nào plan này được coi là CHỐT

Khi có đủ: (1) user trả lời Q1–Q4, (2) user duyệt thay đổi phạm vi deploy (P3), (3) user duyệt plan ở GATE 1c (P4) — lúc đó Architect thêm label `arch-approved` vào Issue #1 và CodeReader bắt đầu T1.
