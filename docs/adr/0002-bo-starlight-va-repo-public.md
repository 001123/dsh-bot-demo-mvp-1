# ADR 0002 — Bỏ Starlight (dùng Astro thường) và repo public cho GitHub Pages

- Trạng thái: **ACCEPTED — user chốt ngày 2026-10-11**
- Người soạn: Chief (tổng hợp từ đáp án user do Analyst báo)
- Nguồn: chat Analyst ↔ user, 2026-10-11. Riêng việc repo public: Chief xác minh độc lập qua GitHub API (`private: false`, `visibility: "public"`).
- Liên quan: `docs/adr/0001-stack.md` (GATE 1b), `docs/spec.md` (GATE 1a + AC10)

## Quyết định 1 — Dùng Astro "thường" + Tailwind CSS, KHÔNG dùng Starlight

Nguyên văn đáp án của user: chọn **Astro thường thay Starlight**.

Lý do (đã nêu ở ADR 0001 mục 7.1–7.2, và CodeReader xác nhận độc lập):

- Starlight là theme **tài liệu**, không phải theme landing page. Để dùng phải `template: splash`, tắt sidebar/pagination/"Edit page"/search (Pagefind), rồi override theme.
- Class Tailwind **không áp được** vào component của Starlight; chỉ override được qua CSS custom property (`--sl-color-*`).
- Với một landing page đơn, Starlight chỉ thêm việc và thêm bề mặt review.

Hệ quả:

- **Bỏ** task cấu hình Starlight trong plan (không cần `template: splash`, `pagefind: false`, ẩn sidebar).
- Giữ: Astro (SSG, render HTML tĩnh) + Tailwind CSS + Playwright/`astro check` cho test.
- AC1–AC10 không đổi. AC7 dễ đạt hơn vì không còn UI tìm kiếm của Starlight.
- Base path vẫn bắt buộc: `site: 'https://001123.github.io'`, `base: '/dsh-bot-demo-mvp-1'` trong `astro.config.mjs` — quên ⇒ CSS/ảnh 404 ⇒ vi phạm AC5.

## Quyết định 2 — Repo để public, deploy bằng GitHub Pages

Nguyên văn đáp án của user: **đổi repo sang public**.

Xác minh độc lập (Chief, 2026-10-11 09:06): `GET https://api.github.com/repos/001123/dsh-bot-demo-mvp-1` trả `"private": false`, `"visibility": "public"`. Repo hiện **đã public**. Trường `has_pages` hiện là `false` (chưa bật Pages — chỉ bật khi qua GATE 2).

Hệ quả:

- GitHub Pages chạy được trên account Free ⇒ **không cần** GitHub Pro/Team, **không cần** chuyển sang Netlify/Cloudflare.
- Rủi ro chặn AC1 (URL công khai) coi như **đã đóng** về mặt hạ tầng.
- Đánh đổi đã biết: repo public ⇒ toàn bộ source, spec, ADR, plan ai cũng xem được. Với demo này chấp nhận được, nhưng **không được đưa secret/token vào repo**.
- Vẫn **không Bot nào được tự đổi visibility hay bật Pages**; mọi thao tác cấu hình repo là của user.

## Phần bị thay thế trong ADR 0001

- Mục 6, hai "Điểm còn mở — CHƯA CHỐT" (i) giữ Starlight hay Astro thường; (ii) repo public hay host khác: **nay đã chốt** theo ADR này (Astro thường; repo public).
- Mục 7.1 và 7.3 của ADR 0001: đọc kèm ADR này; nội dung "chưa chốt" ở đó không còn hiệu lực.
- ADR 0001 vẫn giữ hiệu lực cho phần chọn stack (PA3 Astro), Tailwind, GitHub Pages và base path.
