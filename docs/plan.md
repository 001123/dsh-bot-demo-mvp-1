# Plan — Landing page Tết Âm lịch 2027 (Đinh Mùi) · Issue #1

- Trạng thái: **APPROVED — GATE 1c đã qua** (nguồn: user gõ **"Duyệt"**, group chat "Demo MVP 1", 2026-10-11 — **ngày** đọc trực tiếp từ log group; **mốc giờ 09:12 UTC do Architect cấp, Chief chưa xác minh được giờ**). Hồ sơ duyệt = plan bản này + `docs/content.md` blob `7d21a4d7`. Baseline: spec `fb4b5f9` (blob `87e5c0f6`) + ADR `0002` (`e29cf5b`: bỏ Starlight, repo public)
- Người soạn: Architect (ARCH) · Người thực thi: CodeReader (CODE)
- Ngày: 2026-10-11 (bản 7 — đóng C6 (AC11 không thêm) và C2 (Q2 xác nhận), baseline spec `fb4b5f9`; bản 6: GATE 1c qua, T7 dùng đúng chuỗi `docs/content.md`, chi tiết test T7 theo AC10)
- Nguồn gốc file: bản 1 ngày 2026-10-11 (commit `55bf79c`), do Architect soạn. Ghi chú cũ trong bản 2 về "ai viết file" đã được gỡ; mọi commit trên repo này hiện cùng một author, **không phân biệt được ai push** — việc này không ảnh hưởng nội dung plan.
- Stack đã chốt: **Astro (SSG, KHÔNG Starlight) + Tailwind CSS**, deploy **GitHub Pages**, repo **public** (ADR 0001 + ADR 0002 `e29cf5b`)
- Baseline spec: `docs/spec.md` trên `main`, commit `fb4b5f9` (blob `87e5c0f6`). Lịch sử gần: `dbea4b9` (chi tiết hoá AC10: mốc cố định UTC+7, làm tròn lên, dừng tick sau mốc, fallback `<noscript>`), `5402fc9` (user xác nhận lại Q2(a)), `fb4b5f9` (user chốt **không** thêm AC11).

> ✅ **GATE 1c đã qua** (user gõ "Duyệt", group chat "Demo MVP 1", 2026-10-11). Plan + `docs/content.md` (blob `7d21a4d7`) là hai căn cứ implement. Issue #1 đã có label `arch-approved`. Deploy thật vẫn **chỉ** sau chữ "Duyệt" ở GATE 2.

## 0. Điều kiện tiên quyết (phải xong trước khi implement)

| # | Điều kiện | Ai làm | Trạng thái |
|---|---|---|---|
| P1 | User trả lời **Q6, Q7, Q8** (deadline, âm lịch, trình duyệt). Q1(a), Q2(a), Q3(a), Q4 (có đếm ngược), Q5 đã trả lời | user | 🔶 một phần — còn Q6–Q8 |
| P2 | ~~Repo public~~ — **đã xong**: ADR 0002 ghi repo `private: false`, `visibility: "public"` (Chief xác minh qua API 2026-10-11) | user | ✅ xong |
| P3 | ~~Chốt đổi phạm vi~~ — **đã xong**: spec đưa GitHub Pages và AC10 (đếm ngược) vào in-scope; user đã duyệt chính thức ở GATE 1c | Chief/user | ✅ xong |
| P4 | User duyệt plan này ở GATE 1c | user | ✅ xong — "Duyệt", group chat "Demo MVP 1", 2026-10-11 |
| P5 | Deploy thật lên Pages chỉ sau chữ **"Duyệt"** ở GATE 2 (`has_pages` hiện `false`) | user | ⏳ chờ |
| P6 | **User duyệt `docs/content.md` ở GATE 1c** | user | ✅ xong — content blob `7d21a4d7`, trạng thái APPROVED 2026-10-11 |

Chưa xong P1 (Q6–Q8) thì T1 vẫn có thể bắt đầu, nhưng các mục đánh dấu phụ thuộc P1 phải chờ: **Q7 phải chốt trước T3**, **Q8 phải chốt trước T7**. **T7 đã BẬT** (Q4 = có) và map vào **AC10**.

