const fs = require('fs');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';
const serverFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_server.html';

// 1. Define the Content to be Moved (KT Cloud Service Overview)
const serviceOverviewContent = `
            <div class="content-header">
                <h2>서비스 개요</h2>
                <p>
                    Server는 안전하고 크기 조정이 가능한 컴퓨팅 인프라를 가상화하여 제공하는 서비스입니다.<br>
                    웹 인터페이스나 API를 통해 필요한 서버 인프라를 간편하게 구성할 수 있습니다.<br>
                    해당 서비스로 구성된 서버들의 리소스는 <strong style="color:#d92e2e;">KT Cloud</strong>에서 안전하게 관리하며, 
                    고객 단독 사용이 보장됩니다.
                </p>
            </div>

            <!-- Service Features (6 Cards) -->
            <div class="content-section">
                <div class="section-title">서비스 특징</div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-expand-arrows-alt"></i></div>
                        <h3>확장성</h3>
                        <p>Open API/SDK 제공으로 빠른 개발<br>Cloud Incubation Center 지원 (개발/테스트)</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-shield-alt"></i></div>
                        <h3>안정성</h3>
                        <p>모니터링을 통한 리소스 관리<br>Load Balancer, Auto Scaling, HA 지원</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-bolt"></i></div>
                        <h3>신속성</h3>
                        <p>다양한 서버 spec 제공<br>OS Type별 빠른 생성(Linux, Windows 등)</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-coins"></i></div>
                        <h3>비용 절감</h3>
                        <p>초기 투자비용 및 운영비 무료<br>Inbound 트래픽 무료, 저렴한 네트워크 비용</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-tachometer-alt"></i></div>
                        <h3>고성능</h3>
                        <p>Cloud 하모니 테스트 최상위 등급<br>40Gbps 백본, 4개 서비스 Zone</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-lock"></i></div>
                        <h3>보안</h3>
                        <p>VM별 방화벽 기본 제공<br>이중화된 백본망 및 침입탐지 시스템</p>
                    </div>
                </div>
            </div>

            <!-- Service Configuration Diagram -->
            <div class="content-section">
                <div class="section-title">서비스 구성도</div>
                <div style="text-align:center; padding: 40px; background:#f8fafc; border-radius:16px; border:1px solid #e2e8f0;">
                    <img src="images/cloud_service_diagram.png" alt="Cloud Service Configuration Diagram" style="max-width:100%; height:auto; box-shadow:0 8px 24px rgba(0,0,0,0.06); border-radius:12px;">
                    <p style="margin-top:20px; color:#64748b; font-size:14px; font-weight:500;">기본적인 클라우드 서버 구성 예시</p>
                </div>
            </div>
            
            <div style="height:60px;"></div>
`;

// 2. Apply to sub_cloud_intro.html
if (fs.existsSync(targetFile)) {
    let introHtml = fs.readFileSync(targetFile, 'utf8');
    // Replace the main content area completely
    const mainRegex = /<main class="cloud-content">([\s\S]*?)<\/main>/;

    if (mainRegex.test(introHtml)) {
        introHtml = introHtml.replace(mainRegex, `<main class="cloud-content">${serviceOverviewContent}</main>`);
        fs.writeFileSync(targetFile, introHtml, 'utf8');
        console.log('Successfully populated sub_cloud_intro.html with Service Overview content.');
    }
}

// 3. Revert sub_cloud_server.html to its original state (Server Pricing Focused)
// We need to remove the Features and Diagram we added, and restore the simple header.
if (fs.existsSync(serverFile)) {
    let serverHtml = fs.readFileSync(serverFile, 'utf8');

    // Original Header Text
    const originalServerHeader = `
            <div class="content-header">
                <h2>ucloud Server</h2>
                <p>kt 클라우드 플랫폼 기반에서 신속하고 안정적인 고품질의 클라우드 서버 자원 (CPU, Memory, Disk, Network)을 제공하는 서비스로, 웹 인터페이스를 통하여 사용자가
                    매우 간단하게 필요한 컴퓨팅 자원을 구성할 수 있습니다.</p>
            </div>
`;

    // Logic: Replace the <div class="content-header">...</div> block
    // And remove Diagram / Features sections by identifying markers.

    // A. Fix Header
    const currentHeaderRegex = /<div class="content-header">[\s\S]*?<\/div>/;
    serverHtml = serverHtml.replace(currentHeaderRegex, originalServerHeader);

    // B. Remove Features and Diagram
    // We can just remove everything between the Header and the Pricing Section comment.
    const pricingMarker = '<!-- Server Pricing Section -->';
    const headerEndIndex = serverHtml.indexOf('</div>', serverHtml.indexOf('<div class="content-header">')) + 6;
    const pricingStartIndex = serverHtml.indexOf(pricingMarker);

    if (headerEndIndex !== -1 && pricingStartIndex !== -1) {
        const pre = serverHtml.substring(0, headerEndIndex);
        const post = serverHtml.substring(pricingStartIndex);

        serverHtml = pre + '\n\n            <div style="height:40px;"></div>\n\n' + post;

        fs.writeFileSync(serverFile, serverHtml, 'utf8');
        console.log('Reverted sub_cloud_server.html to original Pricing-focused layout.');
    }
}
