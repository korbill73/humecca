/* Admin Script - Supabase Integrated */

let currentTermType = 'privacy';

// Global Quill Instance
let quill;

// Initialize when DOM is ready
document.addEventListener('DOMContentLoaded', () => {
    // Tab Initialization
    const hash = window.location.hash.substring(1);
    if (hash) {
        showTab(hash);
    }

    if (document.getElementById('editor-container')) {
        quill = new Quill('#editor-container', {
            theme: 'snow',
            placeholder: '공지사항 내용을 작성하세요...',
            modules: {
                toolbar: [
                    [{ 'header': [1, 2, 3, false] }],
                    ['bold', 'italic', 'underline', 'strike'],
                    [{ 'color': [] }, { 'background': [] }],
                    [{ 'list': 'ordered' }, { 'list': 'bullet' }],
                    [{ 'align': [] }],
                    ['link', 'image'],
                    ['clean']
                ]
            }
        });
    }

    // Existing Init Logic
    if (typeof refreshNoticeList === 'function') refreshNoticeList();
    if (typeof refreshFaqList === 'function') refreshFaqList();
});

// Tab Switching Logic
window.showTab = (tabId) => {
    // Hide all tabs
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));

    // Show target tab
    const target = document.getElementById('tab-' + tabId);
    // Find button by onclick attribute since data-tab is missing in some versions
    const btn = document.querySelector(`.admin-tab[onclick="showTab('${tabId}')"]`);

    if (target) target.classList.add('active');
    if (btn) btn.classList.add('active');

    // Update URL hash without scrolling
    history.pushState(null, null, '#' + tabId);

    // Layout Fix (Chart.js resize issue)
    if (tabId === 'analytics' && typeof renderAnalytics === 'function') renderAnalytics();
};

let logsChart = null;

// ===========================
// Legacy Data for Migration
// ===========================
const h_products = [
    {
        "id": "eco_01", "name": "이코노미", "price": "89,000", "period": "월", "badge": "", "summary": "입문용 가성비 서버", "popular": true, "isActive": true, "sortOrder": 1,
        "specs": { "cpu": "Xeon E-2224 (4 Core)", "ram": "16GB DDR4", "storage": "256GB NVMe SSD", "traffic": "1Gbps Shared" },
        "features": ["CentOS / Ubuntu 지원", "기본 보안 방화벽 제공", "24/365 기술 지원"]
    },
    {
        "id": "host-01", "name": "호스팅", "price": "99999", "period": "월", "badge": "", "summary": "", "isActive": true, "popular": true, "sortOrder": 4,
        "specs": { "cpu": "4", "ram": "8", "storage": "1000", "traffic": "10" },
        "features": ["기본 호스팅"]
    },
    {
        "id": "biz_01", "name": "비즈니스", "price": "199,000", "period": "월", "badge": "BEST", "summary": "중소규모 비즈니스 최적화", "popular": true, "isActive": true, "sortOrder": 2,
        "specs": { "cpu": "Xeon Silver 4210 (10 Core)", "ram": "64GB DDR4", "storage": "1TB NVMe SSD", "traffic": "10Gbps Ready" },
        "features": ["RAID 1 데이터 보호", "웹 방화벽(WAF) 무료", "초기 세팅비 무료"]
    },
    {
        "id": "ent_01", "name": "엔터프라이즈", "price": "399,000", "period": "월", "badge": "POWER", "summary": "고성능 DB/웹 서버용", "popular": true, "isActive": true, "sortOrder": 3,
        "specs": { "cpu": "AMD EPYC 7302 (16 Core)", "ram": "128GB DDR4", "storage": "2TB NVMe RAIDO", "traffic": "Dedicated Line" },
        "features": ["전담 엔지니어 배정", "VIP 기술 지원", "네트워크 이중화"]
    }
];

const v_products = [
    {
        "id": "vpn-basic", "name": "베이직", "price": "200,000", "period": "월", "badge": "", "summary": "소규모 지사 연결에 최적화된 상품", "isActive": true, "popular": false, "sortOrder": 1,
        "specs": { "speed": "10Mbps", "sites": "3개 거점", "users": "20 사용자" },
        "features": ["10Mbps 보장 대역폭", "최대 3개 거점 연결", "동시 접속 20 사용자", "IPSec 기본 지원"]
    },
    {
        "id": "vpn-standard", "name": "스탠다드", "price": "500,000", "period": "월", "badge": "BEST CHOICE", "summary": "중견기업을 위한 고성능 VPN", "isActive": true, "popular": true, "sortOrder": 2,
        "specs": { "speed": "100Mbps", "sites": "5개 거점", "users": "50 사용자" },
        "features": ["100Mbps 보장 대역폭", "최대 5개 거점 연결", "동시 접속 50 사용자", "IPSec/SSL VPN 지원"]
    },
    {
        "id": "vpn-premium", "name": "프리미엄", "price": "1,000,000", "period": "월", "badge": "", "summary": "대규모 트래픽 처리를 위한 최상위 모델", "isActive": true, "popular": false, "sortOrder": 3,
        "specs": { "speed": "1Gbps", "sites": "10개 거점", "users": "무제한" },
        "features": ["1Gbps 보장 대역폭", "최대 10개 거점 연결", "무제한 사용자", "전담 엔지니어 기술지원"]
    }
];


const c_products = [
    {
        "id": "col-1u", "name": "1U 랙 마운트", "price": "80,000", "period": "월", "badge": "", "summary": "소규모 서버 운영에 적합", "isActive": true, "popular": false, "sortOrder": 1,
        "specs": { "cpu": "1U 전용 공간", "ram": "1A 전력", "storage": "100Mbps", "traffic": "Shared" },
        "features": ["1U 전용 공간", "1A 이하 전력 제공", "100Mbps Shared", "기본 관제 서비스"]
    },
    {
        "id": "col-q", "name": "쿼터 랙 (10U)", "price": "450,000", "period": "월", "badge": "BEST CHOICE", "summary": "독립 공간이 필요한 비즈니스", "isActive": true, "popular": true, "sortOrder": 2,
        "specs": { "cpu": "10U 독립 공간", "ram": "2.2kW (10A)", "storage": "1Gbps", "traffic": "Dedicated" },
        "features": ["10U 독립 공간", "2.2kW (10A) 전력", "1Gbps Dedicated", "독립 잠금 장치"]
    },
    {
        "id": "col-f", "name": "풀 랙 (42U)", "price": "1,500,000", "period": "월", "badge": "", "summary": "대규모 인프라 구축", "isActive": true, "popular": false, "sortOrder": 3,
        "specs": { "cpu": "42U 전체 랙", "ram": "4.4kW (20A)", "storage": "10Gbps", "traffic": "Ready" },
        "features": ["42U 전체 랙 제공", "4.4kW (20A) 전력", "10Gbps Ready", "CCTV 개별 설치 가능"]
    }
];

const s_products_license = [
    {
        "id": "win-std", "name": "Windows Server Standard", "price": "41,000", "period": "월", "badge": "추천", "summary": "정품 라이선스", "isActive": true, "popular": true, "sortOrder": 1,
        "specs": { "cpu": "기본 8Core", "ram": "정품 라이선스", "storage": "-", "traffic": "추가 2Core당 10,250원" },
        "features": ["기본 8Core", "추가 2Core당 10,250원/월", "정품 라이선스"]
    },
    {
        "id": "win-dc", "name": "Windows Server Datacenter", "price": "220,000", "period": "월", "badge": "", "summary": "무제한 VM", "isActive": true, "popular": false, "sortOrder": 2,
        "specs": { "cpu": "기본 8Core", "ram": "무제한 VM", "storage": "-", "traffic": "추가 2Core당 55,000원" },
        "features": ["기본 8Core", "추가 2Core당 55,000원/월", "무제한 VM"]
    },
    {
        "id": "sql-std", "name": "SQL Server Standard", "price": "440,000", "period": "월", "badge": "", "summary": "기술 지원 포함", "isActive": true, "popular": false, "sortOrder": 3,
        "specs": { "cpu": "기본 4Core", "ram": "기술 지원 포함", "storage": "-", "traffic": "추가 2Core당 220,000원" },
        "features": ["기본 4Core", "추가 2Core당 220,000원/월", "기술 지원 포함"]
    },
    {
        "id": "sql-ent", "name": "SQL Server Enterprise", "price": "1,680,000", "period": "월", "badge": "", "summary": "엔터프라이즈 기능", "isActive": true, "popular": false, "sortOrder": 4,
        "specs": { "cpu": "기본 4Core", "ram": "엔터프라이즈 기능", "storage": "-", "traffic": "추가 2Core당 840,000원" },
        "features": ["기본 4Core", "추가 2Core당 840,000원/월", "엔터프라이즈 기능"]
    }
];

