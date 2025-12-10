/* Admin Script */

/* ===========================
   Data Store (Mock DB)
   =========================== */
const defaultData = {
    announcements: [
        { id: 1, title: '서비스 점검 안내', content: '서버 정기 점검이 있습니다.', important: true, date: '2024.12.04' },
        { id: 2, title: '연말 프로모션', content: '클라우드 30% 할인', important: false, date: '2024.12.01' }
    ],
    inquiries: [
        { id: 101, user: '홍길동', title: '서버 호스팅 견적 문의', status: 'pending', date: '2024.12.08' },
        { id: 102, user: '이순신', title: '결제 방식 변경 요청', status: 'completed', date: '2024.12.07' }
    ],
    tickets: [
        { id: 501, title: 'DB 접속 불안정', status: 'processing', priority: 'high', date: '2024.12.08' }
    ],
    products: [
        { id: 1, name: 'Standard Server', desc: '기본형 서버 호스팅', icon: 'Server', plans: [{ name: 'Basic', price: '50,000' }] },
        { id: 2, name: 'Cloud Basic', desc: '유연한 클라우드 자원', icon: 'Cloud', plans: [] }
    ],
    timeline: [
        { id: 1, year: 2024, month: '05', title: '클라우드 센터 확장', desc: '제2센터 오픈' },
        { id: 2, year: 2024, month: '01', title: 'ISMS 인증 갱신', desc: '' },
        { id: 3, year: 2023, month: '11', title: '누적 고객 500사 돌파', desc: '' },
        { id: 4, year: 2023, month: '03', title: '법인 설립 10주년', desc: '' }
    ],
    terms: {
        privacy: '개인정보처리방침 내용입니다...',
        terms: '이용약관 내용입니다...'
    }
};

// Utils
const $ = (id) => document.getElementById(id);
const loadDB = (key) => JSON.parse(localStorage.getItem(`admin_${key}`)) || defaultData[key];
const saveDB = (key, data) => localStorage.setItem(`admin_${key}`, JSON.stringify(data));

let currentTermType = 'privacy';

/* ===========================
   Initialization
   =========================== */
document.addEventListener('DOMContentLoaded', () => {
    // Load Dashboard Counts
    refreshDashboard();

    // Default Tab
    switchTab('announcements');

    // Init Chart
    initChart();
});


/* ===========================
   Tab & Dashboard Logic
   =========================== */
