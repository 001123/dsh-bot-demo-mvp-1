# Plan — Landing page Tết Âm lịch 2027 (Đinh Mùi) · Issue #1

- Trạng thái: **APPROVED — GATE 1c đã qua** (nguồn: user gõ **"Duyệt"**, group chat "Demo MVP 1", 2026-10-11 — **ngày** đọc trực tiếp từ log group; **mốc giờ 09:12 UTC do Architect cấp, Chief chưa xác minh được giờ**). Hồ sơ duyệt = plan bản này + `docs/content.md` (blob `6866f0ce`, bản mới nhất sau khi bổ sung chuỗi âm lịch). Baseline: spec `bd3406c` (blob `75ecee11`) + ADR `0002` (`e29cf5b`: bỏ Starlight, repo public). Q6/Q7/Q8 **đã có đáp án** (2026-10-11) ⇒ **không còn câu hỏi mở**
- Người soạn: Architect (ARCH) · Người thực thi: CodeReader (CODE)
- Ngày: 2026-10-11 (bản 9 — đóng Q6/Q7/Q8 ở §0, mở rộng AC2 theo Q7 = "cả 2" (âm lịch), đổi target trình duyệt sang Browserslist `defaults`, ghi yêu cầu favicon ở T2 + dạng assertion AC5 ở T6, ghi chú infra workflow lockfile. **Chief chỉnh khi push**: cập nhật blob `docs/content.md` → `6866f0ce` (chuỗi âm lịch đã có, T3 hết chờ), sửa chuỗi fallback `<noscript>` ở T7 theo content mới, ghi nhận **đã gỡ** workflow lockfile khỏi `main`)
- Nguồn gốc file: bản 1 ngày 2026-10-11 (commit `55bf79c`), do Architect soạn. Ghi chú cũ trong bản 2 về "ai viết file" đã được gỡ; mọi commit trên repo này hiện cùng một author, **không phân biệt được ai push** — việc này không ảnh hưởng nội dung plan.
- Stack đã chốt: **Astro (SSG, KHÔNG Starlight) + Tailwind CSS**, deploy **GitHub Pages**, repo **public** (ADR 0001 + ADR 0002 `e29cf5b`)
- Baseline spec: `docs/spec.md` trên `main`, commit `bd3406c` (blob `75ecee11`). Lịch sử gần: `dbea4b9` (chi tiết hoá AC10), `5402fc9` (xác nhận lại Q2(a)), `fb4b5f9` (chốt không thêm AC11), `0308272` (Q6/Q7/Q8 — **Q7 mở rộng AC2**: hero hiển thị cả âm lịch), `bd3406c` (làm rõ cách đọc AC5: ảnh/icon **trang tham chiếu**).

> ✅ **GATE 1c đã qua** (user gõ "Duyệt", group chat "Demo MVP 1", 2026-10-11). Plan + `docs/content.md` (blob `6866f0ce`) là hai căn cứ implement. Issue #1 đã có label `arch-approved`. Deploy thật vẫn **chỉ** sau chữ "Duyệt" ở GATE 2.

## 0. Điều kiện tiên quyết (phải xong trước khi implement)

| # | Điều kiện | Ai làm | Trạng thái |
|---|---|---|---|
| P1 | User trả lời **Q6, Q7, Q8** (deadline, âm lịch, trình duyệt) | user | ✅ xong — Q6 "q6 trong hôm nay, asap"; Q7 "q7 cả 2"; Q8 "q8, theo theo browserlist default thôi" (user, group chat "Demo MVP 1", 2026-10-11) |
| P2 | ~~Repo public~~ — **đã xong**: ADR 0002 ghi repo `private: false`, `visibility: "public"` | user | ✅ xong |
| P3 | ~~Chốt đổi phạm vi~~ — **đã xong**: spec đưa GitHub Pages và AC10 vào in-scope; user duyệt ở GATE 1c | Chief/user | ✅ xong |
| P4 | User duyệt plan này ở GATE 1c | user | ✅ xong — "Duyệt", group chat "Demo MVP 1", 2026-10-11 |
| P5 | Deploy thật lên Pages chỉ sau chữ **"Duyệt"** ở GATE 2 (`has_pages` hiện `false`) | user | ⏳ chờ |
| P6 | **User duyệt `docs/content.md` ở GATE 1c** | user | ✅ xong — nội dung đã cập nhật thêm chuỗi âm lịch theo Q7; blob hiện tại `6866f0ce` |
| P7 | **`package-lock.json` có trên nhánh để `npm ci` chạy được** (điều kiện đóng T1) | Chief/user | ⏳ chờ — xem "Ghi chú infra" |

