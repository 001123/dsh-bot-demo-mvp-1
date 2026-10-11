# ADR 0001 — Chọn stack cho landing page Tết Đinh Mùi 2027

- Trạng thái: **ACCEPTED — user chốt ở GATE 1b ngày 2026-10-11** (nguyên văn: *"Dùng astro starlight + đẩy lên github pages, fe thì dùng tailwindcss"*)
- Ngày: 2026-10-11
- Người soạn: Architect
- Tham chiếu: `docs/spec.md` (APPROVED, GATE 1a ngày 2026-10-11), repo `001123/dsh-bot-demo-mvp-1`
- Baseline spec: bản trên `main`, commit `79d917c` (blob `165601395fd0f6b017284b5120cf361cdc42f3d2`). Bản workspace (`6654` byte) cũ hơn bản repo (`6727` byte) đúng 2 điểm: thêm dòng metadata "Issue theo dõi" và sửa cross-ref mục 5 từ Q7 → **Q4** (đếm ngược là Q4). AC1–AC9, US1–US3 và phạm vi không đổi.

## 1. Bối cảnh và ràng buộc

Từ spec (đã duyệt), các ràng buộc ảnh hưởng trực tiếp tới việc chọn stack:

| Ràng buộc | Nguồn | Ảnh hưởng tới stack |
|---|---|---|
| 1 trang tĩnh, 1 URL, tiếng Việt | spec §4 | Không cần framework routing/SSR |
| Không backend/API/DB/CMS, không form | spec §5, AC7 | Chỉ cần static hosting |
| Nội dung có trong DOM/HTML khi tải | AC8 | Ưu tiên HTML tĩnh hơn render bằng JS |
| Tải < 3s, không lỗi console | AC9, AC6 | Ít JS/bundle = ít rủi ro |
| Responsive 375px & 1440px, không cuộn ngang | AC4 | CSS media query là đủ |
| Ảnh phải có alt tiếng Việt, không ảnh vỡ | AC5 | Có thể dùng SVG/CSS tự vẽ |
| Hình ảnh có thể vướng bản quyền | R3 | Hạn chế ảnh tải từ internet |
| Có README hướng dẫn chạy local | spec §4 | Lệnh chạy phải đơn giản |
| Là demo để chạy thử quy trình SDLC có gate | spec §1, Q6 | Cần dễ review, dễ test, dễ rollback |
| 1 builder (CodeReader), 1 reviewer (Architect) | bối cảnh đội | Ít công cụ = ít thời gian dựng |

Ghi chú: Q1, Q2, Q3, Q5, Q7, Q8 chưa được trả lời. Trong đó **Q2 (màu/thương hiệu), Q5 (deploy URL công khai), Q7 (âm lịch), Q8 (trình duyệt tối thiểu)** có thể làm thay đổi lựa chọn stack; phần tradeoff dưới đây nêu rõ chỗ nào phụ thuộc.

## 2. Phương án

### PA1 — HTML + CSS thuần, JS tối thiểu, không bước build

Cấu trúc: `index.html`, `styles.css`, `script.js` (chỉ dùng nếu chọn đếm ngược), `assets/`.

| Tiêu chí | Đánh giá |
|---|---|
| Chi phí | ~0đ. Host tĩnh miễn phí (GitHub Pages/Netlify) |
| Độ phức tạp | Rất thấp: mở file là chạy, không dependency |
| Thời gian | Ngắn nhất — CodeReader viết trực tiếp, không cấu hình |
| Rủi ro | Thấp nhất: không có bundler/minifier để hỏng; AC6 (console) gần như chắc đạt |
| Đáp ứng AC | Đủ AC1–AC9 nếu CSS viết cẩn thận |
| Điểm yếu | Không lint/format/test tự động; không có component tái sử dụng; khó mở rộng thành nhiều trang |
| Test | Playwright chạy qua `npx` + static server, hoặc kiểm thủ công theo checklist AC |
| Phụ thuộc câu hỏi mở | Không phụ thuộc Q nào; Q4 (đếm ngược) làm được bằng ~20 dòng JS |

