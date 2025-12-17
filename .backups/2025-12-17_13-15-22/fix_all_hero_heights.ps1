$files = Get-ChildItem -Path . -Filter "*.html"

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $modified = $false
    
    # 1. Padding Fix: 100px -> 80px (and handle variations)
    if ($content -match "padding:\s*100px\s*0\s*100px") {
        $content = $content -replace "padding:\s*100px\s*0\s*100px", "padding: 80px 0"
        $modified = $true
    }
    if ($content -match "padding:\s*100px\s*0") {
        $content = $content -replace "padding:\s*100px\s*0", "padding: 80px 0"
        $modified = $true
    }
    
    # 2. H1 Font Size Fix: 4rem -> 42px
    if ($content -match "font-size:\s*4rem") {
        $content = $content -replace "font-size:\s*4rem", "font-size: 42px"
        $modified = $true
    }

    # 3. P Font Size Fix: 1.35rem -> 18px
    if ($content -match "font-size:\s*1\.35rem") {
        $content = $content -replace "font-size:\s*1\.35rem", "font-size: 18px"
        $modified = $true
    }

    # 4. IDC Wrapper top padding override (if any unwanted spacing exists)
    # This is speculative, but common.
    
    if ($modified) {
        $content | Set-Content $file.FullName -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