**Luồng ghi code**: CodeReader chỉ push lên nhánh `feat/*` rồi mở PR vào `main`; **chỉ Chief merge/push `main`**. (Nguồn: CodeReader nêu vướng ở T1, Architect chọn phương án nhánh + PR, group chat, 2026-10-11; Chief chốt.)

**Ghi chú infra (2026-10-11 — ĐÃ XỬ LÝ)**: commit `7d7e958` từng thêm `.github/workflows/generate-lockfile.yml` lên `main` (`workflow_dispatch`, `permissions: contents: write`), không ai nhận đã push. Architect review file đó và tìm ra **lỗ hổng thật**: chốt chặn "không ghi vào default branch" chỉ **so chuỗi** (`target_branch != main`) nên vượt được bằng `refs/heads/main`, `Main`, hay thêm khoảng trắng ⇒ bảo đảm nó tuyên bố **không thực thi được**. **Chief đã gỡ file khỏi `main`** (commit `20a8522`). Lockfile sẽ lấy bằng đường khác (P7). Bài học thành luật: mọi file `.github/workflows/*` phải qua Architect review **trước khi** lên `main` (xem R10).

P1 đã xong ⇒ **không còn câu hỏi mở**. **T7 đã BẬT** (Q4 = có) và map vào **AC10**. **T3 nay KHÔNG còn chờ gì**: chuỗi âm lịch đã có trong `docs/content.md` blob `6866f0ce`.

## 1. Phạm vi và thay đổi phạm vi

- **Deploy URL công khai (GitHub Pages) là in-scope** theo spec (user chốt Q5), nhưng **chạy deploy thật** vẫn thuộc GATE 2.
- **AC10 (đồng hồ đếm ngược) là tiêu chí mới thêm sau baseline GATE 1a** — user đã yêu cầu; **đã được user duyệt ở GATE 1c**.
- **AC2 mở rộng sau GATE 1c theo yêu cầu trực tiếp của user (Q7 = "cả 2")**: hero phải hiển thị **cả dương lịch và âm lịch**; chuỗi âm lịch **bắt buộc** là **nguyên văn trong `docs/content.md` (mục Hero)** — hiện là `"Mùng 1 tháng Giêng năm Đinh Mùi"` (blob `6866f0ce`).
- **AC11 (kiểm màu đỏ–vàng, tương phản ≥ 4,5:1): KHÔNG THÊM.** Nguồn: user gõ nguyên văn **"ac11 chưa cần"**, group chat "Demo MVP 1", 2026-10-11 (Architect và Chief đọc trực tiếp từ log group). Plan **không** có tiêu chí AC11, **không** có test tương phản màu; theme đỏ–vàng (Q2a) kiểm **bằng mắt** ở bước review.
- Repo **đã public** (ADR 0002) ⇒ **không** được đưa secret/token vào repo.
- Chủ đề trang: **"Tết 2027 Happier"**; hero là **lời chúc Tết** (Q1a) — **không CTA dẫn ra ngoài**; nếu có link thì phải là URL thật (AC7 cấm `#` rỗng).
- Theme **đỏ–vàng truyền thống**, không logo/bảng màu riêng (Q2a — user xác nhận lại "ĐÚNG" ở group, commit `5402fc9`).
- Nội dung do **team viết bản mẫu tiếng Việt** (Q3a); bản mẫu đã được user duyệt ở GATE 1c.

## 2. Kiến trúc dự kiến

