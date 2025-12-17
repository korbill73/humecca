const fs = require('fs');
const targetFile = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_cloud_intro.html';

// 3. Service Generation Section (Cards)
const genSection = `
            <!-- 3. 서비스 구성 (서버 세대) - Designed -->
            <div class="content-section">
                <div class="section-title">서비스 구성 (서버 세대)</div>
                <div class="gen-grid">
                    <div class="gen-card gen-1">
                        <h4>1세대 서버</h4>
                        <p><strong>Haswell CPU 기반.</strong><br>고성능 I/O 필요 시 SSD Server 신청 가능.</p>
                    </div>
                    <div class="gen-card gen-2">
                        <h4>2세대 서버</h4>
                        <p><strong>Skylake/Broadwell CPU.</strong><br>기본 SSD 제공, 데이터 디스크 자유 선택.</p>
                    </div>
                    <div class="gen-card gen-3">
                        <h4 style="color:#dc2626;">3세대 (D1)</h4>
                        <p><strong>Cascade CPU, Openstack 플랫폼.</strong><br>최대 64vCore, 256GB 메모리.</p>
                    </div>
                </div>
            </div>`;

// 4. Key Functions (Grid Box)
const funcSection = `
            <!-- 4. 주요 기능 - Designed -->
            <div class="content-section">
                <div class="section-title">주요 기능</div>
                <div class="func-grid">
                    <div class="func-box">
                        <div class="func-header">
                            <div class="func-icon"><i class="fas fa-server"></i></div>
                            <h4>VM 구성 및 관리</h4>
                        </div>
                        <ul class="func-list">
                            <li>가상화된 VM 생성 (CPU/Disk 자유 조정)</li>
                            <li>최적화된 VM 템플릿 제공</li>
                        </ul>
                    </div>
                    <div class="func-box">
                        <div class="func-header">
                            <div class="func-icon"><i class="fas fa-network-wired"></i></div>
                            <h4>Network 제어</h4>
                        </div>
                        <ul class="func-list">
                            <li>방화벽 설정 및 포트포워딩</li>
                            <li>WAF 연동 보안 강화</li>
                            <li>내부망(CIP) 및 LB 구성</li>
                        </ul>
                    </div>
                    <div class="func-box">
                        <div class="func-header">
                            <div class="func-icon"><i class="fas fa-hdd"></i></div>
                            <h4>백업과 이중화</h4>
                        </div>
                        <ul class="func-list">
                            <li>스냅샷/이미지 백업 및 복원</li>
                            <li>디스크, 백본망, 서버(HA) 이중화</li>
                        </ul>
                    </div>
                    <div class="func-box">
                        <div class="func-header">
                            <div class="func-icon"><i class="fas fa-chart-line"></i></div>
                            <h4>Monitoring</h4>
                        </div>
                        <ul class="func-list">
                            <li>로그 히스토리/트래픽 통계</li>
                            <li>리소스 사용량 확인 및 알람(Watch)</li>
                        </ul>
                    </div>
                </div>
            </div>`;

// 5. Related Products (Badges)
const relatedSection = `
            <!-- 5. 연관 상품 - Designed -->
            <div class="content-section" style="text-align:center;">
                <div class="section-title">연관 상품</div>
                <div class="related-badges">
                    <div class="product-badge"><i class="fas fa-sync-alt"></i> Auto Scaling</div>
                    <div class="product-badge"><i class="fas fa-random"></i> Load Balancer</div>
                    <div class="product-badge"><i class="fas fa-project-diagram"></i> Connect Hub</div>
                    <div class="product-badge"><i class="fas fa-database"></i> NAS</div>
                    <div class="product-badge"><i class="fas fa-shield-alt"></i> WAF</div>
                </div>
            </div>`;

