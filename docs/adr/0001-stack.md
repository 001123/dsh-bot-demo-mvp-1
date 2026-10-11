# ADR 0001 — Chọn stack cho landing page Tết Đinh Mùi 2027

- Trạng thái: **ACCEPTED — user chốt ở GATE 1b ngày 2026-10-11, có bổ sung cùng ngày**
- Ngày: 2026-10-11 · Người soạn: Architect
- Tham chiếu: `docs/spec.md` (APPROVED GATE 1a, cập nhật ở commit `515db703`), repo `001123/dsh-bot-demo-mvp-1`
- Baseline spec: `main` — blob `165601395fd0f6b017284b5120cf361cdc42f3d2` (nội dung AC1–AC9/US1–US3 không đổi so với bản user duyệt; commit `515db703` chỉ ghi thêm đáp án Q1/Q2/Q3/Q5 và chuyển deploy sang in-scope)

## 0. Nhật ký quyết định (có nguồn)

| # | Quyết định | Nguyên văn | Nguồn | Thời điểm |
|---|---|---|---|---|
| D1 | Astro + Tailwind CSS, deploy GitHub Pages | *"Dùng astro starlight + đẩy lên github pages, fe thì dùng tailwindcss"* | chat riêng Architect ↔ user, anchor `#331` | 2026-10-11 08:57 |
| D2 | **Bỏ Starlight, dùng Astro thường** | *"Chuyển dùng Astro thường"* | user trả lời card của Analyst; Analyst relay nguyên văn | 2026-10-11 (trước 09:06) |
| D3 | **Repo đã chuyển sang public** | *"repo đã public"* | user (cùng câu trả lời D2) + **Architect kiểm chứng độc lập**: `GET https://api.github.com/repos/001123/dsh-bot-demo-mvp-1` không đăng nhập = `HTTP 200`, `"visibility": "public"` | 2026-10-11 (kiểm chứng 09:07) |
| D4 | **Q4 = CÓ đếm ngược** | *"q4 có đồng hồ đếm người"* (nguyên văn, có lỗi gõ "người"→"ngược") | user trả lời card của Analyst; Analyst relay nguyên văn | 2026-10-11 (trước 09:06) |
| D5 | Q1(a) chúc Tết cá nhân · Q2(a) không thương hiệu, theme đỏ–vàng · Q3(a) team viết nội dung mẫu · Q5 deploy GitHub Pages | — | commit `515db703` (Chief push vào `docs/spec.md`), dẫn nguồn từng câu trong spec | 2026-10-11 09:05 |

Ghi chú về nguồn: D2 và D4 đến qua **relay của Analyst**, không phải user gõ trực tiếp trong chat của Architect. Đã ghi rõ nguồn theo luật chống "quyết định ma"; nếu Chief/Architect xác nhận được nguyên văn ở kênh chung thì cập nhật lại cột Nguồn. Việc này **không** chặn plan.

## 1. Bối cảnh và ràng buộc

| Ràng buộc | Nguồn | Ảnh hưởng tới stack |
|---|---|---|
| 1 trang tĩnh, 1 URL, tiếng Việt | spec §4 | Không cần routing/SSR |
| Không backend/API/DB/CMS, không form | spec §5, AC7 | Chỉ cần static hosting |
| Nội dung có trong DOM/HTML khi tải | AC8 | Astro render tĩnh tại build ⇒ đạt |
| Tải < 3s, không lỗi console | AC9, AC6 | Ít JS = ít rủi ro; đếm ngược (D4) là JS nhỏ |
| Responsive 375px & 1440px, không cuộn ngang | AC4 | Tailwind + media query đủ |
| Ảnh phải có alt tiếng Việt, không ảnh vỡ | AC5 | SVG/CSS tự vẽ |
| Bản quyền hình ảnh | R3 | Chỉ dùng ảnh tự tạo/có giấy phép |
| Repo đã public, dùng Pages | D3 | Deploy được trên account Free |
| Demo quy trình SDLC có gate | spec §1 | Ưu tiên dễ review, dễ test, dễ rollback |

## 2. Phương án đã cân nhắc (giữ làm dấu vết)

