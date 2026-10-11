# Plan — Landing page Tết Âm lịch 2027 (Đinh Mùi) · Issue #1

- Trạng thái: **APPROVED — GATE 1c đã qua** (nguồn: user gõ **"Duyệt"**, group chat "Demo MVP 1", 2026-10-11 — **ngày** đọc trực tiếp từ log group; **mốc giờ 09:12 UTC do Architect cấp, Chief chưa xác minh được giờ**). Hồ sơ duyệt = plan + `docs/content.md` (blob hiện hành **`f750f977`**, user đã xác nhận bản bổ sung âm lịch — xem §0/P6). Baseline: spec `bd3406c` (blob `75ecee11`) + ADR `0002` (`e29cf5b`). Q6/Q7/Q8 đã trả lời ⇒ **không còn câu hỏi mở**
- Người soạn: Architect (ARCH) · Người thực thi: CodeReader (CODE)
- Ngày: 2026-10-11 (bản 10 — chốt **dùng `npm install`**, đóng P7/C7; user xác nhận nội dung Q7; thêm 2 literal bị cấm assert, regex `{X}`, ghi chú hồ sơ content; phần review workflow viết theo trạng thái **đã gỡ**. Bản 9: đóng Q6/Q7/Q8, AC2 mở rộng âm lịch, Q8 = Browserslist `defaults`, favicon T2, AC5 dạng assertion)
- Nguồn gốc file: bản 1 ngày 2026-10-11 (commit `55bf79c`), do Architect soạn. Mọi commit trên repo này hiện cùng một author, **không phân biệt được ai push** — không ảnh hưởng nội dung plan.
- Stack đã chốt: **Astro (SSG, KHÔNG Starlight) + Tailwind CSS**, deploy **GitHub Pages**, repo **public** (ADR 0001 + ADR 0002 `e29cf5b`)
- Baseline spec: `docs/spec.md` trên `main`, commit `bd3406c` (blob `75ecee11`). Lịch sử gần: `dbea4b9` (chi tiết hoá AC10), `5402fc9` (xác nhận lại Q2(a)), `fb4b5f9` (không thêm AC11), `0308272` (Q6/Q7/Q8 — Q7 mở rộng AC2), `bd3406c` (làm rõ cách đọc AC5).

> ✅ **GATE 1c đã qua** (user gõ "Duyệt", group chat "Demo MVP 1", 2026-10-11). Hồ sơ duyệt = plan + `docs/content.md`; blob duyệt ban đầu `7d21a4d7`, nay **`f750f977`** (bổ sung chuỗi âm lịch theo Q7 — **user đã xác nhận** ngày 2026-10-11). Issue #1 đã có label `arch-approved`. Deploy thật vẫn **chỉ** sau chữ "Duyệt" ở GATE 2.

## 0. Điều kiện tiên quyết (phải xong trước khi implement)

| # | Điều kiện | Ai làm | Trạng thái |
|---|---|---|---|
| P1 | User trả lời **Q6, Q7, Q8** | user | ✅ xong — Q6 "q6 trong hôm nay, asap"; Q7 "q7 cả 2"; Q8 "q8, theo theo browserlist default thôi" (group chat "Demo MVP 1", 2026-10-11) |
| P2 | ~~Repo public~~ | user | ✅ xong — ADR 0002: `private: false`, `visibility: "public"` |
| P3 | ~~Chốt đổi phạm vi~~ | Chief/user | ✅ xong — GitHub Pages + AC10 vào in-scope; user duyệt ở GATE 1c |
| P4 | User duyệt plan ở GATE 1c | user | ✅ xong — "Duyệt", group chat "Demo MVP 1", 2026-10-11 |
| P5 | Deploy thật chỉ sau chữ **"Duyệt"** ở GATE 2 (`has_pages` = `false`) | user | ⏳ chờ |
| P6 | User duyệt `docs/content.md` | user | ✅ xong — blob duyệt `7d21a4d7`; **bản bổ sung âm lịch (`6866f0ce` → `f750f977`) đã được user xác nhận** ngày 2026-10-11 (nguyên văn: *"ok cho q7"*) |
| P7 | ~~`package-lock.json`~~ | user | ✅ **ĐÓNG theo quyết định của user** — *"1 dùng npm i"* (2026-10-11): **bỏ lockfile**, acceptance dùng `npm install --include=dev`. Nợ kỹ thuật: dep gián tiếp không ghim (xem R3) |

