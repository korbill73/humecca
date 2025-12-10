const fs = require('fs');
const path = require('path');

const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

// ==========================================
// 1. Unified Header Height Adjustment
// ==========================================
// Including sub_cloud_intro.html to force uniformity
const headerTargets = [
    { name: 'sub_cloud_intro.html', badge: 'KT Cloud Partner', title: '클라우드 서비스 개요', desc: '비즈니스 혁신을 위한 최적의 클라우드 플랫폼' },
    { name: 'sub_security.html', badge: 'KT Cloud Security', title: 'Security', desc: '기업의 소중한 자산을 지키는 최적의 보안 솔루션' },
    { name: 'sub_hosting.html', badge: 'HUMECCA IDC', title: '서버호스팅', desc: 'KT 강남 IDC에서 운영되는 고성능 전용 서버' },
    { name: 'sub_colocation.html', badge: 'HUMECCA IDC', title: 'Colocation', desc: '최첨단 데이터센터에 고객님의 서버를 안전하게 운영합니다.' },
    { name: 'sub_vpn.html', badge: 'HUMECCA Network', title: 'VPN 전용선', desc: '본사-지사 간 안전한 기업 네트워크 연결을 위한 VPN 전용선 서비스입니다.' },
    { name: 'sub_web_custom.html', badge: 'HUMECCA Solution', title: 'Web Design & Development', desc: '전문 디자인팀이 만드는 최적의 비즈니스 웹사이트.' },
    { name: 'sub_support.html', badge: 'Customer Center', title: '고객지원', desc: '무엇을 도와드릴까요?' }
];

const heroTemplate = (badge, title, desc) => `
    <!-- Cloud Hero Style Header - Unified Height -->
    <section class="cloud-hero" style="background: #fff5f5; padding: 60px 0; border-bottom: 1px solid #fee2e2;">
        <div class="container">
            <span class="badge" style="display:inline-block; color:#dc2626; font-weight:700; font-size:14px; margin-bottom:12px;">${badge}</span>
            <h1 style="font-size:36px; font-weight:800; color:#111827; margin-bottom:12px;">${title}</h1>
            <p style="font-size:16px; color:#4b5563;">${desc}</p>
        </div>
    </section>
`;

headerTargets.forEach(item => {
    const filePath = path.join(rootDir, item.name);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Update cloud-hero section
        const heroRegex = /<section class="cloud-hero"[\s\S]*?<\/section>/;

        if (heroRegex.test(content)) {
            content = content.replace(heroRegex, heroTemplate(item.badge, item.title, item.desc));
            updated = true;
        }

        // Also catch leftover sub-header or linear-gradient sections if any
        if (!updated) {
            const subHeaderRegex = /<section class="sub-header"[\s\S]*?<\/section>/;
            if (subHeaderRegex.test(content)) {
                content = content.replace(subHeaderRegex, heroTemplate(item.badge, item.title, item.desc));
                updated = true;
            }
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Unified header height in ${item.name}`);
        }
    }
});


// ==========================================
// 2. Remove Security Menu from Sidebar
// ==========================================
// Target: sub_cloud_*.html files
const cloudFiles = fs.readdirSync(rootDir).filter(f => f.startsWith('sub_cloud_') && f.endsWith('.html'));

cloudFiles.forEach(file => {
    const filePath = path.join(rootDir, file);
    let content = fs.readFileSync(filePath, 'utf8');

    // Regex matches <li> containing reference to security html and "보안" text
    // Example: <li><a href="sub_cloud_security.html"><i class="fas fa-shield-alt"></i> 보안</a></li>
    // Using multiline flag just in case

    // Pattern attempts to match the entire LI element
    const sidebarSecurityRegex = /<li>\s*<a[^>]*href="[^"]*security[^"]*"[^>]*>[\s\S]*?보안[\s\S]*?<\/a>\s*<\/li>/gi;

    if (sidebarSecurityRegex.test(content)) {
        content = content.replace(sidebarSecurityRegex, '');
        fs.writeFileSync(filePath, content, 'utf8');
        console.log(`Removed 'Security' sidebar menu from ${file}`);
    }
});
