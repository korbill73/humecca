# 개선된 서브페이지 헤더 자동 수정 스크립트
# 모든 패턴의 헤더를 찾아서 placeholder로 교체

$files = Get-ChildItem -Path "." -Filter "sub_*.html"
$successCount = 0
$failCount = 0

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "서브페이지 헤더 일괄 수정 시작" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan

foreach ($file in $files) {
    Write-Host "처리 중: $($file.Name)" -NoNewline
    
    try {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        $modified = $false
        
        # 헤더를 찾는 여러 패턴
        if ($content -match '(?s)(<header[^>]*>.*?</header>)') {
            $headerBlock = $matches[1]
            
            # Placeholder로 교체
            $newHeader = "<!-- ========== HEADER PLACEHOLDER (Loaded via loader.js) ========== -->`r`n    <div id=`"header-placeholder`"></div>`r`n"
            $content = $content -replace [regex]::Escape($headerBlock), $newHeader
            $modified = $true
        }
        
        if ($modified) {
            # styles.css 캐시 버스팅
            $content = $content -replace 'href="styles\.css"', 'href="styles.css?v=2.0"'
            
            # loader.js 추가 또는 버전 업데이트
            if ($content -notmatch 'loader\.js') {
                # loader.js가 없으면 추가
                if ($content -match '(?s)(.*?)(</body>)') {
                    $before = $matches[1]
                    $after = $matches[2]
                    $content = $before + "`r`n    <script src=`"components/loader.js?v=2.0`"></script>`r`n" + $after
                }
            } else {
                # 이미 있으면 버전만 추가
                $content = $content -replace 'src="components/loader\.js"', 'src="components/loader.js?v=2.0"'
            }
            
            # 파일 저장
            [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
            Write-Host " ✓ 수정 완료" -ForegroundColor Green
            $successCount++
        } else {
            Write-Host " - 헤더 없음 (이미 placeholder일 수 있음)" -ForegroundColor Yellow
            $failCount++
        }
    }
    catch {
        Write-Host " ✗ 오류: $_" -ForegroundColor Red
        $failCount++
    }
}

Write-Host "`n=====================================" -ForegroundColor Cyan
Write-Host "작업 완료!" -ForegroundColor Cyan
Write-Host "=====================================`n" -ForegroundColor Cyan
Write-Host "성공: $successCount 개" -ForegroundColor Green
Write-Host "실패/건너뜀: $failCount 개" -ForegroundColor Yellow
Write-Host "`n💡 다음 단계:" -ForegroundColor Cyan
Write-Host "1. 브라우저에서 Ctrl+Shift+R로 강력 새로고침" -ForegroundColor White
Write-Host "2. 서브페이지 방문하여 메뉴 정상 동작 확인" -ForegroundColor White
Write-Host "3. 문제 발생 시 COMPLETE_FIX_GUIDE.md 참고`n" -ForegroundColor White