**Luồng ghi code**: CodeReader chỉ push lên nhánh `feat/*` rồi mở PR vào `main`; **chỉ Chief merge/push `main`**.

**Ghi chú infra — workflow `generate-lockfile.yml` (ĐÃ GỠ)**: commit `7d7e958` từng thêm file này lên `main` (blob `4d722f81`, 2690 byte; `workflow_dispatch`, `permissions: contents: write`), **không ai nhận đã push**. Chief giao Architect review như một artifact hạ tầng. **Kết quả review (Architect, đọc toàn văn file)**:
- **Đạt**: trigger đúng `workflow_dispatch` (không `push`/`schedule`/`pull_request`); `permissions: contents: write` là mức tối thiểu để push (các quyền khác = none); **không** đụng Pages/deploy; chỉ `git add package-lock.json`.
- **Chưa đạt 1 — chốt chặn default branch không thực thi được**: guard so **chuỗi** (`[ "$TARGET" = "$DEFAULT" ]`); nhập `refs/heads/main` ⇒ không bằng `main` ⇒ guard cho qua ⇒ `git push origin HEAD:refs/heads/main` ghi thẳng `main`. (Phân tích từ mã; **không** chạy thử lên `main`.)
- **Chưa đạt 2 — token ghi nằm trong môi trường chạy code của repo**: job chạy `npm ci`/`npm run build` trong khi giữ `contents: write`; ai push được lên nhánh `feat/*` có thể đặt script trong `package.json`/dependency rồi dispatch ⇒ script chạy với token ghi, không bị rào "chỉ commit một file" hạn chế.
- **Quyết định**: Chief **đã gỡ** file khỏi `main` (commit `20a8522`) và khỏi nhánh `feat/t1-scaffold` (commit `d37a126`). Phương án thay thế nếu sau này cần lại: `permissions: contents: read` + `actions/upload-artifact` rồi **người** tải về commit (không có token ghi trong CI), và/hoặc bật **branch protection/ruleset cho `main`** — lớp này giải quyết gốc câu hỏi "ai ghi main".

P1 đã xong ⇒ **không còn câu hỏi mở**. **T7 BẬT** (Q4 = có) map vào **AC10**. **T3 không chờ gì** (chuỗi âm lịch đã có trong `docs/content.md`).

## 1. Phạm vi và thay đổi phạm vi

- **Deploy URL công khai (GitHub Pages) là in-scope** (user chốt Q5); **chạy deploy thật** vẫn thuộc GATE 2.
- **AC10 (đếm ngược)** — tiêu chí mới sau baseline GATE 1a, user đã yêu cầu và duyệt ở GATE 1c.
- **AC2 mở rộng sau GATE 1c theo yêu cầu trực tiếp của user (Q7 = "cả 2")**: hero hiển thị **cả dương lịch và âm lịch**; chuỗi âm lịch là **nguyên văn trong `docs/content.md` mục Hero** (`mùng 1 tháng Giêng năm Đinh Mùi`). Bản content bổ sung này **đã được user xác nhận** (*"ok cho q7"*, 2026-10-11) ⇒ hồ sơ khép kín.
- **AC11: KHÔNG THÊM** — user gõ *"ac11 chưa cần"* (group chat, 2026-10-11). Không có tiêu chí/test tương phản; theme đỏ–vàng (Q2a) kiểm bằng mắt.
- **Lockfile: KHÔNG dùng** — user chốt *"1 dùng npm i"* (2026-10-11). Acceptance dùng `npm install --include=dev`; không có `package-lock.json` trong repo; không có automation ghi tự động.
- Repo **đã public** ⇒ **không** đưa secret/token vào repo.
- Chủ đề trang **"Tết 2027 Happier"**; hero là **lời chúc Tết** (Q1a), **không CTA ra ngoài**; link (nếu có) phải là URL thật (AC7 cấm `#` rỗng).
- Theme **đỏ–vàng truyền thống**, không logo/bảng màu riêng (Q2a, đã xác nhận lại "ĐÚNG").
- Nội dung do **team viết bản mẫu tiếng Việt** (Q3a), đã duyệt ở GATE 1c.

