/**
 * HUMECCA 공통 컴포넌트 로더
 * 헤더, 푸터 등 공통 컴포넌트를 동적으로 로드합니다.
 */

// 페이지 로드 시 공통 컴포넌트 로드
document.addEventListener('DOMContentLoaded', function () {
    // 헤더 로드
    loadComponent('header-placeholder', 'components/header.html', initHeaderScripts);
    // 푸터 로드
    loadComponent('footer-placeholder', 'components/footer.html', initTermsModal);
});

/**
 * 공통 컴포넌트를 로드하여 placeholder에 삽입
 * @param {string} placeholderId - 컴포넌트가 삽입될 요소의 ID
 * @param {string} componentPath - 컴포넌트 파일 경로
 * @param {Function} callback - 로드 완료 후 실행할 콜백 함수 (선택)
 */
function loadComponent(placeholderId, componentPath, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    fetch(componentPath)
        .then(response => {
            if (!response.ok) {
                throw new Error('Component not found: ' + componentPath);
            }
            return response.text();
        })
        .then(html => {
            placeholder.innerHTML = html;

            // 스크립트 태그 실행
            const scripts = placeholder.querySelectorAll('script');
            scripts.forEach(script => {
                const newScript = document.createElement('script');
                if (script.src) {
                    newScript.src = script.src;
                } else {
                    newScript.textContent = script.textContent;
                }
                document.body.appendChild(newScript);
            });

            // 콜백 실행
            if (callback) callback();
        })
        .catch(error => {
            console.warn('Component load error (' + componentPath + '):', error);
            // 로컬 파일 시스템에서는 fetch가 작동하지 않으므로
            // 대체 로딩 시도 (iframe 방식)
            loadComponentViaFallback(placeholderId, componentPath, callback);
        });
}

/**
 * 대체 로딩 방식 (로컬 파일용)
 */
function loadComponentViaFallback(placeholderId, componentPath, callback) {
    const placeholder = document.getElementById(placeholderId);
    if (!placeholder) return;

    let content = '';
    if (componentPath.includes('header.html')) {
        content = getInlineHeader();
    } else if (componentPath.includes('footer.html')) {
        content = getInlineFooter();
    }

    if (content) {
        placeholder.innerHTML = content;
        if (callback) callback();
    }
}

/**
 * 헤더 스크립트 초기화
 */
function initHeaderScripts() {
    // Mobile Menu Toggle
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const nav = document.querySelector('.nav');

    if (mobileMenuBtn && nav) {
        mobileMenuBtn.addEventListener('click', function () {
            this.classList.toggle('active');
            nav.classList.toggle('active');
            document.body.classList.toggle('menu-open');
        });
    }

    // Improved Menu Interaction - Ensure only one dropdown is visible at a time
    const navItems = document.querySelectorAll('.nav-item');
    const allDropdowns = document.querySelectorAll('.dropdown-menu');

    // Function to hide all dropdowns immediately
    function hideAllDropdowns() {
        allDropdowns.forEach(dropdown => {
            dropdown.style.opacity = '0';
            dropdown.style.visibility = 'hidden';
            dropdown.style.pointerEvents = 'none';
        });
    }

    // Function to reset dropdown styles (let CSS take over)
    function resetDropdownStyles(dropdown) {
        dropdown.style.opacity = '';
        dropdown.style.visibility = '';
        dropdown.style.pointerEvents = '';
    }

    navItems.forEach(item => {
        const menu = item.querySelector('.dropdown-menu');

        // When mouse enters a nav-item
        item.addEventListener('mouseenter', () => {
            // First, force hide ALL dropdowns immediately
            hideAllDropdowns();

            // Then reset this item's dropdown to let CSS show it
            if (menu) {
                // Small delay to ensure clean transition
                setTimeout(() => {
                    resetDropdownStyles(menu);
                }, 10);
            }
        });

        // When mouse leaves a nav-item
        item.addEventListener('mouseleave', () => {
            if (menu) {
                // Force hide immediately
                menu.style.opacity = '0';
                menu.style.visibility = 'hidden';
                menu.style.pointerEvents = 'none';

                // Reset after animation completes
                setTimeout(() => {
                    resetDropdownStyles(menu);
                }, 200);
            }
        });

        // When clicking a link inside dropdown
        if (menu) {
            const links = menu.querySelectorAll('a.dropdown-item');
            links.forEach(link => {
                link.addEventListener('click', () => {
                    hideAllDropdowns();
                });
            });
        }
    });

    console.log('Header scripts initialized with improved menu control');
}


