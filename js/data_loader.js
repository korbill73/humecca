// Data Loader - Supabase Integration
// This script fetches product data from Supabase and updates the DOM elements.

// Data Loader - Supabase Integration
// This script fetches product data from Supabase and updates the DOM elements.

const PRODUCT_CATEGORIES = {
    // Hosting
    'hosting': { category: 'idc', subcategory: 'hosting', renderType: 'hosting', containerId: 'pricing-container' },

    // VPN
    'vpn': { category: 'vpn', subcategory: 'vpn-service', renderType: 'vpn', containerId: 'vpn-list-container' },

    // Colocation
    'colocation': { category: 'idc', subcategory: 'colocation', renderType: 'colocation', containerId: 'pricing-grid-colocation' },

    // Security
    'security-waf': { category: 'security', subcategory: 'sec-waf', containerId: 'pricing-waf' },
    'security-waf-pro': { category: 'security', subcategory: 'sec-waf-pro', containerId: 'pricing-waf-pro' },
    'security-cleanzone': { category: 'security', subcategory: 'sec-cleanzone', containerId: 'pricing-cleanzone' },
    'security-private-ca': { category: 'security', subcategory: 'sec-private-ca', containerId: 'pricing-private-ca' },
    'security-ssl': { category: 'security', subcategory: 'sec-ssl', containerId: 'pricing-ssl' },
    'security-v3': { category: 'security', subcategory: 'sec-v3', containerId: 'pricing-v3' },
    'security-dbsafer': { category: 'security', subcategory: 'sec-dbsafer', containerId: 'pricing-dbsafer' },

    // Add-on Services
    'addon-software': { category: 'addon', subcategory: 'addon-license', containerId: 'pricing-grid-software' },
    'addon-backup': { category: 'addon', subcategory: 'addon-backup', containerId: 'pricing-grid-backup' },
    'addon-ha': { category: 'addon', subcategory: 'addon-ha', containerId: 'pricing-grid-ha' },
    'addon-monitoring': { category: 'addon', subcategory: 'addon-monitoring', containerId: 'pricing-grid-monitoring' },
    'addon-lb': { category: 'addon', subcategory: 'addon-lb', containerId: 'pricing-grid-lb' },
    'addon-cdn': { category: 'addon', subcategory: 'addon-cdn', containerId: 'pricing-grid-cdn' },
    'addon-recovery': { category: 'addon', subcategory: 'addon-recovery', containerId: 'pricing-grid-recovery' },
    'addon-management': { category: 'addon', subcategory: 'addon-management', containerId: 'pricing-grid-management' },
    'addon-etc': { category: 'addon', subcategory: 'addon-etc', containerId: 'pricing-grid-etc' }
};

