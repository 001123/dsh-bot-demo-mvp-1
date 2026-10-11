# Spec — Landing page Tết Âm lịch 2027 (Đinh Mùi)

- Trạng thái: **APPROVED — user duyệt ở GATE 1a ngày 2026-10-11**
- Người viết: Analyst (BA)
- Yêu cầu gốc (nguyên văn): "Làm 1 trang landing đơn giản nói về tết âm lịch 2027"
- Cập nhật: 2026-10-11
- Lưu ý: user duyệt spec nhưng **chưa trả lời 8 câu hỏi mở Q1–Q8** (xem mục 6). Các câu này cần được đưa thành phương án ở bước thiết kế để user chốt, không tự quyết.
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

## 5. Out of scope

- Đăng nhập, tài khoản, thanh toán, form thu thập dữ liệu, email marketing.
- Đa ngôn ngữ (chỉ tiếng Việt).
- CMS/quản trị nội dung; nội dung nằm trong source code.
- Âm thanh/pháo hoa/video, animation phức tạp.
- SEO nâng cao, analytics, quảng cáo, tracking.
- Backend/API/database; đếm ngược theo thời gian thực là optional (xem câu hỏi mở Q4).
- Deploy lên domain thật (chỉ cần chạy được local/URL demo) — trừ khi user trả lời Q5.

## 6. Câu hỏi mở (cần user trả lời trước khi chốt)

- Q1: Mục đích chính của trang là gì: (a) chúc Tết cá nhân/tổ chức, (b) trang thông tin văn hoá, (c) landing cho một chiến dịch/sản phẩm? Điều này quyết định nội dung và CTA.
- Q2: Có thương hiệu/logo/tên đơn vị nào phải hiển thị không? Có bảng màu/chủ đề bắt buộc (đỏ vàng truyền thống hay khác)?
- Q3: Nội dung do ai cung cấp? Analyst/team tự viết nội dung mẫu hay user gửi text/hình ảnh?
- Q4: Có cần chức năng đếm ngược tới mùng 1 Tết (dạng "còn X ngày") không?
- Q5: Cần deploy lên URL công khai để chia sẻ, hay chỉ cần chạy local để demo?
- Q6: Deadline mong muốn và đây có phải bản demo để đánh giá quy trình (không cần hoàn thiện) không?
- Q7: Ngôn ngữ hiển thị ngày: chỉ dương lịch, hay cần thêm âm lịch (ví dụ "Mùng 1 tháng Giêng")?
- Q8: Trình duyệt/thiết bị tối thiểu cần hỗ trợ (chỉ Chrome/Safari/Firefox bản mới, hay cả trình duyệt cũ)?

## 7. Rủi ro

- R1: Yêu cầu còn mơ hồ (mục đích, thương hiệu, nội dung) — nếu chốt sớm dễ làm sai hướng, phải sửa nhiều. Giảm thiểu: trả lời Q1–Q3 trước khi sang thiết kế.
- R2: Ngày Tết có thể bị sai nếu lấy từ nguồn không kiểm chứng — đã kiểm chứng và ghi nguồn; nếu có nguồn chính thống khác thì cập nhật lại.
- R3: Bản quyền hình ảnh Tết lấy từ internet — cần dùng ảnh tự tạo/ảnh có giấy phép, hoặc chỉ dùng CSS/hình vẽ.
- R4: Phạm vi phình ra (thêm form, đếm ngược, đa ngôn ngữ) — mọi thứ ngoài mục 4 phải qua gate để user duyệt lại.
- R5: Tiêu chí AC9 (thời gian tải) phụ thuộc môi trường đo — chốt đo trên localhost, mạng thường.

## 8. Gate

- GATE 1a: **ĐÃ QUA** — user duyệt spec này ngày 2026-10-11 (qua Chief). Được phép chuyển sang bước thiết kế.
- Bước tiếp theo: Architect làm thiết kế/ADR + plan (GATE 1b/1c). 8 câu hỏi mở Q1–Q8 vẫn cần user chốt trong bước này.
- Mọi thay đổi phạm vi sau đây (mục 5) phải qua gate mới.
