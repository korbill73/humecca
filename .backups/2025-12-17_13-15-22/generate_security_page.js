const fs = require('fs');
const path = require('path');

const templatePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_template.html';
const targetPath = 'f:/onedrive/OneDrive - 휴메카/08. homepage/sub_security.html';

let template = fs.readFileSync(templatePath, 'utf8');

// Try to remove Security link from template string (Cloud dropdown removal)
// The pattern matches the link block. Adjust regex to be flexible with whitespace.
template = template.replace(/<a href="sub_security\.html" class="dropdown-item">\s*<div class="dropdown-icon"><i class="fas fa-shield-alt"><\/i><\/div>\s*<div class="dropdown-text"><span class="dropdown-title">보안<\/span><\/div>\s*<\/a>/g, '');

const content = `
<!-- SECURITY PAGE CONTENT -->
<div class="cloud-intro-header" style="text-align:center; padding: 40px 0;">
    <h2 style="font-size:32px; font-weight:800; color:#111827;">Security</h2>
    <p style="color:#4b5563; margin-top:10px;">기업의 소중한 자산을 지키는 최적의 보안 솔루션</p>
</div>

<div class="cloud-layout" style="display:flex; gap:30px; align-items:flex-start;">
    <!-- Sidebar -->
    <aside class="cloud-sidebar" style="width:240px; flex-shrink:0; background:white; border-radius:12px; padding:20px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        <ul class="sidebar-menu" style="list-style:none; padding:0; margin:0;">
            <li class="active"><a href="javascript:void(0)" onclick="switchSecurityTab('waf', this)"><i class="fas fa-shield-alt" style="width:20px; text-align:center; margin-right:8px;"></i> WAF</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('waf-pro', this)"><i class="fas fa-plus-square" style="width:20px; text-align:center; margin-right:8px;"></i> WAF Pro</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('clean-zone', this)"><i class="fas fa-filter" style="width:20px; text-align:center; margin-right:8px;"></i> 클린존</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('private-ca', this)"><i class="fas fa-certificate" style="width:20px; text-align:center; margin-right:8px;"></i> Private CA</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('cert-manager', this)"><i class="fas fa-lock" style="width:20px; text-align:center; margin-right:8px;"></i> Certificate Manager</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('v3-server', this)"><i class="fas fa-laptop-medical" style="width:20px; text-align:center; margin-right:8px;"></i> V3 Net Server</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('dbsafer-am', this)"><i class="fas fa-user-shield" style="width:20px; text-align:center; margin-right:8px;"></i> DBSAFER AM</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('dbsafer-db', this)"><i class="fas fa-database" style="width:20px; text-align:center; margin-right:8px;"></i> DBSAFER DB</a></li>
            <li><a href="javascript:void(0)" onclick="switchSecurityTab('damo', this)"><i class="fas fa-key" style="width:20px; text-align:center; margin-right:8px;"></i> D.AMO</a></li>
        </ul>
    </aside>

    <!-- Content Area -->
    <main class="cloud-content-area" style="flex:1; background:white; border-radius:12px; padding:40px; box-shadow:0 1px 3px rgba(0,0,0,0.1);">
        
        <!-- WAF -->
        <div id="waf" class="security-content active">
            <div class="content-header" style="margin-bottom:30px; border-bottom:1px solid #e5e7eb; padding-bottom:20px;">
                <h3 style="font-size:28px; font-weight:700; color:#111827; margin-bottom:10px;">WAF</h3>
                <p style="color:#4b5563; font-size:16px;">Web Service에 대한 HTTP/HTTPS 공격을 탐지 및 차단하는 방화벽 서비스</p>
            </div>
            
            <div class="engine-tabs" style="display:flex; gap:2px; margin-bottom:30px; border-bottom:1px solid #e5e7eb;">
                <button class="engine-tab active" onclick="showSubTab('waf-detail', this)">상품상세</button>
                <button class="engine-tab" onclick="showSubTab('waf-pricing', this)">요금정보</button>
            </div>

            <!-- WAF Detail -->
            <div id="waf-detail" class="sub-tab-content active" style="display:block;">
                <div class="feature-box">
                    <h4 style="font-size:20px; font-weight:700; margin-bottom:16px; color:#1f2937;">서비스 개요</h4>
                    <p style="line-height:1.7; color:#374151; font-size:15px; margin-bottom:20px;">
                        WAF(Web Application Firewall)는 웹 애플리케이션 보안 전문 솔루션으로, SQL Injection, Cross-Site Scripting(XSS) 등 웹 공격을 탐지하고 차단합니다.<br>
                        고성능 웹 방화벽을 통해 지능형 웹 공격으로부터 웹 서버를 안전하게 보호하세요.
                    </p>
                    <div style="background:#f9fafb; padding:20px; border-radius:8px;">
                        <ul style="list-style-type:none; padding:0; margin:0; display:grid; grid-template-columns:1fr 1fr; gap:12px;">
                            <li style="display:flex; align-items:center; gap:8px;"><i class="fas fa-check" style="color:#dc2626;"></i> HTTP/HTTPS 웹 공격 차단</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i class="fas fa-check" style="color:#dc2626;"></i> 개인정보 유출 방지</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i class="fas fa-check" style="color:#dc2626;"></i> 부정 로그인 방지</li>
                            <li style="display:flex; align-items:center; gap:8px;"><i class="fas fa-check" style="color:#dc2626;"></i> 웹사이트 위변조 방지</li>
                        </ul>
                    </div>
                </div>
            </div>

            <!-- WAF Pricing -->
            <div id="waf-pricing" class="sub-tab-content" style="display:none;">
                <h4 style="font-size:18px; font-weight:700; margin-bottom:15px; color:#1f2937;">WAF Self 상품 종류 및 이용요금</h4>
                <div style="text-align: right; margin-bottom: 8px; font-size: 13px; color: #6b7280;">단위: 원/월, 부가세별도</div>
                <table class="pricing-table" style="width:100%; border-collapse:collapse; margin-bottom:20px; border-top:2px solid #1f2937;">
                    <thead>
                        <tr style="background:#f8fafc;">
                            <th style="padding:16px; border-bottom:1px solid #e2e8f0; color:#1f2937; font-weight:600; text-align:left;">구분</th>
                            <th style="padding:16px; border-bottom:1px solid #e2e8f0; color:#1f2937; font-weight:600; text-align:center;">Throughput(*)<br><span style="font-weight:normal; font-size:12px; color:#64748b;">(Mbps)</span></th>
                            <th style="padding:16px; border-bottom:1px solid #e2e8f0; color:#1f2937; font-weight:600; text-align:right;">가격</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; font-weight:600;">Standard</td>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; text-align:center;">350</td>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; color:#dc2626; font-weight:700; text-align:right;">300,000원</td>
                        </tr>
                        <tr>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; font-weight:600;">Advanced</td>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; text-align:center;">500</td>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; color:#dc2626; font-weight:700; text-align:right;">500,000원</td>
                        </tr>
                        <tr>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; font-weight:600;">Premium</td>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; text-align:center;">1000</td>
                            <td style="padding:16px; border-bottom:1px solid #e2e8f0; color:#dc2626; font-weight:700; text-align:right;">750,000원</td>
                        </tr>
                    </tbody>
                </table>
                <p class="text-sm text-gray-500 mt-2" style="font-size:13px; color:#6b7280; letter-spacing:-0.4px;">※ WAF 성능은 100~300K 이하의 웹 트래픽 응답 메시지를 기준으로 한 것으로 고객의 웹 서비스 환경에 따라 성능은 달라질 수 있습니다.</p>
            </div>
        </div>
        
        <!-- Other Placeholders -->
        <div id="waf-pro" class="security-content" style="display:none;"><h3>WAF Pro</h3><p>서비스 준비 중입니다.</p></div>
        <div id="clean-zone" class="security-content" style="display:none;"><h3>클린존</h3><p>서비스 준비 중입니다.</p></div>
        <div id="private-ca" class="security-content" style="display:none;"><h3>Private CA</h3><p>서비스 준비 중입니다.</p></div>
        <div id="cert-manager" class="security-content" style="display:none;"><h3>Certificate Manager</h3><p>서비스 준비 중입니다.</p></div>
        <div id="v3-server" class="security-content" style="display:none;"><h3>V3 Net Server</h3><p>서비스 준비 중입니다.</p></div>
        <div id="dbsafer-am" class="security-content" style="display:none;"><h3>DBSAFER AM</h3><p>서비스 준비 중입니다.</p></div>
        <div id="dbsafer-db" class="security-content" style="display:none;"><h3>DBSAFER DB</h3><p>서비스 준비 중입니다.</p></div>
        <div id="damo" class="security-content" style="display:none;"><h3>D.AMO</h3><p>서비스 준비 중입니다.</p></div>
        
    </main>
</div>

<style>
/* Security Page Specific Styles */
.sidebar-menu li.active a {
    color: #dc2626 !important;
    font-weight: 700;
    background-color: #fef2f2;
    border-right: 3px solid #dc2626;
}
.sidebar-menu li a {
    display: block;
    padding: 12px 16px;
    color: #4b5563;
    border-radius: 4px;
    transition: all 0.2s;
    font-size: 15px;
}
.sidebar-menu li a:hover {
    background-color: #f3f4f6;
    color: #111827;
}

.engine-tab {
    padding: 12px 24px;
    border: none;
    background: transparent;
    font-weight: 600;
    cursor: pointer;
    border-bottom: 2px solid transparent;
    font-size: 16px;
    color: #6b7280;
    transition: all 0.2s;
}
.engine-tab:hover {
    color: #374151;
}
.engine-tab.active {
    color: #dc2626 !important;
    border-bottom: 2px solid #dc2626 !important;
}
</style>

<script>
    function switchSecurityTab(id, el) {
        document.querySelectorAll('.sidebar-menu li').forEach(li => li.classList.remove('active'));
        if(el.closest('li')) el.closest('li').classList.add('active');
        
        document.querySelectorAll('.security-content').forEach(div => div.style.display = 'none');
        const target = document.getElementById(id);
        if(target) target.style.display = 'block';
    }
    
    function showSubTab(id, el) {
        const parent = el.closest('.security-content');
        parent.querySelectorAll('.engine-tab').forEach(btn => btn.classList.remove('active'));
        el.classList.add('active');
        
        parent.querySelectorAll('.sub-tab-content').forEach(div => div.style.display = 'none');
        const target = document.getElementById(id);
        if(target) target.style.display = 'block';
    }
</script>
`;

let finalHtml = template.replace('{{Title}}', 'Security').replace('{{Description}}', '기업의 소중한 자산을 지키는 최적의 보안 솔루션');
finalHtml = finalHtml.replace('{{Content}}', content);

fs.writeFileSync(targetPath, finalHtml);
console.log('Created sub_security.html with new structure and WAF content.');