/**
 * 인라인 헤더 HTML 반환 (로컬 개발 환경용)
 * components/header.html 내용과 동일하게 유지
 */
function getInlineHeader() {
    return `<!-- ========== HEADER (Centralized) ========== -->
<header class="header">
    <div class="header-container container">
        <!-- Logo -->
        <a href="index.html" class="logo-link">
            <img src="images/humecca_logo.gif" alt="HUMECCA" style="height:40px;">
        </a>

        <!-- Main Navigation -->
        <nav class="nav">
            <ul class="nav-list"> <!-- 1. Cloud (Mega Menu) -->

                <li class="nav-item">
                    <a href="sub_cloud_intro.html" class="nav-link">
                        클라우드 <i class="fas fa-chevron-down"></i>
                    </a>
                    <div class="dropdown-menu mega-menu">
                        <a href="sub_cloud_intro.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-cloud"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">클라우드 소개</span>
                                <span class="dropdown-desc">KT Cloud 기반 유연한 인프라</span>
                            </div>
                        </a>
                        <p class="mega-section-title">KT Cloud 서비스</p>
                        <div class="mega-grid">
                            <a href="sub_cloud_server.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Server</span></div>
                            </a>
                            <a href="sub_cloud_db.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">데이터베이스</span></div>
                            </a>
                            <a href="sub_cloud_storage.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-hdd"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">스토리지/CDN</span></div>
                            </a>
                            <a href="sub_cloud_network.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">네트워크</span></div>
                            </a>
                            <a href="sub_cloud_management.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-tasks"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">매니지먼트</span></div>
                            </a>
                            <a href="sub_cloud_vdi.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-desktop"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">VDI</span></div>
                            </a>
                            <a href="sub_cloud_private.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-lock"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Private Cloud</span></div>
                            </a>
                        </div>

                        <div style="margin-top: 12px; border-top: 1px solid #eee; padding-top: 12px;">
                            <a href="sub_cloud_limits.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-info-circle"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">서비스별 제한사항</span></div>
                            </a>
                        </div>

                        <!-- CTA Button -->
                        <div class="mega-cta">
                            <a href="https://login.humecca.co.kr" target="_blank">
                                <i class="fas fa-cloud"></i> 서비스 바로 가기 <i class="fas fa-external-link-alt"></i>
                            </a>
                        </div>
                    </div>
                </li>
                <!-- 2. IDC (Dropdown) -->
                <li class="nav-item">
                    <a href="#" class="nav-link">IDC <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu" style="min-width:320px;">
                        <a href="sub_idc_intro.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-building"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">HUMECCA IDC</span>
                                <span class="dropdown-desc">Tier 3+ 인증 IDC 센터, 엄격한 보안 및 물리적 안정성</span>
                            </div>
                        </a>
                        <a href="sub_hosting.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-server"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">서버호스팅</span>
                                <span class="dropdown-desc">KT 강남 IDC에서 운영되는 고성능 전용 서버</span>
                            </div>
                        </a>
                        <a href="sub_colocation.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-network-wired"></i></div>
                            <div class="dropdown-text">
                                <span class="dropdown-title">코로케이션</span>
                                <span class="dropdown-desc">Tier 3+ 데이터센터에서 안전한 서버 입주</span>
                            </div>
                        </a>
                    </div>
                </li>

                <!-- 3. VPN -->
                <li class="nav-item"><a href="sub_vpn.html" class="nav-link">VPN 전용선</a></li>

                <!-- 4. Security -->

                <li class="nav-item">
                    <a href="sub_security.html" class="nav-link">보안 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu mega-menu" style="min-width: 500px;">
                        <p class="mega-section-title">Network Security</p>
                        <div class="mega-grid">
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-shield-alt"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">WAF (웹방화벽)</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-plus-square"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">WAF Pro</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-filter"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">클린존</span></div>
                            </a>
                        </div>

                        <p class="mega-section-title"
                            style="margin-top: 15px; border-top: 1px solid #eee; padding-top: 15px;">System & Data
                            Security</p>
                        <div class="mega-grid">
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-certificate"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Private CA</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-lock"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">Certificate Manager</span>
                                </div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-laptop-medical"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">V3 Net Server</span></div>
                            </a>
                            <a href="sub_security.html" class="dropdown-item">
                                <div class="dropdown-icon"><i class="fas fa-database"></i></div>
                                <div class="dropdown-text"><span class="dropdown-title">DBSAFER</span></div>
                            </a>
                        </div>
                    </div>
                </li>

                <!-- 5. Additional Services (Dropdown) -->
                <li class="nav-item">
                    <a href="#" class="nav-link">부가서비스 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu mega-menu" style="min-width: 400px; padding: 0;">
                        <div class="menu-list" style="padding: 10px 0;">
                            <a href="sub_addon_software.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-window-maximize"></i></div>
                                <div class="text-box">
                                    <span class="title">소프트웨어</span>
                                    <span class="desc">시스템 운영에 필요한 라이선스를 효율적으로</span>
                                </div>
                            </a>
                            <a href="sub_addon_backup.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-database"></i></div>
                                <div class="text-box">
                                    <span class="title">백업</span>
                                    <span class="desc">데이터는 기업의 중요한 자산</span>
                                </div>
                            </a>
                            <a href="sub_addon_ha.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-layer-group"></i></div>
                                <div class="text-box">
                                    <span class="title">HA(고가용성)</span>
                                    <span class="desc">장애발생시 빠른 전이를 통한 연속적인 비즈니스 환경 제공</span>
                                </div>
                            </a>
                            <a href="sub_addon_loadbalancing.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-wave-square"></i></div>
                                <div class="text-box">
                                    <span class="title">로드밸런싱</span>
                                    <span class="desc">여러대의 서버를 한대의 대용량 고성능 서버처럼</span>
                                </div>
                            </a>
                            <a href="sub_addon_cdn.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-bolt"></i></div>
                                <div class="text-box">
                                    <span class="title">CDN</span>
                                    <span class="desc">빠른 전송 속도로 최상의 서비스 품질 보장</span>
                                </div>
                            </a>
                            <a href="sub_addon_recovery.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-undo"></i></div>
                                <div class="text-box">
                                    <span class="title">데이터 복구</span>
                                    <span class="desc">데이터 손상시 복원</span>
                                </div>
                            </a>
                            <a href="sub_addon_monitoring.html" class="dropdown-item icon-left">
                                <div class="icon-box"><i class="fas fa-desktop"></i></div>
                                <div class="text-box">
                                    <span class="title">모니터링</span>
                                    <span class="desc">언제 어디서나 서버 상태를 실시간으로</span>
                                </div>
                            </a>
                        </div>
                        <div class="menu-footer"
                            style="border-top: 1px solid #f3f4f6; padding: 12px; text-align: center; background: #f9fafb;">
                            <a href="#" style="color: #dc2626; font-size: 14px; font-weight: 500;">전체 부가서비스 보기</a>
                        </div>
                    </div>
                </li>

                <!-- 6. Enterprise Solutions (Dropdown) -->
                <li class="nav-item">
                    <a href="#" class="nav-link">기업솔루션 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="sub_sol_ms365.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fab fa-microsoft"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">MS 365</span></div>
                        </a>
                        <a href="sub_sol_groupware.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-envelope-open-text"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">기업메일/그룹웨어</span></div>
                        </a>
                        <a href="sub_web_custom.html" class="dropdown-item">
                            <div class="dropdown-icon"><i class="fas fa-laptop-code"></i></div>
                            <div class="dropdown-text"><span class="dropdown-title">홈페이지 제작</span></div>
                        </a>
                    </div>
                </li>

                <!-- 7. Company (Dropdown) -->
                <li class="nav-item">
                    <a href="sub_company_intro.html" class="nav-link">회사소개 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="sub_company_intro.html#intro" class="dropdown-item">
                            <div class="dropdown-text"><span class="dropdown-title">회사소개</span></div>
                        </a>
                        <a href="sub_company_intro.html#history" class="dropdown-item">
                            <div class="dropdown-text"><span class="dropdown-title">연혁</span></div>
                        </a>
                        <a href="sub_company_intro.html#location" class="dropdown-item">
                            <div class="dropdown-text"><span class="dropdown-title">오시는 길</span></div>
                        </a>
                    </div>
                </li>

                <!-- 8. Customer Center (Dropdown) -->
                <li class="nav-item">
                    <a href="#" class="nav-link">고객센터 <i class="fas fa-chevron-down"></i></a>
                    <div class="dropdown-menu">
                        <a href="#" class="dropdown-item">
                            <div class="dropdown-text"><span class="dropdown-title">공지사항</span></div>
                        </a>
                        <a href="#" class="dropdown-item">
                            <div class="dropdown-text"><span class="dropdown-title">자주 묻는 질문</span></div>
                        </a>
                        <a href="sub_support.html" class="dropdown-item">
                            <div class="dropdown-text"><span class="dropdown-title">1:1 문의</span></div>
                        </a>
                    </div>
                </li>
            </ul>
        </nav>

        <!-- Header Buttons -->
        <div class="header-buttons">
            <a href="admin.html" class="btn btn-outline"
                style="min-width:auto; padding:8px 16px; font-size:14px; border:1px solid #e2e8f0; color:#64748b;">
                <i class="fas fa-user-circle" style="margin-right:6px;"></i> 관리자
            </a>
        </div>
        <!-- Mobile Menu Button -->
        <button class="mobile-menu-btn"><i class="fas fa-bars"></i></button>
    </div>
</header>`;
}

