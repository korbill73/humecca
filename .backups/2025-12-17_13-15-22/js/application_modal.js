// EmailJS Configuration (Placeholders)
const EMAILJS_PUBLIC_KEY = "user_xxxxxxxxxxxxxxxxx"; // [TODO] Replace with your Public Key
const EMAILJS_SERVICE_ID = "service_xxxxxxxx";       // [TODO] Replace with your Service ID
const EMAILJS_TEMPLATE_ID_MANAGER = "template_xxxxxxxx"; // [TODO] Manager Notification Template
const EMAILJS_TEMPLATE_ID_CUSTOMER = "template_xxxxxxxx"; // [TODO] Customer Auto-reply Template

// 초기화
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', init);
} else {
    // 이미 로드되었으면 즉시 실행 (동적 로딩 시 필수)
    init();
}

function init() {
    // 먼저 Event Delegation 등록 (footer 로드와 무관)
    setupEventDelegation();

    // [EmailJS] Init
    initEmailJS();
}

function initEmailJS() {
    // Wait for SDK to load if not ready
    if (typeof emailjs === 'undefined') {
        setTimeout(initEmailJS, 500);
        return;
    }
    try {
        emailjs.init(EMAILJS_PUBLIC_KEY);
        console.log('EmailJS Initialized');
    } catch (e) {
        console.warn('EmailJS Init Failed:', e);
    }
}

// [Event Delegation] 전역 클릭 리스너 (항상 등록)
function setupEventDelegation() {
    // document.body가 없으면 잠시 후 재시도
    if (!document.body) {
        console.warn('document.body not ready, retrying...');
        setTimeout(setupEventDelegation, 100);
        return;
    }

    document.body.addEventListener('click', (e) => {
        const btn = e.target.closest('.js-open-modal');
        if (btn) {
            e.preventDefault();
            const name = btn.dataset.name || '';
            const type = btn.dataset.type || '';
            const details = btn.dataset.details || '';
            const price = btn.dataset.price || '';
            console.log('Modal trigger clicked:', { name, type, details, price });
            openAppModal(name, type, details, price);
        }
    });
    console.log('✓ Event Delegation for Modal Triggers: Ready');
}

/**
 * [Helper] 모달 요소 가져오기 (ID 기반)
 * 기본값: 'app-modal' (전역)
 * 특정 페이지용: 'app-modal-hosting' 등
 */
let currentModalId = 'app-modal';

function getModalElement(id) {
    if (!id) id = currentModalId;
    const el = document.getElementById(id);
    if (el) currentModalId = id; // 발견하면 현재 모달 ID 업데이트
    return el;
}


/**
 * 모달 열기
 */
