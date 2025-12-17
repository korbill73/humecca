$files = Get-ChildItem -Path . -Include "*.html" -Recurse

# Translation Map
$catMap = @{
    "Add-on Service" = "부가서비스"
    "Corporate Solution" = "기업솔루션"
    "IDC Service" = "IDC 서비스"
    "Network Service" = "네트워크"
    "Security Service" = "보안 서비스"
    "Customer Support" = "고객센터"
    "Company" = "회사소개"
}

$titleMap = @{
    "Software License" = "소프트웨어 임대"
    "Backup & Recovery" = "백업 & 복구"
    "CDN Service" = "CDN 서비스"
    "HA Hosting" = "HA 호스팅"
    "Load Balancing" = "로드밸런싱"
    "Monitoring" = "모니터링"
    "Disaster Recovery" = "재해복구"
    "e-Business" = "e-비즈니스"
    "Homepage" = "홈페이지 제작"
    "Custom Web" = "홈페이지 제작"
    "Mobile Web" = "모바일 웹"
    "Shopping Mall" = "쇼핑몰 제작"
    "Naver Cloud" = "네이버 클라우드"
    "Office 365" = "오피스 365"
    "CS Center" = "고객센터"
    "Inquiry" = "문의하기"
    "FAQ" = "자주 묻는 질문"
    "Notice" = "공지사항"
    "Company Intro" = "회사소개"
    "History" = "연혁"
    "Organization" = "조직도"
    "Overview" = "개요"
    "IDC Intro" = "IDC 소개"
    "VPN Line" = "VPN 전용선"
    "VPN Service" = "VPN 서비스"
    "DDoS Defense" = "DDoS 방어"
    "Security Monitoring" = "보안 관제"
    "SSL/Firewall" = "SSL/방화벽"
    "Server Hosting" = "서버호스팅"
    "IDC Network" = "IDC 네트워크"
}

foreach ($file in $files) {
    if ($file.Name -match "^(sub_|idc_|vpn_|sec_|sol_).*\.html$") {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Regex for Breadcrumb: <div ... style="...font-size: 13px..." ...> ... </div>
        # Use [^>]* to match attributes, [\s\S]*? for content
        $breadPattern = '(?i)<div[^>]*style=["''][^"'']*font-size:\s*13px[^>]*>[\s\S]*?</div>'
        $iconPattern = '(?i)<div[^>]*style=["''][^"'']*width:\s*60px[^>]*>[\s\S]*?</div>'
        
        $breadMatches = [regex]::Matches($content, $breadPattern)
        $iconMatches = [regex]::Matches($content, $iconPattern)
        
        $modified = $false
        
        # Remove Duplicate Breadcrumbs (Keep 1st)
        if ($breadMatches.Count -gt 1) {
            Write-Host "Found $($breadMatches.Count) breadcrumbs in $($file.Name). Removing extras."
            for ($i = $breadMatches.Count - 1; $i -ge 1; $i--) {
                $m = $breadMatches[$i]
                $content = $content.Remove($m.Index, $m.Length)
                $modified = $true
            }
        }
        
        # Remove Duplicate Icons (Keep 1st)
        # Note: If we modified content above, indices might shift if matches are after checking.
        # But Breadcrumbs are separate from Icons? 
        # Actually safer to re-scan for icons if we changed content, but usually they are interleaved.
        # Removing breadcrumb 2 removes text. Icon 2 is likely AFTER breadcrumb 2.
        # So we should process "Remove 2nd occurrences" carefully.
        # Let's simple reload matches after breadcrumb removal to be safe.
        
        if ($modified) { 
             # Re-match icons on new content
             $iconMatches = [regex]::Matches($content, $iconPattern)
        }
        
        if ($iconMatches.Count -gt 1) {
            Write-Host "Found $($iconMatches.Count) icons in $($file.Name). Removing extras."
            for ($i = $iconMatches.Count - 1; $i -ge 1; $i--) {
                $m = $iconMatches[$i]
                $content = $content.Remove($m.Index, $m.Length)
                $modified = $true
            }
        }
        
        # Now Translate the SINGLE Remaining Breadcrumb
        # Re-match breadcrumb
        $breadMatches = [regex]::Matches($content, $breadPattern)
        if ($breadMatches.Count -eq 1) {
            $m = $breadMatches[0]
            $blockText = $m.Value
            $newText = $blockText
            
            foreach ($key in $catMap.Keys) {
                if ($newText -match $key) { $newText = $newText -replace $key, $catMap[$key] }
            }
            foreach ($key in $titleMap.Keys) {
                if ($newText -match $key) { $newText = $newText -replace $key, $titleMap[$key] }
            }
            
            if ($blockText -ne $newText) {
                # Use Replace on the exact match to avoid global accident
                # But since regex matched unique string, simpler to split/join or substring?
                # Actually, plain String.Replace works if string is unique enough.
                # Or verify position.
                $content = $content.Substring(0, $m.Index) + $newText + $content.Substring($m.Index + $m.Length)
                $modified = $true
                Write-Host "Translated breadcrumb in $($file.Name)"
            }
        }
        
        if ($modified) {
            $content | Set-Content $file.FullName -Encoding UTF8
        }
    }
}
