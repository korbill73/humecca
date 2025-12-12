
$files = Get-ChildItem -Path . -Filter "*.html" -Recurse

foreach ($file in $files) {
    if ($file.FullName -match "node_modules") { continue }
    
    $content = Get-Content $file.FullName -Raw -Encoding UTF8
    $originalContent = $content

    # Update styles.css version to 3.2
    $content = $content -replace 'styles\.css\?v=[0-9.]+', 'styles.css?v=3.2'
    
    # Update loader.js version to 3.2
    $content = $content -replace 'components/loader\.js\?v=[0-9.]+', 'components/loader.js?v=3.2'

    if ($content -ne $originalContent) {
        Set-Content -Path $file.FullName -Value $content -Encoding UTF8
        Write-Host "Updated $($file.Name)"
    }
}