### PA2 — Vite + TypeScript + Tailwind CSS (build ra static)

| Tiêu chí | Đánh giá |
|---|---|
| Chi phí | 0đ (OSS), nhưng tốn thời gian cài đặt và build |
| Độ phức tạp | Trung bình: Node + npm, cấu hình `vite.config`, Tailwind, tsconfig |
| Thời gian | Dài hơn PA1 (dựng khung ~0.5–1 buổi), nhưng có sẵn lint/test/CI |
| Rủi ro | Trung bình: bundle lỗi, phiên bản dependency lệch, build khác dev; AC6 dễ vướng lỗi từ bundle |
| Đáp ứng AC | Đủ AC1–AC9; AC8 vẫn đạt vì Vite render HTML từ template |
| Điểm yếu | Thêm bề mặt review (config, lockfile) cho một trang duy nhất; deploy phải build trước |
| Test | `vitest` + `playwright` chạy bằng npm script, gắn CI GitHub Actions tự nhiên |
| Phụ thuộc câu hỏi mở | Q8 (trình duyệt cũ) cần cân nhắc target build |

### PA3 — Astro (static site generator)

| Tiêu chí | Đánh giá |
|---|---|
| Chi phí | 0đ |
| Độ phức tạp | Cao nhất trong 3: framework, layout/component, content collection |
| Thời gian | Dài nhất; lợi ích chính (nhiều trang, Markdown, islands) không dùng tới ở đây |
| Rủi ro | Trung bình–cao: phụ thuộc framework, nâng cấp phiên bản, nhiều khái niệm cho người review |
| Đáp ứng AC | Đủ AC1–AC9, mặc định gần như không JS |
| Điểm yếu | Overkill cho 1 trang; thêm kiến thức framework mà đội chưa cần |
| Test | Playwright + `astro check` |
| Phụ thuộc câu hỏi mở | Chỉ hợp lý nếu Q1 trả lời là "landing cho chiến dịch" và sắp có nhiều trang |

## 3. Khuyến nghị của Architect

**Khuyến nghị PA1 (HTML + CSS thuần)** cho Demo MVP 1, vì:

- Đáp ứng đủ AC1–AC9 với rủi ro thấp nhất; AC6 (không lỗi console) và AC9 (< 3s) gần như đạt sẵn.
- Đúng tinh thần "MVP demo để chạy thử quy trình có gate": ít công cụ ⇒ gate tập trung vào spec/code/review thay vì cấu hình hạ tầng.
- Dễ review độc lập: Architect đọc được toàn bộ diff trong vài phút.
- R3 (bản quyền ảnh) xử lý gọn bằng SVG/CSS tự vẽ.

**Khi nào nên đổi sang PA2/PA3 (điều kiện chuyển):**

- User muốn có lint + unit test + CI ngay từ bản demo, hoặc
- Q1 trả lời là landing cho chiến dịch và sẽ mở rộng nhiều trang/nhiều chiến dịch, hoặc
- Q3 trả lời là nội dung sẽ do user gửi liên tục dạng Markdown ⇒ PA3 có lợi.

Nếu chọn PA1, việc bổ sung test tự động sau này vẫn làm được (Playwright qua `npx`) mà không phải viết lại cấu trúc.

## 4. Phương án xử lý các câu hỏi mở Q1–Q8 (user chốt, không tự quyết)

- **GATE 1b (ngay bây giờ):** chọn stack (PA1/PA2/PA3).
- **GATE 1c (khi duyệt plan):** chốt Q1 (mục đích/CTA), Q2 (thương hiệu & màu), Q3 (nguồn nội dung/ảnh), Q4 (đếm ngược có/không), Q5 (deploy URL công khai hay chỉ local), Q7 (chỉ dương lịch hay thêm âm lịch), Q8 (trình duyệt tối thiểu).
- Mỗi câu sẽ được đưa dưới dạng 2–3 lựa chọn kèm tradeoff, không tự chọn thay user.
- Q6 (deadline) đề nghị user xác nhận để tôi xếp thứ tự task trong `docs/plan.md`.