- **Astro SSG (không Starlight)** render HTML tĩnh; 1 route duy nhất `/` ⇒ đạt AC1, AC8.
- **Tailwind CSS** dùng cho toàn bộ page/component; không còn Starlight nên **không cần** override `--sl-color-*`.
- **Theme đỏ–vàng** đặt qua biến trong `src/styles/global.css` + config Tailwind.
  Đã kiểm chứng ở T1: palette trong `tailwind.config.mjs` (nạp qua `@config`) **không** sinh biến `--color-tet-*` — Tailwind v4 nội suy thẳng giá trị vào utility (`.bg-tet-red{background-color:#c8102e}`). CSS tay muốn `var(--color-tet-*)` thì phải thêm khối `@theme` trong `global.css`. Mặc định: **chỉ dùng utility class**, không thêm `@theme`; đổi thì báo Architect.
- **Đếm ngược (AC10)**: island Astro `client:load`, tính từ `Date()` phía client tới **`2027-02-06T00:00:00+07:00`**; **không** gọi API/backend; có text tĩnh thay thế khi tắt JS; console sạch trước và sau khi giá trị cập nhật.
- **JS tối thiểu**: chỉ island đếm ngược, phần còn lại render tĩnh để giữ AC9.
- **Assets**: SVG/CSS tự vẽ hoặc ảnh có giấy phép, đặt trong `public/` — tránh R3. Mọi `<img>` phải có `alt` tiếng Việt (AC5). Icon/favicon: `<link rel="icon">` với **SVG tự vẽ**, `href` **đi qua base path** (T2).
- **Base path**: Pages phục vụ tại `/dsh-bot-demo-mvp-1/` ⇒ bắt buộc khai `site: 'https://001123.github.io'`, `base: '/dsh-bot-demo-mvp-1'` trong `astro.config.mjs`; quên ⇒ CSS/ảnh 404 ⇒ vi phạm AC5.

## 3. Danh sách task

### T1 — Khởi tạo dự án Astro + Tailwind
- **File tạo**: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`, `.gitignore`, `README.md`
- **Nội dung**: cài Astro + Tailwind (pin **một** phiên bản), khai `site` + `base`; pin phiên bản.
- **Test**: `npm ci --include=dev && npm run build` PASS; `npm run preview` mở được `http://localhost:4321/dsh-bot-demo-mvp-1/`.
- **Phụ thuộc**: P4, P7 (để `npm ci` chạy được cần lockfile).
- **Trạng thái**: code hoàn tất trên nhánh `feat/t1-scaffold` (đã gồm T2 + favicon, head `1d697c7`), nhưng **CHƯA đóng**: nhánh **thiếu `package-lock.json`** nên `npm ci` fail (MAJOR-1 của Architect — điều kiện P7). Không có lỗi kỹ thuật nào khác.
- **Lưu ý kỹ thuật đã kiểm chứng**: host có `NODE_ENV=production` ⇒ `npm ci` trần **bỏ qua devDependencies** và fail (`Cannot find module '@tailwindcss/vite'`). Lệnh đúng là **`npm ci --include=dev`** (đã ghi bằng chứng vào `README.md`).

### T2 — Layout + theme đỏ–vàng
- **File tạo**: `src/layouts/BaseLayout.astro`, `src/styles/global.css`, `public/favicon.svg`
- **Nội dung**: `<html lang="vi">`, title/description, palette đỏ–vàng (Q2a), footer đơn giản; không sidebar/search/theme switch. Thêm `<link rel="icon">` trỏ **qua base path**, favicon **SVG tự vẽ — không tải từ internet**.
- **Test**: build không warning; DOM không có `<form>` và không có `<a href="#">` rỗng (AC7); `curl` favicon theo base path = **200**; kiểm bằng Playwright xem khi trang đã khai báo icon thì `/favicon.ico` còn được request không (ghi số liệu, không tự kết luận).
- **Phụ thuộc**: T1.
- **Trạng thái**: **XONG** trên nhánh (`1d697c7`) — `.env*` vào `.gitignore`, `favicon.svg` tự vẽ, `href` qua base, các test đạt.