const s_products_backup = [
    { "id": "bak-basic", "name": "베이직", "price": "30,000", "period": "월", "badge": "", "summary": "로컬 저장, 7일 보관", "isActive": true, "popular": false, "sortOrder": 1, "features": ["일일 자동 백업", "7일 보관", "로컬 저장"] },
    { "id": "bak-std", "name": "스탠다드", "price": "50,000", "period": "월", "badge": "인기", "summary": "원격지 저장, 14일 보관", "isActive": true, "popular": true, "sortOrder": 2, "features": ["일일 자동 백업", "14일 보관", "원격지 저장"] },
    { "id": "bak-pre", "name": "프리미엄", "price": "80,000", "period": "월", "badge": "", "summary": "이중화 저장, 30일 보관", "isActive": true, "popular": false, "sortOrder": 3, "features": ["일일 자동 백업", "30일 보관", "이중화 저장", "복구 테스트"] },
    { "id": "bak-ent", "name": "엔터프라이즈", "price": "150,000", "period": "월", "badge": "", "summary": "실시간 백업, 1년 보관", "isActive": true, "popular": false, "sortOrder": 4, "features": ["실시간 백업", "365일 보관", "지역 분산", "전담 매니저"] }
];
const s_products_ha = [
    { "id": "ha-as", "name": "Active-Standby", "price": "100,000", "period": "월", "badge": "", "summary": "자동 Failover", "isActive": true, "popular": false, "sortOrder": 1, "features": ["2대 서버 이중화 구성", "장애 발생 시 자동 Failover", "데이터 실시간 동기화", "월 1회 정기점검"] },
    { "id": "ha-aa", "name": "Active-Active", "price": "200,000", "period": "월", "badge": "추천", "summary": "부하 분산 + 고가용성", "isActive": true, "popular": true, "sortOrder": 2, "features": ["부하 분산 및 이중화 동시 적용", "고트래픽 서비스에 최적화", "무중단 서비스 아키텍처", "24x365 긴급 기술지원"] }
];
const s_products_monitoring = [
    { "id": "mon-basic", "name": "Basic", "price": "0", "period": "서버", "badge": "기본", "summary": "Ping 체크", "isActive": true, "popular": false, "sortOrder": 1, "features": ["서버 Ping 체크 (30분 주기)", "기본 리소스 상태표지판", "이메일 알림"] },
    { "id": "mon-pro", "name": "Pro", "price": "30,000", "period": "월", "badge": "추천", "summary": "정밀 감시 & 알림", "isActive": true, "popular": true, "sortOrder": 2, "features": ["5분 주기 정밀 체크", "SMS / 카카오톡 즉시 알림", "CPU/Memory/Disk 임계치 설정", "장애 원인 분석 리포트 제공"] }
];
const s_products_lb = [
    { "id": "lb-l4", "name": "L4 로드밸런싱", "price": "50,000", "period": "월", "badge": "", "summary": "IP/Port 기반 분산", "isActive": true, "popular": false, "sortOrder": 1, "features": ["IP/Port 기반 부하 분산", "Connection/Throughput 보장", "헬스체크 및 Failover", "기본 리포트 제공"] },
    { "id": "lb-l7", "name": "L7 로드밸런싱", "price": "100,000", "period": "월", "badge": "추천", "summary": "URL/Cookie 정교한 분산", "isActive": true, "popular": true, "sortOrder": 2, "features": ["URL/Cookie 기반 정교한 분산", "SSL Termination (인증서 관리)", "보안 및 필터링 기능", "상세 트래픽 분석 리포트"] }
];
const s_products_cdn = [
    { "id": "cdn-start", "name": "Starter Plan", "price": "50,000", "period": "월", "badge": "", "summary": "기본 500GB", "isActive": true, "popular": false, "sortOrder": 1, "features": ["초기 설치비 무료", "초과시 100원 / GB", "전 세계 엣지 사용 가능", "HTTPS 보안 전송 지원"] },
    { "id": "cdn-biz", "name": "Business Plan", "price": "100,000", "period": "월", "badge": "추천", "summary": "대용량 1.5TB", "isActive": true, "popular": true, "sortOrder": 2, "features": ["대용량 트래픽 할인 적용", "초과시 80원 / GB", "실시간 트래픽 분석 대시보드", "전담 엔지니어 기술지원"] }
];
const s_products_recovery = [
    { "id": "rec-logic", "name": "논리적 손상", "price": "200,000", "period": "건(최소)", "badge": "", "summary": "삭제, 포맷 등", "isActive": true, "popular": false, "sortOrder": 1, "features": ["무료 정밀 진단", "복구 불가시 0원", "긴급 복구 지원"] },
    { "id": "rec-phys", "name": "물리적 손상", "price": "300,000", "period": "건(최소)", "badge": "Best", "summary": "HDD 인식불가 등", "isActive": true, "popular": true, "sortOrder": 2, "features": ["클린룸 정밀 작업", "부품 교체 비용 포함", "타사 실패 건 복구 가능"] },
    { "id": "rec-srv", "name": "서버/랜섬웨어", "price": "문의", "period": "건", "badge": "", "summary": "RAID, 랜섬웨어", "isActive": true, "popular": false, "sortOrder": 3, "features": ["RAID 재구성(Rebuild)", "랜섬웨어 복호화 분석", "긴급 출장 서비스 가능"] }
];

// --- Security Product Arrays ---
const s_products_waf = [
    { "id": "waf-std", "name": "Standard", "price": "300,000", "period": "월", "badge": "", "summary": "기본 방어 (350Mbps)", "isActive": true, "popular": false, "sortOrder": 1, "features": ["350 Mbps 권장 트래픽", "OWASP Top 10 방어", "실시간 모니터링"] },
    { "id": "waf-adv", "name": "Advanced", "price": "500,000", "period": "월", "badge": "추천", "summary": "중급 방어 (500Mbps)", "isActive": true, "popular": true, "sortOrder": 2, "features": ["500 Mbps 권장 트래픽", "OWASP Top 10 방어", "실시간 모니터링", "사용자 정의 룰셋"] },
    { "id": "waf-pre", "name": "Premium", "price": "750,000", "period": "월", "badge": "", "summary": "대용량 방어 (1Gbps)", "isActive": true, "popular": false, "sortOrder": 3, "features": ["1,000 Mbps 권장 트래픽", "OWASP Top 10 방어", "실시간 모니터링", "전담 기술지원"] }
];
const s_products_waf_pro = [
    { "id": "wafpro-std", "name": "Standard", "price": "580,000", "period": "월", "badge": "", "summary": "관제 포함 (300Mbps)", "isActive": true, "popular": true, "sortOrder": 1, "features": ["300 Mbps 권장 트래픽", "전문가 실시간 관제", "월간 보고서 제공", "침해 사고 대응"] },
    { "id": "wafpro-ent", "name": "Enterprise", "price": "문의", "period": "월", "badge": "", "summary": "대규모 관제", "isActive": true, "popular": false, "sortOrder": 2, "features": ["트래픽/규모 별도 협의", "전담 매니저 배정", "맞춤형 정책 설정"] }
];
const s_products_cleanzone = [
    { "id": "clean-basic", "name": "기본형", "price": "1,000,000", "period": "월", "badge": "", "summary": "IP 1개 보호", "isActive": true, "popular": true, "sortOrder": 1, "features": ["보호 대상 IP 1개", "대용량 공격 방어", "강력한 필터링"] },
    { "id": "clean-large", "name": "대용량 방어", "price": "문의", "period": "월", "badge": "", "summary": "40G 이상", "isActive": true, "popular": false, "sortOrder": 2, "features": ["40Gbps 이상 방어", "별도 협의"] }
];
const s_products_private_ca = [
    { "id": "ca-ops", "name": "CA 운영비", "price": "400,000", "period": "월", "badge": "", "summary": "Root/Sub CA", "isActive": true, "popular": false, "sortOrder": 1, "features": ["Root / Sub CA 운영", "안전한 키 관리", "CRL 발행"] },
    { "id": "ca-issue", "name": "인증서 발급", "price": "문의", "period": "건", "badge": "", "summary": "건당 비용", "isActive": true, "popular": true, "sortOrder": 2, "features": ["사설 인증서 발급", "다양한 알고리즘 지원"] }
];
const s_products_ssl = [
    { "id": "ssl-sectigo", "name": "Sectigo Positive SSL", "price": "35,000", "period": "년", "badge": "", "summary": "싱글 도메인", "isActive": true, "popular": true, "sortOrder": 1, "features": ["Single Domain", "빠른 발급", "저렴한 비용"] },
    { "id": "ssl-sectigo-wild", "name": "Sectigo Wildcard", "price": "150,000", "period": "년", "badge": "추천", "summary": "*.domain.com", "isActive": true, "popular": true, "sortOrder": 2, "features": ["Sub Domain 무제한", "서버 대수 무제한"] },
    { "id": "ssl-digi", "name": "DigiCert Standard", "price": "280,000", "period": "년", "badge": "", "summary": "높은 신뢰도", "isActive": true, "popular": false, "sortOrder": 3, "features": ["높은 브라우저 호환성", "안전 배상금 지원"] }
];
const s_products_v3 = [
    { "id": "v3-net", "name": "V3 Net Server", "price": "문의", "period": "월", "badge": "", "summary": "Windows/Linux 백신", "isActive": true, "popular": true, "sortOrder": 1, "features": ["실시간 악성코드 진단", "최소 리소스 사용", "서버 전용 백신"] }
];
const s_products_dbsafer = [
    { "id": "dbsafer-db", "name": "DBSAFER DB", "price": "문의", "period": "Core", "badge": "", "summary": "DB 접근 제어", "isActive": true, "popular": true, "sortOrder": 1, "features": ["DB 접근 통제", "권한 관리", "감사 로그"] },
    { "id": "dbsafer-am", "name": "DBSAFER AM", "price": "문의", "period": "OS", "badge": "", "summary": "시스템 접근 제어", "isActive": true, "popular": false, "sortOrder": 2, "features": ["OS 계정 관리", "명령어 통제", "Telnet/SSH 제어"] }
];


// ===========================
// Migration Logic (File -> DB)
// ===========================
const CATEGORIES = {
    'hosting': { category: 'idc', subcategory: 'hosting', name: '서버 호스팅' },
    'vpn': { category: 'vpn', subcategory: 'vpn-service', name: 'VPN 전용선' },
    'colocation': { category: 'idc', subcategory: 'colocation', name: '코로케이션' },

    // Security Products
    'security-waf': { category: 'security', subcategory: 'sec-waf', name: '웹방화벽 (WAF)' },
    'security-waf-pro': { category: 'security', subcategory: 'sec-waf-pro', name: 'WAF Pro (Managed)' },
    'security-cleanzone': { category: 'security', subcategory: 'sec-cleanzone', name: '클린존 (Anti-DDoS)' },
    'security-private-ca': { category: 'security', subcategory: 'sec-private-ca', name: 'Private CA' },
    'security-ssl': { category: 'security', subcategory: 'sec-ssl', name: 'SSL 인증서' },
    'security-v3': { category: 'security', subcategory: 'sec-v3', name: 'V3 Net Server' },
    'security-dbsafer': { category: 'security', subcategory: 'sec-dbsafer', name: 'DBSAFER' },

    // Add-on Services (Changed category from 'security' to 'addon')
    'addon-license': { category: 'addon', subcategory: 'addon-license', name: '소프트웨어 라이선스' },
    'addon-backup': { category: 'addon', subcategory: 'addon-backup', name: '백업 서비스' },
    'addon-ha': { category: 'addon', subcategory: 'addon-ha', name: 'HA (고가용성)' },
    'addon-monitoring': { category: 'addon', subcategory: 'addon-monitoring', name: '모니터링' },
    'addon-lb': { category: 'addon', subcategory: 'addon-lb', name: '로드밸런싱' },
    'addon-cdn': { category: 'addon', subcategory: 'addon-cdn', name: 'CDN' },
    'addon-recovery': { category: 'addon', subcategory: 'addon-recovery', name: '데이터 복구' },
    'addon-management': { category: 'addon', subcategory: 'addon-management', name: '운영 관리 / 기술지원' },
    'addon-etc': { category: 'addon', subcategory: 'addon-etc', name: '기타 부가서비스' }
};