/**
 * 인라인 푸터 HTML 반환 (로컬 개발 환경용)
 * components/footer.html 내용과 동일하게 유지 (스크립트 제외)
 */
function getInlineFooter() {
    return `<footer class="footer-new">
    <div class="container footer-grid">
        <!-- Col 1: Info -->
        <div>
            <h3>전문가와 부담 없이 상담하세요</h3>
            <p style="margin-bottom:20px; color:#94a3b8; line-height:1.6;">
                간편하게 무엇이든 물어보세요<br>
                더욱 정확한 상담을 원하신다면 로그인 후 1:1 문의를 이용하실 수 있습니다.
            </p>
            <div style="display:flex; gap:16px; font-size:14px;">
                <a href="sub_support.html" style="color:#EF4444; display:flex; align-items:center; gap:6px;">
                    1:1 문의 <i class="fas fa-external-link-alt" style="font-size:10px;"></i>
                </a>
                <a href="https://login.humecca.co.kr/Login/Join" target="_blank"
                    style="color:#EF4444; display:flex; align-items:center; gap:6px;">
                    회원가입 <i class="fas fa-external-link-alt" style="font-size:10px;"></i>
                </a>
            </div>
        </div>

        <div class="separator"></div>

        <!-- Col 2: Phone -->
        <div>
            <h4>서비스 문의</h4>
            <a href="tel:02-418-7766" class="footer-phone">02-418-7766</a>
            <div style="font-size:13px; color:#94a3b8; margin-top:12px;">
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span>평일</span> <span>09:00 ~ 18:00</span>
                </div>
                <div style="display:flex; justify-content:space-between; margin-bottom:4px;">
                    <span>점심</span> <span>12:00 ~ 13:00</span>
                </div>
                <div style="font-size:11px; margin-top:8px;">*주말, 공휴일 휴무</div>
            </div>
        </div>

        <div class="separator"></div>

        <!-- Col 3: Company Info -->
        <div>
            <div
                style="display:flex; flex-wrap:wrap; gap:16px; margin-bottom:24px; padding-bottom:16px; border-bottom:1px solid #334155; font-size:13px;">
                <a href="javascript:void(0)" style="cursor: default;">(주) 휴메카</a>
                <a href="javascript:void(0)" onclick="showLayerTerm('privacy')"
                    style="font-weight:700; color:white; cursor:pointer;">개인정보처리방침</a>
                <a href="javascript:void(0)" onclick="showLayerTerm('terms')" style="cursor:pointer;">이용약관</a>
                <a href="javascript:void(0)" onclick="showLayerTerm('member')" style="cursor:pointer;">회원약관</a>
            </div>
            <div style="font-size:12px; color:#64748b; line-height:1.8;">
                <p>(주)휴메카 | 대표이사: 박제군 | 사업자등록번호: 101-81-89952</p>
                <p>본사: 서울특별시 강남구 언주로 517 (역삼동, KT영동지사) KT IDC 4층</p>
                <p style="margin-top:16px; font-size:11px;">Copyright © 2024 Humecca. All rights reserved.</p>
            </div>
        </div>
    </div>
</footer>

<!-- 약관 모달 -->
<div id="term-modal"
    style="display: none; position: fixed; top: 0; left: 0; width: 100%; height: 100%; background: rgba(0,0,0,0.5); z-index: 9999; justify-content: center; align-items: center;">
    <div
        style="background: white; width: 90%; max-width: 800px; max-height: 90vh; border-radius: 12px; display: flex; flex-direction: column; box-shadow: 0 4px 20px rgba(0,0,0,0.2);">
        <div
            style="padding: 20px; border-bottom: 1px solid #e5e7eb; display: flex; justify-content: space-between; align-items: center;">
            <h3 id="term-modal-title" style="font-size: 20px; font-weight: 700; color: #1e293b;">약관</h3>
            <button onclick="closeTermModal()"
                style="background: none; border: none; font-size: 28px; cursor: pointer; color: #64748b; line-height: 1;">&times;</button>
        </div>
        <div id="term-modal-content"
            style="padding: 30px; overflow-y: auto; line-height: 1.8; color: #333; font-size: 15px; white-space: pre-wrap; font-family: 'Pretendard', 'Noto Sans KR', sans-serif;">
            <!-- 내용이 여기에 로드됩니다 -->
        </div>
        <div style="padding: 20px; border-top: 1px solid #e5e7eb; text-align: right;">
            <button onclick="closeTermModal()"
                style="background: #1a1a2e; color: white; border: none; padding: 10px 24px; border-radius: 6px; cursor: pointer; font-weight: 600;">닫기</button>
        </div>
    </div>
</div>`;
}