### T3 — Hero là lời chúc Tết + 3 khối nội dung (AC2, AC3, AC8)
- **File tạo/sửa**: `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/ContentBlock.astro`, `src/content/site.ts`
- **Nội dung**: hero đủ các giá trị dương lịch (`Tết Nguyên đán 2027`, `Đinh Mùi`, `06/02/2027`, `05/02/2027`) + **chuỗi âm lịch** (Q7 = "cả 2") + **lời chúc Tết** theo chủ đề "Tết 2027 Happier", **không CTA ra ngoài** (Q1a); ≥3 khối có tiêu đề + đoạn văn tiếng Việt thật, không placeholder (Q3a).
- **Nguồn nội dung (bắt buộc)**: `docs/content.md` blob **`6866f0ce`** (APPROVED, đã có chuỗi âm lịch) là **nguồn duy nhất** cho mọi chuỗi tiếng Việt hiển thị trên trang. CodeReader **không được tự sáng tác** text ngoài file đó. Muốn thêm/sửa/xoá nội dung ⇒ Analyst soạn → Chief đọc SHA và push `docs/content.md` trước.
- **Map nội dung → vị trí**: Hero ← mục "Hero"; khối 1 ← "Khối 1 — Tết Nguyên đán 2027"; khối 2 ← "Khối 2 — Phong tục ngày Tết"; khối 3 ← "Khối 3 — Lời chúc Tết"; footer ← mục "Footer".
- **Chống trôi nội dung**: mỗi đoạn text trên trang phải copy **nguyên văn** từ `docs/content.md`.
- **Test**: `grep` trên `dist/` thấy đủ các chuỗi **có trong content.md** — `Tết Nguyên đán 2027`, `Đinh Mùi`, `06/02/2027`, `05/02/2027`, **`Mùng 1 tháng Giêng năm Đinh Mùi`** — và **không** grep literal `Tất niên 05/02/2027` (không phải chuỗi con của content.md); không khớp `Lorem ipsum|TODO`; mọi chuỗi hiển thị phải là chuỗi con của content.md; Playwright đọc DOM — AC2/AC3/AC8.
- **Phụ thuộc**: T2. **Không còn chờ content** (chuỗi âm lịch đã có từ blob `6866f0ce`).

### T4 — Hình ảnh/minh hoạ + `alt` (AC5)
- **File tạo**: `public/` (SVG tự vẽ / ảnh có giấy phép — **không dùng ảnh ngoài**)
- **AC5 đạt khi thoả MỘT trong hai nhánh** (ghi rõ nhánh nào trong báo cáo review):
  - **Nhánh (a) — có ảnh raster**: trang có **≥1 `<img>`** và **mọi** `<img>` có `alt` tiếng Việt không rỗng; test `alt` non-empty + network log không có response ≥400.
  - **Nhánh (b) — không dùng ảnh raster** (CSS/SVG inline): không bắt buộc có `<img>`; báo cáo review **phải ghi nguyên văn**: `AC5 đạt do không dùng ảnh raster`. Vẫn phải quét DOM để chắc không có `<img>` thiếu/`alt` rỗng hay trỏ 404 — nếu có thì rơi về nhánh (a).
- **Bắt buộc dù ở nhánh nào**: không ảnh vỡ, không icon 404, không tham chiếu file không tồn tại (đọc theo làm rõ ở spec `bd3406c`: chỉ tính tài nguyên **trang tham chiếu**). Mặc định đi **nhánh (b)**.
- **Test**: Playwright network log không có response ≥400 cho tài nguyên trang tham chiếu; DOM query `<img>` + đọc `alt`; ghi nhánh (a)/(b).
- **Phụ thuộc**: T3.

### T5 — Responsive 375 / 1440 (AC4)
- **File sửa**: `src/styles/global.css`, class Tailwind trong component
- **Test**: Playwright ở 375×812 và 1440×900: `scrollWidth <= clientWidth`; lưu screenshot 2 viewport cho review.
- **Phụ thuộc**: T3, T4.

