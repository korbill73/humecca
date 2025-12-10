const fs = require('fs');
const path = require('path');

const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';
const imageSource = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/cloud_arch_v2_1765279677526.png';
const imageDestDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/images';
const imageDestPath = path.join(imageDestDir, 'cloud_architecture_v2.png');

// 1. Copy the newly generated diagram image
if (!fs.existsSync(imageDestDir)) fs.mkdirSync(imageDestDir, { recursive: true });
try {
    fs.copyFileSync(imageSource, imageDestPath);
    console.log('Copied new architecture diagram image.');
} catch (e) {
    console.error('Error copying image:', e);
}

// 2. Build the Comprehensive HTML Content for Service Overview
if (fs.existsSync(targetFile)) {
    const detailedContent = `
            <!-- 1. Service Overview Header -->
            <div class="content-header">
                <h2>서비스 개요</h2>
                <p>
                    <strong style="color:#d92e2e;">High Performance Cloud Server</strong>는 기업 비즈니스에 최적화된 고성능 컴퓨팅 환경을 제공합니다.<br>
                    물리적 서버 구매 없이 웹 인터페이스를 통해 즉시 서버를 생성하고, 필요에 따라 유연하게 자원을 확장할 수 있습니다.<br>
                    안정적인 인프라와 강력한 보안, 합리적인 비용으로 비즈니스 혁신을 가속화하세요.
                </p>
            </div>

            <!-- 2. Core Features (6 Cards - Based on KT Cloud) -->
            <div class="content-section">
                <div class="section-title">서비스 특장점</div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-expand-arrows-alt"></i></div>
                        <h3>유연한 확장성 (Scalability)</h3>
                        <p>비즈니스 상황에 맞춰 CPU, Memory, Disk 자원을 즉시 변경 가능<br>API 통한 자동화 지원 및 Auto Scaling</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-shield-alt"></i></div>
                        <h3>탁월한 안정성 (Stability)</h3>
                        <p>99.9% 이상의 가용성 보장 (SLA 기준)<br>자동 장애 복구 (HA) 및 24/365 통합 모니터링</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-bolt"></i></div>
                        <h3>신속한 배포 (Agility)</h3>
                        <p>다양한 OS 이미지(Linux, Windows) 기본 제공<br>클릭 몇 번으로 수 분 내 서버 생성 및 사용 가능</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-coins"></i></div>
                        <h3>비용 효율성 (Cost Effective)</h3>
                        <p>초기 투자 비용 Zero, 사용한 만큼 지불하는 합리적 종량제<br>장기 약정 할인을 통한 추가 비용 절감</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-tachometer-alt"></i></div>
                        <h3>강력한 성능 (Performance)</h3>
                        <p>최신 Intel Xeon 프로세서 및 SSD 스토리지 탑재<br>Cloud 하모니 테스트 최상위 등급 성능 입증</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-lock"></i></div>
                        <h3>엔터프라이즈 보안 (Security)</h3>
                        <p>VM별 무료 방화벽 제공으로 네트워크 접근 제어<br>IPS, WAF, VPN 등 다양한 보안 부가서비스 연동</p>
                    </div>
                </div>
            </div>

            <!-- 3. Service Architecture (New Generated Image) -->
            <div class="content-section">
                <div class="section-title">서비스 구성도</div>
                <div style="background: #f8fafc; padding: 40px; border-radius: 16px; border: 1px solid #cbd5e1; text-align: center;">
                    <img src="images/cloud_architecture_v2.png" alt="Cloud Server Architecture Detail" style="max-width: 100%; height: auto; border-radius: 8px; box-shadow: 0 8px 24px rgba(0,0,0,0.08);">
                    <p style="margin-top: 20px; font-weight: 500; color: #475569; font-size:15px;">
                        안전하고 효율적인 트래픽 처리를 위한 클라우드 구성 예시
                    </p>
                </div>
            </div>

            <!-- 4. Detailed Specification Table (Detailed Specs) -->
            <div class="content-section">
                <div class="section-title">상품 상세 사양</div>
                <p style="margin-bottom:15px; color:#64748b;">다양한 비즈니스 요구사항을 충족하는 최적의 서버 사양을 제공합니다.</p>
                <div style="overflow-x:auto;">
                    <table class="cloud-content table" style="width:100%; border-collapse:collapse; background:white; margin:0;">
                        <thead>
                            <tr>
                                <th style="width:20%; text-align:left; background:#f1f5f9; padding:15px;">구분</th>
                                <th style="text-align:left; background:#f1f5f9; padding:15px;">상세 내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:600; color:#334155;">Computing (CPU)</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#475569;">
                                    - Intel Xeon Scalable Processors (최신 아키텍처 적용)<br>
                                    - vCPU 1 Core ~ 64 Core 등 다양한 옵션 제공<br>
                                    - 고성능 연산을 위한 전용 인스턴스 지원
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:600; color:#334155;">Memory (RAM)</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#475569;">
                                    - Standard Memory ~ High Memory 인스턴스 구성 가능<br>
                                    - 최대 256GB 대용량 메모리 지원 (DB 서버 등에 최적화)<br>
                                    - ECC (Error Correcting Code) 메모리 적용으로 안정성 확보
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:600; color:#334155;">Storage (Disk)</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#475569;">
                                    - SSD / HDD Volume 선택 가능 (OS Root Disk는 SSD 기본 제공)<br>
                                    - Volume당 최대 2TB 지원 (총 10TB 이상 확장 가능)<br>
                                    - 실시간 Snapshot 및 Custom Image 생성 지원
                                </td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:600; color:#334155;">Network</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#475569;">
                                    - 40Gbps 이중화 백본망 및 10G Network Interface<br>
                                    - 공인 IP (Static IP) 및 사설 IP 제공<br>
                                    - Inbound 트래픽 무제한 무료, 저렴한 Outbound 요금
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            <div style="height:60px;"></div>
`;

    let html = fs.readFileSync(targetFile, 'utf8');

    // Replace content inside <main class="cloud-content">
    const mainRegex = /<main class="cloud-content">([\s\S]*?)<\/main>/;

    if (mainRegex.test(html)) {
        html = html.replace(mainRegex, `<main class="cloud-content">${detailedContent}</main>`);
        fs.writeFileSync(targetFile, html, 'utf8');
        console.log('Successfully updated sub_cloud_intro.html with comprehensive details and new diagram.');
    }
}