async function getOrCreateProduct(type) {
    const config = CATEGORIES[type] || { category: 'etc', subcategory: 'etc', name: '기타' };
    const { data: existing } = await supabase.from('products')
        .select('*').eq('category', config.category).eq('subcategory', config.subcategory).maybeSingle();

    if (existing) return existing;

    const { data: newProd, error } = await supabase.from('products').insert([{
        category: config.category,
        subcategory: config.subcategory,
        name: config.name,
        description: `${config.name} 상품 그룹`
    }]).select().single();

    if (error) { console.error('Error creating product:', error); return null; }
    return newProd;
}

async function addPlanToSupabase(type, p) {
    const prod = await getOrCreateProduct(type);
    if (!prod) return;
    await supabase.from('product_plans').insert([{
        product_id: prod.id,
        plan_name: p.name,
        price: p.price,
        period: p.period,
        badge: p.badge,
        summary: p.summary,
        // Hosting Specs
        cpu: p.specs?.cpu, ram: p.specs?.ram, storage: p.specs?.storage, traffic: p.specs?.traffic || p.specs?.bandwidth,
        // VPN Specs
        speed: p.specs?.speed, sites: p.specs?.sites, users: p.specs?.users,
        features: (p.features || []).join('\n'),
        active: p.isActive !== false,
        popular: p.popular === true,
        sort_order: p.sortOrder || 1
    }]);
}

window.migrateToSupabase = async () => {
    let mode = 'append';
    if (confirm('기존 데이터를 모두 삭제하고 새로 가져오시겠습니까? (확인: 삭제 후 가져오기 / 취소: 유지하고 추가하기)')) {
        mode = 'replace';
    }

    if (mode === 'replace') {
        // Delete all product plans first (This is aggressive but requested for "refresh")
        // Or deeper cleanup (products too?). For now, safely delete plans to avoid ID conflicts if referenced.
        // Actually better to delete plans directly. 
        // Note: If you want to delete products too, you need to delete plans first due to FK.
        const { error } = await supabase.from('product_plans').delete().neq('id', 0); // Hack to delete all
        if (error) {
            console.error(error);
            alert('데이터 삭제 실패: ' + error.message);
            return;
        }
        console.log('기존 데이터 삭제 완료');
    } else {
        if (!confirm('기존 데이터를 유지하고 추가하시겠습니까? (중복 데이터가 생길 수 있습니다)')) return;
    }

    let count = 0;
    // Migrate Hosting
    for (const p of h_products) { await addPlanToSupabase('hosting', p); count++; }
    // Migrate VPN
    for (const p of v_products) { await addPlanToSupabase('vpn', p); count++; }
    // Migrate Colocation
    for (const p of c_products) { await addPlanToSupabase('colocation', p); count++; }

    // Migrate Security
    for (const p of s_products_waf) { await addPlanToSupabase('security-waf', p); count++; }
    for (const p of s_products_waf_pro) { await addPlanToSupabase('security-waf-pro', p); count++; }
    for (const p of s_products_cleanzone) { await addPlanToSupabase('security-cleanzone', p); count++; }
    for (const p of s_products_private_ca) { await addPlanToSupabase('security-private-ca', p); count++; }
    for (const p of s_products_ssl) { await addPlanToSupabase('security-ssl', p); count++; }
    for (const p of s_products_v3) { await addPlanToSupabase('security-v3', p); count++; }
    for (const p of s_products_dbsafer) { await addPlanToSupabase('security-dbsafer', p); count++; }

    // Migrate Add-ons
    for (const p of s_products_license) { await addPlanToSupabase('addon-license', p); count++; }
    for (const p of s_products_backup) { await addPlanToSupabase('addon-backup', p); count++; }
    for (const p of s_products_ha) { await addPlanToSupabase('addon-ha', p); count++; }
    for (const p of s_products_monitoring) { await addPlanToSupabase('addon-monitoring', p); count++; }
    for (const p of s_products_lb) { await addPlanToSupabase('addon-lb', p); count++; }
    for (const p of s_products_cdn) { await addPlanToSupabase('addon-cdn', p); count++; }
    for (const p of s_products_recovery) { await addPlanToSupabase('addon-recovery', p); count++; }

    alert(`총 ${count}개의 상품이 데이터베이스로 이전되었습니다!`);
    location.reload();
};

// Admin Logic V7 - Premium UI
// Force Alert to confirm load
// alert('업데이트 확인: 시스템이 최신 버전(V7)으로 로드되었습니다.');

document.addEventListener('DOMContentLoaded', async () => {
    console.log('Admin Script V7 Loaded');

    if (!window.supabase) {
        console.error('Supabase client missing.');
    } else {
        console.log('✅ Admin Page connected to Supabase');
    }

    // [Fix] Resolve Tab State IMMEDIATELY before data load to prevent flicker
    const hash = window.location.hash.replace('#', '');
    if (hash) {
        showTab(hash);
    } else {
        showTab('product'); // Default
    }

    // Initial Load
    await loadApplications();

    // Refresh Counts
    await refreshDashboard();
});

// ===========================
// 5. Application Management (NEW)
// ===========================
// ===========================
// Application Management (Premium Refactor)
// ===========================

let currentAppStatus = 'all';

// Filter by Status Tab
window.filterAppStatus = (status, btn) => {
    currentAppStatus = status;

    // Update UI
    document.querySelectorAll('.status-tab-btn').forEach(b => b.classList.remove('active'));
    if (btn) btn.classList.add('active');
    else {
        // Find button if not passed (e.g. init)
        // ... simplified for now
    }

    loadApplications();
};

window.closeAdminModal = () => {
    document.getElementById('admin-common-modal').style.display = 'none';
};

