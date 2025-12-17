$files = @{
    "sub_cloud_server.html" = @{ Cat="Cloud Service"; Title="ucloud Server"; Icon="fa-server" }
    "sub_cloud_db.html" = @{ Cat="Cloud Service"; Title="Cloud DB"; Icon="fa-database" }
    "sub_cloud_storage.html" = @{ Cat="Cloud Service"; Title="Cloud Storage"; Icon="fa-hdd" }
    "sub_cloud_network.html" = @{ Cat="Cloud Service"; Title="Cloud Network"; Icon="fa-network-wired" }
    "sub_cloud_management.html" = @{ Cat="Cloud Service"; Title="Management"; Icon="fa-tasks" }
    "sub_cloud_vdi.html" = @{ Cat="Cloud Service"; Title="VDI"; Icon="fa-desktop" }
    "sub_cloud_private.html" = @{ Cat="Cloud Service"; Title="Private Cloud"; Icon="fa-lock" }
    "sub_cloud_limits.html" = @{ Cat="Cloud Service"; Title="Service Limits"; Icon="fa-ban" }
    "sub_cloud_intro.html" = @{ Cat="Cloud Service"; Title="Cloud Intro"; Icon="fa-cloud" }
    "sub_security.html" = @{ Cat="Security Service"; Title="Managed Security"; Icon="fa-shield-alt" }
    "sub_hosting.html" = @{ Cat="IDC Service"; Title="Server Hosting"; Icon="fa-server" }
    "sub_vpn.html" = @{ Cat="IDC Service"; Title="VPN Service"; Icon="fa-network-wired" }
    "sub_colocation.html" = @{ Cat="IDC Service"; Title="Colocation"; Icon="fa-building" }
    "sub_sol_groupware.html" = @{ Cat="Corporate Solution"; Title="NAVER WORKS"; Icon="fa-comments" }
    "sub_sol_ms365.html" = @{ Cat="Corporate Solution"; Title="Microsoft 365"; Icon="fab fa-microsoft" }
}

foreach ($file in $files.Keys) {
    if (Test-Path $file) {
        $content = Get-Content $file -Raw -Encoding UTF8
        $info = $files[$file]
        
        # Check if already standardized
        if ($content -match "font-size: 13px; color: rgba\(255,255,255,0.6\)") {
            Write-Host "Skipping $file (Already Standardized)"
            continue
        }

        # Define New HTML Block
        $newHtml = @"
            <!-- Standardized Hero -->
            <div style="font-size: 13px; color: rgba(255,255,255,0.6); margin-bottom: 20px;">
                $($info.Cat) <i class="fas fa-chevron-right" style="font-size: 10px; margin: 0 8px;"></i> $($info.Title)
            </div>
            <div style="width: 60px; height: 60px; background: rgba(255,255,255,0.1); border-radius: 12px; display: flex; align-items: center; justify-content: center; margin: 0 auto 24px; border: 1px solid rgba(255,255,255,0.2);">
                <i class="fas $($info.Icon)" style="font-size: 30px; color: white;"></i>
            </div>
"@

        # Logic:
        # 1. Match the Container start + content before H1 + H1 start.
        # 2. We handle `container` and `idc-container`.
        # 3. We optionally match `badge`.
        # 4. We optionally match and REMOVE `h2` (subtitle) because we are replacing it with Breadcrumb.
        
        # Regex Explanation:
        # (<div class="(?:idc-)?container">\s*)  -> Group 1: Container
        # (?:<span class="badge">.*?</span>\s*)? -> Non-capturing optional badge (Wait, if I don't capture it without parens, I can't put it back easily if I want to keep it. I'll capture it.)
        
        # Revised Regex:
        # Group 1: Container div
        # Group 2: Badge (optional)
        # Group 3: H2 (optional, to be discarded)
        # Group 4: H1 (to be kept)
        
        $pattern = '(<div class="(?:idc-)?container">\s*)((?:<span class="badge">.*?</span>\s*)?)(?:<h2>.*?</h2>\s*)?(<h1>)'
        
        # Replacement: Group 1 + Group 2 (Badge) + NewHTML + Group 4 (H1)
        # We discard the H2 part.
        
        $updatedContent = $content -replace $pattern, "`$1`$2$newHtml`n`$3"
        
        if ($content -ne $updatedContent) {
            $updatedContent | Set-Content $file -Encoding UTF8
            Write-Host "Updated $file"
        } else {
            Write-Host "No change for $file (Regex mismatch?)"
        }
    }
}