## 1. Phạm vi và thay đổi phạm vi

- **Deploy URL công khai (GitHub Pages) là in-scope** theo spec (user chốt Q5), nhưng **chạy deploy thật** vẫn thuộc GATE 2.
- **AC10 (đồng hồ đếm ngược) là tiêu chí mới thêm sau baseline GATE 1a** — user đã yêu cầu; **đã được user duyệt ở GATE 1c** cùng plan (2026-10-11).
- **AC11 (AC kiểm màu đỏ–vàng, tương phản ≥ 4,5:1): KHÔNG THÊM — đã có quyết định của user.** Nguồn: user gõ nguyên văn **"ac11 chưa cần"**, group chat "Demo MVP 1", 2026-10-11 (Chief đọc trực tiếp từ log group). Spec `fb4b5f9` (blob `87e5c0f6`) mục 8 ghi rõ "đã có quyết định: không thêm", mục 9 có dòng nguồn. Hệ quả: plan **không** có tiêu chí AC11, **không** có test tương phản màu; theme đỏ–vàng (Q2a) kiểm **bằng mắt** ở bước review. Muốn thêm sau phải qua gate mới.
- Repo **đã public** (ADR 0002) ⇒ source, spec, ADR, plan ai cũng xem được. **Không** được đưa secret/token vào repo.
- Chủ đề trang: **"Tết 2027 Happier"**; hero là **lời chúc Tết** (Q1a) — **không CTA dẫn ra ngoài**; nếu có link thì phải là URL thật (AC7 cấm `#` rỗng).
- Theme **đỏ–vàng truyền thống**, không logo/bảng màu riêng (Q2a — user đã xác nhận lại "ĐÚNG" ở group, commit `5402fc9`).
- Nội dung do **team viết bản mẫu tiếng Việt** (Q3a); bản mẫu đã được user duyệt ở GATE 1c.

## 2. Kiến trúc dự kiến

- **Astro SSG (không Starlight)** render HTML tĩnh; 1 route duy nhất `/` ⇒ đạt AC1, AC8. Không có `template: splash`, không `pagefind`, không sidebar — các phần đó đã bị ADR 0002 bỏ.
- **Tailwind CSS** dùng cho toàn bộ page/component; vì không còn Starlight nên **không cần** override `--sl-color-*`.
- **Theme đỏ–vàng** đặt qua biến trong `src/styles/global.css` + config Tailwind.
- **Đếm ngược (AC10)**: island Astro `client:load`, tính từ `Date()` phía client tới **`2027-02-06T00:00:00+07:00`** (mùng 1 Tết theo giờ VN); **không** gọi API/backend; có text tĩnh thay thế khi tắt JS; console sạch trước và sau khi giá trị cập nhật.
- **JS tối thiểu**: chỉ island đếm ngược, phần còn lại render tĩnh để giữ AC9.
- **Assets**: SVG/CSS tự vẽ hoặc ảnh có giấy phép, đặt trong `public/` — tránh R3 (bản quyền). Mọi `<img>` phải có `alt` tiếng Việt (AC5).
- **Base path**: Pages phục vụ tại `/dsh-bot-demo-mvp-1/` ⇒ bắt buộc khai `site: 'https://001123.github.io'`, `base: '/dsh-bot-demo-mvp-1'` trong `astro.config.mjs`; quên ⇒ CSS/ảnh 404 ⇒ vi phạm AC5.

## 3. Danh sách task

Thứ tự là thứ tự thực thi. (Task cấu hình Starlight của bản 1–2 **đã bỏ** theo ADR 0002.)

### T1 — Khởi tạo dự án Astro + Tailwind
- **File tạo**: `package.json`, `astro.config.mjs`, `tsconfig.json`, `tailwind.config.mjs`, `src/styles/global.css`, `.gitignore`, `README.md`
- **Nội dung**: cài Astro + Tailwind (chốt **một** phiên bản: v4 qua plugin Vite, hoặc v3 + `@astrojs/tailwind`); khai `site` + `base` như mục 2; pin phiên bản.
- **Test**: `npm ci && npm run build` PASS; `npm run preview` mở được `http://localhost:4321/dsh-bot-demo-mvp-1/`.
- **Phụ thuộc**: P1, P4.