function switchTab(tabId) {
    // Hide all
    document.querySelectorAll('.tab-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

    // Show target
    $(`tab-${tabId}`).style.display = 'block';

    // Active btn
    // Find the button that called this function or by text? 
    // Simplified: Loop and check text or add ID to buttons. 
    // Here we skip adding active class to Nav button dynamically for simplicity or assume index matches.
    // Better way:
    const btns = document.querySelectorAll('.admin-tabs .tab-btn');
    const tabs = ['announcements', 'faq', 'inquiries', 'tickets', 'products', 'logos', 'analytics', 'terms', 'timeline'];
    btns.forEach((btn, idx) => {
        if (tabs[idx] === tabId) btn.classList.add('active');
    });

    // Render Data
    if (tabId === 'announcements') renderAnnouncements();
    if (tabId === 'timeline') renderTimeline();
    if (tabId === 'products') renderProducts();
    // ... others
}

function refreshDashboard() {
    const ann = loadDB('announcements');
    const inq = loadDB('inquiries');
    const tic = loadDB('tickets');
    const prod = loadDB('products');

    $('dash-notice-count').innerText = ann.length;
    $('dash-inquiry-count').innerText = inq.filter(i => i.status === 'pending').length;
    $('dash-ticket-count').innerText = tic.filter(t => t.status === 'processing').length;
    $('dash-product-count').innerText = prod.length;
}


/* ===========================
   Announcements
   =========================== */
function renderAnnouncements() {
    const list = loadDB('announcements');
    const container = $('announce-list');
    container.innerHTML = '';

    list.forEach(item => {
        container.innerHTML += `
            <div class="list-item">
                <div class="item-content">
                    <div class="item-header">
                        ${item.important ? '<span class="badge badge-red">중요</span>' : '<span class="badge badge-gray">일반</span>'}
                        <span class="item-title">${item.title}</span>
                    </div>
                    <div class="item-desc">${item.content}</div>
                    <div class="item-date">${item.date}</div>
                </div>
                <div class="item-actions">
                    <button class="btn-icon" onclick="editAnnounce(${item.id})"><i class="fas fa-pencil-alt"></i></button>
                    <button class="btn-icon" onclick="deleteAnnounce(${item.id})"><i class="fas fa-trash"></i></button>
                </div>
            </div>
        `;
    });
}

function openModal(id) {
    $(id).classList.add('active');
    if (id === 'announceModal') {
        $('ann-id').value = '';
        $('ann-title').value = '';
        $('ann-content').value = '';
        $('ann-important').checked = false;
    }
    if (id === 'timelineModal') {
        $('time-id').value = '';
        $('time-year').value = '';
        $('time-month').value = '';
        $('time-title').value = '';
        $('time-desc').value = '';
    }
}

function closeModal(id) {
    $(id).classList.remove('active');
}

function saveAnnounce() {
    const id = $('ann-id').value;
    const title = $('ann-title').value;
    const content = $('ann-content').value;
    const imp = $('ann-important').checked;

    if (!title) return alert('제목을 입력하세요');

    let list = loadDB('announcements');
    if (id) {
        const idx = list.findIndex(x => x.id == id);
        if (idx >= 0) list[idx] = { ...list[idx], title, content, important: imp };
    } else {
        const newId = Date.now();
        list.push({ id: newId, title, content, important: imp, date: new Date().toLocaleDateString() });
    }

    saveDB('announcements', list);
    renderAnnouncements();
    refreshDashboard();
    closeModal('announceModal');
}

function deleteAnnounce(id) {
    if (!confirm('삭제하시겠습니까?')) return;
    let list = loadDB('announcements');
    list = list.filter(x => x.id != id);
    saveDB('announcements', list);
    renderAnnouncements();
    refreshDashboard();
}

function editAnnounce(id) {
    const list = loadDB('announcements');
    const item = list.find(x => x.id == id);
    if (item) {
        $('ann-id').value = item.id;
        $('ann-title').value = item.title;
        $('ann-content').value = item.content;
        $('ann-important').checked = item.important;
        openModal('announceModal');
    }
}


/* ===========================
   Timeline (Important)
   =========================== */
function renderTimeline() {
    const list = loadDB('timeline');
    const container = $('timeline-container');
    container.innerHTML = '';

    // Group by Year
    // 1. Sort by Year Desc, then Month Desc
    list.sort((a, b) => {
        if (b.year !== a.year) return b.year - a.year;
        // Month compare (handles null/empty)
        const ma = a.month ? parseInt(a.month) : 0;
        const mb = b.month ? parseInt(b.month) : 0;
        return mb - ma;
    });

    const groups = {};
    list.forEach(item => {
        if (!groups[item.year]) groups[item.year] = [];
        groups[item.year].push(item);
    });

    // Render Groups
    // Object.keys don't guarantee order, so filter unique years from sorted list
    const years = [...new Set(list.map(i => i.year))];

    years.forEach(year => {
        let html = `<div class="timeline-year">${year}년</div>`;
        groups[year].forEach(item => {
            html += `
                <div class="timeline-item-row">
                    <div class="timeline-month">${item.month ? item.month + '월' : '-'}</div>
                    <div class="item-content">
                        <div class="item-title">${item.title}</div>
                        ${item.desc ? `<div class="item-desc">${item.desc}</div>` : ''}
                    </div>
                     <div class="item-actions">
                        <button class="btn-icon" onclick="deleteTimeline(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            `;
        });
        container.innerHTML += `<div class="card" style="margin-bottom:20px; display:block;">${html}</div>`;
    });
}

function saveTimeline() {
    const year = $('time-year').value;
    const month = $('time-month').value;
    const title = $('time-title').value;
    const desc = $('time-desc').value;

    if (!year || !title) return alert('연도와 내용을 입력하세요');

    let list = loadDB('timeline');
    list.push({
        id: Date.now(),
        year: parseInt(year),
        month: month,
        title: title,
        desc: desc
    });

    saveDB('timeline', list);
    renderTimeline();
    closeModal('timelineModal');
}

function deleteTimeline(id) {
    if (!confirm('삭제하시겠습니까?')) return;
    let list = loadDB('timeline');
    list = list.filter(x => x.id != id);
    saveDB('timeline', list);
    renderTimeline();
}


/* ===========================
   Products
   =========================== */
function renderProducts() {
    const list = loadDB('products');
    const container = $('product-list');
    container.innerHTML = '';

    list.forEach(item => {
        container.innerHTML += `
            <div class="list-item" style="display:block;">
                <div style="display:flex; justify-content:space-between; align-items:center;">
                    <div style="display:flex; gap:10px; align-items:center;">
                        <div style="width:30px; height:30px; background:#eee; border-radius:5px; display:flex; align-items:center; justify-content:center;">
                            <i class="fas fa-${item.icon.toLowerCase() || 'box'}"></i>
                        </div>
                        <div>
                            <div class="item-title">${item.name}</div>
                            <div class="item-desc">${item.desc}</div>
                        </div>
                    </div>
                    <div class="item-actions">
                         <button class="btn-icon" onclick="deleteProduct(${item.id})"><i class="fas fa-trash"></i></button>
                    </div>
                </div>
            </div>
        `;
    });
}

function saveProduct() {
    const name = $('prod-name').value;
    const desc = $('prod-desc').value;
    const icon = $('prod-icon').value;

    if (!name) return alert('상품명을 입력하세요');

    let list = loadDB('products');
    list.push({ id: Date.now(), name, desc, icon, plans: [] });
    saveDB('products', list);
    renderProducts();
    refreshDashboard();
    closeModal('productModal');
}
function deleteProduct(id) {
    if (!confirm('삭제?')) return;
    let list = loadDB('products');
    list = list.filter(x => x.id != id);
    saveDB('products', list);
    renderProducts();
    refreshDashboard();
}

/* ===========================
   Terms
   =========================== */
function switchTermTab(type) {
    currentTermType = type;
    const data = loadDB('terms');
    //$('term-editor').value = data[type] || '';
    // To update UI active state
}
function saveTerm() {
    const val = $('term-editor').value;
    let data = loadDB('terms');
    data[currentTermType] = val;
    saveDB('terms', data);
    alert('저장되었습니다.');
}


/* ===========================
   Chart
   =========================== */
function initChart() {
    const ctx = document.getElementById('analyticsChart').getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['12.01', '12.02', '12.03', '12.04', '12.05', '12.06', '12.07'],
            datasets: [{
                label: '방문자 수',
                data: [120, 190, 300, 500, 200, 300, 450],
                backgroundColor: '#E94D36'
            }]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false
        }
    });
}
