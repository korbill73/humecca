/**
 * HUMECCA Cost Calculator Data
 * Defines categories, products, add-ons, and configuration logic.
 */

const CALCULATOR_DATA = {
    // 1. Categories (Top Level)
    categories: [
        { id: 'all', name: '전체 보기', icon: 'fas fa-th-large' },
        { id: 'server', name: '서버 호스팅', icon: 'fas fa-server' },
        { id: 'colocation', name: '코로케이션', icon: 'fas fa-building' },
        { id: 'management', name: '매니지먼트', icon: 'fas fa-tasks' }
    ],

    // 2. Products (Base Items)
    products: [
        {
            id: 'server_std',
            category: 'server',
            name: 'Standard Server',
            desc: '스타트업 및 중소규모 웹서비스에 적합',
            price: 70000,
            setup_fee: 50000,
            specs: { cpu: '4 Core', ram: '8GB', storage: 'SSD 250GB' },
            badge: 'BEST'
        },
        {
            id: 'server_pro',
            category: 'server',
            name: 'Pro Server',
            desc: '고트래픽 웹사이트 및 DB 서버용',
            price: 150000,
            setup_fee: 50000,
            specs: { cpu: '8 Core', ram: '16GB', storage: 'SSD 500GB' },
            badge: 'POPULAR'
        },
        {
            id: 'server_ent',
            category: 'server',
            name: 'Enterprise Server',
            desc: '대규모 엔터프라이즈 환경을 위한 고성능',
            price: 350000,
            setup_fee: 100000,
            specs: { cpu: '16 Core', ram: '32GB', storage: 'NVMe 1TB' },
            badge: 'PREMIUM'
        },
        {
            id: 'colo_half',
            category: 'colocation',
            name: 'Half Rack (20U)',
            desc: '합리적인 비용의 상면 임대',
            price: 450000,
            setup_fee: 200000,
            specs: { space: '20U', power: '2.2kW', network: '100Mbps' }
        },
        {
            id: 'colo_full',
            category: 'colocation',
            name: 'Full Rack (40U)',
            desc: '독립적인 전체 랙 사용',
            price: 850000,
            setup_fee: 300000,
            specs: { space: '40U', power: '4.4kW', network: '1Gbps Shared' }
        },
        {
            id: 'manage_basic',
            category: 'management',
            name: 'Basic Management',
            desc: '월 1회 정기점검 및 장애 알림',
            price: 50000,
            setup_fee: 0,
            specs: { support: '9R x 5D', report: 'Monthly' }
        }
    ],

    // 3. Add-ons (Customizable Options)
    addons: [
        {
            id: 'cpu',
            name: 'CPU 추가',
            type: 'counter', // +/- button
            unit: 'Core',
            price_per_unit: 15000,
            max: 32
        },
        {
            id: 'ram',
            name: 'Memory 추가',
            type: 'counter',
            unit: 'GB',
            price_per_unit: 8000, // 8GB = 64000
            step: 8, // 8GB steps
            max: 128
        },
        {
            id: 'hdd',
            name: 'HDD 추가',
            type: 'counter',
            unit: 'TB',
            price_per_unit: 30000,
            max: 10
        },
        {
            id: 'ssd',
            name: 'SSD 추가',
            type: 'counter',
            unit: 'GB',
            step: 250,
            price_per_unit: 40000, // per 250GB logic needs handling
            max: 2000
        },
        {
            id: 'network',
            name: '네트워크 대역폭 증설',
            type: 'select',
            options: [
                { value: '100m', label: '100 Mbps (기본)', price: 0 },
                { value: '1g_shared', label: '1 Gbps Shared', price: 50000 },
                { value: '1g_dedicated', label: '1 Gbps Dedicated', price: 300000 }
            ]
        },
        {
            id: 'security',
            name: '보안 서비스',
            type: 'checkbox', // Multiple selection
            items: [
                { value: 'fw', label: 'H/W 방화벽 임대', price: 50000 },
                { value: 'ips', label: 'IPS (침입방지시스템)', price: 80000 },
                { value: 'web_fw', label: 'WAF (웹방화벽)', price: 100000 }
            ]
        },
        {
            id: 'os',
            name: 'OS 라이선스',
            type: 'select',
            options: [
                { value: 'linux_free', label: 'Linux (CentOS/Ubuntu) - 무료', price: 0 },
                { value: 'win_std', label: 'Windows Server Standard', price: 35000 },
                { value: 'win_dc', label: 'Windows Server Datacenter', price: 250000 }
            ]
        }
    ],

    // 4. Discounts
    discounts: [
        { months: 12, rate: 0.05, label: '1년 약정 (5% 할인)' },
        { months: 24, rate: 0.10, label: '2년 약정 (10% 할인)' },
        { months: 36, rate: 0.15, label: '3년 약정 (15% 할인)' }
    ]
};
