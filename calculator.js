/**
 * HUMECCA Calculator Logic
 * Handles rendering, state management, and real-time calculation.
 */

// State
let calcState = {
    selectedProductId: null,
    addons: {}, // { cpu: 2, ram: 16 (GB), ... }
    termMonths: 1
};

// Intialize
document.addEventListener('DOMContentLoaded', () => {
    initCalculator();
});

function initCalculator() {
    renderProducts('server'); // Default category
    renderAddons();
    renderTerms();
    updateQuoteUI();
}

// 1. Rendering
function renderProducts(category) {
    const list = document.getElementById('product-list');
    list.innerHTML = '';

    // Update tabs visual
    document.querySelectorAll('.tab').forEach(t => t.classList.remove('active'));
    // Simple check match text (fragile but works for now or use dataset)
    // Actually simpler to filter data

    const filtered = CALCULATOR_DATA.products.filter(p => p.category === category);

    filtered.forEach(p => {
        const div = document.createElement('div');
        div.className = `calc-card ${calcState.selectedProductId === p.id ? 'active' : ''}`;
        div.onclick = () => selectProduct(p.id);

        div.innerHTML = `
            ${p.badge ? `<span class="card-badge">${p.badge}</span>` : ''}
            <h3>${p.name}</h3>
            <p>${p.desc}</p>
            <div style="font-size:0.9rem; margin-bottom:10px;">
                ${Object.entries(p.specs).map(([k, v]) => `<span>• ${v}</span>`).join('<br>')}
            </div>
            <div class="price">₩ ${p.price.toLocaleString()} /월</div>
        `;
        list.appendChild(div);
    });
}

function filterCategory(cat) {
    // Update active tab styles manually
    const tabs = document.querySelectorAll('#step-1 .tab');
    tabs.forEach(t => {
        if (t.innerText.includes('서버') && cat === 'server') t.classList.add('active');
        else if (t.innerText.includes('코로케이션') && cat === 'colocation') t.classList.add('active');
        else if (t.innerText.includes('매니지먼트') && cat === 'management') t.classList.add('active');
        else t.classList.remove('active');
    });

    renderProducts(cat);
}

function renderAddons() {
    const specContainer = document.getElementById('addon-list-specs');
    const servContainer = document.getElementById('addon-list-services');

    specContainer.innerHTML = '';
    servContainer.innerHTML = '';

    CALCULATOR_DATA.addons.forEach(addon => {
        const div = document.createElement('div');
        div.className = 'addon-row';

        // Render based on type
        if (addon.type === 'counter') {
            const currentVal = calcState.addons[addon.id] || 0;
            div.innerHTML = `
                <div>
                    <div style="font-weight:600; font-size:1.05rem;">${addon.name}</div>
                    <div style="font-size:0.85rem; color:#94a3b8;">+ ₩${addon.price_per_unit.toLocaleString()} / ${addon.unit}</div>
                </div>
                <div class="addon-control">
                    <button class="btn-control" onclick="updateAddon('${addon.id}', -${addon.step || 1})"><i class="fas fa-minus"></i></button>
                    <span style="font-weight:700; width:30px; text-align:center;">${currentVal}</span>
                    <button class="btn-control" onclick="updateAddon('${addon.id}', ${addon.step || 1})"><i class="fas fa-plus"></i></button>
                </div>
            `;
            specContainer.appendChild(div); // Spec addons go to Step 2
        }
        else if (addon.type === 'select') {
            const currentVal = calcState.addons[addon.id] || addon.options[0].value;
            div.innerHTML = `
                 <div>
                    <div style="font-weight:600; font-size:1.05rem;">${addon.name}</div>
                </div>
                <div class="addon-control">
                    <select onchange="updateAddon('${addon.id}', this.value)" style="padding:8px; border-radius:8px; border:1px solid #334155; bg: #1e293b; color:#333;">
                        ${addon.options.map(opt => `<option value="${opt.value}" ${currentVal === opt.value ? 'selected' : ''}>${opt.label} (+${opt.price.toLocaleString()})</option>`).join('')}
                    </select>
                </div>
            `;
            servContainer.appendChild(div); // Service addons go to Step 3
        }
        else if (addon.type === 'checkbox') {
            // Group checkboxes
            div.style.flexDirection = 'column';
            div.style.alignItems = 'flex-start';
            div.innerHTML = `
                <div style="font-weight:600; font-size:1.05rem; margin-bottom:10px;">${addon.name}</div>
                <div style="display:flex; flex-direction:column; gap:8px; width:100%;">
                    ${addon.items.map(item => `
                        <label style="display:flex; justify-content:space-between; cursor:pointer;">
                            <span><input type="checkbox" onchange="toggleAddon('${addon.id}', '${item.value}')" ${(calcState.addons[addon.id] || []).includes(item.value) ? 'checked' : ''}> ${item.label}</span>
                            <span>+ ₩${item.price.toLocaleString()}</span>
                        </label>
                    `).join('')}
                </div>
             `;
            servContainer.appendChild(div);
        }
    });
}

