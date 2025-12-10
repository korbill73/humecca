# Remove all page-specific sw-hero style overrides
# This ensures global styles.css sw-hero (100px padding) is used

$files = Get-ChildItem -Path "." -Filter "sub_*.html"
$fixed = 0

Write-Host "`nRemoving page-specific sw-hero overrides...`n" -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    
    # Pattern 1: Remove entire sw-hero class definition in style tags
    $content = $content -replace '(?s)\.sw-hero\s*\{[^}]+padding:\s*\d+px[^}]+\}', ''
    
    # Pattern 2: Remove sw-hero h1 override
    $content = $content -replace '(?s)\.sw-hero\s+h1\s*\{[^}]+\}', ''
    
    # Pattern 3: Remove sw-hero p override  
    $content = $content -replace '(?s)\.sw-hero\s+p\s*\{[^}]+\}', ''
    
    # Clean up empty comment blocks
    $content = $content -replace '/\*\s*Reusing[^*]*\*/', ''
    
    if ($content -ne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "FIXED: $($file.Name)" -ForegroundColor Green
        $fixed++
    }
}

Write-Host "`nFixed: $fixed files`n" -ForegroundColor Yellow
Write-Host "All pages now use global sw-hero style (100px padding)" -ForegroundColor Green
