# Update all cloud subpages with correct header and footer structure

$cloudPages = @(
    @{Path = "sub_cloud_db.html"; Title = "ucloud DB - HUMECCA"; Active = "sub_cloud_db.html"; HeroTitle = "ucloud DB"; HeroDesc = "KT Cloud 기반 관리형 데이터베이스 서비스"},
    @{Path = "sub_cloud_storage.html"; Title = "CDN / Storage - HUMECCA"; Active = "sub_cloud_storage.html"; HeroTitle = "CDN / Storage"; HeroDesc = "고성능 스토리지 및 CDN 서비스"},
    @{Path = "sub_cloud_network.html"; Title = "Network - HUMECCA"; Active = "sub_cloud_network.html"; HeroTitle = "Network"; HeroDesc = "안정적인 네트워크 인프라 서비스"},
    @{Path = "sub_cloud_management.html"; Title = "Management - HUMECCA"; Active = "sub_cloud_management.html"; HeroTitle = "Management"; HeroDesc = "클라우드 자원 관리 서비스"},
    @{Path = "sub_cloud_monitoring.html"; Title = "디딤모니터링 - HUMECCA"; Active = "sub_cloud_monitoring.html"; HeroTitle = "디딤모니터링"; HeroDesc = "24시간 실시간 모니터링 서비스"},
    @{Path = "sub_cloud_managed.html"; Title = "디딤매니지드 - HUMECCA"; Active = "sub_cloud_managed.html"; HeroTitle = "디딤매니지드"; HeroDesc = "전문 기술 지원 매니지드 서비스"},
    @{Path = "sub_cloud_intro.html"; Title = "클라우드 소개 - HUMECCA"; Active = "sub_cloud_intro.html"; HeroTitle = "클라우드 소개"; HeroDesc = "KT Cloud 기반 유연한 IT 인프라"}
)