## 2. Kiến trúc dự kiến

- **Astro SSG (không Starlight)** render HTML tĩnh; 1 route `/` ⇒ AC1, AC8. Không `template: splash`, không `pagefind`, không sidebar.
- **Tailwind CSS** cho toàn bộ page/component; không cần override `--sl-color-*`.
- **Theme đỏ–vàng** qua config Tailwind + `src/styles/global.css`. Đã kiểm chứng ở T1: palette nạp qua `@config` **không** sinh biến `--color-tet-*` — Tailwind v4 nội suy thẳng giá trị vào utility. Mặc định **chỉ dùng utility class**, không thêm `@theme`.
- **Đếm ngược (AC10)**: island `client:load`, mốc cố định **`2027-02-06T00:00:00+07:00`**; **không** API/backend; fallback `<noscript>`; console sạch trước và sau khi cập nhật.
- **JS tối thiểu**: chỉ island đếm ngược.
- **Assets**: SVG/CSS tự vẽ hoặc ảnh có giấy phép — **không ảnh ngoài** (R3). Mọi `<img>` phải có `alt` tiếng Việt (AC5). Icon/favicon: `<link rel="icon">` **SVG tự vẽ**, `href` **qua base path**.
- **Base path**: Pages phục vụ tại `/dsh-bot-demo-mvp-1/` ⇒ bắt buộc `site: 'https://001123.github.io'`, `base: '/dsh-bot-demo-mvp-1'`; quên ⇒ 404 ⇒ vi phạm AC5.
- **Cài đặt**: `npm install --include=dev` (host có `NODE_ENV=production` nên `npm install` trần bỏ qua devDependencies ⇒ thiếu `tailwindcss` ⇒ build fail).

## 3. Danh sách task

### T1 — Khởi tạo dự án Astro + Tailwind
- **File tạo**: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`, `.gitignore`, `README.md`
- **Nội dung**: cài Astro + Tailwind, pin phiên bản; khai `site` + `base`.
- **Test (theo quyết định của user)**: **`npm install --include=dev && npm run build`** PASS; `npm run preview` mở được `http://localhost:4321/dsh-bot-demo-mvp-1/`.
- **Phụ thuộc**: P4 (đã xong). Không còn phụ thuộc P7 — P7 **đóng** theo quyết định bỏ lockfile.
- **Trạng thái**: code hoàn tất trên nhánh `feat/t1-scaffold`; **điều kiện đóng duy nhất còn lại** là chạy lại acceptance **`npm install --include=dev && npm run build`** (không cần `npm ci`) rồi báo kết quả. Không có lỗi kỹ thuật nào trong 8 file T1.
- **Lưu ý kỹ thuật đã kiểm chứng**: `npm ci` **không dùng được** ở repo này (không có lockfile, và `NODE_ENV=production` bỏ qua devDeps); lệnh đúng là `npm install --include=dev`.

### T2 — Layout + theme đỏ–vàng
- **File tạo**: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `public/favicon.svg`
- **Nội dung**: `<html lang="vi">`, title/description, palette đỏ–vàng, footer; không sidebar/search/theme switch. `<link rel="icon">` trỏ **qua base path**, favicon **SVG tự vẽ**.
- **Test**: build không warning; không `<form>`, không `<a href="#">` (AC7); `curl` favicon theo base = **200**; kiểm bằng Playwright xem còn request `/favicon.ico` không (ghi số liệu, không tự kết luận).
- **Phụ thuộc**: T1. **Trạng thái**: XONG trên nhánh (`1d697c7` + `246a273`).

