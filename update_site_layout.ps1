$RootPath = "f:\onedrive\OneDrive - 휴메카\08. homepage"
$TargetFiles = Get-ChildItem -Path $RootPath -Filter "sub_*.html"

$HeaderHtml = @'
    <header class="header">
        <div class="header-container container">
            <!-- Logo -->
            <a href="index.html" class="logo-link">
                <img src="images/humecca_logo.png" alt="HUMECCA" style="height:36px;">
            </a>

            <!-- Main Navigation -->
            <nav class="nav">
                <ul class="nav-list">
                    <!-- 1. 클라우드 (Mega Menu) -->
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
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">Server</span>
                                    </div>
                                </a>
                                <a href="sub_cloud_db.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">데이터베이스</span>
                                    </div>
                                </a>
                                <a href="sub_cloud_storage.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-hdd"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">스토리지/CDN</span>
                                    </div>
                                </a>
                                <a href="sub_security.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">보안</span>
                                    </div>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">네트워크</span>
                                    </div>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-cogs"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">매니지먼트</span>
                                    </div>
                                </a>
                            </div>
                            <p class="mega-section-title">매니지드 서비스</p>
                            <div style="display:grid; gap:4px;">
                                <a href="#" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-chart-line" style="color:#3b82f6;"></i>
                                    </div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">디딤모니터링</span>
                                    </div>
                                </a>
                                <a href="#" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-tools" style="color:#10b981;"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">디딤매니지드</span>
                                    </div>
                                </a>
                            </div>
                            <!-- CTA Button -->
                            <div class="mega-cta">
                                <a href="https://login.humecca.co.kr" target="_blank">
                                    <i class="fas fa-cloud"></i>
                                    서비스 바로 가기
                                    <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </li>

                    <!-- 2. IDC -->
                    <li class="nav-item">
                        <a href="#" class="nav-link">
                            IDC <i class="fas fa-chevron-down"></i>
                        </a>
                        <div class="dropdown-menu" style="min-width:420px;">
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                                <div class="dropdown-text">
                                    <span class="dropdown-title">HUMECCA IDC 소개</span>
                                    <span class="dropdown-desc">Tier 3+ 인증 IDC 센터, 엄격한 보안 및 물리적 안정성</span>
                                </div>
                            </a>
                            <p class="mega-section-title">IDC 서비스</p>
                            <div style="display:grid; gap:4px;">
                                <a href="sub_hosting.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">서버호스팅</span>
                                    </div>
                                </a>
                                <a href="sub_colocation.html" class="dropdown-item">
                                    <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                                    <div class="dropdown-text">
                                        <span class="dropdown-title">코로케이션</span>
                                    </div>
                                </a>
                            </div>
                        </div>
                    </li>

                    <!-- Links -->
                    <li class="nav-item"><a href="sub_vpn.html" class="nav-link">VPN 전용선</a></li>
                    <li class="nav-item"><a href="sub_security.html" class="nav-link">보안</a></li>
                    <li class="nav-item"><a href="sub_web_custom.html" class="nav-link">홈페이지 제작</a></li>
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
                </ul>
            </nav>

            <!-- Header Buttons -->
            <div class="header-buttons">
                <a href="https://login.humecca.co.kr" class="btn btn-outline" target="_blank">로그인</a>
                <a href="sub_support.html" class="btn btn-primary">견적 문의</a>
            </div>
            <!-- Mobile Menu Button -->
            <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
        </div>
    </header>
'@

$FooterHtml = @'
    <footer class="footer-new">
        <div class="container footer-grid">
            <!-- Col 1: Info -->
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
                    <a href="https://login.humecca.co.kr/Login/Join" target="_blank"
                        style="color:#EF4444; display:flex; align-items:center; gap:6px;">
                        회원가입 <i class="fas fa-external-link-alt" style="font-size:10px;"></i>
                    </a>
                </div>
            </div>

            <div class="separator"></div>

            <!-- Col 2: Phone -->
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

            <!-- Col 3: Company Info -->
            <div>
                <div
                    style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #334155; font-size:13px;">
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
'@

foreach ($File in $TargetFiles) {
    echo "Processing $($File.Name)..."
    $Content = Get-Content -Path $File.FullName -Raw -Encoding UTF8

    # 1. Replace Header
    if ($Content -match '(?s)<header.*?</header>') {
        $Content = $Content -replace '(?s)<header.*?</header>', $HeaderHtml
    } else {
        # If no header tag, try inserting after body
        if ($Content -match '<body.*?>') {
             $Content = $Content -replace '(<body.*?>)', "`$1`n$HeaderHtml"
        }
    }
    
    # 2. Replace Footer
    if ($Content -match '(?s)<footer.*?</footer>') {
        $Content = $Content -replace '(?s)<footer.*?</footer>', $FooterHtml
    } else {
        # If no footer tag, append before body close
        if ($Content -match '</body>') {
             $Content = $Content -replace '</body>', "$FooterHtml`n</body>"
        }
    }

    # 3. Ensure styles.css
    if ($Content -notmatch 'styles.css') {
        if ($Content -match '</head>') {
            $Content = $Content -replace '</head>', '    <link rel="stylesheet" href="styles.css">`n</head>'
        }
    }

    # 4. Save
    $Content | Set-Content -Path $File.FullName -Encoding UTF8
}

echo "All sub-pages updated with Master Header/Footer."