### T2 — Layout + theme đỏ–vàng
- **File tạo**: `src/layouts/BaseLayout.astro`, `src/styles/global.css`
- **Nội dung**: `<html lang="vi">`, title/description, palette đỏ–vàng (Q2a), footer đơn giản; không sidebar, không search, không nút đổi theme.
- **Test**: build không warning; DOM không có `<form>` và không có `<a href="#">` rỗng (AC7).
- **Phụ thuộc**: T1.

### T3 — Hero là lời chúc Tết + 3 khối nội dung (AC2, AC3, AC8)
- **File tạo/sửa**: `src/pages/index.astro`, `src/components/Hero.astro`, `src/components/ContentBlock.astro`, `src/content/site.ts`
- **Nội dung**: hero đủ 4 chuỗi ngày Tết ("Tết Nguyên đán 2027", "Đinh Mùi", "06/02/2027 (thứ Bảy)", "Tất niên 05/02/2027") + **lời chúc Tết** theo chủ đề "Tết 2027 Happier", **không CTA ra ngoài** (Q1a); ≥3 khối có tiêu đề + đoạn văn tiếng Việt thật, không placeholder (Q3a).
- **Nguồn nội dung (bắt buộc)**: `docs/content.md` (blob `7d21a4d7`, **APPROVED** 2026-10-11) là **nguồn duy nhất** cho mọi chuỗi tiếng Việt hiển thị trên trang. CodeReader **không được tự sáng tác** text ngoài file đó. Muốn thêm/sửa/xoá nội dung ⇒ Analyst soạn → Chief đọc SHA và push `docs/content.md` trước, rồi plan/task mới đổi theo.
- **Map nội dung → vị trí**: Hero ← mục "Hero" của content.md; khối 1 ← "Khối 1 — Tết Nguyên đán 2027"; khối 2 ← "Khối 2 — Phong tục ngày Tết"; khối 3 ← "Khối 3 — Lời chúc Tết"; footer ← mục "Footer".
- **Chống trôi nội dung**: mỗi đoạn text trên trang phải copy **nguyên văn** từ `docs/content.md` (sai khác chỉ được ở khoảng trắng/xuống dòng). Không diễn giải lại, không "viết cho mượt", không dịch.
- **Test**: `grep` trên `dist/` thấy đủ 4 chuỗi ngày Tết + chuỗi chủ đề; không khớp `Lorem ipsum|TODO`; đối chiếu từng chuỗi hiển thị với `docs/content.md` — mọi chuỗi phải là chuỗi con của content.md; Playwright đọc DOM — AC2/AC3/AC8. **Q7 phải được chốt trước khi làm T3** (nếu user chọn thêm âm lịch, phải là chuỗi có trong `docs/content.md`).
- **Phụ thuộc**: T2 (P6 đã xong 2026-10-11).

### T4 — Hình ảnh/minh hoạ + `alt` (AC5)
- **File tạo**: `public/` (SVG tự vẽ / ảnh có giấy phép — theo `docs/content.md`: **không dùng ảnh ngoài**), chèn vào component nếu có
- **AC5 được coi là đạt khi thoả MỘT trong hai nhánh** (ghi rõ nhánh nào trong báo cáo review):
  - **Nhánh (a) — có ảnh raster** (`<img>` asset nhị phân): trang có **≥1 `<img>`** và **mọi** `<img>` có `alt` tiếng Việt không rỗng, mô tả nội dung ảnh; test `alt` non-empty + network log không có response ≥400.
  - **Nhánh (b) — không dùng ảnh raster** (minh hoạ bằng CSS/SVG inline, `<img>` dùng `src` SVG): không bắt buộc có `<img>`; báo cáo review **phải ghi minh bạch nguyên văn một dòng**: `AC5 đạt do không dùng ảnh raster`. Vẫn phải quét DOM để chắc **không** tồn tại `<img>` nào thiếu/`alt` rỗng hay trỏ file 404 — nếu có thì rơi về nhánh (a).