### T3 — Hero là lời chúc Tết + 3 khối nội dung (AC2, AC3, AC8)
- **File tạo/sửa**: `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/ContentBlock.astro`, `src/content/site.ts`
- **Nội dung**: hero render **nguyên văn** các chuỗi mục Hero của `docs/content.md` (blob **`f750f977`**) + lời chúc Tết (Q1a), **không CTA ra ngoài**; ≥3 khối có tiêu đề + đoạn văn tiếng Việt thật, không placeholder (Q3a).
- **Nguồn nội dung (bắt buộc)**: `docs/content.md` là **nguồn duy nhất** cho mọi chuỗi tiếng Việt hiển thị; CodeReader **không được tự sáng tác**. Muốn sửa nội dung ⇒ Analyst soạn → Chief push.
- **Chống trôi nội dung**: mỗi đoạn text phải copy **nguyên văn** từ content.md (sai khác chỉ ở khoảng trắng/xuống dòng).
- **Test**: trên `dist/` (**HTML thô**) **và** **DOM**: assert các chuỗi nguyên văn của mục Hero — `Tết 2027 Happier`, `Tết Nguyên đán Đinh Mùi 2027`, `06/02/2027`, `05/02/2027`, **`tháng Giêng năm Đinh Mùi`** (chuỗi neo AC2, **không** phụ thuộc hoa/thường), `Tất niên`; không khớp `Lorem ipsum|TODO`; mọi chuỗi hiển thị phải là chuỗi con của content.md — AC2/AC3/AC8.
- **Hai literal KHÔNG được dùng để assert**:
  1. `Tất niên 05/02/2027` — **không tồn tại** trong content.md (chỉ có `Tất niên: thứ Sáu, 05/02/2027`).
  2. `Tết Nguyên đán 2027` **trong phạm vi hero** — hero chỉ có `Tết Nguyên đán Đinh Mùi 2027`; chuỗi ngắn chỉ nằm ở **Khối 1**, nên pass ở phạm vi cả trang nhưng **fail** nếu assert trong hero.
- **Assert trên text đã decode**: dùng **DOM visible text**, **không** so raw HTML — Astro render `"` thành `&quot;` (3 câu lời chúc), so raw sẽ **fail giả**.
- **Phụ thuộc**: T2 (P6 đã xong; chuỗi âm lịch đã có). **Trạng thái**: XONG trên nhánh (`e2d179ca`).

### T4 — Hình ảnh/minh hoạ + `alt` (AC5)
- **File tạo**: `public/` (SVG tự vẽ / ảnh có giấy phép — **không ảnh ngoài**)
- **AC5 đạt khi thoả MỘT trong hai nhánh** (ghi rõ nhánh nào trong báo cáo review):
  - **(a) có ảnh raster**: có **≥1 `<img>`** và **mọi** `<img>` có `alt` tiếng Việt không rỗng; network log không có response ≥400.
  - **(b) không dùng ảnh raster** (CSS/SVG inline): không bắt buộc có `<img>`; báo cáo review **phải ghi nguyên văn**: `AC5 đạt do không dùng ảnh raster`. Vẫn phải quét DOM để chắc không có `<img>` thiếu `alt`/trỏ 404 — nếu có thì rơi về (a).
- **Bắt buộc dù nhánh nào**: không ảnh vỡ, không icon 404, không tham chiếu file không tồn tại — đọc theo làm rõ ở spec `bd3406c`: chỉ tính tài nguyên **trang tham chiếu**.
- **Test**: Playwright network log không có response ≥400 cho tài nguyên trang tham chiếu; DOM query `<img>` + `alt`; ghi nhánh (a)/(b).
- **Phụ thuộc**: T3. **Trạng thái**: XONG trên nhánh (`1803ca0`) — nhánh **(b)**, 0 `<img>`, SVG inline, các URL trang tự tham chiếu < 400.

