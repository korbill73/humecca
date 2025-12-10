const fs = require('fs');
const path = require('path');

const rootDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/';

const targetItems = [
    { name: 'sub_cloud_intro.html', badge: 'KT Cloud Partner', title: '클라우드 서비스 개요', desc: '비즈니스 혁신을 위한 최적의 클라우드 플랫폼' },
    { name: 'sub_security.html', badge: 'KT Cloud Security', title: 'Security', desc: '기업의 소중한 자산을 지키는 최적의 보안 솔루션' },
    { name: 'sub_hosting.html', badge: 'HUMECCA IDC', title: '서버호스팅', desc: 'KT 강남 IDC에서 운영되는 고성능 전용 서버' },
    { name: 'sub_colocation.html', badge: 'HUMECCA IDC', title: 'Colocation', desc: '최첨단 데이터센터에 고객님의 서버를 안전하게 운영합니다.' },
    { name: 'sub_vpn.html', badge: 'HUMECCA Network', title: 'VPN 전용선', desc: '본사-지사 간 안전한 기업 네트워크 연결을 위한 VPN 전용선 서비스입니다.' },
    { name: 'sub_web_custom.html', badge: 'HUMECCA Solution', title: 'Web Design & Development', desc: '전문 디자인팀이 만드는 최적의 비즈니스 웹사이트.' },
    { name: 'sub_support.html', badge: 'Customer Center', title: '고객지원', desc: '무엇을 도와드릴까요?' }
];

const pureTemplate = (badge, title, desc) => `
    <!-- Cloud Hero (Original CSS Style) -->
    <section class="cloud-hero">
        <div class="container">
            <span class="badge">${badge}</span>
            <h1>${title}</h1>
            <p>${desc}</p>
        </div>
    </section>
`;

targetItems.forEach(item => {
    const filePath = path.join(rootDir, item.name);
    if (fs.existsSync(filePath)) {
        let content = fs.readFileSync(filePath, 'utf8');
        let updated = false;

        // Remove existing inline-styled cloud-hero or sub-header and replace with clean class-only version
        // This ensures they inherit the original height/padding defined in styles.css

        const heroRegex = /<section class="cloud-hero"[\s\S]*?<\/section>/;
        const subHeaderRegex = /<section class="sub-header"[\s\S]*?<\/section>/;

        if (heroRegex.test(content)) {
            content = content.replace(heroRegex, pureTemplate(item.badge, item.title, item.desc));
            updated = true;
        } else if (subHeaderRegex.test(content)) {
            content = content.replace(subHeaderRegex, pureTemplate(item.badge, item.title, item.desc));
            updated = true;
        }

        if (updated) {
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Reverted ${item.name} to original .cloud-hero style`);
        } else {
            console.log(`No header section found in ${item.name}`);
        }
    } else {
        console.log(`File not found: ${item.name}`);
    }
});