- **Bắt buộc dù ở nhánh nào**: trang vẫn **không** được có ảnh vỡ, icon 404, hay tham chiếu file không tồn tại (đúng nguyên văn AC5). Vì plan hiện chưa đảm bảo có ảnh raster, plan mặc định đi **nhánh (b)** trừ khi T3 chèn `<img>`; ai đổi sang nhánh (a) phải cập nhật dòng này và báo Architect.
- **Test**: Playwright network log không có response ≥400 cho ảnh; DOM query `<img>` + đọc `alt` (`non-empty`, có ký tự tiếng Việt); ghi nhánh (a)/(b) vào báo cáo review.
- **Phụ thuộc**: T3.

### T5 — Responsive 375 / 1440 (AC4)
- **File sửa**: `src/styles/global.css`, class Tailwind trong component
- **Test**: Playwright ở 375×812 và 1440×900: `scrollWidth <= clientWidth`; lưu screenshot 2 viewport cho review.
- **Phụ thuộc**: T3, T4.

### T6 — Bộ test tự động (map AC1–AC10)
- **File tạo**: `playwright.config.ts`, `tests/e2e/landing.spec.ts`, `tests/e2e/countdown.spec.ts`, script `test:e2e`
- **Nội dung**:
  - AC1: GET `/dsh-bot-demo-mvp-1/` = 200, context ẩn danh, không redirect login.
  - AC2/AC8: 4 chuỗi ngày Tết + tiêu đề chủ đề có trong HTML thô **và** trong DOM.
  - AC3: ≥3 khối nội dung; không placeholder.
  - AC4: 2 viewport như T5.
  - AC5: `alt` non-empty; không ảnh lỗi (chạy trên đường dẫn **có base**).
  - AC6: gom `console` error + `pageerror` khi tải **và** sau khi scroll hết trang; assert rỗng.
  - AC7: không `form`/`input[type=email]`/iframe thanh toán; `<a href>` không rỗng, không `="#"`.
  - AC9: `performance.getEntriesByType('navigation')[0].duration < 3000` trên preview local — **ghi số đo thật**, không assert cứng nếu CI chậm.
  - AC10: xem T7 (đặt trong `countdown.spec.ts`).
  - **Không có test AC11** — user đã chốt không thêm tiêu chí này (`fb4b5f9`).
- **Test**: `npx playwright test` PASS trên `npm run preview`.
- **Phụ thuộc**: T3–T5, T7.

### T7 — Đếm ngược tới mùng 1 Tết (Q4 = có ⇒ BẮT BUỘC · AC10)
- **File tạo**: `src/components/Countdown.astro` (island `client:load`)
- **Nội dung**: tính từ `Date()` phía client tới **`2027-02-06T00:00:00+07:00`** (giờ VN UTC+7 cố định, **không** phụ thuộc timezone máy người xem — AC10); **không** API/backend (spec §5); nhãn hiển thị **đúng chuỗi trong `docs/content.md`**: `"Còn {X} ngày nữa là đến mùng 1 Tết"`; `X` = số ngày **làm tròn LÊN** (23:59:59 ngày 05/02/2027 ⇒ "còn 1 ngày"); **qua mốc thì dừng tick** và thay nhãn bằng `"Chúc Mừng Năm Mới"` (đúng chữ hoa/thường này, khác lời chúc ở Khối 3), **không** hiển thị số âm; fallback tĩnh **trong `<noscript>`**: `"Mùng 1 Tết Đinh Mùi: thứ Bảy, 06/02/2027"`, không để trống, giữ độ cao để không vỡ layout ở 375px (AC4).
- **Test**: Playwright `clock` ở **4 thời điểm**, assert nội dung đúng ở từng mốc + **console sạch ở cả 4** (AC6, AC10): (1) trước Tết 2027-01-20; (2) biên dưới 05/02/2027 23:59:59+07 ⇒ "còn 1 ngày" (làm tròn lên); (3) sau mốc 06/02/2027 00:00:01+07 ⇒ "Chúc Mừng Năm Mới", không số âm; (4) sau Tết 2027-02-10. Thêm case `javaScriptEnabled: false` để kiểm fallback trong `<noscript>`; AC8 vẫn đạt vì nội dung chính nằm trong HTML. Mọi chuỗi assert phải copy **nguyên văn** từ `docs/content.md` (không tự viết). **Q8 phải được chốt trước T7** (mặc định: Chrome/Safari/Firefox 2 bản gần nhất).
- **Phụ thuộc**: AC10 đã chi tiết hoá trong spec `dbea4b9` (blob `81945a86`); T6.

