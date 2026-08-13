/* ============================================================
   browse.js — 尋找物資：搜尋 + 分類 + 列卡
   ============================================================ */

(async function () {
  // Load remote JSON + local listings merged
  const remote = await fetchItems();
  const local  = Store.getListings();
  const ALL    = [...local, ...remote];

  let currentCat    = '全部';
  let currentSearch = '';

  // ---------- Render ----------
  function render() {
    let items = ALL;

    // Filter: available only toggle can be added later; show all for now
    if (currentCat !== '全部') {
      items = items.filter(i => i.category === currentCat);
    }
    if (currentSearch) {
      const q = currentSearch.toLowerCase();
      items = items.filter(i =>
        i.title.toLowerCase().includes(q) ||
        i.description.toLowerCase().includes(q) ||
        (i.tags || []).some(t => t.toLowerCase().includes(q))
      );
    }

    const grid  = document.getElementById('itemGrid');
    const count = document.getElementById('resultCount');

    count.textContent = `共 ${items.length} 筆結果`;

    if (items.length === 0) {
      grid.innerHTML = `<div class="empty-state" style="grid-column:1/-1;">
        <div class="icon">😔</div><p>找不到符合條件的物品，請試試其他關鍵字</p>
      </div>`;
      return;
    }

    grid.innerHTML = items.map(buildCard).join('');
  }

  // ---------- Category buttons ----------
  document.getElementById('filterBar').addEventListener('click', e => {
    const btn = e.target.closest('.filter-btn');
    if (!btn) return;
    document.querySelectorAll('.filter-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
    currentCat = btn.dataset.cat;
    render();
  });

  // ---------- Search ----------
  function doSearch() {
    currentSearch = document.getElementById('searchInput').value.trim();
    render();
  }

  document.getElementById('searchBtn').addEventListener('click', doSearch);
  document.getElementById('searchInput').addEventListener('keydown', e => {
    if (e.key === 'Enter') doSearch();
  });

  document.getElementById('clearBtn').addEventListener('click', () => {
    document.getElementById('searchInput').value = '';
    currentSearch = '';
    render();
  });

  // ---------- Initial render ----------
  render();

  // ---------- Read query string (e.g. from hero search) ----------
  const params = new URLSearchParams(location.search);
  if (params.get('q')) {
    document.getElementById('searchInput').value = params.get('q');
    currentSearch = params.get('q');
    render();
  }
  if (params.get('cat')) {
    currentCat = params.get('cat');
    document.querySelectorAll('.filter-btn').forEach(b => {
      b.classList.toggle('active', b.dataset.cat === currentCat);
    });
    render();
  }
})();
