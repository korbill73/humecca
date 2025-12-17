# Standardize ALL hero section paddings to 100px
# This script finds ANY hero class and sets padding to 100px 0

$files = Get-ChildItem -Path "." -Filter "*.html"
$fixed = 0
$report = @()

Write-Host "`nStandardizing ALL hero sections to 100px padding...`n" -ForegroundColor Cyan

foreach ($file in $files) {
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content
    $changes = @()
    
    # Pattern 1: Any *-hero class with padding definition
    if ($content -match '(\.\w+-hero\s*\{[^}]*)(padding:\s*)(\d+)px\s+0\s+(\d+)px') {
        $oldPadding = $matches[3]
        if ($oldPadding -ne "100") {
            $content = $content -replace '(\.[\w-]+-hero\s*\{[^}]*padding:\s*)\d+px\s+0\s+\d+px', '${1}100px 0 100px'
            $changes += "padding: ${oldPadding}px -> 100px"
        }
    }
    
    # Pattern 2: Inline style in section tags
    if ($content -match 'padding:\s*(\d+)px\s+0;?(?![^<]*</style)' -and $matches[1] -ne "100") {
        $content = $content -replace '(style="[^"]*padding:\s*)\d+px\s+0;?([^"]*")', '${1}100px 0${2}'
        $old = $matches[1]
        if ($old -ne "100") {
            $changes += "inline padding: ${old}px -> 100px"
        }
    }
    
    if ($content -ne $originalContent) {
        [System.IO.File]::WriteAllText($file.FullName, $content, [System.Text.Encoding]::UTF8)
        Write-Host "FIXED: $($file.Name.PadRight(40)) $($changes -join ', ')" -ForegroundColor Green
        $fixed++
        
        $report += [PSCustomObject]@{
            File = $file.Name
            Changes = $changes -join ', '
        }
    }
}

Write-Host "`n=== SUMMARY ===" -ForegroundColor Cyan
Write-Host "Fixed: $fixed files" -ForegroundColor Yellow
Write-Host "Standard padding: 100px 0 (top/bottom)" -ForegroundColor Green
Write-Host "`nAll hero sections now have uniform height!`n" -ForegroundColor Green
