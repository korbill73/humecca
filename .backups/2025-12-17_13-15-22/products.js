/**
 * HUMECCA Products Display System
 * Supabase 2-Table Integration
 */

// 카테고리 매핑
const CATEGORY_MAPPING = {
    'server': { category: 'idc', subcategory: 'hosting' },
    'hosting': { category: 'idc', subcategory: 'hosting' },
    'vpn': { category: 'vpn', subcategory: 'vpn-service' },
    'security': { category: 'security', subcategory: 'addon' },
    'solution': { category: 'solution', subcategory: 'homepage' },
    'colocation': { category: 'idc', subcategory: 'colocation' }
};

/**
 * 상품 플랜 불러오기 및 표시
 * @param {string} categorySlug - 카테고리 슬러그 (예: 'server', 'vpn')
 * @param {string} containerId - 표시할 HTML 컨테이너 ID
 */
async function loadProducts(categorySlug, containerId) {
    const container = document.getElementById(containerId);
    if (!container) {
        console.error(`Container ${containerId} not found`);
        return;
    }

    // 로딩 표시
    container.innerHTML = `
        <div style="text-align: center; padding: 60px; color: #999;">
            <i class="fas fa-spinner fa-spin" style="font-size: 2rem; margin-bottom: 15px;"></i>
            <p>상품 정보를 불러오는 중...</p>
        </div>
    `;

    try {
        if (!supabase) {
            throw new Error('Supabase가 초기화되지 않았습니다.');
        }

        // 카테고리 정보 가져오기
        const categoryInfo = CATEGORY_MAPPING[categorySlug];
        if (!categoryInfo) {
            throw new Error(`Unknown category: ${categorySlug}`);
        }

        // 1. products 테이블에서 상품 찾기
        const { data: product, error: productError } = await supabase
            .from('products')
            .select('*')
            .eq('category', categoryInfo.category)
            .eq('subcategory', categoryInfo.subcategory)
            .single();

        if (productError) {
            console.error('Product fetch error:', productError);
            throw new Error('상품 정보를 찾을 수 없습니다.');
        }

        if (!product) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 15px; color: #ddd;"></i>
                    <p>등록된 상품이 없습니다.</p>
                </div>
            `;
            return;
        }

        // 2. product_plans 테이블에서 플랜 목록 가져오기
        const { data: plans, error: plansError } = await supabase
            .from('product_plans')
            .select('*')
            .eq('product_id', product.id)
            .eq('active', true)
            .order('sort_order', { ascending: true });

        if (plansError) {
            throw plansError;
        }

        if (!plans || plans.length === 0) {
            container.innerHTML = `
                <div style="text-align: center; padding: 60px; color: #666;">
                    <i class="fas fa-box-open" style="font-size: 3rem; margin-bottom: 15px; color: #ddd;"></i>
                    <p>등록된 플랜이 없습니다.</p>
                </div>
            `;
            return;
        }

        // 3. 플랜 카드 렌더링
        container.innerHTML = `
            <div class="pricing-grid compact-pricing" style="grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));">
                ${plans.map(plan => renderPlanCard(plan)).join('')}
            </div>
        `;

        console.log(`✅ ${plans.length}개의 플랜을 표시했습니다.`);

    } catch (error) {
        console.error('Error loading products:', error);
        container.innerHTML = `
            <div style="text-align: center; padding: 60px; background: #fff3cd; border: 1px solid #ffc107; border-radius: 8px;">
                <i class="fas fa-exclamation-triangle" style="font-size: 2rem; color: #ff9800; margin-bottom: 15px;"></i>
                <p style="color: #856404; font-weight: 500;">상품을 불러오는 중 오류가 발생했습니다.</p>
                <p style="color: #856404; font-size: 0.9rem;">${error.message}</p>
            </div>
        `;
    }
}

/**
 * 플랜 카드 HTML 생성
 */
/**
 * 플랜 카드 HTML 생성
 */
function renderPlanCard(plan) {
    const features = plan.features ? plan.features.split('\n').filter(f => f.trim()) : [];
    const hasSpecs = plan.cpu || plan.ram || plan.storage || plan.traffic;
    const hasVpnSpecs = plan.speed || plan.sites || plan.users;

    // Determine button class (Solid for popular, Outline for standard)
    // Note: styles.css handles colors via CSS variables
    const btnClass = plan.popular ? 'plan-btn solid' : 'plan-btn outline';
    const cardClass = plan.popular ? 'plan-card popular' : 'plan-card';

    // Badge HTML
    let badgeHtml = '';
    if (plan.badge) {
        badgeHtml = `<div class="plan-badge">${plan.badge}</div>`;
    } else if (plan.popular) {
        badgeHtml = `<div class="plan-badge">인기</div>`;
    }

    // Spec HTML (Optional, if we want to keep it inside the card body)
    // We can format this as a special feature list item or a separate block
    // For now, let's keep it simple or integrate into features

    let specsHtml = '';
    if (hasSpecs) {
        specsHtml = `
            <div style="background: var(--bg-gray-50); padding: 15px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9em;">
                ${plan.cpu ? `<div style="margin-bottom:5px;"><strong>CPU:</strong> ${plan.cpu}</div>` : ''}
                ${plan.ram ? `<div style="margin-bottom:5px;"><strong>RAM:</strong> ${plan.ram}</div>` : ''}
                ${plan.storage ? `<div style="margin-bottom:5px;"><strong>HDD:</strong> ${plan.storage}</div>` : ''}
                ${plan.traffic ? `<div><strong>Traffic:</strong> ${plan.traffic}</div>` : ''}
            </div>
        `;
    }

    // Features HTML
    let featuresHtml = '';
    if (features.length > 0) {
        featuresHtml = `<ul class="plan-features">`;
        features.forEach(f => {
            featuresHtml += `<li><i class="fas fa-check"></i> ${f}</li>`;
        });
        featuresHtml += `</ul>`;
    }

    // Price Display
    // Assuming plan.price is a number string like "30,000"
    const priceDisplay = plan.price ?
        `<span class="amount">${plan.price}</span> <span class="period">원 / ${plan.period || '월'}</span>` :
        `<span class="amount">문의</span>`;

    return `
        <div class="${cardClass}">
            ${badgeHtml}
            <h3 class="plan-title">${plan.plan_name}</h3>
            <div class="plan-price">${priceDisplay}</div>
            <div class="plan-summary">${plan.summary || ''}</div>
            
            ${specsHtml}
            ${featuresHtml}

            <button onclick="contactUs('${plan.plan_name}')" class="${btnClass}">
                상담 신청하기
            </button>
        </div>
    `;
}

/**
 * 상담 신청
 */
function contactUs(planName) {
    alert(`${planName} 플랜에 대한 상담을 신청하시겠습니까?\n고객센터로 연결됩니다.`);
}

console.log('✅ Products.js (2-Table) 로드 완료');
