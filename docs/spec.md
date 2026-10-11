# Spec — Landing page Tết Âm lịch 2027 (Đinh Mùi)

- Trạng thái: **APPROVED — user duyệt ở GATE 1a ngày 2026-10-11**
- Người viết: Analyst (BA)
- Yêu cầu gốc (nguyên văn): "Làm 1 trang landing đơn giản nói về tết âm lịch 2027"
- Cập nhật: 2026-10-11 (bổ sung đáp án Q1–Q5; chi tiết hoá AC10 theo đề xuất của Analyst + CodeReader; **user xác nhận lại Q2(a)**; **user chốt không thêm AC11**)
- Lưu ý: user đã trả lời **Q1(a), Q2(a) (đã xác nhận lại 2026-10-11), Q3(a), Q4 (có đếm ngược), Q5**; **Q6, Q7, Q8 chưa trả lời** (xem mục 6). Các câu chưa trả lời cần user chốt, không tự quyết.
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
- AC10: Trang có đồng hồ đếm ngược dạng "còn X ngày" tới mốc cố định 2027-02-06T00:00:00+07:00 (mùng 1 Tết, giờ VN UTC+7, không phụ thuộc timezone máy người xem). X = số ngày làm tròn LÊN (23:59:59 ngày 05/02/2027 ⇒ "còn 1 ngày"). Tính bằng JS tĩnh từ Date phía client, KHÔNG gọi API/backend. Qua mốc thì dừng cập nhật và đổi sang lời chúc "Chúc Mừng Năm Mới", không hiển thị số âm. Tắt JavaScript: vùng đó vẫn có text tĩnh (<noscript>), không để trống, không vỡ layout ở 375px (ràng buộc AC4). Console không lỗi cả trước và sau khi giá trị cập nhật (bổ sung AC6).

## 4. Phạm vi (in scope)

- 1 trang landing tĩnh, 1 URL, nội dung tiếng Việt.
- Nội dung: hero (tên Tết, ngày mùng 1, ngày tất niên, con giáp), 3 khối nội dung như AC3, footer đơn giản.
- Hình ảnh/trang trí ở mức đơn giản (ảnh có sẵn hoặc CSS).
- Responsive cho mobile và desktop.
- Có repository + README hướng dẫn chạy local.
- Đồng hồ đếm ngược tới mùng 1 Tết (AC10) — JS tĩnh, có fallback khi tắt JS.
- Nội dung do Analyst/team viết bản mẫu tiếng Việt (Q3a), chủ đề "Tết 2027 Happier"; theme đỏ–vàng truyền thống, không cần logo/bảng màu riêng (Q2a).
- Deploy lên URL công khai bằng GitHub Pages (Q5) — xem mục 8.

## 5. Out of scope

- Đăng nhập, tài khoản, thanh toán, form thu thập dữ liệu, email marketing.
- Đa ngôn ngữ (chỉ tiếng Việt).
- CMS/quản trị nội dung; nội dung nằm trong source code.
- Âm thanh/pháo hoa/video, animation phức tạp.
- SEO nâng cao, analytics, quảng cáo, tracking.
- Backend/API/database. Đếm ngược KHÔNG được gọi API/backend (xem AC10).
- Deploy lên tên miền/domain riêng. **Deploy lên URL công khai bằng GitHub Pages nay là IN SCOPE** (user chốt Q5) — xem mục 8.

## 6. Câu hỏi mở (cần user trả lời trước khi chốt)

- Q1: **ĐÃ TRẢ LỜI (user, 2026-10-11): (a) lời chúc Tết cá nhân/tổ chức.** Nguyên văn: "1, Chúc Tết Happier". Hệ quả: hero là lời chúc Tết; không cần CTA dẫn ra ngoài — nếu có link thì phải là URL thật (AC7 cấm "#" rỗng).
- Q2: **ĐÃ TRẢ LỜI (user, 2026-10-11): (a) không có thương hiệu/logo cần hiển thị — theme đỏ–vàng truyền thống.** Nguyên văn: "2, Tết âm lịch vn". Làm rõ với user: "Happier" là tên/chủ đề của trang, không phải thương hiệu có logo/bảng màu riêng ⇒ không phát sinh ràng buộc asset; R3 không áp cho logo. **ĐÃ XÁC NHẬN LẠI (user, 2026-10-11, group chat "Demo MVP 1"): nguyên văn "ĐÚNG"** ⇒ chốt (a): không logo, theme đỏ–vàng; "Happier" chỉ là tên/chủ đề trang, không phải thương hiệu.
- Q3: **ĐÃ TRẢ LỜI (user, 2026-10-11): (a) Analyst/team viết nội dung mẫu tiếng Việt; user không gửi text/ảnh.** Nguyên văn: "3, Tết 2027 Happier" + chọn Q3(a). Hệ quả: nội dung không phải điều kiện chờ user; bản mẫu trình user duyệt ở GATE 1c.
- Q4: **ĐÃ TRẢ LỜI (user, 2026-10-11): CÓ đồng hồ đếm ngược tới mùng 1 Tết (dạng "còn X ngày").** Nguyên văn: "q4 có đồng hồ đếm ngược". ⇒ AC10 (mục 3) và task T7 trong plan ở trạng thái BẬT.
- Q5: **ĐÃ TRẢ LỜI (user, 2026-10-11): cần URL công khai — deploy bằng GitHub Pages.** Nguyên văn: "Dùng astro starlight + đẩy lên github pages, fe thì dùng tailwindcss" (ghi tại docs/adr/0001-stack.md).
- Q6: Deadline mong muốn và đây có phải bản demo để đánh giá quy trình (không cần hoàn thiện) không?
- Q7: Ngôn ngữ hiển thị ngày: chỉ dương lịch, hay cần thêm âm lịch (ví dụ "Mùng 1 tháng Giêng")?
- Q8: Trình duyệt/thiết bị tối thiểu cần hỗ trợ (Chrome/Safari/Firefox bản mới, hay cả trình duyệt cũ)?

