/* Admin Script - Supabase Integrated */

let currentTermType = 'privacy';

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

document.addEventListener('DOMContentLoaded', async () => {
    if (!window.supabase) {
        console.error('Supabase client missing.');
    } else {
        console.log('✅ Admin Page connected to Supabase');
    }

    // Check for hash
    const hash = window.location.hash.replace('#', '');
    if (hash) showTab(hash);
    else showTab('product'); // Default

    await refreshDashboard();
});

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
                <thead><tr><th width="50">#</th><th>제목</th><th width="80">중요</th><th width="100">작성일</th><th width="100">관리</th></tr></thead>
                <tbody id="notice-table-body"></tbody>
            </table>
        </div>`;
    }

    const { data } = await supabase.from('notices').select('*').order('is_pinned', { ascending: false }).order('created_at', { ascending: false });
    const body = document.getElementById('notice-table-body');
    body.innerHTML = '';

    if (!data || !data.length) { body.innerHTML = '<tr><td colspan="5" align="center">등록된 공지사항이 없습니다.</td></tr>'; return; }

    data.forEach((item, idx) => {
        body.innerHTML += `
            <tr>
                <td>${idx + 1}</td>
                <td><strong>${item.title}</strong></td>
                <td>${item.is_pinned ? '<span class="badge badge-red">중요</span>' : '-'}</td>
                <td>${new Date(item.created_at).toLocaleDateString()}</td>
                <td>
                    <button class="btn btn-secondary" onclick="editNotice(${item.id})" style="padding:4px 8px; font-size:12px;">수정</button>
                    <button class="delete-btn" onclick="deleteNotice(${item.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>`;
    });
}
// Notice CRUD handlers match typical form IDs (notice-form, notice-title...)
document.getElementById('notice-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('notice-edit-id').value;
    const title = document.getElementById('notice-title').value;
    const content = document.getElementById('notice-content').value;
    const is_pinned = document.getElementById('notice-pinned').checked;
    const payload = { title, content, is_pinned };

    if (id) await supabase.from('notices').update(payload).eq('id', id);
    else await supabase.from('notices').insert([payload]);

    alert('저장되었습니다.');
    resetNoticeForm();
    renderAnnouncements();
});
window.deleteNotice = async (id) => { if (confirm('삭제?')) { await supabase.from('notices').delete().eq('id', id); renderAnnouncements(); } };
window.editNotice = async (id) => {
    const { data } = await supabase.from('notices').select('*').eq('id', id).single();
    if (!data) return;
    document.getElementById('notice-edit-id').value = data.id;
    document.getElementById('notice-title').value = data.title;
    document.getElementById('notice-content').value = data.content;
    document.getElementById('notice-pinned').checked = data.is_pinned;
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
                    <button class="btn btn-secondary" style="padding:4px 8px;" onclick="editProduct(${p.id}, '${typePrefix}')">수정</button>
                    <button class="delete-btn" onclick="deletePlan(${p.id})"><i class="fas fa-trash"></i></button>
                </td>
            </tr>
        `;
    });
}

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
            btn.classList.remove('btn-primary', 'btn-secondary');
            btn.classList.add(t === type ? 'btn-primary' : 'btn-secondary');
        }
    });

    const textarea = document.getElementById('term-content');
    if (!textarea) return;
    textarea.value = '로딩중...';

    // Check if table 'terms' exists, if not maybe just store in localStorage for MVP as requested by user originally?
    // User said "Address missing content for 'Terms Management' ... investigate why not appearing".
    // I'll assume 'terms' table in DB.

    const { data, error } = await supabase.from('terms').select('content').eq('type', type).single();
    if (data) {
        textarea.value = data.content;
    } else {
        textarea.value = '';
    }
};

window.saveCurrentTerm = async () => {
    const content = document.getElementById('term-content').value;
    if (!content) return;

    // Upsert
    const { error } = await supabase.from('terms').upsert({ type: currentTermType, content: content }, { onConflict: 'type' });

    if (error) {
        alert('저장 실패: ' + error.message);
    } else {
        alert('저장되었습니다.');
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
    const { data } = await supabase.from('customers').select('*').order('sort_order');
    el.innerHTML = '';
    data?.forEach(c => {
        el.innerHTML += `<div class="customer-card" style="position:relative;">
            <div style="font-weight:bold;">${c.name}</div>
            ${c.logo_url ? `<img src="${c.logo_url}" style="height:40px;">` : ''}
            <button class="delete-btn" onclick="deleteCustomer(${c.id})" style="position:absolute;top:5px;right:5px;"><i class="fas fa-times"></i></button>
        </div>`;
    });
}
window.deleteCustomer = async (id) => { if (confirm('Delete?')) { await supabase.from('customers').delete().eq('id', id); renderCustomers(); } };
document.getElementById('customer-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await supabase.from('customers').insert([{ name: document.getElementById('customer-name').value, logo_url: document.getElementById('customer-logo').value }]);
    e.target.reset(); renderCustomers();
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
async function renderTimeline() {
    const el = document.getElementById('history-list');
    if (!el) return;
    const { data } = await supabase.from('company_history').select('*').order('year', { ascending: false });
    el.innerHTML = '';
    data?.forEach(h => {
        el.innerHTML += `<div class="card" style="margin-bottom:10px; padding:15px;">
            <div style="display:flex; justify-content:space-between;">
                <div><b>${h.year}.${h.month || ''}</b> ${h.title}</div>
                <button class="delete-btn" onclick="deleteHistory(${h.id})"><i class="fas fa-trash"></i></button>
            </div>
            <div style="font-size:0.9em; color:#666;">${h.description || ''}</div>
        </div>`;
    });
}
window.deleteHistory = async (id) => { if (confirm('Delete?')) { await supabase.from('company_history').delete().eq('id', id); renderTimeline(); } };
document.getElementById('history-form')?.addEventListener('submit', async (e) => {
    e.preventDefault();
    await supabase.from('company_history').insert([{
        year: parseInt(document.getElementById('history-year').value),
        month: document.getElementById('history-month').value,
        title: document.getElementById('history-title').value,
        description: document.getElementById('history-description').value,
        active: document.getElementById('history-active').checked
    }]);
    e.target.reset(); renderTimeline();
});
