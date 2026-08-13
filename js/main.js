/* ============================================================
   main.js — 共用邏輯
   ============================================================ */

// ---------- Navbar active link ----------
(function () {
  const links = document.querySelectorAll('.nav-links a');
  const current = location.pathname.split('/').pop() || 'index.html';
  links.forEach(a => {
    const href = a.getAttribute('href');
    if (href === current || (current === '' && href === 'index.html')) {
      a.classList.add('active');
    }
  });

  // Hamburger toggle
  const toggle = document.getElementById('navToggle');
  const navLinks = document.getElementById('navLinks');
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('open');
    });
    // close on link click
    navLinks.querySelectorAll('a').forEach(a => {
      a.addEventListener('click', () => navLinks.classList.remove('open'));
    });
  }
})();

// ---------- LocalStorage helpers ----------
const Store = {
  get(key) {
    try { return JSON.parse(localStorage.getItem(key)) || []; } catch { return []; }
  },
  set(key, val) {
    localStorage.setItem(key, JSON.stringify(val));
  },
  // Requests store
  getRequests()       { return this.get('shareRequests'); },
  addRequest(req)     { const all = this.getRequests(); all.unshift(req); this.set('shareRequests', all); },
  // My listings store (donations)
  getListings()       { return this.get('myListings'); },
  addListing(item)    { const all = this.getListings(); all.unshift(item); this.set('myListings', all); },
  deleteListing(id)   {
    const all = this.getListings().filter(i => i.id !== id);
    this.set('myListings', all);
  },
  // Counter for local IDs
  nextId()            {
    const n = (parseInt(localStorage.getItem('_nextId') || '1000')) + 1;
    localStorage.setItem('_nextId', n);
    return n;
  }
};

// ---------- Fetch items.json ----------
async function fetchItems() {
  try {
    const res = await fetch('data/items.json');
    return await res.json();
  } catch (e) {
    console.error('無法載入 items.json', e);
    return [];
  }
}

// ---------- Condition badge helper ----------
function conditionBadge(cond) {
  const map = { '全新': 'badge-green', '九成新': 'badge-green', '良好': 'badge-orange', '普通': 'badge-gray' };
  return `<span class="badge ${map[cond] || 'badge-gray'}">${cond}</span>`;
}

// ---------- Available badge ----------
function availableBadge(available) {
  return available
    ? '<span class="badge badge-green">可索取</span>'
    : '<span class="badge badge-red">已認領</span>';
}

// ---------- Build item card HTML ----------
function buildCard(item) {
  return `
  <a href="item-detail.html?id=${item.id}" class="card" style="display:block;color:inherit;text-decoration:none;">
    <img class="card-img" src="${item.image}" alt="${item.title}" loading="lazy"
         onerror="this.src='https://via.placeholder.com/400x200?text=圖片載入失敗'">
    <div class="card-body">
      <div class="card-title">${item.title}</div>
      <div class="card-meta">
        <span>📍 ${item.location}</span>
        <span>🗂 ${item.category}</span>
      </div>
      <div class="card-desc">${item.description}</div>
    </div>
    <div class="card-footer">
      ${conditionBadge(item.condition)}
      ${availableBadge(item.available)}
    </div>
  </a>`;
}

// ---------- Toast notification ----------
function showToast(msg, type = 'success') {
  const el = document.getElementById('toast');
  if (!el) return;
  el.textContent = msg;
  el.className = `alert alert-${type}`;
  el.style.display = 'flex';
  setTimeout(() => { el.style.display = 'none'; }, 3500);
}
