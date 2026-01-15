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
