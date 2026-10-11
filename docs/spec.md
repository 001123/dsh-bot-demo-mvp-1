# Spec — Landing page Tết Âm lịch 2027 (Đinh Mùi)

- Trạng thái: **APPROVED — user duyệt ở GATE 1a ngày 2026-10-11**
- Người viết: Analyst (BA)
- Yêu cầu gốc (nguyên văn): "Làm 1 trang landing đơn giản nói về tết âm lịch 2027"
- Cập nhật: 2026-10-11 (bổ sung đáp án Q1, Q2, Q3, Q5)
- Lưu ý: user đã trả lời **Q1(a), Q2(a), Q3(a), Q5**; **Q4, Q6, Q7, Q8 chưa trả lời** (xem mục 6). Các câu chưa trả lời cần user chốt, không tự quyết.
- Issue theo dõi: https://github.com/001123/dsh-bot-demo-mvp-1/issues/1

## 1. Bối cảnh

Cần một trang landing đơn giản giới thiệu Tết Nguyên đán 2027 (Tết Đinh Mùi 2027): thông tin ngày Tết, không khí Tết, các nội dung văn hoá ngắn gọn. Trang chỉ để xem thông tin (không đăng nhập, không thanh toán), là sản phẩm demo để chạy thử quy trình SDLC có gate.