### T8 — README
- **File sửa**: `README.md`
- **Nội dung**: Node, `npm ci`, `npm run dev`, `npm run build && npm run preview`, chạy test, URL preview có base path, nguồn/giấy phép ảnh.
- **Test**: CodeReader chạy lại từng lệnh trên máy sạch.
- **Phụ thuộc**: T1, T6.

### T9 — Workflow GitHub Pages (chỉ tạo file, **không** bật deploy)
- **File tạo**: `.github/workflows/deploy-pages.yml`
- **Nội dung**: build Astro → upload artifact Pages; trigger `workflow_dispatch` trước; chỉ đổi sang `push: main` nếu user đồng ý.
- **Test**: lint YAML / dry-run nếu có; **không** chạy deploy, không bật Pages.
- **Gate**: `has_pages` hiện `false`; chỉ bật/chạy sau chữ **"Duyệt"** ở GATE 2. CodeReader không tự bật Pages, không tự merge.

## 4. Test plan tổng hợp (map AC → cách kiểm → ai kiểm)

| AC | Cách kiểm | Tool | Ai chạy |
|---|---|---|---|
| AC1 | GET trang = 200, ẩn danh, có base path | Playwright + `curl -I` | CODE, ARCH chạy lại |
| AC2 | 4 chuỗi ngày Tết trong HTML thô + DOM | `grep dist/` + Playwright | CODE, ARCH |
| AC3 | ≥3 khối nội dung, không placeholder | Playwright + regex | CODE, ARCH |
| AC4 | 375/1440 không cuộn ngang | Playwright viewport + screenshot | CODE, ARCH |
| AC5 | đạt theo T4: có `<img>` + `alt` tiếng Việt (nhánh a) **hoặc** không dùng ảnh raster (nhánh b, báo cáo ghi rõ); không 404 (trên đường dẫn có base) | Playwright network + DOM | CODE, ARCH |
| AC6 | console/pageerror rỗng khi tải + scroll | Playwright listener | CODE, ARCH |
| AC7 | không form/input; `<a href>` hợp lệ | Playwright DOM query | CODE, ARCH |
| AC8 | nội dung chính có trong HTML trả về | `curl` + Playwright | CODE, ARCH |
| AC9 | navigation duration < 3000ms, ghi số thật | Playwright performance | CODE ghi số, ARCH đối chiếu |
| AC10 | 4 mốc thời gian (trước / biên 23:59:59 / sau mốc 00:00:01 / sau Tết) + làm tròn lên + dừng tick; console sạch cả 4; case tắt JS | Playwright clock + `javaScriptEnabled: false` | CODE, ARCH |

Review độc lập của Architect: chạy lại `npm ci && npm run build && npx playwright test` trên **đúng commit**, không tin báo cáo suông.

## 5. Rủi ro của plan và cách xử lý