### T5 — Responsive 375 / 1440 (AC4)
- **File sửa**: `src/styles/global.css`, class Tailwind
- **Test**: Playwright ở 375×812 và 1440×900: `scrollWidth <= clientWidth`; lưu screenshot 2 viewport.
- **Phụ thuộc**: T3, T4. **Trạng thái**: đang làm (deadline hôm nay).

### T6 — Bộ test tự động (map AC1–AC10)
- **File tạo**: `playwright.config.ts`, `tests/e2e/landing.spec.ts`, `tests/e2e/countdown.spec.ts`, script `test:e2e`
- **Nội dung**:
  - AC1: GET `/dsh-bot-demo-mvp-1/` = 200, context ẩn danh, không redirect login.
  - AC2/AC8: các chuỗi nguyên văn mục Hero (xem T3) — gồm chuỗi neo `tháng Giêng năm Đinh Mùi` — trong HTML thô **và** trong DOM; **không** dùng hai literal bị loại ở T3; assert trên **text đã decode**.
  - AC3: ≥3 khối nội dung; không placeholder.
  - AC4: 2 viewport như T5.
  - AC5: (a) mọi `<img>` có `alt` tiếng Việt không rỗng; (b) mọi URL **trang tham chiếu** trả **< 400**, chạy **trên đường dẫn có base**; (c) loại trừ đích danh `/favicon.ico` (khi không khai báo icon) và `/robots.txt`. **Không** nới thành "bỏ qua 404".
  - AC6: gom `console` error + `pageerror` khi tải **và** sau khi scroll hết trang; assert rỗng.
  - AC7: không `form`/`input[type=email]`/iframe thanh toán; `<a href>` không rỗng, không `"#"`.
  - AC9: `performance.getEntriesByType('navigation')[0].duration < 3000` trên preview local — **ghi số đo thật**.
  - AC10: xem T7 (`countdown.spec.ts`).
  - **Không có test AC11** (user đã chốt không thêm).
- **Test**: `npx playwright test` PASS trên `npm run preview`; giữ **mặc định** Playwright (Q8 = Browserslist `defaults`).
- **Phụ thuộc**: T3–T5, T7.

### T7 — Đếm ngược tới mùng 1 Tết (BẮT BUỘC · AC10)
- **File tạo**: `src/components/Countdown.astro` (island `client:load`)
- **Nội dung**: mốc **`2027-02-06T00:00:00+07:00`** (UTC+7 cố định, **không** phụ thuộc timezone máy người xem); **không** API/backend; nhãn theo `docs/content.md`: `"Còn {X} ngày nữa là đến mùng 1 Tết"` — **assert bằng regex** `/Còn \d+ ngày nữa là đến mùng 1 Tết/` (vì `{X}` là chỗ điền số, không phải literal); `X` = số ngày **làm tròn LÊN** (23:59:59 05/02/2027 ⇒ "còn 1 ngày"); **qua mốc thì dừng tick** và đổi sang `"Chúc Mừng Năm Mới"`, **không** số âm; fallback `<noscript>`: `"Mùng 1 tháng Giêng năm Đinh Mùi — thứ Bảy, 06/02/2027 (dương lịch)"`, giữ độ cao để không vỡ layout 375px (AC4).
- **Test**: Playwright `clock` ở **4 thời điểm** + console sạch ở cả 4: (1) 2027-01-20; (2) 05/02/2027 23:59:59+07 ⇒ "còn 1 ngày"; (3) 06/02/2027 00:00:01+07 ⇒ "Chúc Mừng Năm Mới", không số âm; (4) 2027-02-10. Thêm case `javaScriptEnabled: false` để kiểm fallback. Q8 = Browserslist `defaults` ⇒ giữ mặc định.
- **Phụ thuộc**: AC10 trong spec `bd3406c`; T6.

### T8 — README
- **File sửa**: `README.md`
- **Nội dung**: Node, **`npm install --include=dev`** (không dùng `npm ci` — không có lockfile và `NODE_ENV=production` bỏ qua devDeps), `npm run dev`, `npm run build && npm run preview`, chạy test, URL preview có base path, nguồn/giấy phép ảnh.
- **Test**: CodeReader chạy lại từng lệnh.
- **Phụ thuộc**: T1, T6.

