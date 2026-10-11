// Every Vietnamese string shown on the page lives here, copied verbatim from
// docs/content.md (blob 7d21a4d7, APPROVED at GATE 1c). That file is the single source of
// copy for this project: do not reword, translate, or "smooth out" anything here. Changes
// go through the Analyst and Chief, who update docs/content.md first.
//
// Drift rule (plan T3): each string rendered on the page must be a substring of
// docs/content.md, whitespace and line breaks aside.

export const site = {
  /** <title> — docs/content.md § Hero, "Tiêu đề chính". */
  title: 'Tết 2027 Happier',
  /** <meta name="description"> — docs/content.md § Footer. */
  description:
    'Tết 2027 Happier — trang giới thiệu Tết Nguyên đán Đinh Mùi 2027. Ngày Tết theo lịch âm 2027.',

  hero: {
    heading: 'Tết 2027 Happier',
    subheading: 'Tết Nguyên đán Đinh Mùi 2027',
    milestone: 'Mùng 1 Tết: thứ Bảy, 06/02/2027 · Tất niên: thứ Sáu, 05/02/2027',
    zodiac: 'Năm Đinh Mùi — năm con Dê',
  },

  countdown: {
    /** Rendered as-is; `{X}` is replaced by the rounded-up number of days. */
    labelTemplate: 'Còn {X} ngày nữa là đến mùng 1 Tết',
    /** Static text that stays in the HTML for the no-JS case (AC8, AC10). */
    noscriptFallback: 'Mùng 1 Tết Đinh Mùi: thứ Bảy, 06/02/2027',
    /** Label shown after the milestone passes; the clock stops ticking (AC10). */
    afterMilestone: 'Chúc Mừng Năm Mới',
    /** 2027-02-06T00:00:00+07:00 — mùng 1 Tết, fixed Vietnam time (AC10). */
    targetIso: '2027-02-06T00:00:00+07:00',
  },

  blocks: [
    {
      id: 'tet-nguyen-dan-2027',
      heading: 'Tết Nguyên đán 2027',
      paragraphs: [
        'Tết Nguyên đán 2027 là Tết Đinh Mùi. Mùng 1 rơi vào thứ Bảy, 06/02/2027; ngày tất niên là thứ Sáu, 05/02/2027. Mùng 1 vào cuối tuần nên kỳ nghỉ thường được nối dài, thuận tiện cho sum họp và du xuân.',
        'Trong 12 con giáp, Mùi là con Dê — hình ảnh quen thuộc của sự hiền hoà, bình an và ấm no. Người Việt xem Tết là dịp khép lại một năm, gác lại bộn bề để bắt đầu năm mới nhẹ nhõm hơn.',
      ],
    },
    {
      id: 'phong-tuc-ngay-tet',
      heading: 'Phong tục ngày Tết',
      paragraphs: [
        'Từ 23 tháng Chạp, nhiều gia đình làm lễ tiễn ông Công ông Táo về trời. Những ngày sau đó là dọn nhà, gói bánh chưng bánh tét, sắm câu đối và hoa. Đêm giao thừa có lễ cúng ngoài trời, rồi cả nhà quây quần bên mâm cỗ.',
      ],
      listItems: [
        'Dọn nhà, lau dọn bàn thờ, sắm sửa mâm ngũ quả',
        'Gói bánh chưng, bánh tét cùng gia đình',
        'Chúc Tết ông bà, cha mẹ; mừng tuổi trẻ nhỏ và người lớn tuổi',
        'Đi chùa, xin chữ, du xuân đầu năm',
      ],
    },
    {
      id: 'loi-chuc-tet',
      heading: 'Lời chúc Tết',
      paragraphs: [
        'Năm mới, lời chúc giản dị thường là lời chúc được nhớ nhất. Vài câu bạn có thể dùng ngay:',
      ],
      listItems: [
        '"Năm mới an khang, thịnh vượng, vạn sự như ý."',
        '"Chúc mừng năm mới Đinh Mùi — cả nhà mạnh khoẻ, bình an, gặp nhiều may mắn."',
        '"Tết này sum họp đủ đầy, năm mới hanh thông mọi việc."',
      ],
    },
  ],

  /** docs/content.md § Footer. */
  footer:
    'Tết 2027 Happier — trang giới thiệu Tết Nguyên đán Đinh Mùi 2027. Ngày Tết theo lịch âm 2027.',
} as const