### T6 — Bộ test tự động (map AC1–AC10)
- **File tạo**: `playwright.config.ts`, `tests/e2e/landing.spec.ts`, `tests/e2e/countdown.spec.ts`, script `test:e2e`
- **Nội dung**:
  - AC1: GET `/dsh-bot-demo-mvp-1/` = 200, context ẩn danh, không redirect login.
  - AC2/AC8: các chuỗi dương lịch + **chuỗi âm lịch** + tiêu đề chủ đề có trong HTML thô **và** trong DOM.
  - AC3: ≥3 khối nội dung; không placeholder.
  - AC4: 2 viewport như T5.
  - AC5: (a) mọi `<img>` có `alt` tiếng Việt không rỗng; (b) mọi URL **trang tham chiếu** (link/script/img/srcset + `url()` trong CSS) trả **< 400**, chạy **trên đường dẫn có base**; (c) loại trừ đích danh `/favicon.ico` (khi trang không khai báo icon) và `/robots.txt`. **Không** được nới thành "bỏ qua 404".
  - AC6: gom `console` error + `pageerror` khi tải **và** sau khi scroll hết trang; assert rỗng.
  - AC7: không `form`/`input[type=email]`/iframe thanh toán; `<a href>` không rỗng, không `"#"`.
  - AC9: `performance.getEntriesByType('navigation')[0].duration < 3000` trên preview local — **ghi số đo thật**.
  - AC10: xem T7 (đặt trong `countdown.spec.ts`).
  - **Không có test AC11** (user đã chốt không thêm).
- **Test**: `npx playwright test` PASS trên `npm run preview`; giữ **mặc định** của Playwright (Q8 = Browserslist `defaults`).
- **Phụ thuộc**: T3–T5, T7.

### T7 — Đếm ngược tới mùng 1 Tết (Q4 = có ⇒ BẮT BUỘC · AC10)
- **File tạo**: `src/components/Countdown.astro` (island `client:load`)
- **Nội dung**: tính từ `Date()` phía client tới **`2027-02-06T00:00:00+07:00`** (giờ VN UTC+7 cố định, **không** phụ thuộc timezone máy người xem); **không** API/backend; nhãn hiển thị **đúng chuỗi trong `docs/content.md`**: `"Còn {X} ngày nữa là đến mùng 1 Tết"`; `X` = số ngày **làm tròn LÊN** (23:59:59 ngày 05/02/2027 ⇒ "còn 1 ngày"); **qua mốc thì dừng tick** và thay nhãn bằng `"Chúc Mừng Năm Mới"`, **không** hiển thị số âm; fallback tĩnh **trong `<noscript>`**: **`"Mùng 1 tháng Giêng năm Đinh Mùi — thứ Bảy, 06/02/2027 (dương lịch)"`** (nguyên văn từ content.md blob `6866f0ce`), không để trống, giữ độ cao để không vỡ layout ở 375px (AC4).
- **Test**: Playwright `clock` ở **4 thời điểm**, assert nội dung đúng ở từng mốc + **console sạch ở cả 4**: (1) trước Tết 2027-01-20; (2) biên dưới 05/02/2027 23:59:59+07 ⇒ "còn 1 ngày"; (3) sau mốc 06/02/2027 00:00:01+07 ⇒ "Chúc Mừng Năm Mới", không số âm; (4) sau Tết 2027-02-10. Thêm case `javaScriptEnabled: false` để kiểm fallback trong `<noscript>`. Mọi chuỗi assert phải copy **nguyên văn** từ `docs/content.md`. Q8 = Browserslist `defaults` ⇒ Playwright giữ mặc định.
- **Phụ thuộc**: AC10 trong spec `bd3406c`; T6.

### T8 — README
- **File sửa**: `README.md`
- **Nội dung**: Node, **`npm ci --include=dev`**, `npm run dev`, `npm run build && npm run preview`, chạy test, URL preview có base path, nguồn/giấy phép ảnh.
- **Test**: CodeReader chạy lại từng lệnh trên máy sạch.
- **Phụ thuộc**: T1, T6.