function renderTerms() {
    const container = document.getElementById('term-list');
    container.innerHTML = '';

    // No Discount Option
    const oneMonth = document.createElement('div');
    oneMonth.className = `calc-card ${calcState.termMonths === 1 ? 'active' : ''}`;
    oneMonth.onclick = () => selectTerm(1);
    oneMonth.innerHTML = `<h3>무약정 (1개월)</h3><p>할인 혜택 없음</p><div class="price">표준 요금</div>`;
    container.appendChild(oneMonth);

    CALCULATOR_DATA.discounts.forEach(d => {
        const div = document.createElement('div');
        div.className = `calc-card ${calcState.termMonths === d.months ? 'active' : ''}`;
        div.onclick = () => selectTerm(d.months);
        div.innerHTML = `
            <span class="card-badge">${(d.rate * 100).toFixed(0)}% 할인</span>
            <h3>${d.months}개월 약정</h3>
            <p>${d.label}</p>
            <div class="price" style="color:#10b981;">할인 적용</div>
        `;
        container.appendChild(div);
    });
}

// 2. Logic Updates
function selectProduct(id) {
    calcState.selectedProductId = id;
    renderProducts(CALCULATOR_DATA.products.find(p => p.id === id).category); // Re-render to highlight
    updateQuoteUI();

    // Auto advance if on mobile or just helpful
    // setStep(2);
}

function updateAddon(id, value) {
    const addonData = CALCULATOR_DATA.addons.find(a => a.id === id);

    if (addonData.type === 'counter') {
        let current = calcState.addons[id] || 0;
        let next = current + value;
        if (next < 0) next = 0;
        if (addonData.max && next > addonData.max) next = addonData.max;
        calcState.addons[id] = next;
    } else {
        // Select
        calcState.addons[id] = value;
    }

    renderAddons();
    updateQuoteUI();
}

function toggleAddon(groupId, value) {
    if (!calcState.addons[groupId]) calcState.addons[groupId] = [];
    const list = calcState.addons[groupId];

    if (list.includes(value)) {
        calcState.addons[groupId] = list.filter(v => v !== value);
    } else {
        list.push(value);
        calcState.addons[groupId] = list;
    }
    updateQuoteUI();
}

function selectTerm(months) {
    calcState.termMonths = months;
    renderTerms();
    updateQuoteUI();
}

function setStep(step) {
    // Hide all
    document.querySelectorAll('.calc-step-content').forEach(el => el.style.display = 'none');
    document.querySelectorAll('.calc-step-btn').forEach(el => el.classList.remove('active'));

    // Show target
    document.getElementById(`step-${step}`).style.display = 'block';
    document.querySelectorAll('.calc-step-btn')[step - 1].classList.add('active');
}

function resetCalculator() {
    calcState = {
        selectedProductId: null,
        addons: {},
        termMonths: 1
    };
    initCalculator();
    setStep(1);
    updateQuoteUI();
}

