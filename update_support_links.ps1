$files = Get-ChildItem -Path "f:/onedrive/OneDrive - 휴메카/08. homepage" -Filter *.html

foreach ($file in $files) {
    if ($file.Name -eq "sub_support.html") { continue }

    $content = Get-Content -Path $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # 1. Update Parent Link
    $content = $content -replace 'href="#" class="nav-link">고객센터', 'href="sub_support.html" class="nav-link">고객센터'

    # 2. Update Notice Link
    $content = $content -replace 'href="#" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">공지사항</span>', 'href="sub_support.html#notice" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">공지사항</span>'

    # 3. Update FAQ Link
    $content = $content -replace 'href="#" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">자주 묻는 질문</span>', 'href="sub_support.html#faq" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">자주 묻는 질문</span>'

    # 4. Update 1:1 Inquiry Link (Just in case it was #)
    $content = $content -replace 'href="#" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">1:1 문의</span>', 'href="sub_support.html#inquiry" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">1:1 문의</span>'
    
    # 5. Update existing 1:1 Inquiry link to include hash if it was just sub_support.html
    $content = $content -replace 'href="sub_support.html" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">1:1 문의</span>', 'href="sub_support.html#inquiry" class="dropdown-item"><div class="dropdown-text"><span class="dropdown-title">1:1 문의</span>'


    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
