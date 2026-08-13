# MVP-group14 — 閒置物資共享平台

純靜態 MVP 網站，使用 HTML5 + CSS3 + Vanilla JavaScript + Bootstrap 5。

## 頁面結構

| 頁面 | 檔案 | 說明 |
|------|------|------|
| 首頁 | `index.html` | Hero、特色介紹、最新物資（前 6 筆） |
| 尋找物資 | `browse.html` | 關鍵字搜尋 + 分類篩選 + 卡片列表 |
| 物品詳情 | `item-detail.html` | 單一物品完整資訊 + 索取按鈕 |
| 我要提供物資 | `donate.html` | 表單（Formspree） |
| 我要索取 | `request.html` | 申請表單（Formspree） |
| 我的刊登 | `my-listings.html` | 所有物品列表 + 狀態統計 |
| 關於平台 | `about.html` | 使命、流程、FAQ |

## 技術說明

- **UI 框架**：Bootstrap 5.3 CDN
- **資料來源**：`data/items.json`（12 筆假資料，`fetch()` 讀取）
- **表單服務**：Formspree（需替換 action 中的 `YOUR_FORM_ID`）
- **無需後端**：可直接部署至 GitHub Pages

## 快速啟動

直接用瀏覽器開啟 `index.html`，或使用 VS Code Live Server。

> **注意**：`fetch()` 在 `file://` 協議下可能受 CORS 限制，建議使用 Live Server 或任何本地 HTTP Server。

## 表單設定

1. 到 [Formspree](https://formspree.io) 申請帳號並建立表單
2. 取得 endpoint ID（格式：`xxxxxxxx`）
3. 將 `donate.html` 與 `request.html` 中的 `YOUR_FORM_ID` 替換為實際 ID