| | PA1 HTML/CSS thuần | PA2 Vite + TS + Tailwind | PA3 Astro (**được chọn**, kèm Tailwind) |
|---|---|---|---|
| Chi phí | 0đ | 0đ | 0đ |
| Độ phức tạp | Rất thấp | Trung bình | Trung bình–cao |
| Thời gian | Ngắn nhất | Trung bình | Dài hơn |
| Rủi ro | Thấp nhất | Trung bình (bundle) | Trung bình (phiên bản framework) |
| Đáp ứng AC1–AC10 | Đủ | Đủ | Đủ |
| Điểm yếu | Không component hoá, khó mở rộng | Thêm config/lockfile | Overkill cho 1 trang |

**Khuyến nghị của Architect là PA1**; user chọn **PA3 (Astro) + Tailwind** ở D1, rồi **bỏ Starlight** ở D2 (Astro "trơn"). Khuyến nghị không được chọn — quyết định thuộc user, ghi lại để không ai đọc sai lịch sử.

## 3. Quyết định cuối cùng

**Astro (static site generator, KHÔNG Starlight) + Tailwind CSS, deploy GitHub Pages, repo public.**

- Astro render HTML tĩnh tại build ⇒ AC8 đạt, gần như không JS mặc định.
- Tailwind áp trực tiếp lên page/component mình viết, **không** cần lớp override theme tài liệu.
- Q4 = có ⇒ 1 island đếm ngược (`client:load`), phần còn lại tĩnh.
- Trang gồm `src/pages/index.astro` + component tự viết; **không** dùng `src/content/docs`, `starlight-overrides.css`, `src/content.config.ts`.

## 4. Hệ quả của lựa chọn

1. **Không còn hệ quả Starlight.** Bỏ `template: splash`, bỏ tắt Pagefind/sidebar/pagination/"Edit page", bỏ override `--sl-color-*`. Layout là HTML/CSS/Tailwind do mình kiểm soát hoàn toàn ⇒ AC6/AC7 dễ đạt hơn hẳn so với phương án có Starlight.
2. **Tailwind dùng trực tiếp**: `tailwind.config.mjs` + `src/styles/global.css`, áp vào mọi component tự viết.
3. **GitHub Pages + repo public (D3) — ĐÃ GIẢI QUYẾT.** Repo `001123/dsh-bot-demo-mvp-1` hiện `"visibility": "public"` (Architect kiểm chứng độc lập, không cần đăng nhập). Pages chạy trên account Free, không cần Pro/Netlify/Cloudflare. Điều kiện tiên quyết của AC1 đã có.
4. **Base path bắt buộc**: Pages phục vụ tại `/dsh-bot-demo-mvp-1/` ⇒ phải khai `site: 'https://001123.github.io'` + `base: '/dsh-bot-demo-mvp-1'` trong `astro.config.mjs`. Quên ⇒ CSS/ảnh 404 ⇒ **vi phạm AC5**. Test phải chạy trên đường dẫn có base, không chỉ `localhost:4321/`.
5. **Q4 = CÓ đếm ngược**: 1 task riêng (T7) + AC10 do Analyst soạn. Tính bằng JS tĩnh từ `Date` client tới `2027-02-06T00:00:00+07:00`; **không** gọi API/backend; có fallback text tĩnh khi tắt JS; AC6 siết (console sạch cả trước và sau khi giá trị cập nhật).
6. **AC8 vẫn đạt**: nội dung chính nằm trong HTML build; chỉ giá trị "còn X ngày" do JS điền.
7. **Thay đổi phạm vi**: deploy URL công khai vốn out-of-scope ở spec §5. User yêu cầu (Q5) ⇒ đã chuyển sang in-scope ở `515db703`; plan ghi rõ để user duyệt lại ở GATE 1c.
8. **Deploy thật** chỉ sau chữ **"Duyệt"** ở GATE 2. Workflow Pages chỉ được tạo file trước, không bật, không chạy.

## 5. Việc tiếp theo

Architect hoàn thiện `docs/plan.md` (task + test plan map AC1–AC10), trình user duyệt ở **GATE 1c**. CodeReader **không** được tạo file sản phẩm trước khi plan được duyệt và có label `arch-approved`.
