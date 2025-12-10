$files = Get-ChildItem -Path "f:\onedrive\OneDrive - 휴메카\08. homepage" -Filter "*.html"
$targetFiles = $files | Where-Object { $_.Name -like "sub_*.html" -or $_.Name -eq "index.html" }

$newContent = @"
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

                            <!-- CTA Button -->
                            <div class="mega-cta">
                                <a href="https://login.humecca.co.kr" target="_blank">
                                    <i class="fas fa-cloud"></i> 서비스 바로 가기 <i class="fas fa-external-link-alt"></i>
                                </a>
                            </div>
                        </div>
                    </li>

                    <!-- 2. IDC (Dropdown) -->
"@

foreach ($file in $targetFiles) {
    echo "Processing $($file.Name)..."
    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    
    # Regex to find the block
    $pattern = "(?s)\s*<!-- 1\. Cloud \(Mega Menu\) -->.*?<!-- 2\. IDC \(Dropdown\) -->"
    
    if ($content -match $pattern) {
        $newFileContent = $content -replace $pattern, $newContent
        $newFileContent | Set-Content -Path $file.FullName -Encoding UTF8
        echo "Updated $($file.Name)"
    } else {
        echo "Pattern not found in $($file.Name)"
    }
}
