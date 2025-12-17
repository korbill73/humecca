# 서브페이지 헤더 일괄 수정 스크립트
# PowerShell에서 실행

$files = Get-ChildItem -Path "." -Filter "sub_*.html"

foreach ($file in $files) {
    Write-Host "Processing: $($file.Name)"
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # 헤더 시작과 끝 찾기
    $headerStart = $content.IndexOf('<!-- ========== HEADER')
    $headerEnd = $content.IndexOf('</header>') + '</header>'.Length
    
    if ($headerStart -ge 0 -and $headerEnd -gt $headerStart) {
        # 헤더 부분을 placeholder로 교체
        $before = $content.Substring(0, $headerStart)
        $after = $content.Substring($headerEnd)
        
        $newHeader = @"
<!-- ========== HEADER PLACEHOLDER (Loaded via loader.js) ========== -->
    <div id="header-placeholder"></div>

"@
        
        $newContent = $before + $newHeader + $after
        
        # styles.css에 캐시 버스팅 추가
        $newContent = $newContent -replace 'href="styles\.css"', 'href="styles.css?v=2.0"'
        
        # loader.js 추가/수정
        if ($newContent -notmatch 'loader\.js') {
            # </body> 태그 전에 loader.js 추가
            $newContent = $newContent -replace '</body>', @"
    <script src="components/loader.js?v=2.0"></script>
</body>
"@
        } else {
            # 기존 loader.js에 버전 추가
            $newContent = $newContent -replace 'src="components/loader\.js"', 'src="components/loader.js?v=2.0"'
        }
        
        # 파일 저장
        Set-Content -Path $file.FullName -Value $newContent -Encoding UTF8 -NoNewline
        Write-Host "  ✓ Updated: $($file.Name)" -ForegroundColor Green
    } else {
        Write-Host "  ✗ Header not found in: $($file.Name)" -ForegroundColor Yellow
    }
}

Write-Host "`n완료! 모든 서브페이지의 헤더가 placeholder로 교체되었습니다." -ForegroundColor Cyan
Write-Host "이제 브라우저에서 Ctrl+Shift+R로 강력 새로고침하세요!" -ForegroundColor Cyan