async function loadProductData(pageKey) {
    const config = PRODUCT_CATEGORIES[pageKey];
    if (!config) {
        console.warn(`No configuration found for page key: ${pageKey}`);
        return;
    }

    const container = document.getElementById(config.containerId);

    // 1. DB Client Resolution (Self-Healing & Polling)
    let maxRetries = 20;
    while (typeof window.sb === 'undefined' && maxRetries > 0) {
        await new Promise(r => setTimeout(r, 100));
        maxRetries--;
    }

    let db = window.sb;

    // Fallback: Check standard supabase variable
    if ((!db || !db.from) && typeof supabase !== 'undefined') {
        db = supabase;
        window.sb = supabase;
    }

    // Emergency Fallback if still missing (Direct Init)
    if (!db || !db.from) {
        console.warn('[Data Loader] window.sb missing after wait. Attempting fallback init...');
        const lib = window.supabase || (typeof supabase !== 'undefined' ? supabase : null);

        if (lib && lib.createClient) {
            try {
                const _url = 'https://pfowkwodqsirbaqkpfmb.supabase.co';
                const _key = 'sb_publishable_i8wY_NmKlt9qUZJPKH1f2A_yOwp3qlA';
                db = lib.createClient(_url, _key);
                window.sb = db;
                console.log('[Data Loader] Fallback Init Success');
            } catch (e) {
                console.error('[Data Loader] Fallback Init Error', e);
            }
        }
    }

    // 2. Final Error Check (Show UI Message)
    if (!db || !db.from) {
        console.error('Supabase client fully unavailable.');
        if (container) {
            container.innerHTML = `
                <div style="text-align:center; padding: 60px 20px;">
                    <i class="fas fa-exclamation-triangle" style="font-size:30px; color:#f59e0b; margin-bottom:15px;"></i>
                    <h3 style="color:#333; margin-bottom:10px;">데이터를 불러올 수 없습니다</h3>
                    <p style="color:#666; font-size:14px;">서버 연결(CDN)에 실패했습니다. 새로고침 해주세요.</p>
                </div>`;
        }
        return;
    }

    // 3. Get Product ID
    const { data: product, error: prodError } = await db.from('products')
        .select('id')
        .eq('category', config.category)
        .eq('subcategory', config.subcategory)
        .maybeSingle();

    if (prodError || !product) {
        console.warn('Product group not found in DB.', prodError);
        if (container) container.innerHTML = '<div style="text-align:center; padding:40px; color:#999;">상품 정보가 없습니다.</div>';
        return;
    }

    // 4. Get Plans
    const { data: plans, error: planError } = await db.from('product_plans')
        .select('*')
        .eq('product_id', product.id)
        .eq('active', true) // Only active plans
        .order('sort_order', { ascending: true });

    if (planError) {
        console.error('Error fetching plans:', planError);
        if (container) container.innerHTML = '<div style="text-align:center; padding:40px; color:#dc2626;">데이터 로드 오류</div>';
        return;
    }

    if (!plans || plans.length === 0) {
        console.log('No active plans found.');
        if (container) container.innerHTML = '<div style="text-align:center; padding:40px; color:#999;">등록된 요금제가 없습니다.</div>';
        return;
    }

    renderPlans(pageKey, plans, config);
}

function renderPlans(pageKey, plans, config) {
    const container = document.getElementById(config.containerId) || document.querySelector('.pricing-grid-custom') || document.querySelector('.pricing-grid');
    if (!container) {
        console.warn('Container not found for rendering plans.');
        return;
    }

    container.innerHTML = ''; // Clear existing content

    const type = config.renderType || 'addon';

    if (type === 'hosting') {
        renderHosting(container, plans);
    } else if (type === 'vpn') {
        renderVpn(container, plans);
    } else if (type === 'colocation') {
        renderColocation(container, plans);
    } else {
        renderAddon(container, plans);
    }
}

// --- Specific Render Functions ---

function renderAddon(container, plans) {
    plans.forEach(plan => {
        const features = parseFeatures(plan.features);
        let featureListHtml = '';
        features.forEach(f => {
            if (f.trim()) featureListHtml += `<li><i class="fas fa-check"></i> ${f.trim()}</li>`;
        });

        // Determine Badge
        let badgeHtml = '';
        if (plan.badge) badgeHtml = `<div class="plan-badge">${plan.badge}</div>`;
        else if (plan.popular) badgeHtml = `<div class="plan-badge">인기</div>`;

        const priceDisplay = formatPrice(plan.price, plan.period);

        // Addon Detail String
        let addonDetails = plan.summary || '';
        if (!addonDetails && features.length > 0) addonDetails = features.slice(0, 2).join(', ');

        const escName = escapeHtml(plan.plan_name);
        const escDetails = escapeHtml(addonDetails);

        const cardHtml = `
            <div class="plan-card popular">
                ${badgeHtml}
                <div class="plan-title">${plan.plan_name}</div>
                <div class="plan-price">${priceDisplay}</div>
                <div class="plan-summary" style="font-size:0.9em; color:#666; margin-bottom:15px; min-height:24px;">${plan.summary || ''}</div>
                <ul class="plan-features">
                    ${featureListHtml}
                </ul>
                <button class="plan-btn solid js-open-modal" 
                    data-name="${escName}" data-type="addon" data-details="${escDetails}" data-price="${plan.price}"
                    style="width:100%; border:none; cursor:pointer;">신청하기</button>
            </div>
        `;
        container.innerHTML += cardHtml;
    });
}

