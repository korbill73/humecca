# Fix corrupted cloud pages
$files = @(
    @{Path = "sub_cloud_db.html"; Title = "ucloud DB - HUMECCA"},
    @{Path = "sub_cloud_storage.html"; Title = "CDN / Storage - HUMECCA"},
    @{Path = "sub_cloud_network.html"; Title = "Network - HUMECCA"},
    @{Path = "sub_cloud_management.html"; Title = "Management - HUMECCA"},
    @{Path = "sub_cloud_monitoring.html"; Title = "디딤모니터링 - HUMECCA"},
    @{Path = "sub_cloud_managed.html"; Title = "디딤매니지드 - HUMECCA"},
    @{Path = "sub_cloud_intro.html"; Title = "클라우드 소개 - HUMECCA"}
)

$headTemplate = @"
<!DOCTYPE html>
<html lang="ko">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>TITLE_PLACEHOLDER</title>
    <link href="https://fonts.googleapis.com/css2?family=Outfit:wght@600;700;800&display=block" rel="stylesheet">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="styles.css">
    <style>
        /* Cloud Sub-Page Layout */
        .cloud-hero {
            background: #fff5f5;
            padding: 16px 0 14px;
            margin-top: 0;
            border-bottom: 1px solid #fecaca;
        }

        .cloud-hero .badge {
            display: inline-block;
            font-size: 12px;
            color: #EF4444;
            font-weight: 600;
            margin-bottom: 8px;
        }

        .cloud-hero h1 {
            color: #1f2937;
            font-size: 26px;
            font-weight: 700;
            margin-bottom: 6px;
        }

        .cloud-hero p {
            color: #6b7280;
            font-size: 14px;
        }

        /* Two Column Layout */
        .cloud-layout {
            display: flex;
            max-width: 1400px;
            margin: 0 auto;
            padding: 0 20px;
            gap: 40px;
        }

"@

foreach ($file in $files) {
    $filePath = "F:\onedrive\OneDrive - 휴메카\08. homepage\$($file.Path)"
    if (Test-Path $filePath) {
        $content = Get-Content $filePath -Raw
        
        # Find where the cloud-sidebar starts (this is after the corrupted part)
        $sidebarIndex = $content.IndexOf(".cloud-sidebar {")
        
        if ($sidebarIndex -gt 0) {
            # Extract from .cloud-sidebar onwards
            $restOfContent = $content.Substring($sidebarIndex)
            
            # Create new content with fixed head
            $newHead = $headTemplate.Replace("TITLE_PLACEHOLDER", $file.Title)
            $newContent = $newHead + "        /* Left Sidebar */`n        " + $restOfContent
            
            # Write back
            Set-Content -Path $filePath -Value $newContent -Encoding UTF8
            Write-Host "Fixed: $($file.Path)"
        } else {
            Write-Host "Could not find sidebar in: $($file.Path)"
        }
    } else {
        Write-Host "File not found: $($file.Path)"
    }
}

Write-Host "Done!"