| # | Rủi ro | Mức | Cách xử lý |
|---|---|---|---|
| R1 | Quên `base` ⇒ 404 CSS/ảnh trên Pages | Cao nếu quên | T1 khai ngay; AC5 test trên đường dẫn **có base** |
| R2 | Đếm ngược làm JS phình, ảnh hưởng AC9/AC6 | Trung bình | 1 island nhỏ; đo AC9 thật; fallback khi tắt JS |
| R3 | Lệch phiên bản Astro/Tailwind (v4 vs v3) | Trung bình | Pin + commit lockfile; `npm ci` trong CI |
| R4 | Bản quyền ảnh (R3 của spec) | Trung bình | Chỉ SVG/CSS tự vẽ hoặc ảnh có giấy phép ghi nguồn |
| R5 | Thay đổi phạm vi (AC10, deploy công khai) thêm sau baseline GATE 1a | Trung bình | Spec đã ghi rõ và user đã duyệt ở GATE 1c; nếu user phủ nhận ⇒ revert và bỏ T7/AC10 |
| R6 | Q6/Q7/Q8 đến muộn | Thấp | Q6 xếp lại thứ tự; Q7 phải chốt trước T3; Q8 phải chốt trước T7 (mặc định Chrome/Safari/Firefox 2 bản gần nhất) |
| R7 | Deploy bị kích hoạt sớm | Cao về quy trình | T9 chỉ tạo file; chạy workflow chỉ sau chữ "Duyệt" ở GATE 2 |
| R8 | File trong workspace bị tác nhân khác ghi đè | Trung bình | Chốt bản trên `main` sau mỗi commit; đọc SHA mới nhất trước khi ghi; mỗi file một chủ theo notice |
| R9 | Nội dung trên trang trôi lệch so với `docs/content.md`, hoặc CodeReader tự viết text ngoài file | Trung bình | T3 ghi nguồn duy nhất = `docs/content.md`; test đối chiếu mọi chuỗi với content.md; sửa nội dung phải qua Analyst + Chief |

## 6. Việc cần chốt (chờ user/Chief)

| # | Việc | Ai chốt | Ảnh hưởng |
|---|---|---|---|
| C1 | **Q7**: ngày hiển thị chỉ dương lịch hay thêm âm lịch ("Mùng 1 tháng Giêng") | user | 1 chuỗi trong hero (T3) — **phải chốt trước T3** |
| C2 | ~~Q2 làm rõ~~ — **ĐÃ ĐÓNG**: user xác nhận **"ĐÚNG"** cho "không logo, theme đỏ–vàng" (Q2a), group chat "Demo MVP 1", 2026-10-11 (Chief đọc trực tiếp từ log); spec `5402fc9` blob `03a7fe59` ghi nguồn | user | Hero/footer **không** thêm tên riêng |
| C3 | ~~Đánh số AC~~ — **đã xong**: spec dùng **AC10** cho đếm ngược | Chief | Hết xung đột số hiệu |
| C4 | **Q6**: deadline mong muốn | user | Thứ tự task |
| C5 | **Q8**: trình duyệt tối thiểu | user | Target build ở T1 (mặc định: Chrome/Safari/Firefox 2 bản gần nhất) — **phải chốt trước T7** |
| C6 | ~~AC11 (kiểm màu đỏ–vàng, tương phản ≥ 4,5:1)~~ — **ĐÃ ĐÓNG: KHÔNG THÊM.** Nguồn: user gõ nguyên văn **"ac11 chưa cần"**, group chat "Demo MVP 1", 2026-10-11 (Chief đọc trực tiếp từ log); spec `fb4b5f9` blob `87e5c0f6` mục 8 + mục 9 đã ghi | user | Hết treo — không có test tương phản; theme đỏ–vàng kiểm bằng mắt |

## 7. Rollback

- Chưa deploy ⇒ rollback = không merge, xoá branch, không bật Pages.
- Sau deploy ⇒ Pages giữ bản build trước; rollback = revert commit trên `main` rồi chạy lại workflow.
- Không DB/migration ⇒ không có rollback dữ liệu.

## 8. Khi nào plan này được coi là CHỐT

**ĐÃ CHỐT ở GATE 1c** (2026-10-11, user gõ "Duyệt" trong group "Demo MVP 1"): P4 (duyệt plan) + P6 (duyệt `docs/content.md` blob `7d21a4d7`) **đều xong**. Hệ quả: Issue #1 đã có label `arch-approved` và CodeReader bắt đầu T1.

Còn lại **không chặn** implement: P1 (Q6/Q7/Q8 — có thể để mặc định; **Q7 phải chốt trước T3**, **Q8 phải chốt trước T7**). C2 (Q2) **đã đóng** — user xác nhận "ĐÚNG" cho Q2(a). C6 (AC11) **đã đóng: không thêm** (user gõ "ac11 chưa cần"). Deploy thật vẫn phải chờ chữ **"Duyệt"** ở GATE 2 (P5).
