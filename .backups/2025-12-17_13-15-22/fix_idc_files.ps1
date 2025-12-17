# 1. Overwrite Hosting (sub_hosting -> idc_hosting)
Copy-Item -Path "sub_hosting.html" -Destination "idc_hosting.html" -Force
Write-Host "Overwrote idc_hosting.html with sub_hosting.html"

# 2. Overwrite Colocation (sub_colocation -> idc_colocation)
Copy-Item -Path "sub_colocation.html" -Destination "idc_colocation.html" -Force
Write-Host "Overwrote idc_colocation.html with sub_colocation.html"

# 3. Patch IDC Network (idc_network.html)
$networkFile = "idc_network.html"
if (Test-Path $networkFile) {
    $content = Get-Content $networkFile -Raw -Encoding UTF8
    
    # Check if already patched
    if ($content -notmatch "IDC Service <i class") {
         # Define Breadcrumb Block
        $newHtml = @"
            <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">
                IDC Service <i class="fas fa-chevron-right" style="font-size: 10px; margin: 0 8px;"></i> IDC Network
            </div>
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; border: 1px solid rgba(255,255,255,0.2);">
                <i class="fas fa-network-wired" style="font-size: 30px; color: white;"></i>
            </div>
"@
        # Inject before H1 in hero section (Checking for Service Preparing or H1)
        # Note: idc_network.html might be a placeholder, so it might have <h2 style... service preparing> instead of h1.
        # Let's inspect the file content... It had <button class="mobile-menu-btn" ... > wrapping content in the placeholder.
        # I should Fix the BROKEN HTML first.
        
        # Replace the broken placeholder block with a clean Hero block if it's the broken button one.
        if ($content -match '<button class="mobile-menu-btn"') {
            # This indicates the broken file. I will completely replace the body content with a standardized "Preparing" page structure.
            # actually, simpler to just INJECT the missing styling if H1 exists.
            # But the viewed file showed <h2 ... Service Preparing ... </h2> inside a button??
            # View 401 showed: <div class="icon-box"...> ... <h2...Service Preparing</h2> inside <button...id="mobile-menu-btn">
            # This is SEVERELY broken. I will replace the whole file content with a clean template.
            
            $cleanTemplate = @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>IDC Network - HUMECCA</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css?v=2.0">
    <link href="https://fonts.googleapis.com/css2?family=Noto+Sans+KR:wght@300;400;500;700;900&display=swap" rel="stylesheet">
</head>
<body>
    <div id="header-placeholder"></div>

    <section class="sw-hero" style="background-color: #111827;">
        <div class="container">
            <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">
                IDC Service <i class="fas fa-chevron-right" style="font-size: 10px; margin: 0 8px;"></i> IDC Network
            </div>
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; border: 1px solid rgba(255,255,255,0.2);">
                <i class="fas fa-network-wired" style="font-size: 30px; color: white;"></i>
            </div>
            <h1>IDC 네트워크</h1>
            <p>초고속 대용량 백본망과 안정적인 네트워크 환경을 제공합니다.</p>
        </div>
    </section>

    <div class="container" style="padding: 100px 0; text-align: center;">
        <i class="fas fa-tools" style="font-size: 48px; color: #ddd; margin-bottom: 20px;"></i>
        <h2 style="font-size: 24px; color: #333; margin-bottom: 10px;">서비스 준비중입니다</h2>
        <p style="color: #666;">보다 나은 서비스를 위해 페이지 준비 중에 있습니다.</p>
    </div>

    <div id="footer-placeholder"></div>
    <script src="components/loader.js?v=2.0"></script>
</body>
</html>
"@
            $cleanTemplate | Set-Content $networkFile -Encoding UTF8
            Write-Host "Rebuilt idc_network.html with clean template"
        }
    }
}
