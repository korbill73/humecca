# loader.js 누락 파일 찾기 및 수정 스크립트

$files = Get-ChildItem -Path "." -Filter "sub_*.html"
$needsFix = @()

Write-Host "`n=== loader.js 누락 파일 검사 ===" -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    # header-placeholder가 있지만 loader.js가 없는 파일 찾기
    if ($content -match 'header-placeholder' -and $content -notmatch 'loader\.js') {
        Write-Host "❌ $($file.Name) - loader.js 없음" -ForegroundColor Red
        $needsFix += $file
        
        # 자동 수정
        if ($content -match '(?s)(.*</body>)') {
            $newContent = $content -replace '</body>', "    `r`n    <!-- Load Header and Footer -->`r`n    <script src=`"components/loader.js?v=2.0`"></script>`r`n</body>"
            [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
            Write-Host "  ✓ 자동 수정 완료" -ForegroundColor Green
        }
    }
}

Write-Host "`n=== 결과 ===" -ForegroundColor Cyan
Write-Host "수정된 파일: $($needsFix.Count)개" -ForegroundColor Yellow

if ($needsFix.Count -gt 0) {
    Write-Host "`n📋 수정된 파일 목록:" -ForegroundColor Cyan
    $needsFix | ForEach-Object { Write-Host "  - $($_.Name)" }
}

Write-Host "`n✅ 작업 완료!" -ForegroundColor Green
Write-Host "브라우저에서 Ctrl+Shift+R로 새로고침하세요.`n" -ForegroundColor White