### Bảng lựa chọn cụ thể cho Q1–Q3 (các câu đổi hướng nội dung; user tick 1 ô mỗi câu)

**Q1 — Mục đích chính của trang**

| Mã | Lựa chọn | Kéo theo |
|---|---|---|
| Q1(a) | Lời chúc Tết cá nhân/tổ chức | Hero chúc Tết; CTA nhẹ hoặc không CTA |
| Q1(b) | Trang thông tin văn hoá | Nhấn ngày Tết, ý nghĩa, phong tục; không CTA |
| Q1(c) | Landing chiến dịch/sản phẩm | Cần tên chiến dịch + ≥1 CTA trỏ URL thật (AC7 cấm `#` rỗng) |

**Q2 — Thương hiệu & theme**

| Mã | Lựa chọn | Kéo theo |
|---|---|---|
| Q2(a) | Không thương hiệu | Theme đỏ–vàng truyền thống mặc định |
| Q2(b) | Có tên/logo đơn vị (user gửi) + bảng màu riêng | Cần asset logo + biến CSS màu; R3 áp dụng cho logo |
| Q2(c) | Có tên đơn vị, giữ theme đỏ–vàng | Chỉ cần chuỗi text, không cần asset |

**Q3 — Nguồn nội dung**

| Mã | Lựa chọn | Kéo theo |
|---|---|---|
| Q3(a) | Analyst/team viết nội dung mẫu tiếng Việt | Nội dung duyệt ở GATE 1c/2 |
| Q3(b) | User gửi text, team dàn trang | Cần user gửi trước khi CodeReader implement |
| Q3(c) | User gửi text + hình ảnh | Phải xử lý bản quyền/định dạng ảnh (R3); nặng hơn ước lượng thời gian |

Q4–Q8 không đổi kiến trúc nên chỉ hỏi–đáp, không cần thành bảng phương án: Q4 (đếm ngược) là 1 task nhỏ thêm được trên cả 3 PA; Q5 (deploy) chốt ở GATE 2; Q6 (deadline) dùng để xếp thứ tự task; Q7 (âm lịch) chỉ là thêm 1 chuỗi hiển thị; Q8 (trình duyệt) mặc định khuyến nghị Chrome/Safari/Firefox 2 phiên bản gần nhất, fallback CSS cơ bản.

### Hệ quả kỹ thuật của Q4 và Q5 (không đổi PA đã chốt)

- **Q4 = có đếm ngược** (đồng ý với CodeReader): làm bằng JS/island tĩnh tính từ `Date` phía client, **không** gọi API/backend (spec §5 out-of-scope). Hệ quả: AC6 siết (test console cả trước và sau khi đồng hồ tick); AC8 vẫn đạt vì nội dung chính nằm trong HTML, chỉ giá trị "còn X ngày" do JS điền; nên có fallback text tĩnh khi JS tắt. Đây là 1 task riêng trong `docs/plan.md`.
- **Q5 = cần URL công khai**: đã chọn GitHub Pages ở GATE 1b. Deploy thật vẫn phải qua GATE 2 (chữ "Duyệt" của user); ADR này không tự cho phép deploy. Điều kiện tiên quyết là mục 7.3 (Pages cho repo private).
- Nếu user chọn Q4 = có, phần AC bổ sung do Analyst soạn và Chief push vào spec **trước** khi tôi chốt `docs/plan.md`.

## 5. Hệ quả nếu chọn PA1 (đã bị loại — giữ lại làm dấu vết)

- Repo sẽ có: `index.html`, `styles.css`, `assets/`, `README.md`, `docs/`.
- Có thể deploy GitHub Pages mà không cần CI build.
- Không có `package.json` ⇒ mọi kiểm thử tự động phải gọi qua `npx` (chấp nhận được cho demo).
- Nếu sau này thêm trang thứ hai, sẽ cần ADR mới (ghi nợ kỹ thuật).