$headerTemplate = @"
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>__TITLE__</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&display=block" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Cloud Sub-Page Layout */
        .cloud-hero {
            background: #fff5f5;
            padding: 16px 0 14px;
            border-bottom: 1px solid #fecaca;
        }

        .cloud-hero .container {
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
        }

        .cloud-hero .badge {
            display: inline-block;
            font-size: 12px;
            color: #EF4444;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .cloud-hero h1 {
            color: #1f2937;
            font-size: 24px;
            font-weight: 700;
            margin-bottom: 6px;
        }

        .cloud-hero p {
            color: #6b7280;
            font-size: 14px;
        }

        .cloud-layout {
            display: flex;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            gap: 30px;
        }

        .cloud-sidebar {
            width: 200px;
            flex-shrink: 0;
            padding: 20px 0;
        }

        .sidebar-menu {
            list-style: none;
            padding: 0;
            margin: 0;
        }

        .sidebar-menu li a {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            color: #4a5568;
            text-decoration: none;
            font-size: 14px;
            font-weight: 500;
            border-radius: 6px;
            margin: 2px 0;
            transition: all 0.2s ease;
        }

        .sidebar-menu li a:hover {
            color: #EF4444;
            background: #fef2f2;
        }

        .sidebar-menu li a.active {
            color: #fff;
            background: linear-gradient(135deg, #EF4444 0%, #DC2626 100%);
            box-shadow: 0 4px 12px rgba(239, 68, 68, 0.3);
        }

        .sidebar-menu li a i {
            width: 18px;
            font-size: 14px;
            color: #94a3b8;
            text-align: center;
        }

        .sidebar-menu li a:hover i { color: #EF4444; }
        .sidebar-menu li a.active i { color: #fff; }

        .cloud-content {
            flex: 1;
            padding: 20px 0 60px;
            min-width: 0;
        }

        .content-header {
            margin-bottom: 20px;
            padding-bottom: 10px;
            border-bottom: 2px solid #EF4444;
        }

        .content-header h2 {
            font-size: 18px;
            font-weight: 700;
            color: #DC2626;
            margin-bottom: 4px;
        }

        .content-header p {
            color: #6b7280;
            font-size: 13px;
            line-height: 1.6;
        }

        .content-section {
            margin-bottom: 40px;
        }

        .section-title {
            font-size: 15px;
            font-weight: 700;
            color: #DC2626;
            margin-bottom: 8px;
            padding-bottom: 8px;
            border-bottom: 1px solid #e5e7eb;
        }

        .section-subtitle {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 12px;
        }

        .pricing-table {
            width: 100%;
            border-collapse: collapse;
            font-size: 12px;
            margin-bottom: 16px;
        }

        .pricing-table th {
            background: #f8fafc;
            color: #64748b;
            font-weight: 600;
            padding: 10px 8px;
            text-align: center;
            border: 1px solid #e2e8f0;
        }

        .pricing-table th.highlight {
            background: #EF4444;
            color: white;
        }

        .pricing-table td {
            padding: 8px;
            text-align: center;
            border: 1px solid #e5e7eb;
            color: #374151;
            font-size: 12px;
        }

        .pricing-table tr:hover td {
            background: #fef2f2;
        }

        .pricing-table .row-header {
            background: #fef2f2;
            font-weight: 600;
            color: #DC2626;
        }

        .price {
            font-weight: 600;
            color: #DC2626;
        }

        .notes-list {
            background: #f9fafb;
            padding: 16px;
            border-radius: 8px;
            margin-top: 16px;
        }

        .notes-list p {
            font-size: 12px;
            color: #6b7280;
            margin-bottom: 6px;
            line-height: 1.6;
        }

        .notes-list p:last-child {
            margin-bottom: 0;
        }

        @media (max-width: 992px) {
            .cloud-layout { flex-direction: column; }
            .cloud-sidebar { width: 100%; padding: 20px 0 0; }
            .sidebar-menu { display: flex; flex-wrap: wrap; gap: 8px; }
            .sidebar-menu li a { padding: 8px 16px; }
        }
    </style>
</head>

<body>
    <header class="header">
        <div class="header-container container">
            <a href="index.html" class="logo-link">
                <img src="images/humecca_logo.gif" alt="HUMECCA" style="height:40px;">
            </a>

            <nav class="nav">
                <ul class="nav-list">
                    <li class="nav-item">
                        <a href="sub_cloud_intro.html" class="nav-link">
                            클라우드 <i class="fas fa-chevron-down"></i>
                        </a>
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
                                <a href="sub_cloud_server.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">Server</span></div>
                                </a>
                                <a href="sub_cloud_db.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">데이터베이스</span></div>
                                </a>
                                <a href="sub_cloud_storage.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-hdd"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">스토리지/CDN</span></div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">보안</span></div>
                                </a>
                                <a href="sub_cloud_network.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">네트워크</span></div>
                                </a>
                                <a href="sub_cloud_management.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-tasks"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">매니지먼트</span></div>
                                </a>
                            </div>
                            <p class="mega-section-title" style="margin-top: 16px; border-top: 1px solid #eee; padding-top: 16px;">매니지드 서비스</p>
                            <div class="mega-grid">
                                <a href="sub_cloud_monitoring.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-chart-line"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">디딤모니터링</span></div>
                                </a>
                                <a href="sub_cloud_managed.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-cogs"></i></div>
                                    <div class="dropdown-text"><span class="dropdown-title">디딤매니지드</span></div>
                                </a>
                            </div>
                            <div class="mega-cta">
                                <a href="https://login.humecca.co.kr" target="_blank">
                                    <i class="fas fa-cloud"></i> 서비스 바로 가기 <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">IDC <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu" style="min-width:260px;">
                            <a href="sub_hosting.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">서버호스팅</span></div>
                            </a>
                            <a href="sub_colocation.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">코로케이션</span></div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item"><a href="sub_vpn.html" class="nav-link">VPN 전용선</a></li>
                    <li class="nav-item"><a href="sub_security.html" class="nav-link">보안</a></li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">부가서비스 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-box"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">소프트웨어</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">백업</span></div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">기업솔루션 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fab fa-microsoft"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">MS 365</span></div>
                            </a>
                            <a href="sub_web_custom.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-laptop-code"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">홈페이지 제작</span></div>
                            </a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">회사소개 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">회사소개</span></div></a>
                            <a href="#" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">연혁</span></div></a>
                        </div>
                    </li>
                    <li class="nav-item">
                        <a href="#" class="nav-link">고객센터 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">공지사항</span></div></a>
                            <a href="sub_support.html" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">1:1 문의</span></div></a>
                        </div>
                    </li>
                </ul>
            </nav>

            <div class="header-buttons">
                <a href="admin.html" class="btn btn-outline" style="min-width:auto; padding:8px 16px; font-size:14px; border:1px solid #e2e8f0; color:#64748b;">
                    <i class="fas fa-user-circle" style="margin-right:6px;"></i> 관리자
                </a>
            </div>
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </header>

    <section class="cloud-hero">
        <div class="container">
            <span class="badge">KT Cloud Partner</span>
            <h1>__HERO_TITLE__</h1>
            <p>__HERO_DESC__</p>
        </div>
    </section>

    <div class="cloud-layout">
        <aside class="cloud-sidebar">
            <ul class="sidebar-menu">
                <li><a href="sub_cloud_server.html" __ACTIVE_SERVER__><i class="fas fa-server"></i> ucloud Server</a></li>
                <li><a href="sub_cloud_db.html" __ACTIVE_DB__><i class="fas fa-database"></i> ucloud DB</a></li>
                <li><a href="sub_cloud_storage.html" __ACTIVE_STORAGE__><i class="fas fa-hdd"></i> CDN / Storage</a></li>
                <li><a href="sub_cloud_network.html" __ACTIVE_NETWORK__><i class="fas fa-network-wired"></i> Network</a></li>
                <li><a href="sub_cloud_management.html" __ACTIVE_MANAGEMENT__><i class="fas fa-tasks"></i> Management</a></li>
                <li><a href="sub_cloud_monitoring.html" __ACTIVE_MONITORING__><i class="fas fa-chart-line"></i> 디딤모니터링</a></li>
                <li><a href="sub_cloud_managed.html" __ACTIVE_MANAGED__><i class="fas fa-cogs"></i> 디딤매니지드</a></li>
                <li><a href="sub_security.html" __ACTIVE_SECURITY__><i class="fas fa-lock"></i> 보안 솔루션</a></li>
            </ul>
        </aside>

        <main class="cloud-content">
            <div class="content-header">
                <h2>__HERO_TITLE__</h2>
                <p>__HERO_DESC__</p>
            </div>

            <div class="content-section">
                <div class="section-title">서비스 준비중</div>
                <p style="font-size: 14px; color: #6b7280; padding: 40px 0;">이 서비스의 상세 내용은 준비중입니다. 자세한 내용은 고객센터로 문의해 주세요.</p>
            </div>
        </main>
    </div>

    <footer class="footer-new">
        <div class="container footer-grid">
            <div>
                <h3>전문가와 부담 없이 상담하세요</h3>
                <p style="margin-bottom:20px; color:#94a3b8; line-height:1.6;">
                    간편하게 무엇이든 물어보세요<br>
                    더욱 정확한 상담을 원하신다면 로그인 후 1:1 문의를 이용하실 수 있습니다.
                </p>
                <div style="display:flex; gap:16px; font-size:14px;">
                    <a href="sub_support.html" style="color:#EF4444; display:flex; align-items:center; gap:6px;">
                        1:1 문의 <i class="fas fa-external-link-alt" style="font-size:10px;"></i>
                    </a>
                    <a href="https://login.humecca.co.kr/Login/Join" target="_blank" style="color:#EF4444; display:flex; align-items:center; gap:6px;">
                        회원가입 <i class="fas fa-external-link-alt" style="font-size:10px;"></i>
                    </a>
                </div>
            </div>
            <div class="separator"></div>
            <div>
                <h4>서비스 문의</h4>
                <a href="tel:02-418-7766" class="footer-phone">02-418-7766</a>
                <div style="font-size:13px; color:#94a3b8; margin-top:12px;">
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span>평일</span> <span>09:00 ~ 18:00</span>
                    </div>
                    <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                        <span>점심</span> <span>12:00 ~ 13:00</span>
                    </div>
                    <div style="font-size:11px; margin-top:8px;">*주말, 공휴일 휴무</div>
                </div>
            </div>
            <div class="separator"></div>
            <div>
                <div style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #334155; font-size:13px;">
                    <a href="#">(주) 휴메카</a>
                    <a href="#" style="font-weight:700; color:white;">개인정보처리방침</a>
                    <a href="#">이용약관</a>
                    <a href="#">오시는 길</a>
                </div>
                <div style="font-size:12px; color:#64748b; line-height:1.8;">
                    <p>(주)휴메카 | 대표이사: 박제군 | 사업자등록번호: 101-81-89952</p>
                    <p>본사: 서울특별시 강남구 언주로 517 (역삼동, KT영동지사) KT IDC 4층</p>
                    <p style="margin-top:16px; font-size:11px;">Copyright © 2024 Humecca. All rights reserved.</p>
                </div>
            </div>
        </div>
    </footer>

    <script src="script.js"></script>
</body>

</html>
"@

foreach ($page in $cloudPages) {
    $filePath = "F:\onedrive\OneDrive - 휴메카\08. homepage\$($page.Path)"
    
    $content = $headerTemplate
    $content = $content -replace "__TITLE__", $page.Title
    $content = $content -replace "__HERO_TITLE__", $page.HeroTitle
    $content = $content -replace "__HERO_DESC__", $page.HeroDesc
    
    # Set active states
    $content = $content -replace "__ACTIVE_SERVER__", ""
    $content = $content -replace "__ACTIVE_DB__", ""
    $content = $content -replace "__ACTIVE_STORAGE__", ""
    $content = $content -replace "__ACTIVE_NETWORK__", ""
    $content = $content -replace "__ACTIVE_MANAGEMENT__", ""
    $content = $content -replace "__ACTIVE_MONITORING__", ""
    $content = $content -replace "__ACTIVE_MANAGED__", ""
    $content = $content -replace "__ACTIVE_SECURITY__", ""
    
    # Set active class based on the current page
    switch ($page.Path) {
        "sub_cloud_db.html" { $content = $content -replace 'href="sub_cloud_db.html" ', 'href="sub_cloud_db.html" class="active"' }
        "sub_cloud_storage.html" { $content = $content -replace 'href="sub_cloud_storage.html" ', 'href="sub_cloud_storage.html" class="active"' }
        "sub_cloud_network.html" { $content = $content -replace 'href="sub_cloud_network.html" ', 'href="sub_cloud_network.html" class="active"' }
        "sub_cloud_management.html" { $content = $content -replace 'href="sub_cloud_management.html" ', 'href="sub_cloud_management.html" class="active"' }
        "sub_cloud_monitoring.html" { $content = $content -replace 'href="sub_cloud_monitoring.html" ', 'href="sub_cloud_monitoring.html" class="active"' }
        "sub_cloud_managed.html" { $content = $content -replace 'href="sub_cloud_managed.html" ', 'href="sub_cloud_managed.html" class="active"' }
        "sub_cloud_intro.html" { $content = $content -replace 'href="sub_cloud_server.html" ', 'href="sub_cloud_server.html" class="active"' }
    }
    
    Set-Content -Path $filePath -Value $content -Encoding UTF8
    Write-Host "Updated: $($page.Path)"
}

Write-Host "All cloud pages updated!"
