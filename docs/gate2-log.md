# GATE 2 — hồ sơ merge + deploy (2026-10-11)

- Người ghi: **Chief**. Nguồn sự thật: chat nhóm "Demo MVP 1" + `git ls-remote` + API GitHub.
- Bản này cập nhật theo đối chiếu của Architect (verdict R10 + bảng kiểm `curl`), thay cho bản đầu.

## 1. Lệnh của user (nguyên văn, giữ đúng lỗi chính tả)

> `GẤP RÚT BỎA QUA TEST, MERGE VÀ DEPLOY ĐỂ TÔI THẤY SẢN PHẨM` `[sic]`

- **Kênh**: group chat "Demo MVP 1" · **ai**: user · **khi nào**: 2026-10-11, ngay trước lệnh merge.
- Diễn giải đã chốt: đây là **lệnh GATE 2 hợp lệ**, user chấp nhận **bỏ qua phần chờ test/review** để thấy sản phẩm.
- Hệ quả: một số việc kiểm thử trở thành **nợ đã biết** (xem §6).

## 2. Đã thực hiện

| Việc | Số liệu |
|---|---|
| Merge PR #2 vào `main` | merge commit **`4afe6b5`**, hai cha `3bc2149` + `0e3b3cc`; **tree `f87aeb3c1a39…` trùng đúng tree `0e3b3cc`** đã được Architect chấm ⇒ không có code sản phẩm nào chưa review lọt vào `main` |
| Workflow deploy | `1cedfeb` (bản đầu) → **`fc0a8494`** (sửa 4 điểm; blob `e71cc7bc`) → **`a97fb363`** (chú thích) → **`64996ebe`** (**gỡ `push: main`**; blob hiện hành **`b6c5753a`**) |
| Bản workflow hiện hành | blob **`b6c5753a`** (3630 B), `main` = **`64996ebe`**: `on:` **chỉ `workflow_dispatch`**; `permissions` mức workflow `contents: read`; `pages: write` + `id-token: write` **chỉ ở job `deploy`**; **5/5 `actions/*` pin SHA**; `timeout-minutes: 15`; `configure-pages` **trước** install/build; header trích verbatim có `[sic]`. **Architect đã chấm ĐẠT cả (a)–(e)** |
| Bằng chứng trigger đã hết | commit **`64996ebe` lên `main` mà KHÔNG sinh run nào**; trước đó mỗi commit đều tự sinh một run `push` (3 lần: 10:05:22Z / 10:07:12Z / 10:08:09Z) |
| Pages | **user tự bật** (Settings → Pages → Source = "GitHub Actions"), 2026-10-11 |
| Deploy thành công | run **`38130989159`** (push `3379084`), **10:10:19Z, success** |

## 3. Vì sao "cập nhật token GitHub" không gỡ được chặn

1. Workflow chạy bằng **`GITHUB_TOKEN` tự động của Actions**, không dùng token của user (file không khai `secrets`, không có PAT).
2. `list_secrets` trả: `GITHUB_TOKEN — for GitHub connector — for no Bot — you may not use it` ⇒ **không Bot nào** bật Pages hộ qua API được.
3. Bản workflow từng có `enablement: true` **cũng fail** ⇒ đường "CI tự bật Pages" **không tồn tại**.

Bằng chứng: 3 run tự chạy đầu tiên đều **fail ở bước `Configure Pages`**, các bước sau và job `deploy` bị skip.

**Đã rút lại một bằng chứng:** `GET /repos/.../pages` **không auth trả 404 ngay cả khi trang đang sống 200** (Architect tự phát hiện) ⇒ **không** dùng endpoint đó làm chỉ báo "Pages tắt". Hồ sơ chỉ dùng: site/favicon **404 → 200** và trạng thái run.

## 4. Trang đã lên mạng — hai nguồn kiểm

`https://001123.github.io/dsh-bot-demo-mvp-1/`

| Kiểm | Chief (`curl`) | Architect (`curl` độc lập, 10:17:39Z) |
|---|---|---|
| index | **200**, `<title>Tết 2027 Happier</title>` | **200** `text/html; charset=utf-8`, 5214 B |
| `{base}/favicon.svg` | **200** `image/svg+xml` | **200**, 617 B |
| URL trang tham chiếu | **200 / 200**, không URL ≥400 | **200 / 200**, không URL ≥400 |
| Chuỗi nội dung | 7/7 có | 7/7 có |
| Cấu trúc | 3 `<h2>`, 1 element `[data-countdown]`, 1 `<noscript>` | khớp (chuỗi `data-countdown` xuất hiện 2 lần trong HTML: element + selector trong `<script>`) |

