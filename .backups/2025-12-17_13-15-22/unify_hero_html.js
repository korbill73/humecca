// Unify all cloud pages hero section HTML structure to match sub_cloud_server.html
// (badge + h1 + p format for consistent height)
const fs = require('fs');
const path = require('path');

// Page configurations: file -> { badge, title, description }
const pageConfigs = {
    'sub_cloud_intro.html': {
        badge: 'KT Cloud Partner',
        title: '클라우드 소개',
        description: 'KT의 검증된 클라우드 인프라로 비즈니스를 시작하세요'
    },
    'sub_cloud_server.html': {
        badge: 'KT Cloud Partner',
        title: 'ucloud Server',
        description: 'KT Cloud 기반 고성능 가상 서버'
    },
    'sub_cloud_db.html': {
        badge: 'KT Cloud Partner',
        title: 'ucloud DB',
        description: 'KT Cloud 기반 관계형 데이터베이스 서비스'
    },
    'sub_cloud_storage.html': {
        badge: 'KT Cloud Partner',
        title: 'CDN / Storage',
        description: 'KT Cloud 기반 스토리지 및 콘텐츠 전송 서비스'
    },
    'sub_cloud_network.html': {
        badge: 'KT Cloud Partner',
        title: 'Network',
        description: 'KT Cloud 기반 네트워크 서비스'
    },
    'sub_cloud_management.html': {
        badge: 'KT Cloud Partner',
        title: 'Management',
        description: 'KT Cloud 기반 매니지먼트 서비스'
    },
    'sub_cloud_monitoring.html': {
        badge: 'KT Cloud Partner',
        title: '디딤모니터링',
        description: 'KT Cloud 기반 통합 모니터링 서비스'
    },
    'sub_cloud_managed.html': {
        badge: 'KT Cloud Partner',
        title: '디딤매니지드',
        description: 'KT Cloud 기반 전문 관리 서비스'
    },
    'sub_cloud_vdi.html': {
        badge: 'KT Cloud Partner',
        title: 'VDI',
        description: 'KT Cloud 기반 가상 데스크톱 인프라'
    },
    'sub_cloud_private.html': {
        badge: 'KT Cloud Partner',
        title: 'Private Cloud',
        description: 'KT Cloud 기반 전용 프라이빗 클라우드'
    },
    'sub_cloud_limits.html': {
        badge: 'KT Cloud Partner',
        title: '서비스별 제한사항',
        description: 'KT Cloud 서비스별 리소스 제한 안내'
    }
};

const basePath = 'f:/onedrive/OneDrive - 휴메카/08. homepage';

Object.keys(pageConfigs).forEach(pageName => {
    const filePath = path.join(basePath, pageName);
    const config = pageConfigs[pageName];

    try {
        let content = fs.readFileSync(filePath, 'utf8');

        // New hero section HTML structure (matching sub_cloud_server.html)
        const newHeroHtml = `<section class="cloud-hero">
        <div class="container">
            <span class="badge">${config.badge}</span>
            <h1>${config.title}</h1>
            <p>${config.description}</p>
        </div>
    </section>`;

        // Pattern to match the cloud-hero section
        const heroPattern = /<section class="cloud-hero">[\s\S]*?<\/section>/g;

        if (heroPattern.test(content)) {
            content = content.replace(heroPattern, newHeroHtml);
            fs.writeFileSync(filePath, content, 'utf8');
            console.log(`Updated hero HTML: ${pageName}`);
        } else {
            console.log(`Hero section not found in: ${pageName}`);
        }
    } catch (err) {
        console.error(`Error updating ${pageName}: ${err.message}`);
    }
});

console.log('Done!');
