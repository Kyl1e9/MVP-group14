// ============================
// browse.js — 尋找物資頁邏輯
// ============================

let allItems = [];

/**
 * 渲染物品卡片至容器
 * @param {Array} items
 */
function renderCards(items) {
  const container = document.getElementById('items-container');
  const countEl = document.getElementById('result-count');

  if (items.length === 0) {
    container.innerHTML = `
      <div class="col-12">
        <div class="empty-state">
          <div class="empty-icon">🔍</div>
          <p>目前沒有符合的物資，請嘗試其他關鍵字或分類。</p>
          <button class="btn btn-outline-success btn-sm" id="empty-reset-btn">清除篩選條件</button>
        </div>
      </div>`;
    document.getElementById('empty-reset-btn')?.addEventListener('click', resetFilters);
  } else {
    container.innerHTML = items.map(item => `
      <div class="col-sm-6 col-md-4 col-lg-3">
        <a href="item-detail.html?id=${item.id}" class="item-card">
          <img src="${item.image}" alt="${item.title}" loading="lazy" />
          <div class="card-body">
            <span class="item-category-badge">${item.category}</span>
            <h3 class="card-title mt-2">${item.title}</h3>
            <div class="item-meta">📍 ${item.location}</div>
            <div class="item-meta">🕐 ${item.date}</div>
          </div>
        </a>
      </div>
    `).join('');
  }

  countEl.textContent = `共找到 ${items.length} 件物資`;
}

/**
 * 依搜尋條件過濾
 */
function filterItems() {
  const keyword = document.getElementById('search-input').value.trim().toLowerCase();
  const category = document.getElementById('category-select').value;

  let result = allItems.filter(item => item.status === 'available');

  if (keyword) {
    result = result.filter(item =>
      item.title.toLowerCase().includes(keyword) ||
      item.description.toLowerCase().includes(keyword)
    );
  }

  if (category) {
    result = result.filter(item => item.category === category);
  }

  renderCards(result);
}

/**
 * 重設搜尋條件
 */
function resetFilters() {
  document.getElementById('search-input').value = '';
  document.getElementById('category-select').value = '';
  filterItems();
}

// 頁面初始化
document.addEventListener('DOMContentLoaded', () => {
  fetch('data/items.json')
    .then(res => res.json())
    .then(items => {
      allItems = items;
      filterItems();
    })
    .catch(() => {
      document.getElementById('items-container').innerHTML =
        '<div class="col-12 text-center text-danger py-4">無法載入物資資料，請重新整理頁面。</div>';
    });

  document.getElementById('search-input').addEventListener('input', filterItems);
  document.getElementById('category-select').addEventListener('change', filterItems);
  document.getElementById('reset-btn').addEventListener('click', resetFilters);
});