⇒ AC5 đạt **trên môi trường thật**. Label **`deployed-test`** đã gắn vào Issue #1.

## 5. Công tắc chặn — theo thiết kế ban đầu

**Pages bật bằng tay = công tắc chặn thứ hai.** Hồ sơ **không** ghi "đã xác nhận `has_pages=false`", mà ghi: chứng cứ đã kiểm **chứng minh chưa có gì được phát tán** ở thời điểm trước khi bật; việc bật Pages là thao tác của user.
**Lớp chặn còn thiếu (việc của user):** bật **required reviewer** cho environment **`github-pages`** (Settings → Environments → `github-pages` → Required reviewers). Có nó thì kể cả có người bấm "Run workflow", deploy **dừng chờ người duyệt**.

## 6. Việc còn lại sau khi user đã thấy sản phẩm

1. ~~Quay trigger về `workflow_dispatch`~~ — **ĐÃ XONG** ở commit `64996ebe`; bằng chứng: commit đó lên `main` **không sinh run nào**.
2. ~~Sửa comment verbatim `BỎ` → `BỎA` `[sic]`~~ — **ĐÃ XONG** ngay trong blob `b6c5753a`.
3. **Đưa bộ test mới hơn vào `main` bằng một PR riêng** — đã mở **PR #3** (`feat/t1-scaffold` → `main`, draft, head `d9a1f00b`, tree `8ed7410c`), **6 file**:
   - `tests/e2e/landing.spec.ts` **`3110b419`** — test R9 (trang ⊆ `docs/content.md`), AC9 `CI ? 8000 : 3000`, `srcset`
   - `tests/e2e/countdown.spec.ts` **`5dcf3300`** — chỉ sửa comment nguồn; vẫn 10 ca
   - `tests/e2e/responsive.spec.ts` **`c72addf5`** — harden AC4 (`fonts.ready` + 2×`rAF`, in số đo)
   - `playwright.config.ts` **`d4963484`** · `package.json` **`18c99fa5`** (**`test:e2e:gate = --workers=1`**) · `README.md` **`ba182f77`**
   ⇒ Δ review của Architect cho `d9a1f00b`: **PASS**, kèm **10/10 lần chạy xanh với `retries = 0`** (5 single-worker + 5 parallel), số đo AC4 trùng khít từng pixel. Giới hạn nói rõ: 10 lần xanh **không** chứng minh tuyệt đối là hết flake.
4. **Không thay** `deploy-pages.yml` đang chạy trên `main`: blob `43cd6bf4` (nháp trong workspace) chỉ khác `b6c5753a` ở cách khai `permissions`; giữ file **đang chạy được** là rủi ro thấp nhất.

**Số test — ghi theo hai mốc, không gộp:**
- **20** @ tree `f87aeb3c` — bản **đang live** trên `main` (`npx playwright test --list` → `Total: 20 tests in 3 files`: countdown 10 · landing 8 · responsive 2).
- **21** @ `d9a1f00b` — sau khi test R9 vào (PR #3).
- Con số 24/25 **không tồn tại** ở mốc nào (Architect đã rút số 25).

**Quy ước chạy bằng chứng (đã sửa):** chạy lấy bằng chứng flake phải **KHÔNG đặt `CI`** (để `retries = 0`); `CI=1` chỉ đổi AC9 budget thành 8000 và bật `retries: 1` — bật nó là **che** flake, không được dùng làm bằng chứng. `reuseExistingServer: false` nay là **vô điều kiện**, nên lý do cũ "`CI=1` để buộc dựng server mới" không còn đúng.

## 7. Rollback

- **Nhanh nhất**: tắt Pages (Settings → Pages) — chặn phát tán ngay, không cần build lại.
- Sau đó: **`git revert -m 1 4afe6b5`** — lịch sử nguyên vẹn (commit merge có hai cha `3bc2149` + `0e3b3cc`), `-m 1` giữ nhánh `main`.
- Site tĩnh ⇒ **không có rollback dữ liệu**. Không xoá nhánh, không xoá artifact, không sửa lịch sử.

## 8. Lệch quy trình đã ghi nhận (không giấu)

`.github/workflows/deploy-pages.yml` đã **3 lần** đổi trên `main` mà **chưa qua review trước** của Architect (`1cedfeb`, `fc0a8494`, `a97fb363`); commit `64996ebe` cũng lên trước khi có verdict, dù nội dung đúng. Cam kết của Chief: **kể cả sửa comment trong `.github/workflows/*` cũng gửi Architect blob trước khi lên `main`** (R10). Ghi kèm 3 lần auto-deploy làm bằng chứng vì sao phải quay về `workflow_dispatch`.
