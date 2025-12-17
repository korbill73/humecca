$HeaderPath = "f:\onedrive\OneDrive - 휴메카\08. homepage\components\header.html"
$RootPath = "f:\onedrive\OneDrive - 휴메카\08. homepage"

# 1. Read the Clean Header
if (!(Test-Path $HeaderPath)) {
    Write-Error "Header file not found at $HeaderPath"
    exit
}
$HeaderContent = Get-Content -Path $HeaderPath -Raw -Encoding UTF8

# Ensure we just get the <header>...</header> part if it's a full html file
if ($HeaderContent -match '(?s)<header.*?>(.*)</header>') {
    # It is already the header tag itself, usually components/header.html contains <header>...</header>
    # We use the whole content typically.
}

# 2. Define Targets
$TargetFiles = Get-ChildItem -Path $RootPath | Where-Object { $_.Name -match "^sub_.*\.html$" -or $_.Name -eq "index.html" }

foreach ($File in $TargetFiles) {
    Write-Host "Updating $($File.Name)..."
    $Content = Get-Content -Path $File.FullName -Raw -Encoding UTF8
    
    $Modified = $false

    # A. Replace Placeholder
    if ($Content -match '<div id="header-placeholder"></div>') {
        $Content = $Content -replace '<div id="header-placeholder"></div>', $HeaderContent
        $Modified = $true
        Write-Host "  - Replaced Placeholder"
    }
    
    # B. Replace Existing Header (if placeholder not found but old header exists)
    elseif ($Content -match '(?s)<header.*?>.*?</header>') {
        $Content = $Content -replace '(?s)<header.*?>.*?</header>', $HeaderContent
        $Modified = $true
        Write-Host "  - Updated Existing Header"
    }
    
    # C. Fallback: Inject after Body if neither
    else {
        if ($Content -match '<body.*?>') {
             $Content = $Content -replace '(<body.*?>)', "`$1`n$HeaderContent"
             $Modified = $true
             Write-Host "  - Injected after body start"
        }
    }

    if ($Modified) {
        $Content | Set-Content -Path $File.FullName -Encoding UTF8
    }
}

Write-Host "All files updated with Static Header."
