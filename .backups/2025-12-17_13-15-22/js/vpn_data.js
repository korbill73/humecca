/**
 * HUMECCA VPN 상품 데이터
 * 관리자 페이지에서 생성/수정 가능
 */

var vpnProducts = [
    {
        "id": "vpn-basic",
        "name": "베이직",
        "price": "200,000",
        "period": "월",
        "badge": "",
        "summary": "소규모 지사 연결에 최적화된 상품",
        "isActive": true,
        "popular": false,
        "sortOrder": 1,
        "specs": {
            "speed": "10Mbps",
            "sites": "3개 거점",
            "users": "20 사용자"
        },
        "features": [
            "10Mbps 보장 대역폭",
            "최대 3개 거점 연결",
            "동시 접속 20 사용자",
            "IPSec 기본 지원"
        ]
    },
    {
        "id": "vpn-standard",
        "name": "스탠다드",
        "price": "500,000",
        "period": "월",
        "badge": "BEST CHOICE",
        "summary": "중견기업을 위한 고성능 VPN",
        "isActive": true,
        "popular": true,
        "sortOrder": 2,
        "specs": {
            "speed": "100Mbps",
            "sites": "5개 거점",
            "users": "50 사용자"
        },
        "features": [
            "100Mbps 보장 대역폭",
            "최대 5개 거점 연결",
            "동시 접속 50 사용자",
            "IPSec/SSL VPN 지원"
        ]
    },
    {
        "id": "vpn-premium",
        "name": "프리미엄",
        "price": "1,000,000",
        "period": "월",
        "badge": "",
        "summary": "대규모 트래픽 처리를 위한 최상위 모델",
        "isActive": true,
        "popular": false,
        "sortOrder": 3,
        "specs": {
            "speed": "1Gbps",
            "sites": "10개 거점",
            "users": "무제한"
        },
        "features": [
            "1Gbps 보장 대역폭",
            "최대 10개 거점 연결",
            "무제한 사용자",
            "전담 엔지니어 기술지원"
        ]
    }
];

if (typeof localStorage !== 'undefined' && localStorage.getItem("vpnProducts")) {
    try {
        vpnProducts = JSON.parse(localStorage.getItem("vpnProducts"));
    } catch (e) {
        console.error("Local VPN data parsing error", e);
    }
}
