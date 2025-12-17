$files = @{
    "sub_web_custom.html" = @{ Cat="Corporate Solution"; Title="Homepage"; Icon="fa-code" }
    "sub_web_mobile.html" = @{ Cat="Corporate Solution"; Title="Mobile Web"; Icon="fa-mobile-alt" }
    "sub_web_shop.html" = @{ Cat="Corporate Solution"; Title="Shopping Mall"; Icon="fa-shopping-cart" }
    "sub_addon_backup.html" = @{ Cat="Add-on Service"; Title="Backup & Recovery"; Icon="fa-save" }
    "sub_addon_cdn.html" = @{ Cat="Add-on Service"; Title="CDN Service"; Icon="fa-globe-asia" }
    "sub_addon_ha.html" = @{ Cat="Add-on Service"; Title="HA Hosting"; Icon="fa-layer-group" }
    "sub_addon_loadbalancing.html" = @{ Cat="Add-on Service"; Title="Load Balancing"; Icon="fa-balance-scale" }
    "sub_addon_monitoring.html" = @{ Cat="Add-on Service"; Title="Monitoring"; Icon="fa-desktop" }
    "sub_addon_recovery.html" = @{ Cat="Add-on Service"; Title="Disaster Recovery"; Icon="fa-undo" }
    "sub_addon_software.html" = @{ Cat="Add-on Service"; Title="Software License"; Icon="fa-compact-disc" }
    "sub_sol_ebiz.html" = @{ Cat="Corporate Solution"; Title="e-Business"; Icon="fa-briefcase" }
    "sub_sol_home.html" = @{ Cat="Corporate Solution"; Title="Homepage"; Icon="fa-home" }
    "sub_sol_naver.html" = @{ Cat="Corporate Solution"; Title="Naver Cloud"; Icon="fa-cloud" }
    "sub_office365.html" = @{ Cat="Corporate Solution"; Title="Office 365"; Icon="fab fa-microsoft" }
    "sub_cs.html" = @{ Cat="Customer Support"; Title="CS Center"; Icon="fa-headset" }
    "sub_inquiry.html" = @{ Cat="Customer Support"; Title="Inquiry"; Icon="fa-envelope" }
    "sub_faq.html" = @{ Cat="Customer Support"; Title="FAQ"; Icon="fa-question-circle" }
    "sub_notice.html" = @{ Cat="Customer Support"; Title="Notice"; Icon="fa-bullhorn" }
    "sub_company_intro.html" = @{ Cat="Company"; Title="Company Intro"; Icon="fa-building" }
    "sub_company_history.html" = @{ Cat="Company"; Title="History"; Icon="fa-history" }
    "sub_company_org.html" = @{ Cat="Company"; Title="Organization"; Icon="fa-sitemap" }
    "sub_company_overview.html" = @{ Cat="Company"; Title="Overview"; Icon="fa-info-circle" }
    "sub_company_idc.html" = @{ Cat="Company"; Title="IDC Intro"; Icon="fa-server" }
    "sub_idc_intro.html" = @{ Cat="IDC Service"; Title="IDC Intro"; Icon="fa-server" }
    "vpn_line.html" = @{ Cat="Network Service"; Title="VPN Line"; Icon="fa-network-wired" }
    "vpn_service.html" = @{ Cat="Network Service"; Title="VPN Service"; Icon="fa-shield-alt" }
    "vpn_monitoring.html" = @{ Cat="Network Service"; Title="Monitoring"; Icon="fa-desktop" }
    "sec_ddos.html" = @{ Cat="Security Service"; Title="DDoS Defense"; Icon="fa-shield-virus" }
    "sec_monitoring.html" = @{ Cat="Security Service"; Title="Security Monitoring"; Icon="fa-eye" }
    "sec_ssl.html" = @{ Cat="Security Service"; Title="SSL/Firewall"; Icon="fa-lock" }
}

foreach ($file in $files.Keys) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $info = $files[$file]
        
        # Check if already has breadcrumb
        if ($content -match "font-size:\s*13px.*fa-chevron-right") {
            Write-Host "Skipping $file (Already has Breadcrumbs)"
            continue
        }

        # Define New HTML Block
        $newHtml = @"
            <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">
                $($info.Cat) <i class="fas fa-chevron-right" style="font-size: 10px; margin: 0 8px;"></i> $($info.Title)
            </div>
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; border: 1px solid rgba(255,255,255,0.2);">
                <i class="fas $($info.Icon)" style="font-size: 30px; color: white;"></i>
            </div>
"@

        # Inject before H1 in hero section
        # Logic: Find <div class="container"> ... <h1>
        # Regex needs to be broad enough to catch different indentations
        
        $updatedContent = $content -replace '(<div class="container">\s*)?(<span class="badge">.*?</span>\s*)?(<h1>)', "`$1`$2$newHtml`n`$3"
        
        if ($content -ne $updatedContent) {
            $updatedContent | Set-Content $file -Encoding UTF8
            Write-Host "Updated Breadcrumbs in $file"
        } else {
            Write-Host "No H1 found or pattern mismatch in $file"
        }
    }
}