function openAppModal(title, type, details, price, customModalId) {

    // 1. 우선순위: customModalId -> 현재 페이지에 있는 'app-modal-hosting' -> 전역 'app-modal'
    let modal = null;
    if (customModalId) {
        modal = getModalElement(customModalId);
    }

    if (!modal) {
        // hosting 페이지 특화 모달 찾기
        modal = getModalElement('app-modal-hosting');
    }

    if (!modal) {
        // 전역 모달 찾기 (getModalElement가 currentModalId 업데이트 함)
        modal = getModalElement('app-modal');
    }

    if (!modal) {
        console.warn('App Modal elements not found.');
        alert('신청 창을 불러오는 중입니다. 잠시 후 다시 시도해주세요.');
        return;
    }

    // 2. Reset UI State (Show Form, Hide Success)
    const form = modal.querySelector('#application-form');
    const successView = modal.querySelector('#app-success-view');

    // 폼 컨테이너 표시, 성공 화면 숨김
    if (form) {
        form.style.display = 'block';
    }
    if (successView) successView.style.display = 'none';

    // 3. Populate Data
    // Format Title with Price
    let displayTitle = title || '상담 신청';
    let finalProductName = title || '';

    if (price && price !== '문의') {
        // Remove commas if present
        const rawPrice = String(price).replace(/,/g, '');
        const numPrice = Number(rawPrice);

        if (!isNaN(numPrice)) {
            const formattedPrice = ` (₩${numPrice.toLocaleString()})`;
            displayTitle += formattedPrice;
            finalProductName += formattedPrice;
        } else {
            // Fallback for non-numeric prices (e.g. text)
            displayTitle += ` (${price})`;
            finalProductName += ` (${price})`;
        }
    }

    // Display Fields
    const nameDisplay = modal.querySelector('#app-product-name-display');
    const detailDisplay = modal.querySelector('#app-product-details-display');

    if (nameDisplay) nameDisplay.textContent = displayTitle;
    if (detailDisplay) detailDisplay.textContent = details || '전문 엔지니어가 상세히 안내해 드립니다.';

    // Hidden Inputs
    const typeInput = modal.querySelector('#app-product-type');
    const nameInput = modal.querySelector('#app-product-name');
    const detailInput = modal.querySelector('#app-product-details');

    if (typeInput) typeInput.value = type || 'general';
    if (nameInput) nameInput.value = finalProductName; // Save Name + Price to DB
    if (detailInput) detailInput.value = details || '';

    // Honeypot Reset
    const honeypot = modal.querySelector('#app-website-url');
    if (honeypot) honeypot.value = '';

    // Generate Math Challenge
    generateMathChallenge(modal);

    // 4. Show Modal
    modal.style.display = 'flex';
    document.body.style.overflow = 'hidden';

    setTimeout(() => {
        modal.style.opacity = '1';
        const content = modal.querySelector('.app-modal-content');
        if (content) content.style.transform = 'translateY(0)';
    }, 10);
}

/**
 * 모달 닫기
 */
function closeAppModal() {
    const modal = getModalElement(currentModalId);
    if (!modal) return;

    modal.style.opacity = '0';
    const content = modal.querySelector('.app-modal-content');
    if (content) content.style.transform = 'translateY(20px)';

    setTimeout(() => {
        modal.style.display = 'none';
        document.body.style.overflow = '';

        const form = modal.querySelector('#application-form');
        if (form) form.reset();
    }, 300);
}

/**
 * 수학 문제 생성
 */
function generateMathChallenge(modal) {
    if (!modal) modal = getModalElement(currentModalId);
    if (!modal) return;

    const qEl = modal.querySelector('#math-challenge-q');
    const rEl = modal.querySelector('#math-challenge-real');
    const aEl = modal.querySelector('#math-challenge-a');

    if (!qEl || !rEl) return;

    const n1 = Math.floor(Math.random() * 9) + 1;
    const n2 = Math.floor(Math.random() * 9) + 1;

    qEl.textContent = `${n1} + ${n2} = ?`;
    rEl.value = n1 + n2;
    if (aEl) aEl.value = '';
}

/**
 * 신청 제출 핸들러
 */