window.onclick = (event) => {
    const modal = document.getElementById('admin-common-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}

async function loadApplications() {
    const listEl = document.getElementById('app-list-body');
    if (!listEl) return;

    const productFilter = document.getElementById('app-filter-product')?.value || 'all';

    // Show Loading
    listEl.innerHTML = '<tr><td colspan="7" align="center" style="padding:40px;"><i class="fas fa-spinner fa-spin fa-2x" style="color:#4f46e5;"></i></td></tr>';

    // Fetch Data
    let query = supabase.from('applications').select('*').order('created_at', { ascending: false });

    if (productFilter !== 'all') {
        if (productFilter === 'security') query = query.like('product_type', 'security%');
        else query = query.eq('product_type', productFilter);
    }

    const { data: allData, error } = await query;

    // Fetch Product Plans for Price Lookup (Retroactive Fix)
    const { data: plans } = await supabase.from('product_plans').select('plan_name, price');
    window.adminPriceMap = {};
    if (plans) {
        plans.forEach(p => {
            if (p.plan_name && p.price) {
                window.adminPriceMap[p.plan_name] = p.price;
            }
        });
    }

    if (error) {
        listEl.innerHTML = `<tr><td colspan="7" align="center" style="color:#ef4444; padding:20px;">Error: ${error.message}</td></tr>`;
        return;
    }

    if (!allData || allData.length === 0) {
        listEl.innerHTML = '<tr><td colspan="7" align="center" style="padding:60px; color:#94a3b8;">신청 내역이 없습니다.</td></tr>';
        ['all', 'pending', 'contacting', 'completed', 'cancelled'].forEach(s => {
            const el = document.getElementById(`count-${s}`);
            if (el) el.innerText = 0;
        });
        return;
    }

    // Counts
    const counts = {
        all: allData.length,
        pending: allData.filter(d => d.status === 'pending').length,
        contacting: allData.filter(d => d.status === 'contacting').length,
        completed: allData.filter(d => d.status === 'completed').length,
        cancelled: allData.filter(d => d.status === 'cancelled').length
    };
    Object.keys(counts).forEach(key => {
        const el = document.getElementById(`count-${key}`);
        if (el) el.innerText = counts[key];
    });

    // Filter
    const filteredData = currentAppStatus === 'all' ? allData : allData.filter(d => d.status === currentAppStatus);

    listEl.innerHTML = '';

    if (filteredData.length === 0) {
        listEl.innerHTML = '<tr><td colspan="7" align="center" style="padding:40px; color:#94a3b8;">해당 상태의 내역이 없습니다.</td></tr>';
        return;
    }

    filteredData.forEach(item => {
        // Status Badge Logic (Icon Only as requested)
        let badgeHtml = '';
        let rowStyle = '';
        let statusTitle = '';

        // Tooltip text mapping
        const statusMap = { pending: '접수대기', contacting: '상담중', completed: '처리완료', cancelled: '취소됨' };
        statusTitle = statusMap[item.status] || item.status;

        switch (item.status) {
            case 'pending':
                badgeHtml = `<span class="badge-pill badge-red" title="${statusTitle}" style="width:32px; height:32px; justify-content:center; padding:0; border-radius:50%;"><i class="fas fa-clock"></i></span>`;
                break;
            case 'contacting':
                badgeHtml = `<span class="badge-pill badge-yellow" title="${statusTitle}" style="width:32px; height:32px; justify-content:center; padding:0; border-radius:50%;"><i class="fas fa-phone-alt"></i></span>`;
                break;
            case 'completed':
                badgeHtml = `<span class="badge-pill badge-green" title="${statusTitle}" style="width:32px; height:32px; justify-content:center; padding:0; border-radius:50%;"><i class="fas fa-check"></i></span>`;
                rowStyle = 'background-color:#f8fafc; opacity:0.8;';
                break;
            case 'cancelled':
                badgeHtml = `<span class="badge-pill badge-gray" title="${statusTitle}" style="width:32px; height:32px; justify-content:center; padding:0; border-radius:50%;"><i class="fas fa-ban"></i></span>`;
                rowStyle = 'color:#94a3b8; background-color:#f9fafb;';
                break;
            default:
                badgeHtml = `<span class="badge-pill badge-gray" title="${statusTitle}">${item.status}</span>`;
        }

        const d = new Date(item.created_at);
        const dateMain = `${d.getFullYear().toString().slice(2)}. ${d.getMonth() + 1}. ${d.getDate()}.`;
        const dateSub = d.toLocaleTimeString('ko-KR', { hour: '2-digit', minute: '2-digit', hour12: true });

        // Parsing for List Display
        let rawName = item.product_name || '-';
        let priceMatch = rawName.match(/\((₩[\d,]+)\)/);
        let priceText = priceMatch ? priceMatch[1] : '';
        let fullCleanName = rawName.replace(/\((₩[\d,]+)\)/, '').trim();

        // Dynamic Lookup if Price is Missing
        if (!priceText) {
            // Try to find matching plan
            // Extract base name: "Full Rack (Details)" -> "Full Rack"
            // Or just try fullCleanName which already removed (Price)
            // But fullCleanName might still have (Details).

            // Heuristic 1: Exact Match
            let foundPrice = window.adminPriceMap ? window.adminPriceMap[fullCleanName] : null;

            // Heuristic 2: Split by ' (' to remove details
            if (!foundPrice && fullCleanName.includes(' (')) {
                const baseName = fullCleanName.split(' (')[0].trim();
                foundPrice = window.adminPriceMap ? window.adminPriceMap[baseName] : null;
            }

            // Heuristic 3: Check simple contains for keys (Reverse lookup) - Optional/Risky

            if (foundPrice) {
                // Format Price
                if (foundPrice === '문의') priceText = '문의';
                else {
                    const n = Number(String(foundPrice).replace(/,/g, ''));
                    if (!isNaN(n)) priceText = '₩' + n.toLocaleString();
                    else priceText = foundPrice;
                }
            }
        }

        // In list, if name is super long with `/`, show first part + "..."
        let displayName = fullCleanName.split('/')[0].trim();
        if (fullCleanName.includes('/')) displayName += '...';

        listEl.innerHTML += `
            <tr style="${rowStyle}" onclick="openApplicationDetail('${item.id}')">
                <td class="date-cell">
                    <div class="date-main">${dateMain}</div>
                    <div class="date-sub">${dateSub}</div>
                </td>
                <td style="text-align:center;">${badgeHtml}</td>
                <td>
                    <div class="prod-name">${displayName}</div>
                    <div class="prod-sub">
                        ${priceText ? `<span class="prod-price">${priceText}</span>` : ''}
                        <span>${item.product_type}</span>
                    </div>
                </td>
                <td>
                    <div style="font-weight:600; color:#1e293b;">${item.company_name || '-'}</div>
                    <div style="font-size:0.9em; color:#64748b;">${item.contact_person}</div>
                </td>
                <td>
                    <div style="font-weight:500;">${item.phone}</div>
                </td>
                <td>
                    <div style="max-width:180px; white-space:nowrap; overflow:hidden; text-overflow:ellipsis; color:#64748b; font-size:0.9em;" title="${item.memo || ''}">
                        ${item.memo || '-'}
                    </div>
                </td>
                <td onclick="event.stopPropagation()">
                     <div style="display:flex; gap:5px; justify-content:center;">
                        <button class="delete-btn" onclick="deleteApplication('${item.id}')" style="padding:6px; width:32px; height:32px; border-radius:6px; display:flex; align-items:center; justify-content:center; background:#fff; border:1px solid #fee2e2; color:#ef4444;"><i class="fas fa-trash"></i></button>
                     </div>
                </td>
            </tr>
        `;
    });
}

// Toast Helper (Global)
window.showToast = function (message, type = 'success') {
    const toast = document.createElement('div');
    toast.innerText = message;

    let bg = '#10b981'; // green
    if (type === 'error') bg = '#ef4444'; // red
    if (type === 'info') bg = '#3b82f6'; // blue

    toast.style.cssText = `position:fixed; bottom:30px; left:50%; transform:translateX(-50%); background:${bg}; color:white; padding:12px 28px; border-radius:30px; z-index:9999999; box-shadow:0 10px 30px rgba(0,0,0,0.3); font-weight:600; font-size:16px; opacity:0; transition:all 0.3s ease; white-space:nowrap;`;

    document.body.appendChild(toast);

    // Animate
    requestAnimationFrame(() => {
        toast.style.opacity = '1';
        toast.style.transform = 'translateX(-50%) translateY(0)';
    });

    setTimeout(() => {
        toast.style.opacity = '0';
        toast.style.transform = 'translateX(-50%) translateY(20px)';
        setTimeout(() => toast.remove(), 300);
    }, 3000);
};

// Update Status Function
window.updateApplicationStatus = async (id, newStatus) => {
    console.log(`[Status Change Triggered] ID: ${id} -> ${newStatus}`);
    window.showToast('상태 변경 중...', 'info');

    // DB Update
    const { data, error } = await supabase.from('applications').update({ status: newStatus }).eq('id', id).select();

    if (error) {
        console.error('Update Error:', error);
        window.showToast('변경 실패: ' + error.message, 'error');
        alert('DB 오류: ' + error.message);
    } else {
        if (!data || data.length === 0) {
            console.warn('Silent Failure: No rows updated');
            window.showToast('변경 실패 (권한 없음)', 'error');
            alert('변경되지 않았습니다. (RLS 권한 확인 필요)');
        } else {
            const labels = { pending: '접수대기', contacting: '상담중', completed: '처리완료', cancelled: '취소됨' };
            window.showToast(`[${labels[newStatus]}] 상태로 변경되었습니다.`, 'success');
            loadApplications(); // Refresh list
        }
    }
};

// Global Event Delegate for Status Radio Buttons (Robust Fix for Inline Handler Issues)
document.addEventListener('change', (e) => {
    if (e.target && e.target.classList.contains('status-radio-input')) {
        const id = e.target.dataset.id;
        const val = e.target.value;
        if (id && val) {
            updateApplicationStatus(id, val);
        }
    }
});

// Open Detail Modal (Premium Design Final V3)
window.openApplicationDetail = async (id) => {
    const modal = document.getElementById('admin-common-modal');
    const modalBody = document.getElementById('admin-modal-body');
    const modalTitle = document.getElementById('admin-modal-title');

    modalTitle.innerText = '신청 상세 정보';
    modalBody.innerHTML = '<div style="display:flex; justify-content:center; padding:50px;"><i class="fas fa-spinner fa-spin fa-3x" style="color:#e2e8f0;"></i></div>';
    modal.style.display = 'block';

    const { data: item, error } = await supabase.from('applications').select('*').eq('id', id).single();

    if (error || !item) {
        modalBody.innerHTML = '<div style="text-align:center; padding:30px; color:#ef4444;">데이터를 불러올 수 없습니다.</div>';
        return;
    }

    // Parsing Logic
    let rawName = item.product_name || '';
    let priceMatch = rawName.match(/\((₩[\d,]+)\)/);
    let priceText = priceMatch ? priceMatch[1] : '';
    let cleanName = rawName.replace(/\((₩[\d,]+)\)/, '').trim();

    // Dynamic Lookup if Price is Missing (Detail View)
    if (!priceText && window.adminPriceMap) {
        let lookupName = cleanName;
        let foundPrice = window.adminPriceMap[lookupName];

        if (!foundPrice && lookupName.includes(' (')) {
            lookupName = lookupName.split(' (')[0].trim();
            foundPrice = window.adminPriceMap[lookupName];
        }

        if (foundPrice) {
            if (foundPrice === '문의') priceText = '문의';
            else {
                const n = Number(String(foundPrice).replace(/,/g, ''));
                if (!isNaN(n)) priceText = '₩' + n.toLocaleString();
                else priceText = foundPrice;
            }
        }
    }

    if (cleanName.includes('(CPU:')) cleanName = cleanName.replace('(CPU:', '/ CPU:');

    let specParts = cleanName.split('/').map(s => s.trim()).filter(s => s);
    let productNameDisplay = specParts.length > 0 ? specParts[0] : cleanName;
    let specsList = specParts.slice(1);

    let specsHtml = '';
    if (specsList.length > 0) {
        specsHtml = `<ul style="margin:12px 0 0 0; padding-left:20px; color:#475569; line-height:1.6; list-style-type:disc;">` +
            specsList.map(s => `<li>${s.replace(/\)$/, '')}</li>`).join('') +
            `</ul>`;
    } else {
        specsHtml = '<div style="color:#94a3b8; font-size:0.9rem; margin-top:8px;">추가 사양 정보 없음</div>';
    }

    // Status Options
    const statusOptions = [
        { val: 'pending', label: '접수대기' },
        { val: 'contacting', label: '상담중' },
        { val: 'completed', label: '처리완료' },
        { val: 'cancelled', label: '취소됨' }
    ];

    // Status Radio HTML (Using class 'status-radio-input' for delegation)
    const statusSelectHtml = statusOptions.map(opt =>
        `<label style="cursor:pointer; display:flex; align-items:center; gap:12px; margin-bottom: 12px; font-size:1rem; color:${item.status === opt.val ? '#4338ca' : '#4b5563'}; font-weight:${item.status === opt.val ? '700' : '500'}; transition:all 0.2s; padding:6px; border-radius:6px; background:${item.status === opt.val ? '#e0e7ff' : 'transparent'};">
            <input type="radio" class="status-radio-input" name="modal_status_${item.id}" data-id="${item.id}" value="${opt.val}" ${item.status === opt.val ? 'checked' : ''} style="width:20px; height:20px; accent-color:#4338ca;">
            ${opt.label}
         </label>`
    ).join('');

    const headerStyle = "color: #4338ca; font-size: 1.15rem; font-weight: 800; text-transform: uppercase; letter-spacing: 0.5px; margin-bottom: 12px; display: block;";

    modalBody.innerHTML = `
        <div style="display: grid; grid-template-columns: 2fr 1fr; gap: 30px;">
            <!-- Left Column: Product Info -->
            <div>
                <div class="info-group">
                    <span style="${headerStyle}">상품 정보 (Product Info)</span>
                    <div class="info-value highlight" style="position:relative; background:#f8fafc; border:1px solid #e2e8f0; padding:24px; border-radius:12px;">
                        
                        <!-- Top Row: Badge + Price -->
                        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:16px; border-bottom:1px solid #e2e8f0; padding-bottom:12px;">
                            <span class="badge badge-blue" style="font-size:1rem; padding:6px 12px; text-transform:uppercase; letter-spacing:1px; background:#eff6ff; color:#1d4ed8; border:1px solid #dbeafe;">${item.product_type || 'Product'}</span>
                            ${priceText ? `<span style="font-size:1.3rem; font-weight:700; color:#dc2626; background:#fff1f2; padding:4px 12px; border-radius:6px;">${priceText}</span>` : ''}
                        </div>

                        <!-- Product Name -->
                        <div style="font-size:1.5rem; font-weight:800; color:#0f172a; margin-bottom:20px; line-height:1.4;">
                            ${productNameDisplay}
                        </div>
                        
                        <!-- Specs List -->
                        <div style="background:#fff; padding:16px; border-radius:8px; border:1px solid #f1f5f9; box-shadow:sm;">
                            <span style="font-size:0.9rem; color:#64748b; font-weight:700; display:block; margin-bottom:8px;">상세 사양:</span>
                            ${specsHtml}
                        </div>
                    </div>
                </div>

                <div class="info-group" style="margin-top:25px;">
                    <span style="${headerStyle}">문의 / 요청사항 (Inquiry)</span>
                    <div class="info-value" style="min-height:120px; white-space:pre-wrap; background:#fff; border:1px solid #e2e8f0; padding:20px; border-radius:12px; font-size:1rem; line-height:1.6; color:#334155;">${item.memo || '<span style="color:#cbd5e1">내용 없음</span>'}</div>
                </div>
            </div>

            <!-- Right Column: Status & Customer -->
            <div style="background:#fff; padding:24px; border-radius:16px; border:1px solid #e2e8f0; box-shadow:0 10px 15px -3px rgba(0,0,0,0.05);">
                <div class="info-group">
                    <span style="${headerStyle} color:#4f46e5;">신청 상태 변경</span>
                    <div style="background:#f8fafc; padding:16px; border-radius:12px; border:1px solid #e2e8f0;">
                        ${statusSelectHtml}
                    </div>
                </div>
                
                <hr style="border:0; border-top:1px solid #e2e8f0; margin: 24px 0;">

                <div class="info-group">
                    <span style="${headerStyle} color:#0f172a;">고객 정보</span>
                    <div style="margin-bottom:8px; font-weight:700; color:#334155; font-size:1.1rem;">${item.company_name || '(회사명 미입력)'}</div>
                    <div style="margin-bottom:4px; font-weight:600; font-size:1.05rem;">${item.contact_person}</div>
                    <div style="color:#64748b; font-size:1rem; margin-bottom:2px;">${item.phone}</div>
                    <div style="color:#64748b; font-size:0.95rem;"><a href="mailto:${item.email}" style="color:#3b82f6; text-decoration:none;">${item.email || '-'}</a></div>
                </div>
                
                <div style="margin-top:40px;">
                     <button onclick="closeAdminModal()" style="width:100%; padding:14px; border-radius:10px; background:#475569; color:white; font-size:1rem; font-weight:600; cursor:pointer; border:none; transition:all 0.2s; box-shadow:0 4px 6px -1px rgba(0,0,0,0.1);">
                        <i class="fas fa-times"></i> 닫기
                     </button>
                </div>
            </div>
        </div>
    `;
};

// (Removed Legacy Duplicate updateApplicationStatus)

window.deleteApplication = async (id) => {
    if (confirm('정말 이 신청 내역을 삭제하시겠습니까? (복구 불가)')) {
        console.log('Deleting entry:', id, typeof id);

        // .select()를 추가하여 실제 삭제된 데이터를 반환받습니다.
        const { data, error } = await supabase
            .from('applications')
            .delete()
            .eq('id', id)
            .select();

        if (error) {
            console.error('Delete failed (Error):', error);
            if (error.code === '42501' || error.message.includes('policy')) {
                alert('권한 오류: Supabase RLS 정책에 의해 삭제가 차단되었습니다.\n(Project Settings > Table Editor > applications > Enable Delete for public/anon)');
            } else {
                alert('삭제 중 오류 발생: ' + error.message);
            }
        } else {
            // 에러는 없지만 삭제된 데이터도 없는 경우 (RLS Silent Failure)
            if (!data || data.length === 0) {
                console.warn('Delete failed (Silent): No rows affected.');
                alert('삭제된 데이터가 없습니다.\n원인: 이미 삭제되었거나, Supabase RLS 정책이 삭제를 조용히 차단하고 있습니다.\n\n해결책: Supabase 대시보드에서 "applications" 테이블의 Delete 권한을 허용해주세요.');
            } else {
                console.log('Delete successful:', data);
                alert('삭제되었습니다.');
                loadApplications();
            }
        }
    }
};

window.loadApplications = loadApplications; // Expose global

// ===========================
// Tab Logic
// ===========================
window.showTab = async (tabId) => {
    document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
    document.querySelectorAll('.admin-tab').forEach(el => el.classList.remove('active'));

    const target = document.getElementById(`tab-${tabId}`);
    if (target) {
        target.classList.add('active');
        history.replaceState(null, null, `#${tabId}`);
    }

    const buttons = document.querySelectorAll('.admin-tab');
    buttons.forEach(btn => {
        const onclick = btn.getAttribute('onclick');
        if (onclick && onclick.includes(`'${tabId}'`)) {
            btn.classList.add('active');
        }
    });

    try {
        if (tabId === 'analytics') await renderAnalytics();
        if (tabId === 'notice') await renderAnnouncements();
        if (tabId === 'product') await renderProducts();
        if (tabId === 'history') await renderTimeline();
        if (tabId === 'customer') await renderCustomers();
        if (tabId === 'terms') await loadTermEditor(currentTermType);
        if (tabId === 'inquiry') await renderInquiries();
        if (tabId === 'faq') await renderFaqs();
        if (tabId === 'application') await loadApplications();
        if (tabId === 'backup' && window.loadBackups) await window.loadBackups();
    } catch (err) { console.error(err); }
}

async function refreshDashboard() {
    const updateCount = async (table, id) => {
        const el = document.getElementById(id);
        if (!el) return;
        const { count } = await supabase.from(table).select('*', { count: 'exact', head: true });
        el.innerText = count || 0;
    };
    await updateCount('notices', 'notice-count');
    await updateCount('inquiries', 'inquiry-count');
    await updateCount('products', 'product-count');
    await updateCount('faqs', 'faq-count');
    await updateCount('company_history', 'history-count');
    await updateCount('customers', 'customer-count');
}

// ===========================
// 1. Notices
// ===========================
async function renderAnnouncements() {
    const container = document.getElementById('notice-list');
    if (!container) return;

    if (!container.querySelector('table')) {
        container.innerHTML = `
        <div style="overflow-x:auto;">
            <table class="admin-table">
                <thead><tr><th width="50">#</th><th width="150">제목</th><th>내용(미리보기)</th><th width="80">중요</th><th width="100">작성일</th><th width="120">관리</th></tr></thead>
                <tbody id="notice-table-body"></tbody>
            </table>
        </div>`;
    }

    const { data } = await supabase.from('notices').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
    const body = document.getElementById('notice-table-body');
    body.innerHTML = '';

    if (!data || !data.length) { body.innerHTML = '<tr><td colspan="6" align="center">등록된 공지사항이 없습니다.</td></tr>'; return; }

    data.forEach((item, idx) => {
        // Truncate content for preview (remove HTML tags first if possible, or just raw)
        // Simple HTML strip
        let plainText = item.content.replace(/<[^>]*>?/g, ' ').substring(0, 50);
        if (item.content.replace(/<[^>]*>?/g, '').length > 50) plainText += '...';

        // Storing data in button attribute for easy access or just passing ID
        // For simplicity, we'll fetch or we can pass proper valid JSON but escaping is tricky. 
        // Better: store in window map or just fetch by ID again? 
        // Optimization: We already have 'data'. We can find by ID in memory if we keep it. 
        // For now, let's just use a function that finds it from the 'data' array we have in this scope? No, scope issue.
        // We'll attach the item to the window object temporarily or just pass properties.

        // Safest: Pass ID so function can find it or re-fetch. But re-fetch is slow.
        // Let's attach full object to the button using a data property is messy with strings.
        // Solution: Create a global map or simply use editNotice to load form and we add a view button?
        // User wants "View Detail Modal", distinct from Edit.

        body.innerHTML += `
            <tr>
                <td>${idx + 1}</td>
                <td style="font-weight:bold; color:#1e293b;">${item.title}</td>
                <td style="color:#64748b; font-size:0.9rem; cursor:pointer;" onclick="viewNoticeDetail('${item.id}')">${plainText || '(내용 없음)'}</td>
                <td>${item.is_pinned ? '<span class="badge badge-red">중요</span>' : '-'}</td>
                <td>${new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="viewNoticeDetail('${item.id}')" style="padding:4px 8px; font-size:12px; margin-right:4px;">보기</button>
                    <button class="btn btn-secondary" onclick="editNotice(${item.id})" style="padding:4px 8px; font-size:12px;">수정</button>
                    <button class="delete-btn" onclick="deleteNotice(${item.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    });

    // Cache data for modal usage
    window.currentNoticeList = data;
}

// Global View Function
window.viewNoticeDetail = (id) => {
    const notice = window.currentNoticeList?.find(n => n.id == id);
    if (!notice) return;

    const modalTitle = document.getElementById('admin-modal-title');
    const modalBody = document.getElementById('admin-modal-body');
    const modal = document.getElementById('admin-common-modal');

    modalTitle.innerText = notice.title;

    // Format Date & Author
    const date = new Date(notice.created_at).toLocaleString();
    const pinBadge = notice.is_pinned ? '<span class="badge badge-red">중요 공지</span>' : '';

    modalBody.innerHTML = `
        <div style="border-bottom:1px solid #e2e8f0; padding-bottom:15px; margin-bottom:20px; display:flex; justify-content:space-between; align-items:center;">
            <div>
                ${pinBadge}
                <span style="color:#64748b; font-size:0.9rem; margin-left:10px;"><i class="far fa-calendar-alt"></i> ${date}</span>
                <span style="color:#64748b; font-size:0.9rem; margin-left:15px;"><i class="fas fa-user-circle"></i> ${notice.author || '관리자'}</span>
            </div>
            <span style="color:#94a3b8; font-size:0.85rem;">ID: ${notice.id}</span>
        </div>
        <div style="min-height:200px; color:#334155; line-height:1.6;">
            ${notice.content}
        </div>
        <div style="text-align:right; margin-top:30px; border-top:1px solid #e2e8f0; padding-top:20px;">
            <button class="btn btn-primary" onclick="editNotice(${notice.id}); closeAdminModal();">수정하기</button>
            <button class="btn btn-secondary" onclick="closeAdminModal()">닫기</button>
        </div>
    `;

    modal.style.display = 'block';
};

// Notice CRUD handlers match typical form IDs (notice-form, notice-title...)
// Notice CRUD handlers match typical form IDs (notice-form, notice-title...)
document.getElementById('notice-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    // UI Loading State
    const submitBtn = document.getElementById('notice-submit-btn');
    const originalText = submitBtn.innerText;
    submitBtn.innerText = '저장 중...';
    submitBtn.disabled = true;

    try {
        const id = document.getElementById('notice-edit-id').value;
        const title = document.getElementById('notice-title').value;

        // Editor Content
        let content = quill ? quill.root.innerHTML : document.getElementById('notice-content').value;
        // If empty content (just <p><br></p>), treat as empty
        if (content === '<p><br></p>') content = '';

        const author = document.getElementById('notice-author').value;
        const is_pinned = document.getElementById('notice-pinned').checked;
        const active = document.getElementById('notice-active').checked;
        const payload = { title, content, author, is_pinned, active };

        if (!content) throw new Error("내용을 입력해주세요.");

        let error;
        if (id) {
            const res = await supabase.from('notices').update(payload).eq('id', id);
            error = res.error;
        } else {
            const res = await supabase.from('notices').insert([payload]);
            error = res.error;
        }

        if (error) throw error;

        alert('저장되었습니다.');
        resetNoticeForm();
        renderAnnouncements();
    } catch (err) {
        console.error('Notice Save Error:', err);
        alert('저장 중 오류가 발생했습니다: ' + (err.message || err));
    } finally {
        submitBtn.innerText = originalText;
        submitBtn.disabled = false;
    }
});
window.deleteNotice = async (id) => { if (confirm('삭제?')) { await supabase.from('notices').delete().eq('id', id); renderAnnouncements(); } };
window.editNotice = async (id) => {
    const { data } = await supabase.from('notices').select('*').eq('id', id).single();
    if (!data) return;
    document.getElementById('notice-edit-id').value = data.id;
    document.getElementById('notice-title').value = data.title;
    document.getElementById('notice-content').value = data.content;
    if (document.getElementById('notice-author')) document.getElementById('notice-author').value = data.author || '관리자';
    document.getElementById('notice-pinned').checked = data.is_pinned;
    document.getElementById('notice-active').checked = data.active;
    document.getElementById('notice-form').scrollIntoView({ behavior: 'smooth' });
};
window.resetNoticeForm = () => { document.getElementById('notice-form').reset(); document.getElementById('notice-edit-id').value = ''; };


// ===========================
// 2. Products (Hosting, VPN, Colocation, Service, Security)
// ===========================
let currentProductSub = 'hosting';

// New Tab Switching Logic
window.switchProductTab = (sub) => {
    currentProductSub = sub;

    // 1. Update Tab UI (Active State)
    document.querySelectorAll('.tabs .tab').forEach(el => el.classList.remove('active'));
    const activeTab = document.getElementById(`tab-${sub}`);
    if (activeTab) activeTab.classList.add('active');

    // 2. Show Content Area
    ['hosting', 'vpn', 'colocation', 'service', 'security'].forEach(id => {
        const content = document.getElementById(`sub-${id}`);
        if (content) content.style.display = (id === sub) ? 'block' : 'none';
    });

    // 3. Render Data
    renderProducts();
};

// Deprecated: showProductSub (Keeping for backward compatibility if needed, aliased)
window.showProductSub = window.switchProductTab;

// Product Rendering Logic
// Product Rendering Logic
async function renderProducts() {
    const sub = currentProductSub;
    let listEl;
    let subtitleEl;

    if (sub === 'product') {
        listEl = document.getElementById(`${currentProductSub}-list-body`);
    } else if (sub === 'security') {
        listEl = document.getElementById('security-list-body');
        subtitleEl = document.getElementById('sec-list-subtitle');
    } else if (sub === 'service') {
        listEl = document.getElementById('service-list-body');
        subtitleEl = document.getElementById('s-list-subtitle');
    } else {
        listEl = document.getElementById(`${sub}-list-body`);
    }

    if (!listEl) return;
    listEl.innerHTML = '<tr><td colspan="6" align="center">Loading...</td></tr>';

    let category = 'idc', subcategory = 'hosting';
    let currentServiceType = '';

    if (sub === 'product' || sub === 'hosting' || sub === 'vpn' || sub === 'colocation') {
        if (sub === 'vpn') { category = 'vpn'; subcategory = 'vpn-service'; }
        if (sub === 'colocation') { category = 'idc'; subcategory = 'colocation'; }
        if (sub === 'product') {
            if (currentProductSub === 'vpn') { category = 'vpn'; subcategory = 'vpn-service'; }
            else if (currentProductSub === 'colocation') { category = 'idc'; subcategory = 'colocation'; }
            else { category = 'idc'; subcategory = 'hosting'; } // Default
        }
    } else if (sub === 'security') {
        currentServiceType = document.getElementById('security-type-select')?.value || 'security-waf';
        const config = CATEGORIES[currentServiceType];
        if (config) {
            category = config.category;
            subcategory = config.subcategory;
            if (subtitleEl) subtitleEl.textContent = `선택된 카테고리: ${config.name}`;
        }
    } else if (sub === 'service') {
        currentServiceType = document.getElementById('service-type-select')?.value || 'addon-license';
        const config = CATEGORIES[currentServiceType];
        if (config) {
            category = config.category;
            subcategory = config.subcategory;
            // 부가 설명 업데이트
            if (subtitleEl) subtitleEl.textContent = `선택된 카테고리: ${config.name}`;
            const subElem = document.getElementById('s-list-subtitle');
            if (subElem) subElem.innerText = `${config.name} 목록을 관리합니다.`;
        }
    }

    // 1. Get Product ID for this category
    const { data: prodData } = await supabase.from('products').select('id').eq('category', category).eq('subcategory', subcategory).maybeSingle();

    if (!prodData) {
        listEl.innerHTML = `<tr><td colspan="6" align="center">등록된 상품(그룹)이 없습니다. <button class="btn btn-sm btn-primary" onclick="migrateToSupabase()">마이그레이션</button>을 진행해주세요.</td></tr>`;
        return;
    }

    // 2. Get Plans
    const { data: plans } = await supabase.from('product_plans')
        .select('*')
        .eq('product_id', prodData.id)
        .order('sort_order', { ascending: true });

    listEl.innerHTML = '';
    if (!plans || !plans.length) {
        listEl.innerHTML = '<tr><td colspan="6" align="center">등록된 플랜이 없습니다.</td></tr>';
        return;
    }

    plans.forEach((p, idx) => {
        let specs = '-';
        if (sub === 'hosting') {
            specs = `CPU: ${p.cpu || '-'}<br>RAM: ${p.ram || '-'}`;
        } else if (sub === 'vpn') {
            specs = `속도: ${p.speed || '-'}<br>거점: ${p.sites || '-'}`;
        } else if (sub === 'colocation') {
            const specText = [p.cpu, p.ram].filter(x => x).join(' / ');
            specs = specText || '-';
        } else {
            // Service / Security generic
            specs = p.summary || (p.features ? (Array.isArray(p.features) ? p.features[0] : p.features.split('\n')[0]) : '-');
        }

        // Define prefix for edit function
        let typePrefix = '';
        if (sub === 'hosting') typePrefix = 'h';
        else if (sub === 'vpn') typePrefix = 'v';
        else if (sub === 'colocation') typePrefix = 'c';
        else if (sub === 'security') typePrefix = 'sec';
        else if (sub === 'service') typePrefix = 's';

        listEl.innerHTML += `
            <tr>
                <td>${p.sort_order}</td>
                <td><strong>${p.plan_name}</strong><br><small style="color:#888;">${p.plan_id || '-'}</small></td>
                <td>${p.price}</td>
                <td style="font-size: 0.9em; white-space: pre-wrap;">${specs}</td>
                <td>${p.active ? '<span class="badge badge-green">On</span>' : '<span class="badge badge-gray">Off</span>'}</td>
                <td>
                    <button class="btn btn-secondary" style="padding:4px 8px; margin-right:4px;" onclick="openProductDetail(${p.id})"><i class="fas fa-search"></i></button>
                    <button class="btn btn-secondary" style="padding:4px 8px;" onclick="editProduct(${p.id}, '${typePrefix}')">수정</button>
                    <button class="delete-btn" onclick="deletePlan(${p.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

// Open Product Detail Modal
window.openProductDetail = async (id) => {
    // Show Loading
    const modal = document.getElementById('admin-common-modal');
    const modalBody = document.getElementById('admin-modal-body');
    const modalTitle = document.getElementById('admin-modal-title');

    modalTitle.innerText = '상품 상세 정보';
    modalBody.innerHTML = '<div style="text-align:center; padding:30px;"><i class="fas fa-spinner fa-spin fa-2x"></i></div>';
    modal.style.display = 'block';

    // Fetch single plan
    const { data: p, error } = await supabase.from('product_plans').select('*, products(name, category)').eq('id', id).single();

    if (error || !p) {
        modalBody.innerHTML = '<p style="color:red; text-align:center;">데이터를 불러올 수 없습니다.</p>';
        return;
    }

    // Format Data
    const categoryName = p.products?.name || '-';
    let featuresHtml = '';
    if (p.features) {
        const feats = Array.isArray(p.features) ? p.features : (p.features.split ? p.features.split('\n') : [p.features]);
        featuresHtml = '<ul style="padding-left:20px; margin:0;">' + feats.map(f => `<li>${f}</li>`).join('') + '</ul>';
    } else {
        featuresHtml = '-';
    }

    // Spec Helper
    const makeSpecRow = (label, val) => val ? `<div class="detail-grid"><div class="detail-label">${label}</div><div class="detail-value">${val}</div></div>` : '';

    let specRows = '';
    // Hosting
    specRows += makeSpecRow('CPU', p.cpu);
    specRows += makeSpecRow('RAM', p.ram);
    specRows += makeSpecRow('Storage', p.storage);
    specRows += makeSpecRow('Traffic', p.traffic);
    // VPN
    specRows += makeSpecRow('속도', p.speed);
    specRows += makeSpecRow('거점', p.sites);
    specRows += makeSpecRow('사용자', p.users);

    modalBody.innerHTML = `
        <div class="detail-grid">
            <div class="detail-label">상품명</div>
            <div class="detail-value"><strong>${p.plan_name}</strong></div>
        </div>
        <div class="detail-grid">
            <div class="detail-label">카테고리</div>
            <div class="detail-value">${categoryName}</div>
        </div>
        <div class="detail-grid">
            <div class="detail-label">가격</div>
            <div class="detail-value">${p.price} / ${p.period}</div>
        </div>
        <div class="detail-grid">
            <div class="detail-label">요약 설명</div>
            <div class="detail-value">${p.summary || '-'}</div>
        </div>
        ${specRows}
        <div class="detail-grid">
            <div class="detail-label">주요 기능</div>
            <div class="detail-value">${featuresHtml}</div>
        </div>
        <div class="detail-grid" style="border-bottom:none;">
            <div class="detail-label">상태</div>
            <div class="detail-value">
                ${p.active ? '<span class="badge badge-green">판매중</span>' : '<span class="badge badge-gray">판매중지</span>'}
                ${p.popular ? '<span class="badge badge-yellow">인기상품</span>' : ''}
            </div>
        </div>
    `;
};

window.deletePlan = async (id) => {
    if (confirm('정말 이 플랜을 삭제하시겠습니까?')) {
        await supabase.from('product_plans').delete().eq('id', id);
        renderProducts();
    }
};

window.editProduct = async (id, prefix) => {
    const { data: p } = await supabase.from('product_plans').select('*').eq('id', id).single();
    if (!p) return;

    // Populate common fields
    const setVal = (pid, val) => { const el = document.getElementById(pid); if (el) el.value = val || ''; };
    const setCheck = (pid, val) => { const el = document.getElementById(pid); if (el) el.checked = !!val; };

    setVal(`${prefix}-name`, p.plan_name);
    setVal(`${prefix}-id`, p.plan_id || p.product_id + '_' + p.id);
    setVal(`${prefix}-price`, p.price);
    setVal(`${prefix}-period`, p.period);
    setVal(`${prefix}-summary`, p.summary);
    setVal(`${prefix}-badge`, p.badge);
    setVal(`${prefix}-order`, p.sort_order);

    // Features (Array to String)
    const featuresStr = (typeof p.features === 'string') ? p.features : (Array.isArray(p.features) ? p.features.join('\n') : '');
    setVal(`${prefix}-features`, featuresStr);

    setCheck(`${prefix}-active`, p.active);

    // Specifics
    if (prefix === 'h') {
        setVal('h-cpu', p.cpu);
        setVal('h-ram', p.ram);
        setVal('h-storage', p.storage);
        setVal('h-traffic', p.traffic);
    } else if (prefix === 'v') {
        setVal('v-speed', p.speed);
        setVal('v-sites', p.sites);
        setVal('v-users', p.users);
    }

    // Set Hidden ID to trigger Update mode
    setVal(`${prefix}-id-hidden`, p.id);

    // Scroll to form
    let formId = '';
    if (prefix === 'h') formId = 'hosting-form';
    else if (prefix === 'v') formId = 'vpn-form';
    else if (prefix === 'c') formId = 'colocation-form';
    else if (prefix === 'sec') formId = 'security-form';
    else if (prefix === 's') formId = 'service-form';

    const formEl = document.getElementById(formId);
    if (formEl) {
        formEl.scrollIntoView({ behavior: 'smooth' });
        // Highlight submit button text
        const btn = formEl.querySelector('button[type="submit"]');
        if (btn) btn.innerText = "수정 저장";
    }
};

window.resetForm = (type) => {
    const form = document.getElementById(`${type}-form`);
    if (form) {
        form.reset();
        const btn = form.querySelector('button[type="submit"]');
        if (btn) btn.innerText = "상품 등록"; // or "서비스 저장"
        // Clear hidden ID
        let prefix = '';
        if (type === 'hosting') prefix = 'h';
        else if (type === 'vpn') prefix = 'v';
        else if (type === 'colocation') prefix = 'c';
        else if (type === 'security') prefix = 'sec';
        else if (type === 'service') prefix = 's';
        const hiddenInfo = document.getElementById(`${prefix}-id-hidden`);
        if (hiddenInfo) hiddenInfo.value = '';
    }
}


// Generic Product Form Handler (Upsert)
['hosting', 'vpn', 'colocation', 'security', 'service'].forEach(type => {
    const form = document.getElementById(`${type}-form`);
    if (form) {
        form.addEventListener('submit', async (e) => {
            e.preventDefault();
            let p = 'h';
            if (type === 'vpn') p = 'v';
            if (type === 'colocation') p = 'c';
            if (type === 'security') p = 'sec';
            if (type === 'service') p = 's';

            const getVal = (id) => document.getElementById(id)?.value || '';
            const getCheck = (id) => document.getElementById(id)?.checked || false;

            // Determine Target Category/Subcategory
            let targetType = type;
            if (type === 'service') {
                targetType = document.getElementById('service-type-select').value;
            } else if (type === 'security') {
                targetType = document.getElementById('security-type-select').value;
            }

            // Get Parent Product ID
            const prod = await getOrCreateProduct(targetType);
            if (!prod) return;

            // Prepare Payload
            const featuresInput = getVal(`${p}-features`);

            const commonData = {
                product_id: prod.id,
                plan_name: getVal(`${p}-name`),
                plan_id: getVal(`${p}-id`), // This is the Slug/User-facing ID
                price: getVal(`${p}-price`),
                period: getVal(`${p}-period`),
                summary: getVal(`${p}-summary`),
                badge: getVal(`${p}-badge`),
                active: getCheck(`${p}-active`),
                sort_order: parseInt(getVal(`${p}-order`)) || 1,
                features: featuresInput
            };

            // Specific Specs
            if (type === 'hosting') {
                commonData.cpu = getVal('h-cpu');
                commonData.ram = getVal('h-ram');
                commonData.storage = getVal('h-storage');
                commonData.traffic = getVal('h-traffic');
            } else if (type === 'colocation') {
                // Map Colocation Space/Power to CPU/RAM columns
                commonData.cpu = getVal('c-cpu'); // Space
                commonData.ram = getVal('c-ram'); // Power
            } else if (type === 'vpn') {
                commonData.speed = getVal('v-speed');
                commonData.sites = getVal('v-sites');
                commonData.users = getVal('v-users');
            }

            // Check for Update vs Insert
            const hiddenId = getVal(`${p}-id-hidden`);

            if (hiddenId) {
                // Update
                const { error } = await supabase.from('product_plans').update(commonData).eq('id', hiddenId);
                if (error) { alert('수정 실패: ' + error.message); return; }
                alert('상품 정보가 수정되었습니다.');
            } else {
                // Insert
                const { error } = await supabase.from('product_plans').insert([commonData]);
                if (error) { alert('등록 실패: ' + error.message); return; }
                alert('새로운 상품이 등록되었습니다.');
            }

            // Reset UI
            resetForm(type);
            renderProducts();
        });
    }
});

// Terms Management
// currentTermType is already declared globally
window.loadTermEditor = async (type) => {
    currentTermType = type;
    // Update Tab UI
    ['privacy', 'terms', 'member'].forEach(t => {
        const btn = document.getElementById(`btn-${t}`);
        if (btn) {
            // Remove legacy classes just in case
            btn.classList.remove('btn-primary', 'btn-secondary');

            // Toggle Active State
            if (t === type) {
                btn.classList.add('active');
            } else {
                btn.classList.remove('active');
            }
        }
    });

    const textarea = document.getElementById('term-content');
    if (!textarea) return;
    textarea.value = '로딩 중...';

    // Load from Supabase DB
    try {
        const { data, error } = await supabase
            .from('terms')
            .select('content')
            .eq('type', type)
            .single();

        if (error) throw error;

        textarea.value = data?.content || '';
    } catch (err) {
        console.error('약관 로드 실패:', err);
        textarea.value = '';
        alert('약관 로드 실패: ' + err.message + '\n\nSupabase 테이블 설정을 확인해주세요.');
    }
};

window.saveCurrentTerm = async () => {
    const content = document.getElementById('term-content').value;
    if (!content) {
        alert('내용을 입력해주세요.');
        return;
    }

    // Save to Supabase DB only
    try {
        const { error } = await supabase
            .from('terms')
            .upsert({
                type: currentTermType,
                content: content,
                title: currentTermType === 'privacy' ? '개인정보처리방침' :
                    currentTermType === 'terms' ? '이용약관' : '회원약관'
            }, {
                onConflict: 'type'
            });

        if (error) throw error;

        alert('저장되었습니다!');
    } catch (err) {
        console.error('저장 실패:', err);
        alert('저장 실패: ' + err.message + '\n\nSupabase 테이블 설정을 확인해주세요.');
    }
};

window.resetTermToDefault = () => {
    if (confirm('정말 내용을 초기화하시겠습니까? (저장되지 않은 변경사항은 사라집니다)')) {
        document.getElementById('term-content').value = '';
    }
};


// ===========================
// 3. Analytics
// ===========================
async function renderAnalytics() {
    const ctx = document.getElementById('analyticsChart');
    if (!ctx) return;

    // Last 7 days
    const dates = Array.from({ length: 7 }, (_, i) => {
        const d = new Date(); d.setDate(d.getDate() - (6 - i));
        return d.toISOString().split('T')[0];
    });

    const { data } = await supabase.from('web_logs').select('created_at').gte('created_at', dates[0]);
    const counts = dates.map(d => data.filter(r => r.created_at.startsWith(d)).length);

    if (logsChart) logsChart.destroy();
    logsChart = new Chart(ctx, {
        type: 'line',
        data: {
            labels: dates.map(d => d.substring(5)),
            datasets: [{ label: 'Visitors', data: counts, borderColor: '#ef4444', backgroundColor: 'rgba(239,68,68,0.1)', fill: true }]
        },
        options: { responsive: true, maintainAspectRatio: false }
    });
}

// ===========================
// 4. Other (Customers, FAQ, Inquiries, Terms, History)
// ===========================
async function renderCustomers() {
    const el = document.getElementById('customer-list');
    if (!el) return;
    const { data } = await supabase.from('customers').select('*').order('sort_order', { ascending: true }); // Default sort by sort_order
    el.innerHTML = '';

    // Sort logic fallback if needed, but DB order is best. 
    // If no sort_order column, it might error, but assuming it exists or ignore.
    // Ideally user probably wants to sort by ID descending or similar if no order.
    // Let's assume ID desc for now if sort_order is null

    data?.forEach(c => {
        el.innerHTML += `<div class="customer-card" style="position:relative; display:flex; flex-direction:column; align-items:center; gap:10px;">
            <div style="font-weight:bold; font-size:1.1rem;">${c.name}</div>
            ${c.logo_url ? `<img src="${c.logo_url}" style="height:50px; object-fit:contain; margin:10px 0;">` : '<div style="height:50px; display:flex; align-items:center; color:#ccc;">No Logo</div>'}
            
            <div style="display:flex; gap:8px; margin-top:auto; width:100%;">
                 <button class="btn btn-secondary" onclick="editCustomer(${c.id})" style="flex:1; padding:6px; font-size:12px;">수정</button>
                 <button class="delete-btn" onclick="deleteCustomer(${c.id})" style="flex:1; padding:6px; font-size:12px; height:auto; width:auto; background:#fee2e2; color:#dc2626; border:1px solid #fecaca;"><i class="fas fa-trash"></i> 삭제</button>
            </div>
        </div>`;
    });
}

window.deleteCustomer = async (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
        await supabase.from('customers').delete().eq('id', id);
        renderCustomers();
    }
};

window.editCustomer = async (id) => {
    const { data } = await supabase.from('customers').select('*').eq('id', id).single();
    if (!data) return;

    document.getElementById('customer-name').value = data.name;
    document.getElementById('customer-logo').value = data.logo_url || '';
    document.getElementById('cust-id-hidden').value = data.id;

    document.getElementById('cust-form-title').innerText = "고객사 정보 수정";
    document.getElementById('cust-submit-btn').innerText = "수정 저장";

    document.getElementById('customer-form').scrollIntoView({ behavior: 'smooth' });
};

window.resetCustomerForm = () => {
    document.getElementById('customer-form').reset();
    document.getElementById('cust-id-hidden').value = '';
    document.getElementById('cust-form-title').innerText = "고객사 추가";
    document.getElementById('cust-submit-btn').innerText = "추가";
};

document.getElementById('customer-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('cust-id-hidden').value;
    const name = document.getElementById('customer-name').value;
    let logo_url = document.getElementById('customer-logo').value.trim();

    // URL Logic: If not empty and doesn't start with http/https, prepend https://
    if (logo_url && !/^https?:\/\//i.test(logo_url)) {
        logo_url = 'https://' + logo_url;
    }

    if (id) {
        // Update
        const { error } = await supabase.from('customers').update({ name, logo_url }).eq('id', id);
        if (error) { alert('수정 실패: ' + error.message); return; }
        alert('고객사 정보가 수정되었습니다.');
    } else {
        // Insert
        // Get max sort_order to append? Or just insert.
        const { error } = await supabase.from('customers').insert([{ name, logo_url }]);
        if (error) { alert('추가 실패:' + error.message); return; }
        alert('추가되었습니다.');
    }

    resetCustomerForm();
    renderCustomers();
});

async function renderFaqs() {
    const el = document.getElementById('faq-list');
    if (!el) return;
    const { data } = await supabase.from('faqs').select('*').order('sort_order');
    el.innerHTML = '';
    data?.forEach(f => {
        el.innerHTML += `<div class="card" style="padding:15px; margin-bottom:10px;">
            <b>Q. ${f.question}</b><br><small>A. ${f.answer}</small>
            <div style="text-align:right;"><button class="delete-btn" onclick="deleteFaq(${f.id})">Del</button></div>
        </div>`;
    });
}
window.deleteFaq = async (id) => { if (confirm('Delete?')) { await supabase.from('faqs').delete().eq('id', id); renderFaqs(); } };
document.getElementById('faq-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await supabase.from('faqs').insert([{
        question: document.getElementById('faq-question').value,
        answer: document.getElementById('faq-answer').value,
        category: document.getElementById('faq-category').value,
        active: document.getElementById('faq-active').checked
    }]);
    e.target.reset(); renderFaqs();
});

