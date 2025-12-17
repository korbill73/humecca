# PowerShell script to add light ray effect to all addon pages
# Run this from the homepage directory

$files = @(
    'sub_addon_backup.html',
    'sub_addon_cdn.html',
    'sub_addon_ha.html',
    'sub_addon_loadbalancing.html',
    'sub_addon_monitoring.html',
    'sub_addon_recovery.html'
)

foreach ($file in $files) {
    Write-Host "Processing $file..." -ForegroundColor Green
    
    $content = Get-Content $file -Raw -Encoding UTF8
    
    # 1. Add canvas and update hero section
    $content = $content -replace '(<section class="sw-hero"[^>]+style="[^"]*)', '$1 position: relative; overflow: hidden;'
    
    # 2. Add canvas element after <section class="sw-hero"...>
    $content = $content -replace '(<section class="sw-hero"[^>]*>)', '$1
        
        <!-- Canvas Background for Light Ray Effect -->
        <canvas id="addon-canvas"
            style="position: absolute; inset: 0; width: 100%; height: 100%; pointer-events: none; z-index: 1;"></canvas>
'
    
    # 3. Add z-index to container
    $content = $content -replace '(<div class="container">)', '<div class="container" style="position: relative; z-index: 10;">'
    
    # 4. Replace subpage-canvas.js with addon_light_effect.html
    $content = $content -replace 'js/subpage-canvas\.js', 'js/addon_light_effect.html'
    
    # Save
    Set-Content -Path $file -Value $content -Encoding UTF8 -NoNewline
    Write-Host "  ✓ Updated $file" -ForegroundColor Cyan
}

Write-Host "`n✅ All addon service pages updated with light ray effects!" -ForegroundColor Yellow