async function submitApplication(e) {
    e.preventDefault();
    const modal = getModalElement(currentModalId);
    if (!modal) return;

    // 1. Honeypot check
    const honeypot = modal.querySelector('#app-website-url');
    if (honeypot && honeypot.value) {
        console.warn('Spam detected.');
        return;
    }

    // 2. Math Challenge Verification
    const userAnsEl = modal.querySelector('#math-challenge-a');
    const realAnsEl = modal.querySelector('#math-challenge-real');

    if (userAnsEl && realAnsEl) {
        if (userAnsEl.value !== realAnsEl.value) {
            alert('자동입력 방지 정답이 틀렸습니다.');
            userAnsEl.focus();
            return;
        }
    }

    // 3. UI Loading
    const btn = modal.querySelector('#btn-app-submit');
    const originalBtnText = btn ? btn.textContent : '상담 신청하기';

    if (btn) {
        btn.disabled = true;
        btn.textContent = '처리 중...';
    }

    // 4. Collect Data (CRITICAL: Mapping to DB Columns)
    const form = e.target;
    // Use form.elements to safely get values from the CURRENT form, ignoring conflicting IDs elsewhere
    const typeVal = form.elements['product_type'].value;
    const nameVal = form.elements['product_name'].value;
    const detailsVal = form.elements['product_details'].value;

    let finalProductName = nameVal;
    if (detailsVal) finalProductName += ` (${detailsVal})`;

    const companyVal = form.elements['company'].value;
    const contactVal = form.elements['name'].value;
    const phoneVal = form.elements['phone'].value;
    const emailVal = form.elements['email'].value;
    const memoVal = form.elements['memo'].value;

    const data = {
        product_type: typeVal,
        product_name: finalProductName,
        company_name: companyVal,     // DB Column: company_name
        contact_person: contactVal,   // DB Column: contact_person
        phone: phoneVal,
        email: emailVal,
        memo: memoVal,
        status: 'pending',
        created_at: new Date().toISOString()
    };

    // Add product_details separately if DB supports it, or keep embedded in name. 
    // Correction: DB does NOT have 'product_details' column. 
    // It is already included in 'product_name' (e.g. "Server (specs)").
    // data.product_details = detailsVal; // REMOVED to fix schema error

    // Phone Validation
    if (data.phone && !/^01[0-9]-?[0-9]{3,4}-?[0-9]{4}$/.test(data.phone)) {
        alert('올바른 휴대폰 번호를 입력해주세요.');
        if (btn) {
            btn.disabled = false;
            btn.textContent = originalBtnText;
        }
        return;
    }

    try {
        // A. Supabase Save
        let refId = null;
        if (typeof supabase !== 'undefined') {
            const { data: inserted, error } = await supabase
                .from('applications')
                .insert([data])
                .select();

            if (error) {
                console.error('DB Error:', error);
                throw error; // Re-throw to handle in catch, or alert user
            } else if (inserted && inserted.length > 0) {
                refId = inserted[0].id;
            }
        } else {
            console.warn('Supabase not loaded.');
        }

        // B. Send Email
        const emailParams = {
            ...data,
            ref_id: refId || 'N/A'
        };
        await sendEmails(emailParams);

        // C. Show Success
        const successView = modal.querySelector('#app-success-view');
        if (successView) {
            showSuccessView(data.product_name, refId, modal);
        } else {
            alert('신청이 성공적으로 접수되었습니다.\n빠른 시일 내에 연락드리겠습니다.');
            closeAppModal();
        }

    } catch (err) {
        console.error('Submit Error:', err);
        alert('신청 접수 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.\n(내용: ' + err.message + ')');
    } finally {
        if (btn) {
            btn.disabled = false;
            btn.textContent = originalBtnText;
        }
    }
}

async function sendEmails(params) {
    if (typeof emailjs === 'undefined') return;

    const p1 = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_MANAGER, {
        ...params,
        subject: `[신규상담] ${params.company_name} - ${params.product_name}`
    });

    const p2 = emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID_CUSTOMER, {
        ...params,
        subject: `[HUMECCA] 상담 신청이 접수되었습니다.`
    });

    await Promise.allSettled([p1, p2]);
}

function showSuccessView(prodName, refId, modal) {
    if (!modal) modal = getModalElement(currentModalId);

    const form = modal.querySelector('#application-form');
    const successView = modal.querySelector('#app-success-view');

    if (form) form.style.display = 'none';
    if (successView) {
        successView.style.display = 'block';

        const nameEl = modal.querySelector('#success-product-name');
        const refEl = modal.querySelector('#success-ref-id');

        if (nameEl) nameEl.textContent = prodName;
        if (refEl) refEl.textContent = refId ? `REF-${refId}` : '접수 완료';

        // Animation Re-trigger
        const check = successView.querySelector('.fa-check');
        if (check) {
            check.style.animation = 'none';
            check.offsetHeight;
            check.style.animation = 'checkPop 0.5s cubic-bezier(0.175, 0.885, 0.32, 1.275) forwards';
        }
    }
}

// Global Exports
window.openAppModal = openAppModal;
window.closeAppModal = closeAppModal;
window.submitApplication = submitApplication;
window.getModalElement = getModalElement;

console.log('Application Modal Script Loaded (v2.1 - Corrected DB Schema)');