async function renderInquiries() {
    const el = document.getElementById('inquiry-list');
    if (!el) return;
    if (!el.querySelector('table')) el.innerHTML = '<table class="admin-table"><thead><tr><th>Date</th><th>Name</th><th>Subject</th><th>Status</th><th>View</th></tr></thead><tbody id="inq-body"></tbody></table>';

    const { data } = await supabase.from('inquiries').select('*').order('created_at', { ascending: false });
    const body = document.getElementById('inq-body');
    body.innerHTML = '';
    data?.forEach(i => {
        body.innerHTML += `<tr><td>${new Date(i.created_at).toLocaleDateString()}</td><td>${i.name}</td><td>${i.subject}</td><td>${i.status}</td><td><button class="btn btn-secondary" onclick="alert('${i.message}')">View</button></td></tr>`;
    });
}

// Terms
window.loadTermEditor = async (type) => {
    currentTermType = type;
    const { data } = await supabase.from('terms').select('content').eq('type', type).single();
    document.getElementById('term-content').value = data ? data.content : '';
}
window.saveCurrentTerm = async () => {
    await supabase.from('terms').upsert({ type: currentTermType, content: document.getElementById('term-content').value }, { onConflict: 'type' });
    alert('Saved');
}

// History
// History
async function renderTimeline() {
    const el = document.getElementById('history-list');
    if (!el) return;
    const { data } = await supabase.from('company_history').select('*').order('year', { ascending: false }).order('month', { ascending: false }).order('sort_order', { ascending: true });
    el.innerHTML = '';

    if (!data || data.length === 0) {
        el.innerHTML = '<div style="text-align:center; padding:20px; color:#999;">등록된 연혁이 없습니다.</div>';
        return;
    }

    data.forEach(h => {
        // Use a div that mimics the hover effect of table rows for consistency (Stronger Effect)
        el.innerHTML += `<div class="card history-item" style="margin-bottom:10px; padding:15px; transition: all 0.2s cubic-bezier(0.34, 1.56, 0.64, 1); position:relative; border-left: 4px solid transparent;" onmouseover="this.style.backgroundColor='#e0e7ff'; this.style.borderLeftColor='#4f46e5'; this.style.transform='translateY(-3px) scale(1.005)'; this.style.boxShadow='0 12px 20px -5px rgba(79, 70, 229, 0.15)';" onmouseout="this.style.backgroundColor='white'; this.style.borderLeftColor='transparent'; this.style.transform='none'; this.style.boxShadow='none';">
            <div style="display:flex; justify-content:space-between; align-items:flex-start;">
                <div>
                    <span style="font-size:1.1em; font-weight:700; color:#4f46e5; margin-right:8px;">${h.year}.${h.month ? h.month.toString().padStart(2, '0') : ''}</span>
                    <span style="font-weight:600; color:#333;">${h.title}</span>
                </div>
                <div style="display:flex; gap:6px;">
                    <button class="btn btn-secondary" onclick="editHistory(${h.id})" style="padding:4px 8px; font-size:12px;">수정</button>
                    <button class="delete-btn" onclick="deleteHistory(${h.id})" style="padding:4px 8px; font-size:12px;"><i class="fas fa-trash"></i></button>
                </div>
            </div>
            ${h.description ? `<div style="font-size:0.9em; color:#666; margin-top:6px; padding-left:4px;">${h.description}</div>` : ''}
        </div>`;
    });
}

