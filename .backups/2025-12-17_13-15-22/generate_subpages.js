const fs = require('fs');
const path = require('path');

// 1. Data Extracted from Replit
const services = {
    'server-hosting': {
        pageName: 'sub_hosting.html',
        title: 'Server Hosting',
        desc: 'KT 강남 IDC에서 운영되는 고성능 전용 서버로 비즈니스 성장을 지원합니다.',
        features: [
            "Intel Xeon / AMD EPYC 최신 프로세서", "NVMe SSD 기반 초고속 스토리지", "국내 트래픽 무제한",
            "24시간 365일 기술 지원", "DDoS 방어 시스템 기본 제공", "실시간 모니터링"
        ],
        plans: [
            { name: "이코노미", price: "55,000", features: ["Xeon E-2224", "16GB RAM", "256GB NVMe"] },
            { name: "비즈니스", price: "199,000", features: ["Xeon Silver 4210", "64GB RAM", "1TB NVMe"], isPopular: true },
            { name: "엔터프라이즈", price: "399,000", features: ["AMD EPYC 7302", "128GB RAM", "2TB NVMe"] }
        ]
    },
    'colocation': {
        pageName: 'sub_colocation.html',
        title: 'Colocation',
        desc: 'KT 강남 IDC 등 최첨단 데이터센터에 고객님의 서버를 안전하게 운영합니다.',
        features: ["Tier 3+ 등급 데이터센터", "이중화 전력 (UPS+발전기)", "생체인증 보안", "24시간 원격 손 지원"],
        plans: [
            { name: "1U 랙 마운트", price: "80,000", features: ["1U 공간", "1A 전력", "100Mbps"] },
            { name: "쿼터 랙 (10U)", price: "450,000", features: ["10U 전용 공간", "5A 전력", "1Gbps"], isPopular: true },
            { name: "풀 랙 (42U)", price: "1,500,000", features: ["42U 전용 랙", "20A 전력", "10Gbps"] }
        ]
    },
    'cloud': {
        pageName: 'sub_cloud_intro.html',
        title: 'Cloud Service',
        desc: '유연하고 확장 가능한 클라우드 인프라. 몇 분 만에 서버를 생성하세요.',
        features: ["빠른 서버 생성", "실시간 오토스케일링", "시간 단위 과금", "VPC 네트워크 지원"],
        plans: [
            { name: "스타터", price: "50,000", features: ["2 vCPU", "4GB RAM", "100GB SSD"] },
            { name: "프로페셔널", price: "150,000", features: ["8 vCPU", "16GB RAM", "500GB SSD"], isPopular: true },
            { name: "비즈니스", price: "350,000", features: ["16 vCPU", "64GB RAM", "1TB SSD"] }
        ]
    },
    'vpn': {
        pageName: 'sub_vpn.html',
        title: 'VPN Dedicated Line',
        desc: '본사-지사 간 안전한 기업 네트워크 연결을 위한 VPN 전용선 서비스입니다.',
        features: ["IPSec / SSL VPN 지원", "AES-256 암호화", "다중 거점 연결", "대역폭 보장 (CIR)"],
        plans: [
            { name: "베이직", price: "200,000", features: ["10Mbps 보장", "3개 거점", "20 사용자"] },
            { name: "스탠다드", price: "500,000", features: ["100Mbps 보장", "5개 거점", "50 사용자"], isPopular: true },
            { name: "프리미엄", price: "1,000,000", features: ["1Gbps 보장", "10개 거점", "무제한 사용자"] }
        ]
    },
    'security': {
        pageName: 'sub_security.html',
        title: 'Security Center',
        desc: '최신 사이버 위협으로부터 비즈니스를 보호하는 종합 보안 서비스입니다.',
        features: ["DDoS 공격 방어", "WAF (웹방화벽)", "IPS (침입방지)", "24/7 보안관제"],
        plans: [
            { name: "베이직", price: "50,000", features: ["기본 DDoS", "SSL 무료", "월간 스캔"] },
            { name: "어드밴스드", price: "300,000", features: ["고급 DDoS", "WAF", "일일 스캔"], isPopular: true },
            { name: "엔터프라이즈", price: "800,000", features: ["프리미엄 DDoS", "WAF+IPS", "전담팀"] }
        ]
    },
    'web-design': {
        pageName: 'sub_web_custom.html',
        title: 'Web Design & Development',
        desc: '전문 디자인팀이 만드는 최적의 비즈니스 웹사이트. 기획부터 개발까지 원스톱 서비스.',
        features: ["반응형 웹 디자인", "SEO 최적화", "관리자 페이지 제공", "유지보수 지원"],
        plans: [
            { name: "랜딩페이지", price: "300,000", features: ["1페이지", "문의폼", "호스팅 1개월"] },
            { name: "기업 홈페이지", price: "2,000,000", features: ["10페이지 이내", "게시판", "호스팅 1년"], isPopular: true },
            { name: "쇼핑몰", price: "5,000,000", features: ["PG 연동", "회원 관리", "상품 관리"] }
        ]
    }
};

