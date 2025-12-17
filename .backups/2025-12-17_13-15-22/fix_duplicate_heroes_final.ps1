$files = Get-ChildItem -Path . -Include "*.html" -Recurse

# Translation Map (English -> Korean)
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
    # Only process target files (skip unrelated ones)
    if ($file.Name -match "^(sub_|idc_|vpn_|sec_|sol_).*\.html$") {
        $content = Get-Content $file.FullName -Raw -Encoding UTF8
        
        # Regex to find the Block: Breadcrumb Div + Icon Box Div
        # We look for the 13px font div and the 60px width div
        $pattern = '(?s)(<div style="font-size: 13px;.*?</div>\s*<div style="width: 60px;.*?</div>)'
        
        $matches = [regex]::Matches($content, $pattern)
        
        if ($matches.Count -gt 1) {
            Write-Host "Found $($matches.Count) hero blocks in $($file.Name). Fixing..."
            
            # Keep the FIRST one (Index 0), Remove others
            # We do this by replacing the whole matched string of the 2nd match with empty string
            # But we must be careful about positions. processing from last to first avoids index shift.
            
            for ($i = $matches.Count - 1; $i -ge 1; $i--) {
                $m = $matches[$i]
                $content = $content.Remove($m.Index, $m.Length)
            }
            
            # Re-read content or update variable for translation check on the remaining one
            # Actually, let's process the ONE remaining block (which is now at matches[0].Index)
            # But since we modified string, matches[0] index is still valid (it's first).
        }
        
        # Now Check if the Remaining Block (or unique block) needs translation
        # Re-match to get the current single block text
        $singleMatch = [regex]::Match($content, $pattern)
        
        if ($singleMatch.Success) {
            $blockHtml = $singleMatch.Value
            
            # Check if it contains English keys from our map
            $newBlockHtml = $blockHtml
            foreach ($key in $catMap.Keys) {
                if ($newBlockHtml -match $key) {
                    $newBlockHtml = $newBlockHtml -replace $key, $catMap[$key]
                }
            }
            foreach ($key in $titleMap.Keys) {
                if ($newBlockHtml -match $key) {
                    $newBlockHtml = $newBlockHtml -replace $key, $titleMap[$key]
                }
            }
            
            if ($blockHtml -ne $newBlockHtml) {
                $content = $content.Replace($blockHtml, $newBlockHtml)
                Write-Host "Translated hero block in $($file.Name)"
            }
        }
        
        if ($matches.Count -gt 1 -or $singleMatch.Value -ne $blockHtml) {
             # We need to save if we made changes
             $content | Set-Content $file.FullName -Encoding UTF8
        }
    }
}
