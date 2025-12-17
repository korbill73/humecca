$files = @(
    "sub_cloud_intro.html",
    "sub_cloud_server.html",
    "sub_cloud_db.html",
    "sub_cloud_storage.html",
    "sub_cloud_security.html",
    "sub_cloud_network.html",
    "sub_cloud_management.html",
    "sub_cloud_monitoring.html",
    "sub_cloud_managed.html",
    "sub_idc_intro.html",
    "sub_hosting.html",
    "sub_colocation.html",
    "sub_vpn.html",
    "sub_security.html",
    "sub_add_software.html",
    "sub_add_backup.html",
    "sub_add_ha.html",
    "sub_add_loadbalancing.html",
    "sub_add_cdn.html",
    "sub_add_recovery.html",
    "sub_sol_ms365.html",
    "sub_sol_naver.html",
    "sub_web_custom.html",
    "sub_company_intro.html",
    "sub_cs.html"
)

foreach ($file in $files) {
    Copy-Item -Path "sub_template.html" -Destination $file -Force
    Write-Host "Created $file"
}
