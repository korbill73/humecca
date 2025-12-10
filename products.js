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
            <div style="display: grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap: 30px;">
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
function renderPlanCard(plan) {
    const features = plan.features ? plan.features.split('\n').filter(f => f.trim()) : [];
    const hasSpecs = plan.cpu || plan.ram || plan.storage || plan.traffic;
    const hasVpnSpecs = plan.speed || plan.sites || plan.users;

    return `
        <div class="product-card" style="
            background: white;
            border-radius: 12px;
            padding: 30px;
            box-shadow: 0 2px 8px rgba(0,0,0,0.1);
            transition: all 0.3s;
            position: relative;
            ${plan.popular ? 'border: 2px solid #EF4444;' : 'border: 1px solid #e5e7eb;'}
        ">
            ${plan.badge ? `
                <div style="
                    position: absolute;
                    top: 15px;
                    right: 15px;
                    background: ${plan.popular ? '#EF4444' : '#3B82F6'};
                    color: white;
                    padding: 4px 12px;
                    border-radius: 20px;
                    font-size: 11px;
                    font-weight: 600;
                ">${plan.badge}</div>
            ` : ''}
            
            <h3 style="font-size: 1.5rem; margin-bottom: 10px; color: #1a1a2e;">${plan.plan_name}</h3>
            
            ${plan.summary ? `
                <p style="color: #666; font-size: 0.9rem; margin-bottom: 20px;">${plan.summary}</p>
            ` : ''}
            
            <div style="margin-bottom: 25px;">
                <span style="font-size: 2rem; font-weight: 700; color: #EF4444;">${plan.price || '문의'}</span>
                ${plan.price ? `<span style="color: #999; font-size: 0.9rem;">원 / ${plan.period || '월'}</span>` : ''}
            </div>

            ${hasSpecs ? `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px; font-weight: 600;">서버 스펙</h4>
                    ${plan.cpu ? `<div style="margin-bottom: 5px;"><i class="fas fa-microchip" style="width: 20px; color: #EF4444;"></i> ${plan.cpu}</div>` : ''}
                    ${plan.ram ? `<div style="margin-bottom: 5px;"><i class="fas fa-memory" style="width: 20px; color: #EF4444;"></i> ${plan.ram}</div>` : ''}
                    ${plan.storage ? `<div style="margin-bottom: 5px;"><i class="fas fa-hdd" style="width: 20px; color: #EF4444;"></i> ${plan.storage}</div>` : ''}
                    ${plan.traffic ? `<div><i class="fas fa-exchange-alt" style="width: 20px; color: #EF4444;"></i> ${plan.traffic}</div>` : ''}
                </div>
            ` : ''}

            ${hasVpnSpecs ? `
                <div style="background: #f8f9fa; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <h4 style="font-size: 0.85rem; color: #64748b; margin-bottom: 10px; font-weight: 600;">VPN 스펙</h4>
                    ${plan.speed ? `<div style="margin-bottom: 5px;"><i class="fas fa-tachometer-alt" style="width: 20px; color: #EF4444;"></i> ${plan.speed}</div>` : ''}
                    ${plan.sites ? `<div style="margin-bottom: 5px;"><i class="fas fa-map-marker-alt" style="width: 20px; color: #EF4444;"></i> ${plan.sites}</div>` : ''}
                    ${plan.users ? `<div><i class="fas fa-users" style="width: 20px; color: #EF4444;"></i> ${plan.users}</div>` : ''}
                </div>
            ` : ''}

            ${features.length > 0 ? `
                <div style="margin-bottom: 25px;">
                    <h4 style="font-size: 0.9rem; font-weight: 600; margin-bottom: 12px; color: #333;">주요 기능</h4>
                    <ul style="list-style: none; padding: 0; margin: 0;">
                        ${features.map(feature => `
                            <li style="padding: 8px 0; border-bottom: 1px solid #f1f5f9; font-size: 0.9rem; color: #555;">
                                <i class="fas fa-check" style="color: #10b981; margin-right: 8px;"></i>
                                ${feature}
                            </li>
                        `).join('')}
                    </ul>
                </div>
            ` : ''}

            <button onclick="contactUs('${plan.plan_name}')" style="
                width: 100%;
                padding: 14px;
                background: ${plan.popular ? '#EF4444' : '#1a1a2e'};
                color: white;
                border: none;
                border-radius: 8px;
                font-weight: 600;
                cursor: pointer;
                transition: all 0.3s;
                font-size: 1rem;
            " onmouseover="this.style.opacity='0.9'" onmouseout="this.style.opacity='1'">
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
