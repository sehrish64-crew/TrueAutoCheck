export const PRICING_MAP: Record<string, { basic: number; standard: number; premium: number }> = {
  'USD': { basic: 40, standard: 60, premium: 80 },
  'EUR': { basic: 27.99, standard: 46.99, premium: 65.99 },
  'GBP': { basic: 24.99, standard: 41.99, premium: 58.99 },
  'AUD': { basic: 44.99, standard: 74.99, premium: 104.99 },
  'PLN': { basic: 119.99, standard: 199.99, premium: 279.99 },
  'SEK': { basic: 299.99, standard: 499.99, premium: 699.99 },
  'AED': { basic: 109.99, standard: 183.99, premium: 257.99 },
  'MDL': { basic: 539.99, standard: 899.99, premium: 1259.99 },
  'BAM': { basic: 54.99, standard: 91.99, premium: 128.99 },
  'RON': { basic: 139.99, standard: 233.99, premium: 327.99 },
  'DKK': { basic: 209.99, standard: 349.99, premium: 489.99 },
  'CHF': { basic: 27.99, standard: 46.99, premium: 65.99 },
  'CZK': { basic: 699.99, standard: 1166.99, premium: 1633.99 },
  'BGN': { basic: 54.99, standard: 91.99, premium: 128.99 },
  'HUF': { basic: 10999.99, standard: 18333.99, premium: 25666.99 },
  'UAH': { basic: 1199.99, standard: 1999.99, premium: 2799.99 },
}

export const CURRENCY_SYMBOLS: Record<string, string> = {
  'USD': '$',
  'EUR': '€',
  'GBP': '£',
  'AUD': 'A$',
  'PLN': 'zł',
  'SEK': 'kr',
  'AED': 'د.إ',
  'MDL': 'L',
  'BAM': 'KM',
  'RON': 'lei',
  'DKK': 'kr',
  'CHF': 'CHF',
  'CZK': 'Kč',
  'BGN': 'лв',
  'HUF': 'Ft',
  'UAH': '₴',
}

export function getPrice(packageId: 'basic' | 'standard' | 'premium', currency = 'USD') {
  const pricing = PRICING_MAP[currency] || PRICING_MAP['USD']
  return pricing[packageId]
}

// Map of external price/product IDs (e.g. Stripe price IDs) for specific packages.
// Add your provider-specific price ids here. The user provided `pri_01kg4gy97s9knjqxs7nw1t7dyy` for Basic.
export const EXTERNAL_PRICE_IDS: Record<string, string | undefined> = {
  basic: 'pri_01kg4gy97s9knjqxs7nw1t7dyy',
  standard: 'pri_01kg4hffc22yaemyz1yj5vkkjs',
  premium: 'pri_01kg4hge9f1nf3ec8qvyxkwg7j',
}

export function getExternalPriceId(packageId: 'basic' | 'standard' | 'premium') {
  return EXTERNAL_PRICE_IDS[packageId]
}

// Paddle product IDs (placeholders) — replace with real Paddle product IDs
export const PADDLE_PRODUCT_IDS: Record<string, number | undefined> = {
  basic: undefined, // product ids (pro_...) are stored in PADDLE_TEST_PRODUCT_IDS below
  standard: undefined,
  premium: undefined,
}


// Paddle price IDs from your sandbox account
export const PADDLE_PRICE_IDS: Record<'basic' | 'standard' | 'premium', string> = {
  // Use Paddle price IDs (pri_...) provided by the user
  basic: 'pri_01kg4gy97s9knjqxs7nw1t7dyy',
  standard: 'pri_01kg4hffc22yaemyz1yj5vkkjs',
  premium: 'pri_01kg4hge9f1nf3ec8qvyxkwg7j',
}

// Test fallback: if the above don't work, try these or create products in Paddle sandbox
export const PADDLE_TEST_PRICE_IDS: Record<'basic' | 'standard' | 'premium', string> = {
  // Fallback to product ids (pro_...) if needed
  basic: 'pro_01kg4gwwqwat23jbyfp1hqezc8',
  standard: 'pro_01kg4hewfsmt1p09898afbs1k2',
  premium: 'pro_01kg4hfxjt8b6gv1yx14xkxb9k',
}

// Paddle product IDs (pro_...)
export const PADDLE_TEST_PRODUCT_IDS: Record<'basic' | 'standard' | 'premium', string> = {
  basic: 'pro_01kg4gwwqwat23jbyfp1hqezc8',
  standard: 'pro_01kg4hewfsmt1p09898afbs1k2',
  premium: 'pro_01kg4hfxjt8b6gv1yx14xkxb9k',
}

// Unified package mapping for convenience
export const PACKAGES: Record<'basic' | 'standard' | 'premium', { priceId: string; productId: string }> = {
  basic: { priceId: PADDLE_PRICE_IDS.basic, productId: PADDLE_TEST_PRODUCT_IDS.basic },
  standard: { priceId: PADDLE_PRICE_IDS.standard, productId: PADDLE_TEST_PRODUCT_IDS.standard },
  premium: { priceId: PADDLE_PRICE_IDS.premium, productId: PADDLE_TEST_PRODUCT_IDS.premium },
}

export function getPaddlePriceId(packageId: 'basic' | 'standard' | 'premium') {
  // Prefer configured pri_ price IDs, fall back to our test/prod product ids if needed
  return PADDLE_PRICE_IDS[packageId] || PADDLE_TEST_PRICE_IDS[packageId]
}

export function getPaddleProductId(packageId: 'basic' | 'standard' | 'premium') {
  return PACKAGES[packageId]?.productId || PADDLE_TEST_PRODUCT_IDS[packageId]
}

export function getCurrencySymbol(currency = 'USD') {
  return CURRENCY_SYMBOLS[currency] || '$'
}

export function formatCurrency(amount: number, currency = 'USD', locale = 'en-US') {
  try {
    return new Intl.NumberFormat(locale, { style: 'currency', currency, maximumFractionDigits: 2 }).format(amount)
  } catch (e) {
    // Fallback to simple formatting
    const symbol = getCurrencySymbol(currency)
    return `${symbol} ${amount.toFixed(2)}`
  }
}
