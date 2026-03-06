// API Configuration
const API_BASE_URL = process.env.NODE_ENV === 'production' 
    ? 'https://api.mythriftstore.com'
    : 'http://localhost:8000';

// Product categories
const CATEGORIES = {
    dresses: 'Dresses',
    tops: 'Tops',
    bottoms: 'Bottoms',
    outerwear: 'Outerwear',
    shoes: 'Shoes',
    accessories: 'Accessories'
};

// Size mappings
const SIZES = {
    xs: 'XS',
    s: 'S',
    m: 'M',
    l: 'L',
    xl: 'XL',
    xxl: '2XL'
};

// Shipping options
const SHIPPING_OPTIONS = [
    { id: 'standard', name: 'Standard Shipping', cost: 5.99, days: '5-7 business days' },
    { id: 'express', name: 'Express Shipping', cost: 12.99, days: '2-3 business days' },
    { id: 'overnight', name: 'Overnight Shipping', cost: 24.99, days: 'Next business day' }
];

// Tax rate
const TAX_RATE = 0.08; // 8%