### Nợ kỹ thuật đã cân nhắc khi so sánh PA1

| Nợ | Ảnh hưởng | Trả khi nào |
|---|---|---|
| Không có test tự động trong repo | AC4/AC6 phải kiểm bằng Playwright gọi `npx` hoặc thủ công; review tốn thời gian hơn | Khi có task thứ hai |
| Không có type-check/lint | Lỗi chính tả biến JS (nếu có Q4) chỉ lộ khi chạy | Khi thêm JS |
| Nội dung nằm lẫn trong HTML | Mỗi lần user sửa text phải sửa markup ⇒ dễ vỡ cấu trúc | Khi Q3(b) hoặc Q3(c) được chọn |
| Không tách component | Thêm block nội dung mới phải copy–paste CSS | Khi vượt 1 trang |

## 6. Quyết định

- **Người chốt**: user (Duy), tại GATE 1b, ngày 2026-10-11.
- **Nguyên văn câu trả lời**: *"Dùng astro starlight + đẩy lên github pages, fe thì dùng tailwindcss"*
- **Diễn giải (không thêm bớt)**: PA3 (Astro) + Tailwind CSS cho front-end + Astro Starlight + deploy lên GitHub Pages.
- **Đối chiếu khuyến nghị**: Architect khuyến nghị PA1; user chọn PA3 kèm 2 bổ sung. PA1/PA2 bị loại theo lựa chọn của user, **không** theo khuyến nghị của Architect. Quyết định thuộc user.
- **Điểm còn mở (cần user xác nhận)**: giữ Starlight hay dùng Astro "trơn" (xem mục 7.1 — Starlight là theme tài liệu, không phải theme landing page).

## 7. Hệ quả của lựa chọn này

1. **Starlight là theme tài liệu, không phải theme landing page.** Để dùng cho 1 trang Tết phải: dùng `template: splash`, tắt sidebar/pagination/"Edit page"/search, override theme. Các thành phần mặc định của Starlight đều không cần cho spec này ⇒ **nhiều việc hơn** phương án "Astro + Tailwind trơn", dù vẫn đạt AC1–AC9.
2. **Tailwind không hoà sẵn với Starlight.** Starlight dùng CSS custom property/token riêng; class Tailwind không áp vào component Starlight. Cần chốt quy ước: Tailwind cho phần page tự viết, Starlight chỉ override qua CSS variable.
3. **GitHub Pages + repo private (RỦI RO CẦN USER CHỐT).** Pages cho repo private cần GitHub Pro/Team/Enterprise. Nếu account đang Free, 3 lựa chọn: (a) chuyển repo sang public, (b) dùng account có Pro, (c) deploy bằng Netlify/Cloudflare Pages (hỗ trợ repo private, free). Đây là điều kiện tiên quyết của AC1 (URL công khai).
4. **Base path bắt buộc.** Pages phục vụ ở `/dsh-bot-demo-mvp-1/` ⇒ phải khai `site` + `base` trong `astro.config.mjs`. Quên ⇒ CSS/ảnh 404 ⇒ **vi phạm AC5**.
5. **Q4 (đếm ngược) nếu có**: viết dạng island `client:load`, giữ JS tối thiểu để không phá AC9/AC6.
6. **AC8 vẫn đạt**: Astro render tĩnh, nội dung nằm trong HTML.
7. **Thay đổi phạm vi**: deploy URL công khai vốn thuộc out-of-scope (spec §5). User chủ động yêu cầu ⇒ phải ghi rõ trong `docs/plan.md` là thay đổi phạm vi cần user duyệt lại ở GATE 1c.
8. **Chi phí/thời gian tăng** so với PA1: framework + theme + workflow Pages + cấu hình base path. Bù lại có lint/build/CI sẵn.

## 8. Việc tiếp theo

Architect chuyển sang GATE 1c: viết `docs/plan.md` chia task (file sẽ tạo/sửa + test plan cho từng AC), chờ user duyệt. CodeReader **không** được code trước khi plan được duyệt.
