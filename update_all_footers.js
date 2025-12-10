// 모든 서브페이지의 푸터를 공통 컴포넌트로 교체하는 스크립트
const fs = require('fs');
const path = require('path');

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

// 이미 업데이트된 페이지 제외
const alreadyUpdated = [
    'index.html',
    'sub_cloud_server.html',
    'sub_cloud_db.html',
    'sub_cloud_storage.html',
    'sub_cloud_network.html',
    'sub_cloud_management.html',
    'sub_cloud_monitoring.html',
    'sub_cloud_managed.html',
    'sub_cloud_intro.html',
    'sub_hosting.html'
];

// 업데이트할 페이지 목록
const pages = [
    'sub_colocation.html',
    'sub_vpn.html',
    'sub_security.html',
    'sub_support.html',
    'sub_web_custom.html',
    'sub_web_mobile.html',
    'sub_web_shop.html',
    'sub_sol_ms365.html',
    'sub_sol_naver.html',
    'sub_office365.html',
    'sub_company_intro.html',
    'sub_company_overview.html',
    'sub_company_history.html',
    'sub_company_org.html',
    'sub_company_idc.html',
    'sub_company_location.html',
    'sub_idc_intro.html',
    'sub_service.html',
    'sub_cs.html',
    'sub_add_backup.html',
    'sub_add_cdn.html',
    'sub_add_ha.html',
    'sub_add_loadbalancing.html',
    'sub_add_recovery.html',
    'sub_add_software.html',
    'sub_cloud.html',
    'sub_cloud_security.html',
    'sub_template.html'
];

const footerReplacement = `    <!-- ========== FOOTER (공통 컴포넌트) ========== -->
    <div id="footer-placeholder"></div>

    <script src="components/loader.js"></script>
</body>`;

let updatedCount = 0;
let skippedCount = 0;
let failedPages = [];

pages.forEach(page => {
    const filePath = path.join(basePath, page);

    try {
        if (!fs.existsSync(filePath)) {
            console.log(`File not found: ${page}`);
            failedPages.push(page);
            return;
        }

        let content = fs.readFileSync(filePath, 'utf8');

        // 이미 placeholder가 있으면 건너뛰기
        if (content.includes('id="footer-placeholder"')) {
            console.log(`Already updated: ${page}`);
            skippedCount++;
            return;
        }

        // footer-new 클래스 푸터 찾아서 교체
        const footerNewPattern = /<footer class="footer-new">[\s\S]*?<\/footer>\s*<\/body>/gi;

        // footer 클래스 푸터 찾아서 교체 (구버전)
        const footerPattern = /<footer class="footer">[\s\S]*?<\/footer>\s*<\/body>/gi;

        // 공백이 있는 버전도 체크
        const footerNewPatternWithWhitespace = /\s*<footer class="footer-new">[\s\S]*?<\/footer>\s*<\/body>/gi;

        let newContent = content;
        let matched = false;

        if (footerNewPattern.test(content)) {
            newContent = content.replace(footerNewPatternWithWhitespace, '\n' + footerReplacement);
            matched = true;
        } else if (footerPattern.test(content)) {
            newContent = content.replace(footerPattern, footerReplacement);
            matched = true;
        }

        // 패턴이 매칭되지 않으면 다른 방법 시도
        if (!matched) {
            // </footer> 와 </body> 사이의 모든 것을 교체
            const altPattern = /<footer[\s\S]*?<\/footer>[\s\S]*?<\/body>/gi;
            if (altPattern.test(content)) {
                newContent = content.replace(altPattern, footerReplacement);
                matched = true;
            }
        }

        if (matched && newContent !== content) {
            fs.writeFileSync(filePath, newContent, 'utf8');
            console.log(`Updated: ${page}`);
            updatedCount++;
        } else {
            console.log(`No footer found: ${page}`);
            failedPages.push(page);
        }

    } catch (error) {
        console.log(`Error processing: ${page} - ${error.message}`);
        failedPages.push(page);
    }
});

console.log(`\n==========================================`);
console.log(`Updated: ${updatedCount} pages`);
console.log(`Skipped (already updated): ${skippedCount} pages`);
if (failedPages.length > 0) {
    console.log(`Failed/NotFound: ${failedPages.length} pages`);
    console.log(`Failed pages: ${failedPages.join(', ')}`);
}
console.log(`==========================================`);