// 6. Pricing Table (Preserving the exact required text)
const pricingSection = `
            <!-- 6. 요금 비교 -->
            <div class="content-section">
                <div class="section-title">Server 요금 비교</div>
                <div style="background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 8px; padding: 20px; margin-bottom: 25px;">
                    <p style="margin: 0; color: #1e293b; font-weight: 600; font-size: 15px; line-height: 1.6;">
                        다음은 Linux 1년, 선 결제 없이 예약 30대 Outbound Network 월 30TB 이용 시 타사와 월별 이용을 비교했을 때의 가격표입니다.
                    </p>
                </div>
                <div style="overflow-x:auto;">
                    <table class="cloud-content table" style="width:100%; border-collapse:collapse; text-align:center; margin-top:0; border-top: 2px solid #1e293b;">
                        <thead>
                            <tr style="background:#f1f5f9;">
                                <th colspan="2" style="padding:15px; font-size:16px; color:#1e293b; font-weight:700; border-right:1px solid #d1d5db; border-bottom:1px solid #cbd5e1;">kt cloud 클라우드</th>
                                <th colspan="2" style="padding:15px; font-size:16px; color:#1e293b; font-weight:700; border-bottom:1px solid #cbd5e1;">A사</th>
                            </tr>
                            <tr style="background:#ffffff; color:#334155; font-weight:600;">
                                <td style="padding:15px; width:20%; border-bottom:1px solid #e2e8f0; border-right:1px solid #f1f5f9; background:#f8fafc;">사양</td>
                                <td style="padding:15px; width:30%; border-bottom:1px solid #e2e8f0; border-right:1px solid #d1d5db; background:#f8fafc;">요금</td>
                                <td style="padding:15px; width:20%; border-bottom:1px solid #e2e8f0; border-right:1px solid #f1f5f9; background:#f8fafc;">사양</td>
                                <td style="padding:15px; width:30%; border-bottom:1px solid #e2e8f0; background:#f8fafc;">요금</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">1core / 1GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">948,000원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">T2.micro</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">5,298,854 원</td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">2core / 4GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">2,319,000 원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">T3.medium</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">6,568,270 원</td>
                            </tr>
                            <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">4core / 8GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">4,638,000 원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">C5.xlarge</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">10,473,371 원</td>
                            </tr>
                             <tr>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; font-weight:500;">8core / 16GB</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; border-right:1px solid #e2e8f0; color:#dc2626; font-weight:700;">9,279,000 원</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">C5.2xlarge</td>
                                <td style="padding:15px; border-bottom:1px solid #e2e8f0; color:#64748b;">15,975,050 원</td>
                            </tr>
                        </tbody>
                    </table>
                    <p style="margin-top:10px; font-size:12px; color:#64748b; text-align:right;">* 각 사이트 요금 계산기 기준</p>
                </div>
            </div>`;

// 8. Success Cases (Redesigned with images)
const casesSection = `
            <!-- 8. 성공 사례 - Designed -->
            <div class="content-section">
                <div class="section-title">고객 성공 사례</div>
                
                <!-- Case 1 -->
                <div class="case-study-box">
                    <div class="case-content">
                        <h4><span class="case-tag">금융</span> 증권사 솔루션 사례</h4>
                        <ul class="func-list" style="margin-bottom:20px;">
                            <li><strong>Needs:</strong> 실시간 시세 제공 안정성<br>트래픽 급변 대응</li>
                            <li><strong>Solution:</strong> API 스케줄링 자동화<br>Load Balancer 트래픽 분산</li>
                        </ul>
                        <p style="font-size:14px; color:#475569; background:#f1f5f9; padding:12px; border-radius:6px; margin:0; border-left:3px solid #3b82f6;">
                            <strong>기대효과:</strong> 예상치 못한 트래픽/장애에 빠른 대응 가능
                        </p>
                    </div>
                    <div class="case-img">
                        <img src="images/usecase_finance.png" alt="Finance Diagram" style="max-width:100%; height:auto; mix-blend-mode:multiply; border-radius:8px;">
                    </div>
                </div>

                <!-- Case 2 -->
                <div class="case-study-box">
                    <div class="case-content">
                        <h4><span class="case-tag">교육</span> OO 어학원 솔루션 사례</h4>
                        <ul class="func-list" style="margin-bottom:20px;">
                            <li><strong>Needs:</strong> 대량 VM 및 부하분산<br>세션 폭주로 인한 다운 해결</li>
                            <li><strong>Solution:</strong> 40대 서버 구성, CIP 연동<br>WAF 방화벽 설정</li>
                        </ul>
                        <p style="font-size:14px; color:#475569; background:#f1f5f9; padding:12px; border-radius:6px; margin:0; border-left:3px solid #3b82f6;">
                            <strong>고객 후기:</strong> "이벤트 성공적 진행 및 안정성 개선 효과"
                        </p>
                    </div>
                    <div class="case-img">
                        <img src="images/usecase_edu.png" alt="Education Diagram" style="max-width:100%; height:auto; mix-blend-mode:multiply; border-radius:8px;">
                    </div>
                </div>
            </div>`;

