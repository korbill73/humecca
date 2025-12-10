const fs = require('fs');
const path = require('path');

const pages = [
    { filename: 'idc_hosting.html', title: '서버 호스팅' },
    { filename: 'idc_colocation.html', title: '코로케이션' },
    { filename: 'idc_network.html', title: 'IDC 네트워크' },
    { filename: 'cloud_kt.html', title: 'KT 클라우드' },
    { filename: 'cloud_storage.html', title: '클라우드 스토리지' },
    { filename: 'cloud_os.html', title: '다양한 OS 지원' },
    { filename: 'vpn_service.html', title: 'VPN 서비스' },
    { filename: 'vpn_line.html', title: '전용선' },
    { filename: 'vpn_monitoring.html', title: '네트워크 모니터링' },
    { filename: 'sec_monitoring.html', title: '보안 모니터링' },
    { filename: 'sec_ddos.html', title: 'DDoS 방어' },
    { filename: 'sec_ssl.html', title: 'SSL/방화벽' },
    { filename: 'add_server.html', title: '서버 관리 대행' },
    { filename: 'add_backup.html', title: '백업 & 복구' },
    { filename: 'add_ha.html', title: 'HA 호스팅' },
    { filename: 'sol_home.html', title: '맞춤형 홈페이지' },
    { filename: 'sol_groupware.html', title: '그룹웨어' },
    { filename: 'sol_ebiz.html', title: 'e-Business 솔루션' }
];

const indexHtml = fs.readFileSync('index.html', 'utf8');

// Extract Header
const headerStart = indexHtml.indexOf('<header class="header">');
const headerEnd = indexHtml.indexOf('</header>') + 9;
const headerContent = indexHtml.substring(headerStart, headerEnd);

// Extract Footer
const footerStart = indexHtml.indexOf('<footer class="footer">');
const footerEnd = indexHtml.indexOf('</footer>') + 9;
const footerContent = indexHtml.substring(footerStart, footerEnd);

pages.forEach(page => {
    const content = `<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HUMECCA - ${page.title}</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    ${headerContent}

    <!-- SUBPAGE HERO -->
    <section class="hero" style="min-height: 350px; height: 350px; margin-top: 80px; background: #1a1f3c; display: flex; align-items: center; justify-content: center;">
        <div class="container" style="text-align: center; color: white;">
            <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 20px;">${page.title}</h1>
            <p style="font-size: 1.2rem; opacity: 0.8;">HUMECCA의 전문적인 ${page.title} 서비스를 만나보세요.</p>
        </div>
    </section>

    <!-- CONTENT -->
    <section class="services" style="padding: 80px 0; min-height: 500px;">
        <div class="container">
            <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); text-align: center;">
                <div style="color: #E94D36; font-size: 3rem; margin-bottom: 20px;">
                    <i class="fas fa-tools"></i>
                </div>
                <h2 style="font-size: 2rem; margin-bottom: 20px;">${page.title} 서비스 상세 내용</h2>
                <p style="color: #666; margin-bottom: 40px; line-height: 1.6;">
                    현재 페이지의 상세 콘텐츠를 준비 중입니다.<br>
                    고객님의 비즈니스에 최적화된 솔루션을 제공하기 위해 최선을 다하고 있습니다.
                </p>
                <a href="index.html#support" class="btn btn-primary">상담 문의하기</a>
            </div>
        </div>
    </section>

    ${footerContent}

    <script src="./script.js"></script>
</body>
</html>`;

    fs.writeFileSync(page.filename, content);
    console.log(`Created ${page.filename}`);
});