function renderHosting(container, plans) {
    plans.forEach(p => {
        const specs = {
            CPU: p.cpu || '-',
            RAM: p.ram || '-',
            Storage: p.storage || '-',
            Traffic: p.traffic || p.bandwidth || '-'
        };

        const specHtml = Object.entries(specs).map(([k, v]) => `
            <div class="spec-item">
                <span class="spec-label">${k}</span>
                <span class="spec-value">${v}</span>
            </div>
        `).join('');

        const features = parseFeatures(p.features);
        const featureHtml = features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('');

        const displayPrice = formatPrice(p.price, p.period || '월');

        // Spec string construction
        let specStr = '';
        if (p.cpu) specStr += `CPU: ${p.cpu} / `;
        if (p.ram) specStr += `RAM: ${p.ram} / `;
        if (p.storage) specStr += `SSD: ${p.storage} / `;
        if (p.traffic) specStr += `Traffic: ${p.traffic}`;
        specStr = specStr.replace(/ \/ $/, ''); // Trim trailing slash

        const escName = escapeHtml(p.plan_name);
        const escSpec = escapeHtml(specStr);

        const html = `
            <div class="plan-card popular">
                ${p.badge ? `<span class="plan-badge">${p.badge}</span>` : ''}
                <h3 class="plan-title">${p.plan_name}</h3>
                <div class="plan-summary">${p.summary || ''}</div>
                <div class="plan-price">${displayPrice}</div>
                
                <div class="specs-list">${specHtml}</div>

                <ul class="plan-features">${featureHtml}</ul>

                <button class="plan-btn solid js-open-modal" 
                    data-name="${escName}" data-type="hosting" data-details="${escSpec}" data-price="${p.price}"
                    style="width:100%; border:none; cursor:pointer;">신청하기</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

function renderVpn(container, plans) {
    plans.forEach(p => {
        const displayPrice = formatPrice(p.price, p.period);
        const features = parseFeatures(p.features);
        const featureHtml = features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('');


        const escName = escapeHtml(p.plan_name);
        const escSummary = escapeHtml(p.summary || p.speed || 'VPN Service');

        const html = `
            <div class="plan-card popular">
                ${p.badge ? `<span class="plan-badge">${p.badge}</span>` : ''}
                <h3 class="plan-title">${p.plan_name}</h3>
                <div class="plan-summary" style="font-size:0.9em; color:#666; margin-bottom:15px; min-height:24px;">${p.summary || ''}</div>
                <div class="plan-price">${displayPrice}</div>
                <ul class="plan-features">${featureHtml}</ul>
                <button class="plan-btn solid js-open-modal"
                    data-name="${escName}" data-type="vpn" data-details="${escSummary}" data-price="${p.price}"
                    style="width:100%; border:none; cursor:pointer;">신청하기</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

function renderColocation(container, plans) {
    plans.forEach(p => {
        const displayPrice = formatPrice(p.price, p.period);
        const features = parseFeatures(p.features);
        const featureHtml = features.map(f => `<li><i class="fas fa-check"></i> ${f}</li>`).join('');


        const escName = escapeHtml(p.plan_name);
        const escSummary = escapeHtml(p.summary || '상면 임대 서비스');

        const html = `
            <div class="plan-card popular">
                ${p.badge ? `<span class="plan-badge">${p.badge}</span>` : ''}
                <h3 class="plan-title">${p.plan_name}</h3>
                <div class="plan-price">${displayPrice}</div>
                <ul class="plan-features">${featureHtml}</ul>
                <button class="plan-btn solid js-open-modal"
                    data-name="${escName}" data-type="colocation" data-details="${escSummary}" data-price="${p.price}"
                    style="width:100%; border:none; cursor:pointer;">신청하기</button>
            </div>
        `;
        container.innerHTML += html;
    });
}

// Helpers
// Simple HTML Attribute Escaping (for data-attributes)
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}

function parseFeatures(features) {
    if (!features) return [];
    return typeof features === 'string' ? features.split('\n') : (Array.isArray(features) ? features : []);
}

function formatPrice(price, period) {
    if (!price || price === '문의') return '<span class="amount">문의</span>';
    // If number
    const num = Number(price.toString().replace(/,/g, ''));
    if (isNaN(num)) return `<span class="amount">${price}</span>`;
    return `<span class="amount">₩${num.toLocaleString()}</span> <span class="period">/${period || '월'}</span>`;
}
