# MVP-group14 — 閒置物資共享平台

讓閒置物資找到真正需要的人。純靜態 MVP 網站，使用 HTML5 + CSS3 + Vanilla JavaScript + Bootstrap 5，無需後端即可運行。

## 頁面結構

| 頁面 | 檔案 | 說明 |
|------|------|------|
| 首頁 | `index.html` | Hero、平台特色介紹、最新物資（前 6 筆） |
| 尋找物資 | `browse.html` | 關鍵字搜尋 + 分類篩選 + 物品卡片列表 |
| 物品詳情 | `item-detail.html` | 單一物品完整資訊 + 索取按鈕 |
| 我要提供物資 | `donate.html` | 刊登表單，支援照片上傳（base64），資料存入 localStorage |
| 我要索取 | `request.html` | 索取申請表單，資料存入 localStorage |
| 我的刊登 | `my-listings.html` | 刊登物品列表（含統計）+ 可刪除自己的刊登 |
| 關於平台 | `about.html` | 平台使命、使用流程、FAQ |

## 檔案結構

```
MVP-group14/
├── index.html
├── browse.html
├── item-detail.html
├── donate.html
├── request.html
├── my-listings.html
├── about.html
├── css/
│   └── style.css           自訂樣式（品牌色、卡片、上傳區等）
├── js/
│   ├── items-data.js        12 筆內建示範物品資料（JS 變數，無需 fetch）
│   ├── browse.js            尋找物資：搜尋 + 分類過濾邏輯
│   ├── item-detail.js       物品詳情：URL params 讀取 + 動態渲染
│   └── main.js              共用：導覽列 active 狀態
└── data/
    └── items.json           示範物品資料（備份用）
```

## 技術說明

- **UI 框架**：Bootstrap 5.3 CDN
- **物品資料**：內嵌於 `js/items-data.js`（`ITEMS_DATA` 變數），相容 `file://` 直接開啟
- **表單資料**：使用 `localStorage` 儲存，無需後端或第三方服務
- **照片上傳**：透過 `FileReader` 將圖片轉為 base64 儲存，支援點擊與拖曳上傳
- **物品圖片**：示範資料使用 Unsplash 免費授權圖片

## 快速啟動

直接用瀏覽器**雙擊開啟** `index.html` 即可，無需伺服器。

> 若使用 VS Code，也可安裝 **Live Server** 擴充功能後以右鍵 → Open with Live Server 開啟，體驗更佳。

## localStorage 資料說明

| Key | 說明 |
|-----|------|
| `donated_items` | 使用者透過「我要提供物資」表單新增的物品 |
| `request_logs` | 使用者透過「我要索取」表單送出的申請紀錄 |

> ⚠️ localStorage 資料儲存於瀏覽器本地，清除瀏覽器資料後會消失。這是 MVP 展示設計，正式上線需搭配後端資料庫。

## 部署至 GitHub Pages

1. 確認 Repository 為 **Public**
2. 到 Repository → **Settings** → **Pages**
3. Source 選 `Deploy from a branch`，Branch 選目標分支，Folder 選 `/ (root)`
4. 點 **Save**，等待約 1-2 分鐘後即可上線