### T9 — Workflow GitHub Pages (chỉ tạo file, **không** bật deploy)
- **File tạo**: `.github/workflows/deploy-pages.yml`
- **Nội dung**: build Astro → upload artifact Pages; trigger `workflow_dispatch` trước; chỉ đổi `push: main` nếu user đồng ý.
- **Test**: lint YAML / dry-run nếu có; **không** chạy deploy, không bật Pages.
- **Gate**: `has_pages` = `false`; chỉ bật/chạy sau chữ **"Duyệt"** ở GATE 2. File **phải qua Architect review trước khi lên `main`** (R10).

## 4. Test plan tổng hợp

| AC | Cách kiểm | Tool | Ai chạy |
|---|---|---|---|
| AC1 | GET trang = 200, ẩn danh, có base path | Playwright + `curl -I` | CODE, ARCH |
| AC2 | chuỗi nguyên văn mục Hero (gồm chuỗi neo `tháng Giêng năm Đinh Mùi`) trong HTML thô + DOM; text đã decode; không dùng 2 literal bị cấm | `grep dist/` + Playwright | CODE, ARCH |
| AC3 | ≥3 khối nội dung, không placeholder | Playwright + regex | CODE, ARCH |
| AC4 | 375/1440 không cuộn ngang | Playwright viewport + screenshot | CODE, ARCH |
| AC5 | nhánh (a) hoặc (b) ghi rõ trong báo cáo; mọi URL trang tham chiếu < 400 trên đường dẫn có base; loại trừ đích danh `/favicon.ico` + `/robots.txt` | Playwright network + DOM | CODE, ARCH |
| AC6 | console/pageerror rỗng khi tải + scroll | Playwright listener | CODE, ARCH |
| AC7 | không form/input; `<a href>` hợp lệ | Playwright DOM query | CODE, ARCH |
| AC8 | nội dung chính có trong HTML trả về | `curl` + Playwright | CODE, ARCH |
| AC9 | navigation duration < 3000ms, ghi số thật | Playwright performance | CODE ghi số, ARCH đối chiếu |
| AC10 | 4 mốc + làm tròn lên + dừng tick; console sạch cả 4; case tắt JS | Playwright clock + `javaScriptEnabled: false` | CODE, ARCH |

Review độc lập của Architect: chạy lại **`npm install --include=dev && npm run build && npx playwright test`** trên **đúng commit**, không tin báo cáo mô tả.

## 5. Rủi ro của plan và cách xử lý

| # | Rủi ro | Mức | Cách xử lý |
|---|---|---|---|
| R1 | Quên `base` ⇒ 404 CSS/ảnh/favicon | Cao nếu quên | T1 khai ngay; AC5 test trên đường dẫn **có base** |
| R2 | Đếm ngược làm JS phình, ảnh hưởng AC9/AC6 | Trung bình | 1 island nhỏ; đo AC9 thật; fallback khi tắt JS |
| R3 | **Không có lockfile** (theo quyết định user) ⇒ dep gián tiếp không ghim, build có thể lệch giữa các máy | Trung bình | 3 dep trực tiếp **pin tuyệt đối** (astro, tailwindcss, @tailwindcss/vite); ghi nợ kỹ thuật trong README; nếu sau này cần tái lập chính xác thì sinh lockfile ngoài CI (ví dụ user chạy `npm install` một lần ở máy) |
| R4 | Bản quyền ảnh | Trung bình | Chỉ SVG/CSS tự vẽ hoặc ảnh có giấy phép ghi nguồn |
| R5 | Thay đổi phạm vi sau baseline (AC10, AC2 mở rộng, deploy công khai) | Trung bình | Spec ghi rõ (`0308272`, `bd3406c`); user đã duyệt GATE 1c; nếu user phủ nhận ⇒ revert phần tương ứng |
| R6 | ~~Q6/Q7/Q8 đến muộn~~ — đã đóng 2026-10-11 | Thấp | Không còn hàng chờ |
| R7 | Deploy bị kích hoạt sớm | Cao về quy trình | T9 chỉ tạo file; chạy workflow chỉ sau "Duyệt" ở GATE 2 |
| R8 | File trong workspace bị tác nhân khác ghi đè | Trung bình | Chốt bản trên `main`; đọc SHA mới nhất trước khi ghi; mỗi file một chủ |
| R9 | Nội dung trôi lệch so với `docs/content.md` | Trung bình | T3 ghi nguồn duy nhất; test đối chiếu mọi chuỗi; sửa nội dung phải qua Analyst + Chief |
| R10 | Automation **ghi được vào repo** lọt lên `main` mà không qua gate (đã xảy ra: `7d7e958`, **đã gỡ**) | Cao về quy trình | Mọi file `.github/workflows/*` **phải qua Architect review trước khi lên `main`**; guard chặn ghi phải là **whitelist**, không so chuỗi; automation một lần thì xoá ngay; cân nhắc **branch protection cho `main`** |
| R11 | ~~Lockfile thiếu ⇒ `npm ci` fail~~ | — | **Đã xử lý bằng quyết định của user**: bỏ lockfile, dùng `npm install --include=dev`; ghi nợ ở R3 |

