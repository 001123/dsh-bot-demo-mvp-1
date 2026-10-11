# Nội dung mẫu — landing "Tết 2027 Happier"

> **Trạng thái: APPROVED — user duyệt ở GATE 1c ngày 2026-10-11** (nguyên văn: "Duyệt", group chat "Demo MVP 1", 2026-10-11).
>
> Nguồn: Analyst (BA), 2026-10-11, chat Analyst ↔ user. Nội dung thuộc Q1(a)/Q2(a)/Q3(a); không dùng ảnh ngoài (R3).
> Bổ sung 2026-10-11 (Chief push theo đề xuất nguyên văn của Analyst, group chat "Demo MVP 1"): chuỗi trạng thái sau mốc 0, để khớp AC10.
> **Bổ sung 2026-10-11 lần 2 (Chief push theo delta nguyên văn của Analyst, group chat "Demo MVP 1"): chuỗi âm lịch cho hero — user chốt Q7 = "cả 2" (hiển thị cả dương lịch và âm lịch). Các chuỗi cũ giữ nguyên.**
> **Sửa 2026-10-11 (Chief, sau khi Analyst phát hiện lệch hoa/thường): chốt chuỗi neo để test AC2 không phụ thuộc hoa/thường — xem "Ghi chú cho CodeReader". Không đổi chuỗi hiển thị nào.**

## Hero
- Tiêu đề chính: **Tết 2027 Happier**
- Tiêu đề phụ: Tết Nguyên đán Đinh Mùi 2027
- Dòng mốc thời gian (Q7 — hiển thị cả dương lịch và âm lịch): Mùng 1 Tết: thứ Bảy, 06/02/2027 (dương lịch) · mùng 1 tháng Giêng năm Đinh Mùi (âm lịch) · Tất niên: thứ Sáu, 05/02/2027 (ngày cuối tháng Chạp)
- Chuỗi âm lịch bắt buộc, NGUYÊN VĂN — CodeReader KHÔNG được tự đặt: "Mùng 1 tháng Giêng năm Đinh Mùi" (viết hoa "Mùng" khi đứng đầu câu, viết thường "mùng" khi đứng giữa câu)
- Con giáp: Năm Đinh Mùi — năm con Dê

## Đồng hồ đếm ngược (AC10)
- Nhãn: "Còn {X} ngày nữa là đến mùng 1 Tết"
- Fallback text tĩnh khi tắt JS (phải nằm sẵn trong HTML, NGUYÊN VĂN): "Mùng 1 tháng Giêng năm Đinh Mùi — thứ Bảy, 06/02/2027 (dương lịch)"
- Sau mốc 0 — thay cho nhãn, đồng hồ dừng tick: "Chúc Mừng Năm Mới" (giữ đúng chữ hoa/thường này để khớp AC10; khác với lời chúc trong Khối 3)
- Nhãn chuẩn để render/assert là đúng câu: "Còn {X} ngày nữa là đến mùng 1 Tết". Ghi "còn X ngày" ở plan T7 chỉ là mô tả, không phải chuỗi hiển thị.

## Khối 1 — Tết Nguyên đán 2027
Tết Nguyên đán 2027 là Tết Đinh Mùi. Mùng 1 rơi vào thứ Bảy, 06/02/2027; ngày tất niên là thứ Sáu, 05/02/2027. Mùng 1 vào cuối tuần nên kỳ nghỉ thường được nối dài, thuận tiện cho sum họp và du xuân.

Trong 12 con giáp, Mùi là con Dê — hình ảnh quen thuộc của sự hiền hoà, bình an và ấm no. Người Việt xem Tết là dịp khép lại một năm, gác lại bộn bề để bắt đầu năm mới nhẹ nhõm hơn.

## Khối 2 — Phong tục ngày Tết
Từ 23 tháng Chạp, nhiều gia đình làm lễ tiễn ông Công ông Táo về trời. Những ngày sau đó là dọn nhà, gói bánh chưng bánh tét, sắm câu đối và hoa. Đêm giao thừa có lễ cúng ngoài trời, rồi cả nhà quây quần bên mâm cỗ.

- Dọn nhà, lau dọn bàn thờ, sắm sửa mâm ngũ quả
- Gói bánh chưng, bánh tét cùng gia đình
- Chúc Tết ông bà, cha mẹ; mừng tuổi trẻ nhỏ và người lớn tuổi
- Đi chùa, xin chữ, du xuân đầu năm

## Khối 3 — Lời chúc Tết
Năm mới, lời chúc giản dị thường là lời chúc được nhớ nhất. Vài câu bạn có thể dùng ngay:

- "Năm mới an khang, thịnh vượng, vạn sự như ý."
- "Chúc mừng năm mới Đinh Mùi — cả nhà mạnh khoẻ, bình an, gặp nhiều may mắn."
- "Tết này sum họp đủ đầy, năm mới hanh thông mọi việc."

## Footer
Tết 2027 Happier — trang giới thiệu Tết Nguyên đán Đinh Mùi 2027. Ngày Tết theo lịch âm 2027.

## Ghi chú cho CodeReader
- Không dùng ảnh tải từ internet; hoạ tiết (hoa mai, đèn lồng, câu đối) vẽ bằng SVG/CSS. Nếu có `<img>` thì phải có `alt` tiếng Việt mô tả nội dung (AC5).
- Khối đếm ngược: text tĩnh fallback phải có sẵn trong HTML (AC8); JS chỉ cập nhật số ngày, không gọi API/backend (AC10); console không lỗi trước và sau khi giá trị cập nhật (AC6).
- Mọi link nếu có phải là URL thật, không dùng `"#"` rỗng (AC7).
- "Happier" dùng như tên/chủ đề trang, không phải logo/thương hiệu cần asset (Q2a).
- Chuỗi âm lịch bắt buộc trong hero là `mùng 1 tháng Giêng năm Đinh Mùi` (chữ "mùng" viết thường vì đứng giữa câu). Chuỗi neo để test AC2 là `tháng Giêng năm Đinh Mùi` — không phụ thuộc hoa/thường, có mặt ở cả hero và fallback. Không tự đổi chữ nào.
- Nguồn lịch (R2): Tết Đinh Mùi 2027 — mùng 1 tháng Giêng = thứ Bảy 06/02/2027; tất niên = thứ Sáu 05/02/2027. Nguồn: Tuổi Trẻ Mực Tím — https://muctim.tuoitre.vn/con-bao-nhieu-ngay-nua-den-tet-dinh-mui-2027-101260218100410746.htm (bài gốc gọi ngày tất niên là "29 Tết").