// 3. Calculation & Quote UI
function updateQuoteUI() {
    const container = document.getElementById('quote-items');
    container.innerHTML = '';

    let totalSetup = 0;
    let totalMonthly = 0;

    // 1. Base Product
    if (calcState.selectedProductId) {
        const p = CALCULATOR_DATA.products.find(x => x.id === calcState.selectedProductId);
        totalSetup += p.setup_fee;
        totalMonthly += p.price;

        container.innerHTML += `
            <div class="quote-item" style="font-weight:700;">
                <span>${p.name}</span>
                <span>₩${p.price.toLocaleString()}</span>
            </div>
        `;
    } else {
        container.innerHTML = '<div style="text-align:center; padding:20px; color:#94a3b8;">상품을 선택해주세요.</div>';
        resetTotals();
        return;
    }

    // 2. Add-ons
    CALCULATOR_DATA.addons.forEach(addon => {
        if (!calcState.addons[addon.id]) return;

        if (addon.type === 'counter') {
            const count = calcState.addons[addon.id];
            if (count > 0) {
                // If it's a step based unit (like RAM 8GB), we need to calculate units
                // Logic: count is the value (e.g. 16GB). Need to divide by step? 
                // In rendering, we added by 'step'. So count is exact value.
                // Re-read data logic: price_per_unit means per 1 unit or per step?
                // Usually price per 1GB or price per 8GB stick. 
                // Assuming price_per_unit is for 'step' size if step exists, or unit size?
                // Let's assume price is per `step` quantity.
                // If step is 8, and value is 16, that is 2 units.

                let units = count;
                if (addon.step && addon.step > 1) {
                    units = count / addon.step;
                }

                const cost = units * addon.price_per_unit;
                totalMonthly += cost;

                container.innerHTML += `
                    <div class="quote-item">
                        <span>${addon.name} (+${count}${addon.unit})</span>
                        <span>₩${cost.toLocaleString()}</span>
                    </div>
                `;
            }
        } else if (addon.type === 'select') {
            const val = calcState.addons[addon.id];
            const opt = addon.options.find(o => o.value === val);
            if (opt && opt.price > 0) {
                totalMonthly += opt.price;
                container.innerHTML += `
                    <div class="quote-item">
                        <span>${addon.name}: ${opt.label}</span>
                        <span>₩${opt.price.toLocaleString()}</span>
                    </div>
                `;
            }
        } else if (addon.type === 'checkbox') {
            const selected = calcState.addons[addon.id]; // Array
            selected.forEach(val => {
                const item = addon.items.find(i => i.value === val);
                if (item) {
                    totalMonthly += item.price;
                    container.innerHTML += `
                        <div class="quote-item">
                            <span>${addon.name}: ${item.label}</span>
                            <span>₩${item.price.toLocaleString()}</span>
                        </div>
                    `;
                }
            });
        }
    });

    // Subtotals
    document.getElementById('total-setup').innerText = `₩${totalSetup.toLocaleString()}`;
    document.getElementById('total-monthly').innerText = `₩${totalMonthly.toLocaleString()}`;

    // Discount
    let discountRate = 0;
    const discountObj = CALCULATOR_DATA.discounts.find(d => d.months === calcState.termMonths);
    if (discountObj) discountRate = discountObj.rate;

    const discountAmt = Math.floor(totalMonthly * discountRate);
    const finalMonthly = totalMonthly - discountAmt;

    document.getElementById('total-discount').innerText = `-${discountAmt.toLocaleString()}원`;
    document.getElementById('total-final').innerText = `₩${finalMonthly.toLocaleString()}`;
}

function resetTotals() {
    document.getElementById('total-setup').innerText = '0원';
    document.getElementById('total-monthly').innerText = '0원';
    document.getElementById('total-discount').innerText = '-0원';
    document.getElementById('total-final').innerText = '0원';
}
