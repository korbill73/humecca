const fs = require('fs');
const path = require('path');

const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';

// Generated images for Use Cases
const img1Src = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/usecase_finance_1765280508686.png';
const img2Src = 'C:/Users/ideac/.gemini/antigravity/brain/ac0ba905-7263-474f-be71-3c9290381083/usecase_edu_1765280545439.png';

const imgDir = 'f:/onedrive/OneDrive - 휴메카/08. homepage/images';
const img1Dest = path.join(imgDir, 'usecase_finance.png');
const img2Dest = path.join(imgDir, 'usecase_edu.png');

// 1. Copy Images
if (!fs.existsSync(imgDir)) fs.mkdirSync(imgDir, { recursive: true });
try {
    fs.copyFileSync(img1Src, img1Dest);
    fs.copyFileSync(img2Src, img2Dest);
    console.log('Copied Use Case diagrams.');
} catch (e) { console.error(e); }

// 2. Build Huge HTML Content
if (fs.existsSync(targetFile)) {
    const fullContent = `
            <!-- 1. 서비스 개요 -->
            <div class="content-header">
                <h2>서비스 개요</h2>
                <p>
                    Server는 안전하고 크기 조정이 가능한 컴퓨팅 인프라를 가상화하여 제공하는 서비스입니다.<br>
                    웹 인터페이스나 API를 통해 필요한 서버 인프라를 간편하게 구성할 수 있습니다.<br>
                    해당 서비스로 구성된 서버들의 리소스는 <strong style="color:#d92e2e;">kt cloud</strong>에서 안전하게 관리하며, 고객 단독 사용이 보장됩니다.
                </p>
            </div>

            <!-- 2. 서비스 특징 -->
            <div class="content-section">
                <div class="section-title">서비스 특징</div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-expand-arrows-alt"></i></div>
                        <h3>확장성</h3>
                        <p style="text-align:left; font-size:14px;">
                            · Open API와 SDK 제공, 외부 서비스 빠른 개발<br>
                            · Cloud Incubation Center 개발/마케팅 지원
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-shield-alt"></i></div>
                        <h3>안정성</h3>
                        <p style="text-align:left; font-size:14px;">
                            · Monitoring/Messaging으로 리소스 예측 관리<br>
                            · LB, Auto Scaling, HA 서비스로 결함 대처
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-bolt"></i></div>
                        <h3>신속성</h3>
                        <p style="text-align:left; font-size:14px;">
                            · 수십 종의 서버 스펙 및 OS 타입 제공<br>
                            · 웹 콘솔에서 간단한 조작으로 빠르게 생성
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-coins"></i></div>
                        <h3>비용</h3>
                        <p style="text-align:left; font-size:14px;">
                            · 초기 투자비/운영비 무료, Inbound 트래픽 무료<br>
                            · 타사 대비 매우 저렴한 Network 서비스
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-tachometer-alt"></i></div>
                        <h3>고성능</h3>
                        <p style="text-align:left; font-size:14px;">
                            · Cloud 하모니 벤치마킹 CPU/IOPS 최상위권<br>
                            · 40Gbps 백본으로 최고의 Network 품질 보장
                        </p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-lock"></i></div>
                        <h3>보안</h3>
                        <p style="text-align:left; font-size:14px;">
                            · VM 별 방화벽 서비스 기본 제공<br>
                            · 이중화된 백본망으로 재난 시에도 서비스 유지
                        </p>
                    </div>
                </div>
            </div>

            <!-- 3. 서비스 구성도 (Generations) -->
            <div class="content-section">
                <div class="section-title">서버 구성 및 세대별 특징</div>
                <div style="display:flex; flex-direction:column; gap:20px;">
                    <div style="background:white; border-left:5px solid #64748b; padding:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <h4 style="color:#1e293b; margin-bottom:10px;">1세대 서버 구성</h4>
                        <p style="color:#475569; font-size:14px;">기존세대 Haswell CPU까지 적용되는 1세대 서버입니다. 고성능 I/O 서버 필요시 SSD Server를 신청 가능합니다.</p>
                    </div>
                    <div style="background:white; border-left:5px solid #3b82f6; padding:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <h4 style="color:#1e293b; margin-bottom:10px;">2세대 서버 구성</h4>
                        <p style="color:#475569; font-size:14px;">Skylake, Broadwell 기반의 고성능 CPU 적용되는 2세대 서버입니다. 기본적으로 SSD 루트 디스크가 제공되며, 데이터 디스크 자유 선택이 가능합니다.</p>
                    </div>
                    <div style="background:white; border-left:5px solid #dc2626; padding:20px; box-shadow:0 2px 4px rgba(0,0,0,0.05);">
                        <h4 style="color:#d92e2e; margin-bottom:10px;">3세대 서버 구성 (D1)</h4>
                        <p style="color:#475569; font-size:14px;">Cancel Lake 기반 고성능 CPU 적용. Openstack 플랫폼 기반. VM당 최대 64vCore, 256GB 메모리 사용 가능.</p>
                    </div>
                </div>
            </div>

            <!-- 4. 주요 기능 -->
            <div class="content-section">
                <div class="section-title">주요 기능</div>
                <div style="display:grid; grid-template-columns: repeat(auto-fit, minmax(300px, 1fr)); gap:30px;">
                    <div>
                        <h4 style="border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px; color:#334155;">VM 구성 및 관리</h4>
                        <ul style="padding-left:20px; color:#64748b; line-height:1.8; font-size:14px;">
                            <li>Cloud 내부에 가상화된 VM 생성</li>
                            <li>CPU와 디스크 등 하드웨어 사양 자유롭게 조정</li>
                            <li>메모리, CPU, 디스크에 최적화된 VM 템플릿 제공</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px; color:#334155;">Network 구성과 제어</h4>
                        <ul style="padding-left:20px; color:#64748b; line-height:1.8; font-size:14px;">
                            <li>VM별 In/Outbound 트래픽 방화벽 설정</li>
                            <li>VR별 각 VM에 대한 포트포워딩 규칙 구성</li>
                            <li>웹 방화벽 연동을 통한 보안 강화</li>
                            <li>LB 서비스를 통한 트래픽 분산</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px; color:#334155;">백업과 이중화</h4>
                        <ul style="padding-left:20px; color:#64748b; line-height:1.8; font-size:14px;">
                            <li>스냅샷과 이미지를 통한 서버 백업/복원</li>
                            <li>디스크 구성 및 이중화 제공</li>
                            <li>이중화된 백본망과 Network 제공</li>
                        </ul>
                    </div>
                    <div>
                        <h4 style="border-bottom:2px solid #e2e8f0; padding-bottom:10px; margin-bottom:15px; color:#334155;">Monitoring</h4>
                        <ul style="padding-left:20px; color:#64748b; line-height:1.8; font-size:14px;">
                            <li>서버 관련 로그 히스토리 제공</li>
                            <li>Inbound / Outbound Network 트래픽 통계</li>
                            <li>이메일 알람 기능 제공 (Watch)</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- 5. 연관 상품 -->
            <div class="content-section" style="background:#f8fafc; padding:30px; border-radius:12px;">
                <div class="section-title">연관 상품</div>
                <div style="display:flex; gap:15px; flex-wrap:wrap; justify-content:center;">
                    <div style="background:white; padding:15px 25px; border-radius:30px; border:1px solid #cbd5e1; font-weight:600; color:#475569;">Auto Scaling</div>
                    <div style="background:white; padding:15px 25px; border-radius:30px; border:1px solid #cbd5e1; font-weight:600; color:#475569;">Load Balancer</div>
                    <div style="background:white; padding:15px 25px; border-radius:30px; border:1px solid #cbd5e1; font-weight:600; color:#475569;">Connect Hub</div>
                    <div style="background:white; padding:15px 25px; border-radius:30px; border:1px solid #cbd5e1; font-weight:600; color:#475569;">NAS</div>
                    <div style="background:white; padding:15px 25px; border-radius:30px; border:1px solid #cbd5e1; font-weight:600; color:#475569;">WAF</div>
                </div>
            </div>

            <!-- 6. 요금 구성 및 비교 -->
            <div class="content-section">
                <div class="section-title">가격 경쟁력</div>
                <p style="margin-bottom:20px;">타사 대비 저렴한 Network 비용과 합리적인 서버 요금을 제공합니다. 특히 Data Transfer 비용 절감 효과가 탁월합니다.</p>
                
                <table class="cloud-content table">
                    <thead>
                        <tr>
                            <th>사양</th>
                            <th>kt cloud (월)</th>
                            <th>A사 (비교)</th>
                            <th>A사 (월)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>1core / 1GB</td><td style="color:#d92e2e; font-weight:bold;">948,000원</td><td>T2.micro</td><td>5,298,854원</td></tr>
                        <tr><td>2core / 4GB</td><td style="color:#d92e2e; font-weight:bold;">2,319,000원</td><td>T3.medium</td><td>6,568,270원</td></tr>
                        <tr><td>4core / 8GB</td><td style="color:#d92e2e; font-weight:bold;">4,638,000원</td><td>C5.xlarge</td><td>10,473,371원</td></tr>
                        <tr><td>8core / 16GB</td><td style="color:#d92e2e; font-weight:bold;">9,279,000원</td><td>C5.2xlarge</td><td>15,975,050원</td></tr>
                    </tbody>
                </table>
                <p style="text-align:right; color:#94a3b8; font-size:12px;">* Linux 1년 예약, Outbound 30TB 이용 기준 / 각 사 요금계산기 기준</p>
            </div>

            <!-- 7. 세대별 비교 -->
            <div class="content-section">
                <div class="section-title">3세대(D1) vs 기존 세대(G1/G2)</div>
                <table class="cloud-content table">
                    <thead>
                        <tr><th>Product</th><th>D1 (Openstack)</th><th>G1, G2 (Cloudstack)</th></tr>
                    </thead>
                    <tbody>
                        <tr><td>Server</td><td>○</td><td>○</td></tr>
                        <tr><td>High Memory</td><td>○</td><td>○</td></tr>
                        <tr><td>Data Lake / AI / Container</td><td>○</td><td>X</td></tr>
                    </tbody>
                </table>
            </div>

            <!-- 8. 활용 사례 (With Created Images) -->
            <div class="content-section">
                <div class="section-title">고객 활용 사례</div>

                <!-- Case 1: 증권사 -->
                <div style="display:flex; gap:30px; margin-bottom:50px; flex-wrap:wrap; border-bottom:1px solid #e2e8f0; padding-bottom:30px;">
                    <div style="flex:1;">
                        <h4 style="color:#1e293b; margin-bottom:10px;">증권사 솔루션 사례</h4>
                        <ul style="color:#475569; line-height:1.8; font-size:14px; list-style:none; padding:0;">
                            <li><strong>Needs:</strong> 실시간 시세 제공을 위한 안정적 서버, 트래픽 급변 대응</li>
                            <li><strong>Solution:</strong> API 스케줄링 자동화, LB 트래픽 분산</li>
                            <li><strong>Effect:</strong> 예상치 못한 트래픽/장애 대응력 확보</li>
                        </ul>
                    </div>
                    <div style="flex:1; text-align:center;">
                         <img src="images/usecase_finance.png" alt="Finance Architecture" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #e2e8f0;">
                         <p style="font-size:12px; color:#94a3b8; margin-top:5px;">증권사 구성도</p>
                    </div>
                </div>

                <!-- Case 2: 어학원 -->
                <div style="display:flex; gap:30px; flex-wrap:wrap;">
                    <div style="flex:1;">
                        <h4 style="color:#1e293b; margin-bottom:10px;">OO 어학원 솔루션 사례</h4>
                        <ul style="color:#475569; line-height:1.8; font-size:14px; list-style:none; padding:0;">
                            <li><strong>Needs:</strong> 이벤트 대비 대량 VM 및 부하분산, 세션 폭주 해결</li>
                            <li><strong>Solution:</strong> 서버 40대 구성, CIP 연동, WAF 설정</li>
                            <li><strong>Effect:</strong> 안정성 개선 및 이벤트 성공적 진행</li>
                        </ul>
                    </div>
                    <div style="flex:1; text-align:center;">
                         <img src="images/usecase_edu.png" alt="Education Architecture" style="max-width:100%; height:auto; border-radius:8px; border:1px solid #e2e8f0;">
                         <p style="font-size:12px; color:#94a3b8; margin-top:5px;">어학원 구성도</p>
                    </div>
                </div>
            </div>

            <!-- 9. 부가 서비스 -->
            <div class="content-section">
                <div class="section-title">주요 부가 서비스</div>
                <div style="background:#f8fafc; padding:25px; border-radius:12px; border:1px solid #e2e8f0;">
                    <p style="margin-bottom:10px;"><strong>API 서비스:</strong> Amazon EC2와 유사한 API 제공 (VM 관리, 볼륨 제어, IP 관리 등)</p>
                    <p style="margin-bottom:10px;"><strong>스냅샷/이미지:</strong> 시점 복원을 위한 백업 서비스</p>
                    <p style="margin-bottom:10px;"><strong>CIP (Cloud Internal Path):</strong> 내부망 구성을 위한 별도 Network</p>
                    <p><strong>Scale up/down:</strong> 운용 중인 서버의 스펙을 즉시 변경 가능</p>
                </div>
            </div>
            
            <div style="height:80px;"></div>
    `;

    let html = fs.readFileSync(targetFile, 'utf8');
    const mainRegex = /<main class="cloud-content">([\s\S]*?)<\/main>/;

    if (mainRegex.test(html)) {
        html = html.replace(mainRegex, `<main class="cloud-content">${fullContent}</main>`);
        fs.writeFileSync(targetFile, html, 'utf8');
        console.log('Successfully updated sub_cloud_intro.html with comprehensive text.');
    }
}
