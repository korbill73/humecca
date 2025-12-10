# HUMECCA 서브 페이지 일괄 업데이트 스크립트
# 모든 서브 페이지에 동일한 Header와 Footer를 적용

$header = @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>{{TITLE}} - HUMECCA</title>
    <link href="https://cdn.jsdelivr.net/gh/orioncactus/pretendard/dist/web/static/pretendard.css" rel="stylesheet">
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
</head>
<body>
    <header class="header">
        <div class="header-container container">
            <a href="index.html" class="logo-text">HUMECCA</a>
            <nav class="nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="sub_cloud_intro.html" class="nav-link">클라우드 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu mega-menu">
                            <a href="sub_cloud_intro.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-cloud"></i></div>
                                <div class="dropdown-text">
                                    <span class="dropdown-title">클라우드 소개</span>
                                    <span class="dropdown-desc">KT Cloud 기반 유연한 인프라</span>
                                </div>
                            </a>
                            <p class="mega-section-title">KT Cloud 서비스</p>
                            <div class="mega-grid">
                                <a href="sub_cloud_server.html" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-server"></i></div><div class="dropdown-text"><span class="dropdown-title">Server</span></div></a>
                                <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-database"></i></div><div class="dropdown-text"><span class="dropdown-title">데이터베이스</span></div></a>
                                <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-hdd"></i></div><div class="dropdown-text"><span class="dropdown-title">스토리지/CDN</span></div></a>
                                <a href="sub_security.html" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div><div class="dropdown-text"><span class="dropdown-title">보안</span></div></a>
                                <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-network-wired"></i></div><div class="dropdown-text"><span class="dropdown-title">네트워크</span></div></a>
                                <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-cogs"></i></div><div class="dropdown-text"><span class="dropdown-title">매니지먼트</span></div></a>
                            </div>
                            <p class="mega-section-title">매니지드 서비스</p>
                            <div style="display:grid; gap:4px;">
                                <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-chart-line" style="color:#3b82f6;"></i></div><div class="dropdown-text"><span class="dropdown-title">디딤모니터링</span></div></a>
                                <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-tools" style="color:#10b981;"></i></div><div class="dropdown-text"><span class="dropdown-title">디딤매니지드</span></div></a>
                            </div>
                            <div class="mega-cta"><a href="https://login.humecca.co.kr" target="_blank"><i class="fas fa-cloud"></i> 서비스 바로 가기 <i class="fas fa-external-link-alt"></i></a></div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">IDC <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu" style="min-width:420px;">
                            <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-building"></i></div><div class="dropdown-text"><span class="dropdown-title">HUMECCA IDC 소개</span><span class="dropdown-desc">Tier 3+ 인증 IDC 센터</span></div></a>
                            <p class="mega-section-title">IDC 서비스</p>
                            <div style="display:grid; gap:4px;">
                                <a href="sub_hosting.html" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-server"></i></div><div class="dropdown-text"><span class="dropdown-title">서버호스팅</span></div></a>
                                <a href="sub_colocation.html" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-building"></i></div><div class="dropdown-text"><span class="dropdown-title">코로케이션</span></div></a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item"><a href="sub_vpn.html" class="nav-link">VPN 전용선</a></li>
                    <li class="nav-item"><a href="sub_security.html" class="nav-link">보안</a></li>
                    <li class="nav-item"><a href="sub_web_custom.html" class="nav-link">홈페이지 제작</a></li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">부가서비스 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-box"></i></div><div class="dropdown-text"><span class="dropdown-title">소프트웨어</span></div></a>
                            <a href="#" class="dropdown-item"><div class="dropdown-icon"><i class="fas fa-database"></i></div><div class="dropdown-text"><span class="dropdown-title">백업</span></div></a>
                        </div>
                    </li>
                </ul>
            </nav>
            <div class="header-buttons">
                <a href="https://login.humecca.co.kr" class="btn btn-outline" target="_blank">로그인</a>
                <a href="sub_support.html" class="btn btn-primary">견적 문의</a>
            </div>
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </header>
"@

$footer = @"
    <footer class="footer-new">
        <div class="container footer-grid">
            <div>
                <h3>전문가와 부담 없이 상담하세요</h3>
                <p style="margin-bottom:20px; color:#94a3b8; line-height:1.6;">간편하게 무엇이든 물어보세요<br>더욱 정확한 상담을 원하신다면 로그인 후 1:1 문의를 이용하실 수 있습니다.</p>
                <div style="display:flex; gap:16px; font-size:14px;">
                    <a href="sub_support.html" style="color:#EF4444; display:flex; align-items:center; gap:6px;">1:1 문의 <i class="fas fa-external-link-alt" style="font-size:10px;"></i></a>
                    <a href="https://login.humecca.co.kr/Login/Join" target="_blank" style="color:#EF4444; display:flex; align-items:center; gap:6px;">회원가입 <i class="fas fa-external-link-alt" style="font-size:10px;"></i></a>
                </div>
            </div>
            <div class="separator"></div>
            <div>
                <h4>서비스 문의</h4>
                <a href="tel:02-418-7766" class="footer-phone">02-418-7766</a>
                <div style="font-size:13px; color:#94a3b8; margin-top:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>평일</span> <span>09:00 ~ 18:00</span></div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;"><span>점심</span> <span>12:00 ~ 13:00</span></div>
                    <div style="font-size:11px; margin-top:8px;">*주말, 공휴일 휴무</div>
                </div>
            </div>
            <div class="separator"></div>
            <div>
                <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #334155; font-size:13px;">
                    <a href="#">(주) 휴메카</a>
                    <a href="#" style="font-weight:700; color:white;">개인정보처리방침</a>
                    <a href="#">이용약관</a>
                </div>
                <div style="font-size:12px; color:#64748b; line-height:1.8;">
                    <p>(주)휴메카 | 대표이사: 박제군 | 사업자등록번호: 101-81-89952</p>
                    <p>본사: 서울특별시 강남구 언주로 517 KT IDC 4층</p>
                    <p style="margin-top:16px; font-size:11px;">Copyright © 2024 Humecca. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>
</body>
</html>
"@

Write-Host "✅ Header와 Footer 템플릿 준비 완료"
Write-Host "서브 페이지에 적용하려면 각 페이지를 수동으로 업데이트하거나 별도 스크립트를 사용하세요."