### T9 — Workflow GitHub Pages (chỉ tạo file, **không** bật deploy)
- **File tạo**: `.github/workflows/deploy-pages.yml`
- **Nội dung**: build Astro → upload artifact Pages; trigger `workflow_dispatch` trước; chỉ đổi sang `push: main` nếu user đồng ý.
- **Test**: lint YAML / dry-run nếu có; **không** chạy deploy, không bật Pages.
- **Gate**: `has_pages` hiện `false`; chỉ bật/chạy sau chữ **"Duyệt"** ở GATE 2. File này **phải qua Architect review trước khi lên `main`** (R10).

## 4. Test plan tổng hợp (map AC → cách kiểm → ai kiểm)

| AC | Cách kiểm | Tool | Ai chạy |
|---|---|---|---|
| AC1 | GET trang = 200, ẩn danh, có base path | Playwright + `curl -I` | CODE, ARCH chạy lại |
| AC2 | chuỗi dương lịch **+ chuỗi âm lịch** trong HTML thô + DOM | `grep dist/` + Playwright | CODE, ARCH |
| AC3 | ≥3 khối nội dung, không placeholder | Playwright + regex | CODE, ARCH |
| AC4 | 375/1440 không cuộn ngang | Playwright viewport + screenshot | CODE, ARCH |
| AC5 | đạt theo T4 (nhánh a hoặc b, báo cáo ghi rõ); mọi URL **trang tham chiếu** < 400 trên đường dẫn **có base**; loại trừ đích danh `/favicon.ico` (khi không khai báo icon) và `/robots.txt` | Playwright network + DOM | CODE, ARCH |
| AC6 | console/pageerror rỗng khi tải + scroll | Playwright listener | CODE, ARCH |
| AC7 | không form/input; `<a href>` hợp lệ | Playwright DOM query | CODE, ARCH |
| AC8 | nội dung chính có trong HTML trả về | `curl` + Playwright | CODE, ARCH |
| AC9 | navigation duration < 3000ms, ghi số thật | Playwright performance | CODE ghi số, ARCH đối chiếu |
| AC10 | 4 mốc thời gian + làm tròn lên + dừng tick; console sạch cả 4; case tắt JS | Playwright clock + `javaScriptEnabled: false` | CODE, ARCH |

Review độc lập của Architect: chạy lại `npm ci --include=dev && npm run build && npx playwright test` trên **đúng commit**, không tin báo cáo suông.

## 5. Rủi ro của plan và cách xử lý

| # | Rủi ro | Mức | Cách xử lý |
|---|---|---|---|
| R1 | Quên `base` ⇒ 404 CSS/ảnh trên Pages | Cao nếu quên | T1 khai ngay; AC5 test trên đường dẫn **có base**; favicon cũng phải qua base |
| R2 | Đếm ngược làm JS phình, ảnh hưởng AC9/AC6 | Trung bình | 1 island nhỏ; đo AC9 thật; fallback khi tắt JS |
| R3 | Lệch phiên bản Astro/Tailwind | Trung bình | Pin + commit lockfile; `npm ci --include=dev` trong CI |
| R4 | Bản quyền ảnh (R3 của spec) | Trung bình | Chỉ SVG/CSS tự vẽ hoặc ảnh có giấy phép ghi nguồn |
| R5 | Thay đổi phạm vi (AC10, AC2 mở rộng, deploy công khai) thêm sau baseline GATE 1a | Trung bình | Spec đã ghi rõ (`0308272`, `bd3406c`); nếu user phủ nhận ⇒ revert phần tương ứng |
| R6 | ~~Q6/Q7/Q8 đến muộn~~ — **đã đóng 2026-10-11** | Thấp | Không còn hàng chờ |
| R7 | Deploy bị kích hoạt sớm | Cao về quy trình | T9 chỉ tạo file; chạy workflow chỉ sau chữ "Duyệt" ở GATE 2 |
| R8 | File trong workspace bị tác nhân khác ghi đè | Trung bình | Chốt bản trên `main` sau mỗi commit; đọc SHA mới nhất trước khi ghi; mỗi file một chủ theo notice |
| R9 | Nội dung trên trang trôi lệch so với `docs/content.md` | Trung bình | T3 ghi nguồn duy nhất = `docs/content.md`; test đối chiếu mọi chuỗi với content.md; sửa nội dung phải qua Analyst + Chief |
| R10 | Automation **ghi được vào repo** lọt lên `main` mà không qua gate (đã xảy ra: `7d7e958`, và **đã bị gỡ** ở `20a8522`) | Cao về quy trình | Mọi file `.github/workflows/*` **phải qua Architect review trước khi lên `main`**; guard chặn ghi phải là **whitelist**, không phải so chuỗi; automation một lần thì xoá ngay sau khi dùng |
| R11 | Lockfile thiếu ⇒ `npm ci` fail, README sai bước đầu | Cao | P7: lấy lockfile bằng đường không automation (user chạy thủ công, hoặc token fine-grained chỉ repo này, thu hồi sau) |