const fullHTML = `
            <!-- 1. Intro Header -->
            <div class="content-header">
                <h2>서비스 개요</h2>
                <p>
                    Server는 안전하고 크기 조정이 가능한 컴퓨팅 인프라를 가상화하여 제공하는 서비스입니다.<br>
                    웹 인터페이스나 API를 통해 필요한 서버 인프라를 간편하게 구성할 수 있습니다.<br>
                    해당 서비스로 구성된 서버들의 리소스는 <strong style="color:#d92e2e;">kt cloud</strong>에서 안전하게 관리하며, 고객 단독 사용이 보장됩니다.
                </p>
            </div>

            <!-- 2. Features Grid (User provided text) -->
            <div class="content-section">
                <div class="section-title">서비스 특징</div>
                <div class="feature-grid">
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-expand-arrows-alt"></i></div>
                        <h3>확장성</h3>
                        <p style="text-align:left; font-size:14px;">· Open API/SDK 제공<br>· 외부 서비스 빠른 개발<br>· Incubation Center 지원</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-shield-alt"></i></div>
                        <h3>안정성</h3>
                        <p style="text-align:left; font-size:14px;">· Monitoring/Messaging<br>· LB, Auto Scaling, HA<br>· VM 안전 관리</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-bolt"></i></div>
                        <h3>신속성</h3>
                        <p style="text-align:left; font-size:14px;">· 수십 종 서버 스펙/OS 제공<br>· 웹 콘솔 빠른 생성</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-coins"></i></div>
                        <h3>비용</h3>
                        <p style="text-align:left; font-size:14px;">· 초기 투자비/운영비 무료<br>· Inbound 무료, 저렴한 NW</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-tachometer-alt"></i></div>
                        <h3>고성능</h3>
                        <p style="text-align:left; font-size:14px;">· CPU/IOPS 벤치마크 상위<br>· 40Gbps 백본 품질 보장</p>
                    </div>
                    <div class="feature-card">
                        <div class="icon"><i class="fas fa-lock"></i></div>
                        <h3>보안</h3>
                        <p style="text-align:left; font-size:14px;">· VM별 방화벽 기본 제공<br>· 이중화된 백본망 재난 대비</p>
                    </div>
                </div>
            </div>

            ${genSection}
            ${funcSection}
            ${casesSection}
            ${pricingSection}
            ${relatedSection}

            <!-- 9. 부가 서비스 Box -->
            <div class="content-section">
                <div class="section-title">주요 부가 서비스</div>
                <div style="background:#f8fafc; padding:30px; border-radius:12px; border:1px solid #e2e8f0; box-shadow:0 4px 6px rgba(0,0,0,0.02);">
                    <ul class="func-list" style="display:grid; grid-template-columns: 1fr 1fr; gap:20px;">
                        <li><strong>API 서비스:</strong> Amazon EC2와 유사한 API 제공 (VM 관리, 볼륨 제어 등)</li>
                        <li><strong>스냅샷/이미지:</strong> 디스크 상태 저장 및 시점 복원을 위한 백업 서비스</li>
                        <li><strong>CIP (Cloud Internal Path):</strong> 내부망 구성을 위한 별도 Network 환경 제공</li>
                        <li><strong>Scale up/down:</strong> 운용 중인 서버 사양 유연한 변경 (vCore, Memory 조정)</li>
                    </ul>
                </div>
            </div>
            
            <div style="height:80px;"></div>`;

if (fs.existsSync(targetFile)) {
    let html = fs.readFileSync(targetFile, 'utf8');
    const mainRegex = /<main class="cloud-content">([\s\S]*?)<\/main>/;
    if (mainRegex.test(html)) {
        html = html.replace(mainRegex, `<main class="cloud-content">${fullHTML}</main>`);
        fs.writeFileSync(targetFile, html, 'utf8');
        console.log('Redesigned sub_cloud_intro.html with styled sections for Generations, Functions, and Success Cases.');
    }
}
