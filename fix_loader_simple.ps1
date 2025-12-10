# Find files missing loader.js

$files = Get-ChildItem -Path "." -Filter "sub_*.html"
$needsFix = @()

Write-Host "`nChecking for missing loader.js...`n" -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    
    if ($content -match 'header-placeholder' -and $content -notmatch 'loader\.js') {
        Write-Host "MISSING: $($file.Name)" -ForegroundColor Red
        $needsFix += $file
        
        # Auto-fix
        $newContent = $content -replace '</body>', "    `r`n    <script src=`"components/loader.js?v=2.0`"></script>`r`n</body>"
        [System.IO.File]::WriteAllText($file.FullName, $newContent, [System.Text.Encoding]::UTF8)
        Write-Host "  FIXED" -ForegroundColor Green
    }
}

Write-Host "`nFixed: $($needsFix.Count) files`n" -ForegroundColor Yellow