/**
 * 약관 모달 기능 초기화
 */
function initTermsModal() {
    const modal = document.getElementById('term-modal');
    if (modal) {
        modal.addEventListener('click', function (e) {
            if (e.target === this) {
                closeTermModal();
            }
        });
    }
}

/**
 * 약관 레이어 표시
 */
function showLayerTerm(type) {
    // LocalStorage 우선 확인 (v4 - 텍스트 모드)
    let content = localStorage.getItem('humecca_term_v4_' + type);

    // 데이터가 없으면 안내 메시지 표시
    if (!content) content = `
        <div style="
            text-align: center; 
            padding: 60px 40px;
            color: #64748b;
        ">
            <div style="
                width: 64px;
                height: 64px;
                background: linear-gradient(135deg, #f1f5f9 0%, #e2e8f0 100%);
                border-radius: 16px;
                display: flex;
                align-items: center;
                justify-content: center;
                margin: 0 auto 20px;
            ">
                <i class="fas fa-file-alt" style="font-size: 24px; color: #94a3b8;"></i>
            </div>
            <p style="font-size: 16px; font-weight: 600; color: #475569; margin-bottom: 8px;">
                등록된 약관 내용이 없습니다
            </p>
            <p style="font-size: 14px; color: #94a3b8;">
                관리자 페이지에서 내용을 등록해주세요
            </p>
        </div>`;

    let title = '약관';
    if (type === 'privacy') title = '개인정보처리방침';
    else if (type === 'terms') title = '이용약관';
    else if (type === 'member') title = '회원약관';

    document.getElementById('term-modal-title').textContent = title;
    document.getElementById('term-modal-content').innerHTML = content;

    const modal = document.getElementById('term-modal'); // Re-query just in case
    if (!modal) return;

    // Reset styles for fade-in
    modal.style.display = 'flex';
    modal.style.opacity = '0';

    setTimeout(() => {
        modal.style.opacity = '1';
        modal.style.transition = 'opacity 0.2s';
    }, 10);

    document.body.style.overflow = 'hidden';
}

/**
 * 약관 모달 닫기
 */
function closeTermModal() {
    const modal = document.getElementById('term-modal');
    if (!modal) return;

    modal.style.opacity = '0';
    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';
    }, 200);
}
