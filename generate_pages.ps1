$indexContent = Get-Content "index.html" -Raw -Encoding UTF8

# Extract Header
$headerStart = $indexContent.IndexOf('<header class="header">')
$headerEnd = $indexContent.IndexOf('</header>') + 9
$headerContent = $indexContent.Substring($headerStart, $headerEnd - $headerStart)

# Extract Footer
$footerStart = $indexContent.IndexOf('<footer class="footer">')
$footerEnd = $indexContent.IndexOf('</footer>') + 9
$footerContent = $indexContent.Substring($footerStart, $footerEnd - $footerStart)

$pages = @(
    @{ Name = "idc_hosting.html"; Title = "서버 호스팅" },
    @{ Name = "idc_colocation.html"; Title = "코로케이션" },
    @{ Name = "idc_network.html"; Title = "IDC 네트워크" },
    @{ Name = "cloud_kt.html"; Title = "KT 클라우드" },
    @{ Name = "cloud_storage.html"; Title = "클라우드 스토리지" },
    @{ Name = "cloud_os.html"; Title = "다양한 OS 지원" },
    @{ Name = "vpn_service.html"; Title = "VPN 서비스" },
    @{ Name = "vpn_line.html"; Title = "전용선" },
    @{ Name = "vpn_monitoring.html"; Title = "네트워크 모니터링" },
    @{ Name = "sec_monitoring.html"; Title = "보안 모니터링" },
    @{ Name = "sec_ddos.html"; Title = "DDoS 방어" },
    @{ Name = "sec_ssl.html"; Title = "SSL/방화벽" },
    @{ Name = "add_server.html"; Title = "서버 관리 대행" },
    @{ Name = "add_backup.html"; Title = "백업 & 복구" },
    @{ Name = "add_ha.html"; Title = "HA 호스팅" },
    @{ Name = "sol_home.html"; Title = "맞춤형 홈페이지" },
    @{ Name = "sol_groupware.html"; Title = "그룹웨어" },
    @{ Name = "sol_ebiz.html"; Title = "e-Business 솔루션" }
)

foreach ($page in $pages) {
    $html = @"
<!DOCTYPE html>
<html lang="ko">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>HUMECCA - $($page.Title)</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="./styles.css">
</head>
<body>
    $headerContent

    <!-- SUBPAGE HERO -->
    <section class="hero" style="min-height: 350px; height: 350px; margin-top: 80px; background: #1a1f3c; display: flex; align-items: center; justify-content: center;">
        <div class="container" style="text-align: center; color: white;">
            <h1 style="font-size: 3rem; font-weight: 800; margin-bottom: 20px;">$($page.Title)</h1>
            <p style="font-size: 1.2rem; opacity: 0.8;">HUMECCA의 전문적인 $($page.Title) 서비스를 만나보세요.</p>
        </div>
    </section>

    <!-- CONTENT -->
    <section class="services" style="padding: 80px 0; min-height: 500px;">
        <div class="container">
            <div style="background: white; padding: 40px; border-radius: 12px; box-shadow: 0 5px 20px rgba(0,0,0,0.05); text-align: center;">
                <div style="color: #E94D36; font-size: 3rem; margin-bottom: 20px;">
                    <i class="fas fa-tools"></i>
                </div>
                <h2 style="font-size: 2rem; margin-bottom: 20px;">$($page.Title) 서비스 상세 내용</h2>
                <p style="color: #666; margin-bottom: 40px; line-height: 1.6;">
                    현재 페이지의 상세 콘텐츠를 준비 중입니다.<br>
                    고객님의 비즈니스에 최적화된 솔루션을 제공하기 위해 최선을 다하고 있습니다.
                </p>
                <a href="index.html#support" class="btn btn-primary">상담 문의하기</a>
            </div>
        </div>
    </section>

    $footerContent

    <script src="./script.js"></script>
</body>
</html>
"@
    $html | Out-File -FilePath $page.Name -Encoding UTF8
    Write-Host "Created $($page.Name)"
}
