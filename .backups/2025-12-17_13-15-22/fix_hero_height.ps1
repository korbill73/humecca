$files = @(
    "sub_colocation.html",
    "sub_hosting.html",
    "sub_vpn.html"
)

foreach ($file in $files) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        
        # 1. Fix Padding: padding: 100px 0 100px; -> padding: 80px 0;
        $content = $content -replace "padding: 100px 0 100px;", "padding: 80px 0;"
        $content = $content -replace "padding: 100px 0;", "padding: 80px 0;"

        # 2. Fix H1 Font Size: font-size: 4rem; -> font-size: 42px;
        $content = $content -replace "font-size: 4rem;", "font-size: 42px;"

        # 3. Fix P Font Size: font-size: 1.35rem; -> font-size: 18px; (Approx match to p style)
        $content = $content -replace "font-size: 1.35rem;", "font-size: 18px;"

        $content | Set-Content $file -Encoding UTF8
        Write-Host "Updated Hero Height in $file"
    } else {
        Write-Host "File not found: $file"
    }
}
