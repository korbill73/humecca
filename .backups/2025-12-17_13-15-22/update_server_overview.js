const fs = require('fs');
const path = require('path');

const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_server.html';
const imageSource = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/cloud_service_diagram_1765278130418.png';
const imageDestDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/images';
const imageDestPath = path.join(imageDestDir, 'cloud_service_diagram.png');

// 1. Copy the Generated Image to the project images folder
if (!fs.existsSync(imageDestDir)) fs.mkdirSync(imageDestDir, { recursive: true });
try {
    fs.copyFileSync(imageSource, imageDestPath);
    console.log('Copied generated diagram to images folder.');
} catch (e) {
    console.error('Error copying image:', e);
}

// 2. Update HTML Content
if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');

    // Define New Content Blocks based on KT Cloud Reference
    const newHeader = `
            <div class="content-header">
                <h2>서비스 개요</h2>
                <p>
                    Server는 안전하고 크기 조정이 가능한 컴퓨팅 인프라를 가상화하여 제공하는 서비스입니다.<br>
                    웹 인터페이스나 API를 통해 필요한 서버 인프라를 간편하게 구성할 수 있습니다.<br>
                    해당 서비스로 구성된 서버들의 리소스는 <strong style="color:#d92e2e;">KT Cloud</strong>에서 안전하게 관리하며, 
                    고객 단독 사용이 보장됩니다.
                </p>
            </div>`;

    const newFeatures = `
            <!-- Service Features (Updated to 6 Items like KT Cloud) -->
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
            </div>`;

    const newDiagram = `
            <!-- Service Configuration Diagram (Generated Image) -->
            <div class="content-section" style="margin-bottom:60px;">
                <div class="section-title">서비스 구성도</div>
                <div style="text-align:center; padding: 40px; background:#f8fafc; border-radius:16px; border:1px solid #e2e8f0;">
                    <img src="images/cloud_service_diagram.png" alt="Cloud Service Configuration Diagram" style="max-width:100%; height:auto; box-shadow:0 8px 24px rgba(0,0,0,0.06); border-radius:12px;">
                    <p style="margin-top:20px; color:#64748b; font-size:14px; font-weight:500;">기본적인 클라우드 서버 구성 예시 (Web/WAS/DB)</p>
                </div>
            </div>`;

    // Replacement Logic: 
    // We want to replace the top part of the content (Header + Features) and insert the Diagram BEFORE the Pricing Table.
    // We rely on markers: <main class="cloud-content"> (START) and <!-- Server Pricing Section --> (END of top part)

    const mainStartMarker = '<main class="cloud-content">';
    const pricingMarker = '<!-- Server Pricing Section -->'; // Look for this comment in sub_cloud_server.html

    const startIndex = html.indexOf(mainStartMarker);
    const pricingIndex = html.indexOf(pricingMarker);

    if (startIndex !== -1 && pricingIndex !== -1) {
        // Extract content before main and after pricing
        const preContent = html.substring(0, startIndex + mainStartMarker.length);
        const postContent = html.substring(pricingIndex);

        // Assemble new HTML
        const newContent = `
            ${newHeader}
            ${newFeatures}
            ${newDiagram}
            <div style="height:40px;"></div>
`;
        const finalHtml = preContent + newContent + postContent;

        fs.writeFileSync(targetFile, finalHtml, 'utf8');
        console.log('Successfully updated sub_cloud_server.html with KT Cloud content and generated diagram.');
    } else {
        console.error('Could not find structure markers in HTML. Please verify file content.');
    }
} else {
    console.error('Target file sub_cloud_server.html not found.');
}
