export const COUPON_CODES = {
    AprilFsale: 'AprilFsale',
    BlackFriday: 'BlackFriday',
    Christmas: 'Christmas',
    CyberMonday: 'CyberMonday',
    Easter: 'Easter',
    Halloween: 'Halloween',
    NewYear: 'NewYear',
    Thanksgiving: 'Thanksgiving',
    Valentines: 'Valentines',
} as const;

export type CouponCode = keyof typeof COUPON_CODES;