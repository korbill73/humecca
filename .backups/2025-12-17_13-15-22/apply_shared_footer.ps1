# 모든 서브페이지에 공통 푸터 적용 스크립트
# 이미 업데이트된 페이지: index.html, sub_cloud_server.html, sub_cloud_db.html, sub_cloud_storage.html, 
# sub_cloud_network.html, sub_cloud_management.html, sub_cloud_monitoring.html, sub_cloud_managed.html, sub_cloud_intro.html

$basePath = "F:\onedrive\OneDrive - 휴메카\08. homepage"

# 업데이트 대상 페이지 목록 (이미 업데이트된 페이지 제외)
$pages = @(
    "sub_hosting.html",
    "sub_colocation.html",
    "sub_vpn.html",
    "sub_security.html",
    "sub_support.html",
    "sub_web_custom.html",
    "sub_web_mobile.html",
    "sub_web_shop.html",
    "sub_sol_ms365.html",
    "sub_sol_naver.html",
    "sub_office365.html",
    "sub_company_intro.html",
    "sub_company_overview.html",
    "sub_company_history.html",
    "sub_company_org.html",
    "sub_company_idc.html",
    "sub_company_location.html",
    "sub_idc_intro.html",
    "sub_service.html",
    "sub_cs.html",
    "sub_add_backup.html",
    "sub_add_cdn.html",
    "sub_add_ha.html",
    "sub_add_loadbalancing.html",
    "sub_add_recovery.html",
    "sub_add_software.html",
    "sub_cloud.html",
    "sub_cloud_security.html",
    "sub_template.html"
)

$replacement = @"
    <!-- ========== FOOTER (공통 컴포넌트) ========== -->
    <div id="footer-placeholder"></div>

    <script src="components/loader.js"></script>
</body>
"@

$updatedCount = 0
$failedPages = @()

foreach ($page in $pages) {
    $filePath = Join-Path $basePath $page
    
    if (Test-Path $filePath) {
        try {
            $content = Get-Content $filePath -Raw -Encoding UTF8
            
            # 패턴 1: footer-new 클래스를 사용하는 경우
            $pattern1 = '(?s)<footer class="footer-new">.*?</footer>\s*</body>'
            
            # 패턴 2: footer 클래스를 사용하는 경우 (구 버전)
            $pattern2 = '(?s)<footer class="footer">.*?</footer>\s*</body>'
            
            # 패턴 3: 이미 placeholder가 있는 경우 건너뛰기
            if ($content -match 'id="footer-placeholder"') {
                Write-Host "Already updated: $page" -ForegroundColor Yellow
                continue
            }
            
            $newContent = $content
            
            if ($content -match $pattern1) {
                $newContent = $content -replace $pattern1, $replacement
                Write-Host "Updated (footer-new): $page" -ForegroundColor Green
                $updatedCount++
            }
            elseif ($content -match $pattern2) {
                $newContent = $content -replace $pattern2, $replacement
                Write-Host "Updated (footer): $page" -ForegroundColor Green
                $updatedCount++
            }
            else {
                Write-Host "No footer found: $page" -ForegroundColor Red
                $failedPages += $page
                continue
            }
            
            # 파일 저장
            Set-Content -Path $filePath -Value $newContent -Encoding UTF8 -NoNewline
        }
        catch {
            Write-Host "Error processing: $page - $_" -ForegroundColor Red
            $failedPages += $page
        }
    }
    else {
        Write-Host "File not found: $page" -ForegroundColor Red
        $failedPages += $page
    }
}

Write-Host "`n=========================================="
Write-Host "Updated: $updatedCount pages"
if ($failedPages.Count -gt 0) {
    Write-Host "Failed: $($failedPages.Count) pages" -ForegroundColor Red
    Write-Host "Failed pages: $($failedPages -join ', ')" -ForegroundColor Red
}
Write-Host "=========================================="
