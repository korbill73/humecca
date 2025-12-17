# PowerShell script to update cloud page headers with full menu structure
$cloudFiles = @(
    "sub_cloud_intro.html",
    "sub_cloud_server.html",
    "sub_cloud_db.html",
    "sub_cloud_storage.html",
    "sub_cloud_network.html",
    "sub_cloud_management.html",
    "sub_cloud_monitoring.html",
    "sub_cloud_managed.html"
)

$basePath = "f:\onedrive\OneDrive - 휴메카\08. homepage"

# New complete header HTML (from index.html)
$newHeaderHTML = @'
    <!-- ========== HEADER ========== -->
    <header class="header">
        <div class="header-container container">
            <a href="index.html" class="logo-link">
                <img src="images/humecca_logo.gif" alt="HUMECCA" style="height:40px;">
            </a>
            <nav class="nav">
                <ul class="nav-list">
                    <!-- 1. Cloud (Mega Menu) -->
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

                    <!-- 2. IDC (Dropdown) -->
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
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">HUMECCA IDC 소개</span></div>
                            </a>
                        </div>
                    </li>

                    <!-- 3. VPN -->
                    <li class="nav-item"><a href="sub_vpn.html" class="nav-link">VPN 전용선</a></li>

                    <!-- 4. Security -->
                    <li class="nav-item"><a href="sub_security.html" class="nav-link">보안</a></li>

                    <!-- 5. Additional Services (Dropdown) -->
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
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-layer-group"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">HA (고가용성)</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-random"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">로드밸런싱</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-bolt"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">CDN</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-undo"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">데이터 복구</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-desktop"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">모니터링</span></div>
                            </a>
                        </div>
                    </li>

                    <!-- 6. Enterprise Solutions (Dropdown) -->
                    <li class="nav-item">
                        <a href="#" class="nav-link">기업솔루션 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fab fa-microsoft"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">MS 365</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-comments"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">NAVER WORKS</span></div>
                            </a>
                            <a href="sub_web_custom.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-laptop-code"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">홈페이지 제작</span></div>
                            </a>
                        </div>
                    </li>

                    <!-- 7. Company (Dropdown) -->
                    <li class="nav-item">
                        <a href="#" class="nav-link">회사소개 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-text"><span class="dropdown-title">회사소개</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-text"><span class="dropdown-title">연혁</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-text"><span class="dropdown-title">오시는 길</span></div>
                            </a>
                        </div>
                    </li>

                    <!-- 8. Customer Center (Dropdown) -->
                    <li class="nav-item">
                        <a href="#" class="nav-link">고객센터 <i class="fas fa-chevron-down"></i></a>
                        <div class="dropdown-menu">
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-text"><span class="dropdown-title">공지사항</span></div>
                            </a>
                            <a href="#" class="dropdown-item">
                                <div class="dropdown-text"><span class="dropdown-title">자주 묻는 질문</span></div>
                            </a>
                            <a href="sub_support.html" class="dropdown-item">
                                <div class="dropdown-text"><span class="dropdown-title">1:1 문의</span></div>
                            </a>
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
'@

foreach ($file in $cloudFiles) {
    $filePath = Join-Path $basePath $file
    if (Test-Path $filePath) {
        $content = Get-Content -Path $filePath -Raw -Encoding UTF8
        
        # Pattern to match header section
        $pattern = '(?s)<!-- ========== HEADER ========== -->.*?</header>'
        
        if ($content -match $pattern) {
            $content = $content -replace $pattern, $newHeaderHTML.Trim()
            Set-Content -Path $filePath -Value $content -Encoding UTF8
            Write-Host "Updated: $file"
        } else {
            Write-Host "Header pattern not found in: $file"
        }
    } else {
        Write-Host "File not found: $file"
    }
}

Write-Host "`nAll files processed!"
