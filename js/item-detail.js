/* ============================================================
   item-detail.js — 讀取 URL params 顯示單一物品
   ============================================================ */

(async function () {
  const params = new URLSearchParams(location.search);
  const id     = parseInt(params.get('id'));
  const wrap   = document.getElementById('detailContent');

  if (!id) {
    wrap.innerHTML = `<div class="alert alert-error">找不到物品 ID，請從<a href="browse.html">物資列表</a>進入。</div>`;
    return;
  }

  // Merge local + remote
  const remote = await fetchItems();
  const local  = Store.getListings();
  const ALL    = [...local, ...remote];
  const item   = ALL.find(i => i.id === id);

  if (!item) {
    wrap.innerHTML = `<div class="alert alert-error">找不到此物品（ID=${id}），可能已被刪除。<a href="browse.html">返回列表</a></div>`;
    return;
  }

  document.title = `${item.title} — 物資共享平台`;

  const tagsHtml = (item.tags || []).map(t => `<span class="tag">${t}</span>`).join(' ');

  wrap.innerHTML = `
    <h1 class="detail-title">${item.title}</h1>
    <div class="flex gap-8 mb-24 flex-wrap">
      ${conditionBadge(item.condition)}
      ${availableBadge(item.available)}
    </div>

    <div class="detail-layout">
      <!-- Left: image + description -->
      <div>
        <img class="detail-img" src="${item.image}" alt="${item.title}"
             onerror="this.src='https://via.placeholder.com/600x400?text=圖片載入失敗'">

        <div style="margin-top:24px;">
          <h3 style="font-weight:700;margin-bottom:10px;">物品描述</h3>
          <p style="color:var(--muted);line-height:1.8;">${item.description}</p>
        </div>

        ${tagsHtml ? `<div class="flex gap-8 flex-wrap mt-16">${tagsHtml}</div>` : ''}
      </div>

      <!-- Right: sidebar -->
      <div class="detail-sidebar">
        <h3 style="font-weight:700;margin-bottom:16px;">物品資訊</h3>
        <div class="detail-meta">
          <div class="detail-meta-row">
            <span class="detail-meta-label">分類</span>
            <span class="detail-meta-value">🗂 ${item.category}</span>
          </div>
          <div class="detail-meta-row">
            <span class="detail-meta-label">狀態</span>
            <span class="detail-meta-value">${item.condition}</span>
          </div>
          <div class="detail-meta-row">
            <span class="detail-meta-label">地區</span>
            <span class="detail-meta-value">📍 ${item.location}</span>
          </div>
          <div class="detail-meta-row">
            <span class="detail-meta-label">刊登者</span>
            <span class="detail-meta-value">👤 ${item.donor}</span>
          </div>
          <div class="detail-meta-row">
            <span class="detail-meta-label">刊登日</span>
            <span class="detail-meta-value">📅 ${item.postedAt}</span>
          </div>
        </div>

        <hr style="border:none;border-top:1px solid var(--border);margin:16px 0;">

        ${item.available
          ? `<a href="request.html?id=${item.id}" class="btn btn-accent btn-block btn-lg">🙋 我要索取</a>
             <p class="text-muted text-center mt-8" style="font-size:.82rem;">填寫申請後，提供者會與你聯繫</p>`
          : `<div class="alert alert-error" style="justify-content:center;">此物品已被認領</div>
             <a href="browse.html" class="btn btn-outline btn-block mt-8">瀏覽其他物品</a>`
        }
      </div>
    </div>
  `;
})();