window.deleteHistory = async (id) => {
    if (confirm('정말 삭제하시겠습니까?')) {
        await supabase.from('company_history').delete().eq('id', id);
        renderTimeline();
        refreshDashboard();
    }
};



// Edit Notice
window.editNotice = async (id) => {
    try {
        const { data, error } = await supabase.from('notices').select('*').eq('id', id).single();
        if (error) throw error;

        document.getElementById('notice-edit-id').value = data.id;
        document.getElementById('notice-title').value = data.title;
        document.getElementById('notice-author').value = data.author;
        document.getElementById('notice-pinned').checked = data.is_pinned;
        document.getElementById('notice-active').checked = data.active;

        // Set Editor Content
        if (quill) {
            quill.root.innerHTML = data.content;
        } else {
            document.getElementById('notice-content').value = data.content;
        }

        document.getElementById('notice-form-title').innerText = '공지사항 수정';
        document.getElementById('notice-submit-btn').innerHTML = '<i class="fas fa-save"></i> 수정';
        document.getElementById('notice-cancel-btn').style.display = 'inline-block';

        // Scroll to form
        document.getElementById('notice-form').scrollIntoView({ behavior: 'smooth' });

    } catch (err) {
        console.error(err);
        alert('정보를 불러오지 못했습니다.');
    }
};

