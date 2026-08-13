// ============================
// item-detail.js — 物品詳情頁
// ============================

document.addEventListener('DOMContentLoaded', () => {
  const params = new URLSearchParams(window.location.search);
  const itemId = params.get('id');
  const container = document.getElementById('detail-container');
  const breadcrumb = document.getElementById('breadcrumb-title');

  if (!itemId) {
    container.innerHTML = `
      <div class="text-center py-5">
        <p class="text-danger fs-5">未指定物品 ID。</p>
        <a href="browse.html" class="btn btn-success mt-2">← 返回尋找物資</a>
      </div>`;
    return;
  }

  // 先查 localStorage（自己刊登的），再查內嵌資料
  const localItems = JSON.parse(localStorage.getItem('donated_items') || '[]');
  const allItems = [...localItems, ...ITEMS_DATA];
  const item = allItems.find(i => i.id == itemId);

  if (!item) {
    container.innerHTML = `
      <div class="text-center py-5">
        <p class="text-danger fs-5">找不到指定的物品（ID: ${itemId}）。</p>
        <a href="browse.html" class="btn btn-success mt-2">← 返回尋找物資</a>
      </div>`;
    return;
  }

  breadcrumb.textContent = item.title;
  document.title = `${item.title} — 閒置物資共享平台`;

  const isAvailable = item.status === 'available';
  const statusBadge = isAvailable
    ? '<span class="badge-available">可認領</span>'
    : '<span class="badge-claimed">已被認領</span>';

  const requestBtn = isAvailable
    ? `<a href="request.html?id=${item.id}" class="btn btn-success btn-lg w-100 mb-2">🛍️ 我要索取</a>`
    : `<button class="btn btn-secondary btn-lg w-100 mb-2" disabled>已被認領</button>`;

  container.innerHTML = `
    <div class="row g-4">
      <div class="col-md-5">
        <img src="${item.image}" alt="${item.title}" class="item-detail-img" />
      </div>
      <div class="col-md-7">
        <div class="d-flex align-items-center gap-2 mb-2">
          <span class="item-category-badge">${item.category}</span>
          ${statusBadge}
        </div>
        <h1 class="h3 fw-bold mb-3">${item.title}</h1>
        <table class="item-detail-meta-table w-100 mb-4">
          <tbody>
            <tr><td>物品狀況</td><td>${item.condition}</td></tr>
            <tr><td>所在地區</td><td>📍 ${item.location}</td></tr>
            <tr><td>提供者</td><td>👤 ${item.donor}</td></tr>
            <tr><td>刊登日期</td><td>🕐 ${item.date}</td></tr>
          </tbody>
        </table>
        <h5 class="fw-semibold mb-2">物品描述</h5>
        <p class="text-muted" style="line-height:1.8;">${item.description}</p>
        <div class="mt-4">
          ${requestBtn}
          <a href="browse.html" class="btn btn-outline-secondary w-100">← 返回尋找物資</a>
        </div>
      </div>
    </div>
  `;
});
