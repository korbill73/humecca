# Hero 섹션 높이 통일 스크립트
# 모든 sw-hero 섹션에서 인라인 padding 제거
# CSS 클래스가 padding: 100px 0을 적용함

$files = Get-ChildItem -Path "." -Filter "sub_*.html"
$fixed = 0
$alreadyOk = 0

Write-Host "`n=== Hero 섹션 높이 통일 작업 ===" -ForegroundColor Cyan
Write-Host "표준 높이: padding 100px (상하)" -ForegroundColor Yellow
Write-Host "기준: sub_sol_ms365.html`n" -ForegroundColor Yellow

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # sw-hero에서 padding: XXXpx 0; 패턴 제거
    if ($content -match 'class="sw-hero"[^>]*style="([^"]*padding:\s*\d+px\s+0;?[^"]*)"') {
        Write-Host "수정 중: $($file.Name)" -NoNewline -ForegroundColor Yellow
        
        # padding: XXXpx 0; 제거
        $content = $content -replace '(class="sw-hero"[^>]*style="[^"]*)(padding:\s*\d+px\s+0;?\s*)', '$1'
        
        # 빈 style 속성이나 끝에 ;만 남은 경우 정리
        $content = $content -replace 'style="\s*;*\s*"', 'style=""'
        
        $modified = $true
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host " - 완료" -ForegroundColor Green
        $fixed++
    }
    elseif ($content -match 'class="sw-hero"') {
        Write-Host "$($file.Name) - 이미 표준 형식" -ForegroundColor Green
        $alreadyOk++
    }
}

Write-Host "`n=== 작업 완료 ===" -ForegroundColor Cyan
Write-Host "수정됨: $fixed 개" -ForegroundColor Green
Write-Host "이미 OK: $alreadyOk 개" -ForegroundColor Green
Write-Host "`n통일된 높이: padding 100px 0 (상하 100px)" -ForegroundColor Yellow
Write-Host "모바일: padding 60px 0 (상하 60px)`n" -ForegroundColor Yellow