Mốc dữ liệu cần hiển thị đúng (đã kiểm chứng, nguồn: [Tuổi Trẻ Mực Tím](https://muctim.tuoitre.vn/con-bao-nhieu-ngay-nua-den-tet-dinh-mui-2027-101260218100410746.htm)):

- Tất niên (29 Tết): thứ Sáu 05/02/2027
- Mùng 1 Tết Đinh Mùi: thứ Bảy 06/02/2027

## 2. User story

- US1: Là khách truy cập, tôi muốn mở một trang web và trong vài giây biết được Tết Âm lịch 2027 là ngày nào, con giáp gì, để nắm thông tin nhanh.
- US2: Là khách truy cập, tôi muốn thấy nội dung Tết (chúc Tết, phong tục, hình ảnh) được trình bày dễ đọc, để cảm nhận không khí Tết.
- US3: Là người xem trên điện thoại, tôi muốn trang hiển thị gọn, không phải phóng to/thu nhỏ, để đọc thoải mái.

## 3. Acceptance criteria

- AC1: Trang có duy nhất một URL/route công khai, mở được ở chế độ ẩn danh, không cần đăng nhập, không trả lỗi 4xx/5xx.
- AC2: Phần đầu trang (hero) hiển thị trong lần tải đầu tiên các thông tin: "Tết Nguyên đán 2027", "Đinh Mùi", "06/02/2027" (thứ Bảy) và "Tất niên 05/02/2027". Các giá trị này khớp đúng với mục 1.
- AC3: Trang có tối thiểu 3 khối nội dung ngoài hero: (a) giới thiệu/ý nghĩa Tết, (b) phong tục ngày Tết, (c) lời chúc Tết. Mỗi khối có tiêu đề và tối thiểu 1 đoạn văn bản tiếng Việt, không có văn bản giữ chỗ kiểu "Lorem ipsum"/"TODO".
- AC4: Trang responsive: ở viewport rộng 375px và 1440px, không có cuộn ngang (scrollWidth <= clientWidth) và nội dung không bị cắt/nội dung không trùng nhau.
- AC5: Tất cả hình ảnh hiển thị đúng (không ảnh vỡ/icon 404) và có thuộc tính alt bằng tiếng Việt mô tả nội dung ảnh.
- AC6: Trang không có lỗi JavaScript ở console khi tải lần đầu và khi cuộn hết trang.
- AC7: Không có thành phần tương tác gửi dữ liệu đi (form, ô nhập email, thanh toán); mọi liên kết/CTA nếu có đều trỏ tới URL hợp lệ, không phải "#" rỗng.
- AC8: Nội dung chính (tiêu đề, ngày Tết) nằm trong HTML trả về từ server hoặc trong DOM sau khi tải xong — kiểm tra được bằng cách xem nguồn/DOM mà không cần bấm gì.
- AC9: Thời gian tải trang trên kết nối thường < 3 giây (đo bằng devtools, không tính cache lần đầu).

## 4. Phạm vi (in scope)

- 1 trang landing tĩnh, 1 URL, nội dung tiếng Việt.
- Nội dung: hero (tên Tết, ngày mùng 1, ngày tất niên, con giáp), 3 khối nội dung như AC3, footer đơn giản.
- Hình ảnh/trang trí ở mức đơn giản (ảnh có sẵn hoặc CSS).
- Responsive cho mobile và desktop.
- Có repository + README hướng dẫn chạy local.
- Nội dung do Analyst/team viết bản mẫu tiếng Việt (Q3a), chủ đề "Tết 2027 Happier"; theme đỏ–vàng truyền thống, không cần logo/bảng màu riêng (Q2a).
- Deploy lên URL công khai bằng GitHub Pages (Q5) — xem mục 8.

## 5. Out of scope

- Đăng nhập, tài khoản, thanh toán, form thu thập dữ liệu, email marketing.
- Đa ngôn ngữ (chỉ tiếng Việt).
- CMS/quản trị nội dung; nội dung nằm trong source code.
- Âm thanh/pháo hoa/video, animation phức tạp.
- SEO nâng cao, analytics, quảng cáo, tracking.
- Backend/API/database; đếm ngược theo thời gian thực là optional (xem câu hỏi mở Q4).
- Deploy lên tên miền/domain riêng. **Deploy lên URL công khai bằng GitHub Pages nay là IN SCOPE** (user chốt Q5) — xem mục 8.

## 6. Câu hỏi mở (cần user trả lời trước khi chốt)

- Q1: **ĐÃ TRẢ LỜI (user, 2026-10-11): (a) lời chúc Tết cá nhân/tổ chức.** Nguyên văn: "1, Chúc Tết Happier". Hệ quả: hero là lời chúc Tết; không cần CTA dẫn ra ngoài — nếu có link thì phải là URL thật (AC7 cấm "#" rỗng).
- Q2: **ĐÃ TRẢ LỜI (user, 2026-10-11): (a) không có thương hiệu/logo cần hiển thị — theme đỏ–vàng truyền thống.** Nguyên văn: "2, Tết âm lịch vn". Làm rõ với user: "Happier" là tên/chủ đề của trang, không phải thương hiệu có logo/bảng màu riêng ⇒ không phát sinh ràng buộc asset; R3 không áp cho logo.
- Q3: **ĐÃ TRẢ LỜI (user, 2026-10-11): (a) Analyst/team viết nội dung mẫu tiếng Việt; user không gửi text/ảnh.** Nguyên văn: "3, Tết 2027 Happier" + chọn Q3(a). Hệ quả: nội dung không phải điều kiện chờ user; bản mẫu trình user duyệt ở GATE 1c.
- Q4: **CHƯA CÓ ĐÁP ÁN (user chưa trả lời).** Nếu chốt "có": thêm AC10 (đếm ngược bằng JS tĩnh, không gọi API/backend, có fallback khi tắt JS; AC6 kiểm console trước và sau khi đồng hồ tick) — vì thêm AC vào baseline GATE 1a nên phải user duyệt lại.
- Q5: **ĐÃ TRẢ LỜI (user, 2026-10-11): cần URL công khai — deploy bằng GitHub Pages.** Nguyên văn: "Dùng astro starlight + đẩy lên github pages, fe thì dùng tailwindcss" (ghi tại docs/adr/0001-stack.md).
- Q6: Deadline mong muốn và đây có phải bản demo để đánh giá quy trình (không cần hoàn thiện) không?
- Q7: Ngôn ngữ hiển thị ngày: chỉ dương lịch, hay cần thêm âm lịch (ví dụ "Mùng 1 tháng Giêng")?
- Q8: Trình duyệt/thiết bị tối thiểu cần hỗ trợ (chỉ Chrome/Safari/Firefox bản mới, hay cả trình duyệt cũ)?

## 7. Rủi ro

- R1: Yêu cầu còn mơ hồ (mục đích, thương hiệu, nội dung) — nếu chốt sớm dễ làm sai hướng, phải sửa nhiều. Giảm thiểu: trả lời Q1–Q3 trước khi sang thiết kế. **Đã xử lý**: Q1(a), Q2(a), Q3(a) đã chốt ngày 2026-10-11.
- R2: Ngày Tết có thể bị sai nếu lấy từ nguồn không kiểm chứng — đã kiểm chứng và ghi nguồn; nếu có nguồn chính thống khác thì cập nhật lại.
- R3: Bản quyền hình ảnh Tết lấy từ internet — cần dùng ảnh tự tạo/ảnh có giấy phép, hoặc chỉ dùng CSS/hình vẽ.
- R4: Phạm vi phình ra (thêm form, đếm ngược, đa ngôn ngữ) — mọi thứ ngoài mục 4 phải qua gate để user duyệt lại.
- R5: Tiêu chí AC9 (thời gian tải) phụ thuộc môi trường đo — chốt đo trên localhost, mạng thường.

## 8. Gate

- GATE 1a: **ĐÃ QUA** — user duyệt spec này ngày 2026-10-11 (qua Chief). Được phép chuyển sang bước thiết kế.
- Bước tiếp theo: Architect làm thiết kế/ADR + plan (GATE 1b/1c). Q1(a), Q2(a), Q3(a), Q5 đã được user chốt ngày 2026-10-11; **Q4, Q6, Q7, Q8 chưa trả lời**.
- Mọi thay đổi phạm vi sau đây (mục 5) phải qua gate mới.
- **Thay đổi phạm vi cần user duyệt lại ở GATE 1c:** chuyển deploy URL công khai (GitHub Pages) từ out-of-scope sang in-scope; thêm AC10 nếu Q4 = "có".

## 9. Nguồn các câu trả lời

- Q1(a), Q2(a), Q3(a): user trả lời qua chat Analyst (BA), 2026-10-11; Analyst báo nguyên văn cho Chief và Chief push vào spec này.
- Q5 + stack: user trả lời qua chat Architect, 2026-10-11 08:57 (anchor `#331`), ghi tại `docs/adr/0001-stack.md` mục 6.
- Quy ước: mỗi dòng mang tính quyết định phải có nguồn (ai nói · khi nào · kênh). Thiếu nguồn ⇒ coi như chưa chốt.
