/**
 * price_loader.js
 * Supabase에서 상품 정보를 불러와 가격표를 렌더링하는 스크립트
 */

async function loadProductPrices(containerId, productCode) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.warn(`[PriceLoader] Container #${containerId} not found.`);
        return;
    }

    // 로딩 표시
    container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; color: #666;"><i class="fas fa-spinner fa-spin"></i> 요금 정보를 불러오는 중입니다...</div>';

    // Supabase 체크 (Polling 방식)
    let maxRetries = 20; // 2초 대기 (100ms * 20)
    while (typeof window.sb === 'undefined' && maxRetries > 0) {
        await new Promise(resolve => setTimeout(resolve, 100));
        maxRetries--;
    }

    if (typeof window.sb === 'undefined') {
        // Fallback: Check global supabase variable from CDN
        if (typeof supabase !== 'undefined') window.sb = supabase;
    }

    if (typeof window.sb === 'undefined') {
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: red;">시스템 오류: 데이터베이스 연결에 실패했습니다. (Timeout)</div>';
        console.error('[PriceLoader] Supabase client (window.sb) not found after waiting.');
        return;
    }

    // Alias for code clarity
    const supabase = window.sb;

    try {
        // 1. 상품 정보 조회 (Product ID 찾기)
        // productCode는 admin_script.js의 CATEGORIES key와 동일해야 함 (예: 'addon-backup', 'security-waf')
        // DB의 'subcategory' 컬럼과 매칭합니다.
        const { data: product, error: prodError } = await supabase
            .from('products')
            .select('id, name')
            .eq('subcategory', productCode)
            .maybeSingle();

        if (prodError) {
            throw prodError;
        }

        if (!product) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #f9fafb; border-radius: 8px;">등록된 상품 정보가 없습니다.<br><small>(관리자 페이지에서 마이그레이션을 진행해주세요)</small></div>';
            return;
        }

        // 2. 플랜 목록 조회
        const { data: plans, error: planError } = await supabase
            .from('product_plans')
            .select('*')
            .eq('product_id', product.id)
            .eq('active', true)
            .order('sort_order', { ascending: true });

        if (planError) throw planError;

        if (!plans || plans.length === 0) {
            container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; padding: 40px; background: #f9fafb; border-radius: 8px;">등록된 요금제가 없습니다.</div>';
            return;
        }

        // 3. HTML 렌더링
        let html = '';
        plans.forEach(plan => {
            // 뱃지 및 추천 스타일 처리
            const isRec = plan.popular || (plan.badge && (plan.badge.includes('추천') || plan.badge.includes('Best') || plan.badge.includes('인기')));
            const recClass = isRec ? 'recommended' : '';
            const badgeHtml = plan.badge ? `<div class="badge-rec">${plan.badge}</div>` : '';

            // 특징(Features) 리스트 처리
            // 줄바꿈 문자(\n)로 구분된 텍스트를 파싱
            let featuresHtml = '';
            if (plan.features) {
                const list = plan.features.split('\n');
                featuresHtml = list.map(item => {
                    const txt = item.trim();
                    if (!txt) return '';
                    return `<li><i class="fas fa-check"></i> ${txt}</li>`;
                }).join('');
            } else {
                // 스펙 정보를 기반으로 폴백(Fallback) 표시 (호스팅/VPN 등)
                if (plan.cpu) featuresHtml += `<li><i class="fas fa-check"></i> CPU: ${plan.cpu}</li>`;
                if (plan.ram) featuresHtml += `<li><i class="fas fa-check"></i> RAM: ${plan.ram}</li>`;
                if (plan.storage) featuresHtml += `<li><i class="fas fa-check"></i> Storage: ${plan.storage}</li>`;
                if (plan.traffic) featuresHtml += `<li><i class="fas fa-check"></i> Traffic: ${plan.traffic}</li>`;
                if (plan.speed) featuresHtml += `<li><i class="fas fa-check"></i> 속도: ${plan.speed}</li>`;
            }

            // 가격 포맷팅 (쉼표가 이미 있다면 그대로, 없다면 추가)
            // DB에 '100000' 숫자로 저장된 경우와 '100,000' 문자로 저장된 경우 모두 대응
            let priceDisplay = plan.price;
            if (!isNaN(priceDisplay)) {
                priceDisplay = parseInt(priceDisplay).toLocaleString();
            }

            // 기간 표시 (월, 년 등)
            let periodDisplay = '';
            if (plan.period) {
                // "월" -> "/월", "년" -> "/년" 등 자연스럽게
                if (plan.period === '월' || plan.period === '년') {
                    periodDisplay = `<sub>/${plan.period}</sub>`;
                } else {
                    periodDisplay = `<sub>(${plan.period})</sub>`;
                }
            }

            // 스펙 문자열 생성
            let specDetails = '';
            if (plan.cpu) specDetails += `CPU: ${plan.cpu}, `;
            if (plan.ram) specDetails += `RAM: ${plan.ram}, `;
            if (plan.storage) specDetails += `Disk: ${plan.storage}`;
            if (!specDetails && plan.summary) specDetails = plan.summary;

            const escName = escapeHtml(plan.plan_name);
            const escDetails = escapeHtml(specDetails);

            // 카드 HTML 생성
            html += `
            <div class="plan-card popular">
                ${badgeHtml ? `<div class="plan-badge">${plan.badge}</div>` : ''}
                <div class="plan-title">${plan.plan_name}</div>
                <div class="plan-price" style="font-size: 1.8rem; font-weight: 800; color: var(--accent); margin-bottom: 20px;">
                    ${priceDisplay}${periodDisplay}
                </div>
                <div class="plan-desc" style="min-height: 24px; font-size: 0.9em; color: #666; margin-bottom: 15px;">
                    ${plan.summary || ''}
                </div>
                <ul class="plan-features">
                    ${featuresHtml}
                </ul>
                <button class="plan-btn solid js-open-modal"
                    data-name="${escName}" data-type="${productCode}" data-details="${escDetails}"
                    style="width:100%; border:none; cursor:pointer;">견적 신청</button>
            </div>
            `;
        });

        container.innerHTML = html;

    } catch (e) {
        console.error('[PriceLoader] Error:', e);
        container.innerHTML = '<div style="grid-column: 1/-1; text-align: center; color: #ef4444;">정보를 불러오는 중 오류가 발생했습니다.</div>';
    }
}

// Helper to escape quotes for HTML attributes (Simple version)
function escapeHtml(str) {
    if (!str) return '';
    return String(str)
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;');
}
