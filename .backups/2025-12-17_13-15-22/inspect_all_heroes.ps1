# 모든 Hero 섹션 완전 통일 스크립트
# 모든 Hero 관련 클래스를 표준 100px padding으로 통일

$files = Get-ChildItem -Path "." -Filter "*.html" | Where-Object { $_.Name -like "sub_*" -or $_.Name -eq "index.html" }
$report = @()

Write-Host "`n=== 모든 Hero 섹션 검사 중 ===" -ForegroundColor Cyan
Write-Host "표준: padding 100px 0`n" -ForegroundColor Yellow

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $heroClass = $null
    $currentPadding = "없음"
    
    # 다양한 Hero 클래스 패턴 찾기
    if ($content -match '<section[^>]*class="([^"]*hero[^"]*)"') {
        $heroClass = $matches[1]
        
        # 인라인 padding 확인
        if ($content -match 'class="[^"]*hero[^"]*"[^>]*style="[^"]*padding:\s*(\d+)px') {
            $currentPadding = "$($matches[1])px"
        }
        
        $info = [PSCustomObject]@{
            File = $file.Name
            HeroClass = $heroClass
            Padding = $currentPadding
        }
        $report += $info
        
        $status = if ($currentPadding -eq "없음" -or $currentPadding -eq "100px") { "OK" } else { "수정필요" }
        $color = if ($status -eq "OK") { "Green" } else { "Yellow" }
        
        Write-Host "$($file.Name.PadRight(35)) | $($heroClass.PadRight(25)) | $currentPadding" -ForegroundColor $color
    }
}

Write-Host "`n발견된 Hero 페이지: $($report.Count)개" -ForegroundColor Cyan