// Reset Form
window.resetNoticeForm = () => {
    document.getElementById('notice-form').reset();
    document.getElementById('notice-edit-id').value = '';

    // Clear Editor
    if (quill) quill.root.innerHTML = '';

    document.getElementById('notice-form-title').innerText = '공지사항 작성';
    document.getElementById('notice-submit-btn').innerHTML = '<i class="fas fa-plus"></i> 작성';
    document.getElementById('notice-cancel-btn').style.display = 'none';
};

// Notice form submit handler
document.getElementById('notice-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();

    const id = document.getElementById('notice-edit-id').value;
    const title = document.getElementById('notice-title').value;
    const author = document.getElementById('notice-author').value;
    const is_pinned = document.getElementById('notice-pinned').checked;
    const active = document.getElementById('notice-active').checked;

    // Get content from Quill editor
    const content = quill ? quill.root.innerHTML : document.getElementById('notice-content').value;

    const payload = { title, author, content, is_pinned, active };

    if (id) {
        // Update
        const { error } = await supabase.from('notices').update(payload).eq('id', id);
        if (error) { alert('수정 실패: ' + error.message); return; }
        alert('공지사항이 수정되었습니다.');
    } else {
        // Insert
        const { error } = await supabase.from('notices').insert([payload]);
        if (error) { alert('등록 실패: ' + error.message); return; }
        alert('공지사항이 등록되었습니다.');
    }

    resetNoticeForm();
    renderNotices(); // Assuming renderNotices exists to refresh the list
    refreshDashboard(); // Assuming refreshDashboard exists
});