// 2. Read Template
const templatePath = path.join(__dirname, 'sub_template.html');
const template = fs.readFileSync(templatePath, 'utf8');

// 3. Generate Pages
Object.keys(services).forEach(key => {
    const data = services[key];

    // Build Features HTML
    let featuresHtml = '<div class="features-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(300px, 1fr)); gap:20px; margin-bottom:60px;">';
    data.features.forEach(f => {
        featuresHtml += `
            <div class="feature-card" style="padding:24px; border:1px solid #eee; border-radius:8px; background:white;">
                <div style="color:#E94D36; margin-bottom:10px;"><i class="fas fa-check-circle"></i></div>
                <h3 style="font-size:18px; font-weight:600; margin-bottom:8px;">${f}</h3>
            </div>
        `;
    });
    featuresHtml += '</div>';

    // Build Plans HTML
    let plansHtml = '<div class="pricing-grid" style="display:grid; grid-template-columns:repeat(auto-fit, minmax(280px, 1fr)); gap:30px;">';
    data.plans.forEach(p => {
        plansHtml += `
            <div class="plan-card ${p.isPopular ? 'popular' : ''}" style="border:1px solid ${p.isPopular ? '#E94D36' : '#eee'}; padding:30px; border-radius:12px; background:white; position:relative; display:flex; flex-direction:column;">
                ${p.isPopular ? '<span style="position:absolute; top:-12px; left:50%; transform:translateX(-50%); background:#E94D36; color:white; padding:4px 12px; border-radius:20px; font-size:12px; font-weight:600;">BEST CHOICE</span>' : ''}
                <div style="margin-bottom:20px; text-align:center;">
                    <h3 style="font-size:20px; font-weight:700; color:#333;">${p.name}</h3>
                    <div style="font-size:28px; font-weight:800; color:#E94D36; margin-top:10px;">₩${p.price} <span style="font-size:14px; color:#888; font-weight:400;">/월</span></div>
                </div>
                <ul style="list-style:none; padding:0; margin:0 0 30px 0; flex-grow:1;">
                    ${p.features.map(pf => `<li style="padding:10px 0; border-bottom:1px solid #f8f8f8; color:#555; font-size:14px;"><i class="fas fa-check" style="color:#E94D36; margin-right:8px;"></i> ${pf}</li>`).join('')}
                </ul>
                <a href="#" class="btn btn-primary" style="text-align:center; display:block; background:${p.isPopular ? '#E94D36' : '#333'}; padding:12px; border-radius:6px; color:white; text-decoration:none; font-weight:600;">신청하기</a>
            </div>
        `;
    });
    plansHtml += '</div>';

    // Combine Content
    const content = `
        <h2 style="font-size:28px; font-weight:700; margin-bottom:30px; text-align:center;">주요 특징</h2>
        ${featuresHtml}
        
        <h2 style="font-size:28px; font-weight:700; margin:60px 0 30px; text-align:center;">요금제 안내</h2>
        ${plansHtml}

        <div style="margin-top:80px; background:#f9fafb; padding:40px; border-radius:12px; text-align:center;">
            <h3 style="font-size:24px; font-weight:700; margin-bottom:15px;">맞춤형 상담이 필요하신가요?</h3>
            <p style="color:#666; margin-bottom:25px;">전문 엔지니어가 비즈니스 환경에 최적화된 설계를 도와드립니다.</p>
            <a href="sub_support.html" class="btn btn-primary" style="padding:12px 30px; font-size:16px;">무료 상담 신청</a>
        </div>
    `;

    // Replace Template Placeholders
    let html = template.replace('{{Title}}', data.title)
        .replace('{{Description}}', data.desc)
        .replace('{{Content}}', content);

    // Save
    fs.writeFileSync(path.join(__dirname, data.pageName), html, 'utf8');
    console.log(`Generated ${data.pageName}`);
});