## 7. Rủi ro

- R1: Yêu cầu còn mơ hồ (mục đích, thương hiệu, nội dung) — đã xử lý: Q1(a), Q2(a) (đã xác nhận lại 2026-10-11), Q3(a) chốt ngày 2026-10-11.
- R2: Ngày Tết có thể bị sai nếu lấy từ nguồn không kiểm chứng — đã kiểm chứng và ghi nguồn; nếu có nguồn chính thống khác thì cập nhật lại.
- R3: Bản quyền hình ảnh Tết lấy từ internet — cần dùng ảnh tự tạo/ảnh có giấy phép, hoặc chỉ dùng CSS/hình vẽ.
- R4: Phạm vi phình ra (thêm form, đếm ngược, đa ngôn ngữ) — mọi thứ ngoài mục 4 phải qua gate để user duyệt lại. **Lưu ý**: đếm ngược (AC10) đã được user yêu cầu ⇒ nay thuộc phạm vi, nhưng vẫn phải user duyệt khi duyệt plan ở GATE 1c vì là tiêu chí thêm sau baseline.
- R5: Tiêu chí AC9 (thời gian tải) phụ thuộc môi trường đo — chốt đo trên localhost, mạng thường.
- R6: Đếm ngược "test xanh mà sản phẩm sai" nếu AC không đủ chi tiết (mốc, timezone, làm tròn, hành vi sau mốc, fallback) — đã chi tiết hoá ở AC10.

## 8. Gate

- GATE 1a: **ĐÃ QUA** — user duyệt spec này ngày 2026-10-11 (qua Chief). Được phép chuyển sang bước thiết kế.
- Bước tiếp theo: Architect hoàn thiện `docs/plan.md`; user duyệt plan + nội dung ở GATE 1c. Q1(a), Q2(a), Q3(a), Q4 (có đếm ngược), Q5 đã chốt ngày 2026-10-11; **Q6, Q7, Q8 chưa trả lời**; **Q2 đã được user xác nhận lại ngày 2026-10-11**.
- **Thay đổi phạm vi cần user duyệt lại ở GATE 1c:** (1) deploy URL công khai (GitHub Pages) từ out-of-scope sang in-scope; (2) AC10 (đếm ngược) là tiêu chí mới thêm sau baseline GATE 1a; (3) chi tiết hoá AC10 (mốc cố định UTC+7, làm tròn lên, hành vi sau mốc, fallback `<noscript>`) — **không đổi tiêu chí, chỉ làm rõ**.
- **AC11 (đề xuất của Analyst — ĐÃ CÓ QUYẾT ĐỊNH: KHÔNG THÊM):** đề xuất là một AC kiểm được màu — "hero dùng nền đỏ hoặc vàng truyền thống, chữ trên nền đạt tương phản ≥ 4,5:1". **User chốt ngày 2026-10-11, group chat "Demo MVP 1" (nguyên văn: "ac11 chưa cần") ⇒ AC11 KHÔNG được thêm vào spec.** Theme đỏ–vàng (Q2a) vẫn được kiểm bằng mắt ở bước review. Muốn thêm sau này thì phải qua gate mới.

## 9. Nguồn các câu trả lời

- Q1(a), Q2(a), Q3(a), Q4: user trả lời qua chat Analyst (BA), 2026-10-11; Analyst báo nguyên văn cho Chief và Chief push vào spec này.
- Q2(a) xác nhận lại: user gõ nguyên văn "ĐÚNG", group chat "Demo MVP 1", 2026-10-11; Chief push bản cập nhật này.
- AC11: user gõ nguyên văn "ac11 chưa cần", group chat "Demo MVP 1", 2026-10-11 ⇒ không thêm AC11; Chief push.
- Q5 + stack: user trả lời qua chat Architect, 2026-10-11 08:57 (anchor `#331`), ghi tại `docs/adr/0001-stack.md` mục 0.
- Chi tiết hoá AC10 (mốc, làm tròn, hành vi sau mốc, fallback): do **Analyst** soạn (đề xuất làm tròn lên) và **CodeReader** nêu 4 điểm kỹ thuật (mốc `2027-02-06T00:00:00+07:00`, dừng tick sau mốc, `<noscript>` + giữ độ cao, test 4 thời điểm); Chief tổng hợp và push. Không thêm tiêu chí mới.
- Quyết định triển khai (Astro thường thay Starlight; repo public) ghi tại `docs/adr/0001-stack.md` + `docs/adr/0002-bo-starlight-va-repo-public.md`, không ghi trong spec.
- Quy ước: mỗi dòng mang tính quyết định phải có nguồn (ai nói · khi nào · kênh). Thiếu nguồn ⇒ coi như chưa chốt.