window.editHistory = async (id) => {
    const { data } = await supabase.from('company_history').select('*').eq('id', id).single();
    if (!data) return;

    document.getElementById('history-year').value = data.year;
    document.getElementById('history-month').value = data.month || '';
    document.getElementById('history-title').value = data.title;
    document.getElementById('history-description').value = data.description || '';
    document.getElementById('history-sort').value = data.sort_order || 1;
    document.getElementById('history-active').checked = data.active;

    document.getElementById('history-edit-id').value = data.id;
    document.getElementById('history-form-title').innerText = "연혁 수정";
    document.getElementById('history-submit-btn').innerHTML = '<i class="fas fa-save"></i> 수정 저장';
    document.getElementById('history-cancel-btn').style.display = 'inline-block'; // Show cancel button

    document.getElementById('history-form').scrollIntoView({ behavior: 'smooth' });
};

window.resetHistoryForm = () => {
    document.getElementById('history-form').reset();
    document.getElementById('history-edit-id').value = '';
    document.getElementById('history-form-title').innerText = "연혁 추가";
    document.getElementById('history-submit-btn').innerHTML = '<i class="fas fa-plus"></i> 추가';
    document.getElementById('history-cancel-btn').style.display = 'none';
};

document.getElementById('history-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('history-edit-id').value;

    const payload = {
        year: parseInt(document.getElementById('history-year').value),
        month: document.getElementById('history-month').value ? parseInt(document.getElementById('history-month').value) : null,
        title: document.getElementById('history-title').value,
        description: document.getElementById('history-description').value,
        sort_order: parseInt(document.getElementById('history-sort').value),
        active: document.getElementById('history-active').checked
    };

    if (id) {
        // Update
        const { error } = await supabase.from('company_history').update(payload).eq('id', id);
        if (error) { alert('수정 실패: ' + error.message); return; }
        alert('수정되었습니다.');
    } else {
        // Insert
        const { error } = await supabase.from('company_history').insert([payload]);
        if (error) { alert('등록 실패: ' + error.message); return; }
        alert('등록되었습니다.');
    }

    resetHistoryForm();
    renderTimeline();
    refreshDashboard();
});