## 6. Việc cần chốt (chờ user/Chief)

| # | Việc | Ai chốt | Ảnh hưởng |
|---|---|---|---|
| C1 | ~~Q7~~ — **ĐÃ ĐÓNG**: user chọn **"cả 2"**; nguyên văn "q7 cả 2"; spec `0308272` mở rộng AC2 | user | Chuỗi âm lịch đã có trong content.md blob `6866f0ce` |
| C2 | ~~Q2 làm rõ~~ — **ĐÃ ĐÓNG**: user xác nhận **"ĐÚNG"** cho Q2(a) | user | Hero/footer **không** thêm tên riêng |
| C3 | ~~Đánh số AC~~ — **đã xong**: spec dùng **AC10** cho đếm ngược | Chief | Hết xung đột số hiệu |
| C4 | ~~Q6~~ — **ĐÃ ĐÓNG**: deadline **trong hôm nay, ASAP**; nguyên văn "q6 trong hôm nay, asap" | user | Ưu tiên bản chạy được hôm nay hơn độ hoàn thiện |
| C5 | ~~Q8~~ — **ĐÃ ĐÓNG**: target = Browserslist **`defaults`**; nguyên văn "q8, theo theo browserlist default thôi" | user | Bỏ mọi câu "Chrome/Safari/Firefox 2 bản gần nhất" |
| C6 | ~~AC11~~ — **ĐÃ ĐÓNG: KHÔNG THÊM.** Nguyên văn "ac11 chưa cần" | user | Không có test tương phản |
| C7 | ~~Workflow `generate-lockfile.yml`~~ — **ĐÃ ĐÓNG: ĐÃ GỠ khỏi `main`** (commit `20a8522`) sau khi Architect tìm ra lỗ hổng ở guard. Còn lại: **P7** (lấy lockfile bằng đường nào — user chạy thủ công, hay token fine-grained chỉ repo này) | user + Chief | Điều kiện đóng T1 |

## 7. Rollback

- Chưa deploy ⇒ rollback = không merge, xoá branch, không bật Pages. (Đã dùng một lần: gỡ workflow lockfile ở `20a8522`.)
- Sau deploy ⇒ Pages giữ bản build trước; rollback = revert commit trên `main` rồi chạy lại workflow Pages.
- Không DB/migration ⇒ không có rollback dữ liệu.

## 8. Khi nào plan này được coi là CHỐT

**ĐÃ CHỐT ở GATE 1c** (2026-10-11, user gõ "Duyệt"): P4 + P6 đều xong. Issue #1 đã có label `arch-approved` và CodeReader bắt đầu T1.

**Q6/Q7/Q8 đã trả lời (2026-10-11) ⇒ P1 xong, C1/C4/C5 đóng — không còn câu hỏi mở.** Hai việc còn treo: **P7/C7** (lockfile — workflow đã gỡ, cần chọn đường lấy lockfile) và **T1 chưa "đóng"** vì thiếu lockfile. Deploy thật vẫn phải chờ chữ **"Duyệt"** ở GATE 2 (P5).
