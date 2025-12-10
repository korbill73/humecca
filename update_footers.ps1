# 클라우드 하위 페이지들의 푸터를 공통 컴포넌트로 교체하는 스크립트

$pages = @(
    "sub_cloud_db.html",
    "sub_cloud_storage.html",
    "sub_cloud_network.html",
    "sub_cloud_management.html",
    "sub_cloud_monitoring.html",
    "sub_cloud_managed.html",
    "sub_cloud_intro.html"
)

$basePath = "F:\onedrive\OneDrive - 휴메카\08. homepage"

foreach ($page in $pages) {
    $filePath = Join-Path $basePath $page
    
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw -Encoding UTF8
        
        # 기존 footer-new 블록을 찾아서 교체
        # 패턴: <footer class="footer-new"> ... </footer> 와 그 다음의 <script src="script.js">
        $pattern = '(?s)<footer class="footer-new">.*?</footer>\s*\r?\n\s*<script src="script.js">'
        $replacement = @"
<!-- ========== FOOTER (공통 컴포넌트) ========== -->
    <div id="footer-placeholder"></div>

    <script src="components/loader.js"></script>
    <script src="script.js">
"@
        
        $newContent = $content -replace $pattern, $replacement
        
        # 파일 저장
        Set-Content -Path $filePath -Value $newContent -Encoding UTF8
        Write-Host "Updated: $page"
    } else {
        Write-Host "File not found: $page"
    }
}

Write-Host "`nAll cloud subpages updated with shared footer component!"