## 6. Việc cần chốt (chờ user/Chief)

| # | Việc | Ai chốt | Ảnh hưởng |
|---|---|---|---|
| C1 | ~~Q7~~ — ĐÓNG: user chọn **"cả 2"**; spec `0308272` mở rộng AC2 | user | Chuỗi âm lịch đã có, T3 chạy |
| C2 | ~~Q2 làm rõ~~ — ĐÓNG: user xác nhận **"ĐÚNG"** cho Q2(a) | user | Hero/footer không thêm tên riêng |
| C3 | ~~Đánh số AC~~ — xong: AC10 = đếm ngược | Chief | Hết xung đột |
| C4 | ~~Q6~~ — ĐÓNG: deadline **trong hôm nay, ASAP** | user | Ưu tiên bản chạy được hôm nay |
| C5 | ~~Q8~~ — ĐÓNG: Browserslist **`defaults`** | user | Không cấu hình riêng; Playwright giữ mặc định |
| C6 | ~~AC11~~ — ĐÓNG: **KHÔNG THÊM** (*"ac11 chưa cần"*) | user | Không có test tương phản |
| C7 | ~~Workflow `generate-lockfile.yml`~~ — ĐÓNG: **ĐÃ GỠ** khỏi `main` (`20a8522`) và khỏi nhánh (`d37a126`); kèm **P7** đóng theo quyết định *"dùng npm i"* | user + Chief | T1 có thể đóng sau khi chạy acceptance mới |

## 7. Rollback

- Chưa deploy ⇒ rollback = không merge, xoá branch, không bật Pages. (Đã dùng một lần: gỡ workflow lockfile ở `20a8522`.)
- Sau deploy ⇒ Pages giữ bản build trước; rollback = revert commit trên `main` rồi chạy lại workflow Pages.
- Không DB/migration ⇒ không có rollback dữ liệu.

## 8. Khi nào plan này được coi là CHỐT

**ĐÃ CHỐT ở GATE 1c** (2026-10-11, user gõ "Duyệt"): P4 + P6 xong; Issue #1 có label `arch-approved`; CodeReader bắt đầu T1.

**Q6/Q7/Q8 đã trả lời; user đã xác nhận bản content bổ sung âm lịch (`ok cho q7`); user đã chốt bỏ lockfile (`1 dùng npm i`)** ⇒ P1, P6, P7, C1–C7 đều đóng. **Không còn việc chờ user/Chief ở tầng plan.** Việc còn lại thuần thi công: T1 **đóng** sau khi chạy lại acceptance `npm install --include=dev && npm run build`; T5, T6, T7, T9 còn lại. Deploy thật vẫn phải chờ chữ **"Duyệt"** ở GATE 2 (P5).
