/**
 * Determine the user locale or fallback to "en-US"
 * if the browser locale cannot be determined.
 * @return {string}
 */
export function userLocale() {
  return navigator.userLanguage || navigator.language || 'en-US';
}

/**
 * Convert an integer representing 100ths of a unit
 * into that unit.
 * For example:
 *   11122 -> 111.22
 *   null -> 0
 *
 * @param {number} pennies
 * @return {number}
 */
export function fromHundredths(pennies) {
  return pennies ? pennies / 100 : 0;
}

/**
 * Convert a fractional unit into an integer representing
 * 100ths of that unit.
 * For example:
 *   111.22 -> 11122
 *   null -> 0
 *
 * @param {number} dollars
 * @return {number}
 */
export function toHundredths(dollars) {
  return dollars ? Math.round(dollars * 100) : 0;
}

/**
 * Translate an integer from English into the matching
 * character in the language specified by the locale.
 * If no locale is passed, then the browser locale is used.
 * The returned number will have no formatting.
 *
 * @private
 * @param {number} number - An integer integer to translate into
 *   the given language. Fractions will be removed.
 * @param {string} [locale] - A specific locale to use or the browser locale.
 * @return {number}
 */
export function translateInteger(number, locale = userLocale()) {
  const f = new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  return f.format(number);
}

/**
 * Determine the character used to group large numbers
 * in the locale specified (or the browser locale
 * if none is passed).
 * @param {string} [locale]
 * @return {string}
 */
export function localeThousandsSeparator(locale = userLocale()) {
  const f = new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const value = 111111;
  // TODO Can I always assume that I can translate '1' and replace
  // that translation inside the formatted version of '11111'?
  // For example, what if `f.format(11111)` returned "one thousand..."?
  const num = translateInteger(1, locale);
  return f.format(value).replace(new RegExp(num, 'g'), '').trim()[0];
}

/**
 * Determine the style of grouping used for large numbers
 * in the locale specified (or the browser locale
 * if none is passed).
 *
 * @param {string} [locale]
 * @return {string} One of 'thousand', 'lahk', 'wan'
 */
export function localeThousandsGroupStyle(locale = userLocale()) {
  const f = new Intl.NumberFormat(locale, {
    useGrouping: true,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const value = 111111;
  const separator = localeThousandsSeparator(locale);
  const index = f.format(value).indexOf(separator);
  return index === 1
    ? 'lakh'
    : index === 2
    // Not sure that Ecmascript supports wan style groupings.
    ? 'wan'
    : 'thousand';
}

/**
 * Determine the character used to signify fractions
 * in the locale specified (or the browser locale
 * if none is passed).
 * @param {string} [locale]
 * @return {string}
 */
export function localeDecimalSeparator(locale = userLocale()) {
  const f = new Intl.NumberFormat(locale, {
    useGrouping: false,
    minimumFractionDigits: 2,
  });
  const value = 1.11;
  // TODO Can I always assume that I can translate '1' and replace
  // that translation inside the formatted version of '11111'?
  // For example, what if `f.format(11111)` returned "one thousand..."?
  const num = translateInteger(1, locale);
  return f.format(value).replace(new RegExp(num, 'g'), '').trim()[0];
}

function determineLocaleCurrencySymbol(
  value,
  currency,
  locale = userLocale(),
  currencyDisplay = 'symbol'
) {
  const f = new Intl.NumberFormat(locale || undefined, {
    style: 'currency',
    currency,
    currencyDisplay,
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const num = translateInteger(value, locale);
  return f.format(value).replace(new RegExp(num, 'g'), '').trim();
}

/**
 * Determine the symbol used for a currency code
 * in the locale specified (or the browser locale
 * if none is passed). For example, what character is
 * used for "USD" in Chinese.
 * @param {string} [currency] - The symbol to translate (ex. 'USD', 'GBP').
 * @param {string} [locale]
 * @return {string}
 */
export function localeCurrencySymbol(currency, locale = userLocale()) {
  return determineLocaleCurrencySymbol(1, currency, locale, 'symbol');
}

/**
 * Determine the full name used for a currency code and value,
 * in the locale specified (or the browser locale
 * if none is passed). For example, how do you translate
 * "USD" into Chinese?
 * @param {number} value
 * @param {string} currency - The currency to translate (ex. 'USD')
 * @param {string} [locale]
 * @return {string}
 */
export function localeCurrencyName(value, currency, locale = userLocale()) {
  return determineLocaleCurrencySymbol(value, currency, locale, 'name');
}

/**
 * Determine if a currency symbol/name should be prefixed
 * in the locale specified (or the browser locale
 * if none is passed). For example, in the Germany the
 * currency symbol is suffixed so this function would return
 * false.
 * @param {string} [local]
 * @param {string} [currencyDisplay] - One of the `currencyDisplay`
 *   formats that can be accepted by `Intl.NumberFormat`.
 * @return {boolean}
 */
export function localeCurrencyIsPrefixed(
  locale = userLocale(),
  currencyDisplay = 'symbol'
) {
  const f = new Intl.NumberFormat(locale || undefined, {
    style: 'currency',
    currency: 'USD',
    currencyDisplay,
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const value = 1;
  const num = translateInteger(value, locale);

  return f.format(1).indexOf(num) > 0;
}

function determineLocaleUnitSymbol(value, unit, locale = userLocale(), unitDisplay = 'short') {
  const f = new Intl.NumberFormat(locale || undefined, {
    style: 'unit',
    unit,
    unitDisplay,
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const num = translateInteger(value, locale);
  return f.format(value).replace(new RegExp(num, 'g'), '').trim();
}

/**
 * Determine if the browser supports translating units
 * like feet, inches, etc.
 * @return {boolean}
 */
export function supportsLocaleUnits() {
  try {
    determineLocaleUnitSymbol(1, 'inch');
    return true;
  } catch (e) {
    return false;
  }
}

/**
 * Determine the symbol for the given unit
 * in the locale specified (or the browser locale
 * if none is passed). For example, for the unit "inch" and
 * locale `en-US`, the result is "in" but in `de-DE` it is "Zoll".
 * @param {string} unit - One of the units accepted by `Intl.NumberFormat`.
 * @param {string} [locale]
 * @param {string} [unitDisplay] - One of the `unitDisplay` values accepted
 *   by `Intl.NumberFormat`
 * @return {string}
 */
export function localeUnitSymbol(unit, locale, unitDisplay) {
  return determineLocaleUnitSymbol(1, unit, locale, unitDisplay);
}

/**
 * Determine the full name for the given unit
 * in the locale specified (or the browser locale
 * if none is passed).
 * @param {number} value - The value to use when translating.
 * @param {string} unit - The unit to translate.
 * @param {string} [locale]
 * @return {string}
 */
export function localeUnitName(value, unit, locale) {
  return determineLocaleUnitSymbol(value, unit, locale, 'long');
}

/**
 * Determine the unit symbol/name should be prefixed
 * in the locale specified (or the browser locale
 * if none is passed).
 * @param {string} unit - One of the units accepted by `Intl.NumberFormat`
 * @param {string} [locale]
 * @param {string} [unitDisplay] - One of the `unitDisplay` values accepted
 *   by `Intl.NumberFormat`
 * @return {boolean}
 */
export function localeUnitIsPrefixed(unit, locale = userLocale(), unitDisplay = 'short') {
  const f = new Intl.NumberFormat(locale || undefined, {
    style: 'unit',
    unit,
    unitDisplay,
    useGrouping: false,
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });
  const value = 1;
  const num = translateInteger(value, locale);

  return f.format(1).indexOf(num) > 0;
}

/**
 * @private
 * Format the given currency symbol with padding based on
 * whether it is prefixed or suffixed.
 * @param {string} symbol
 * @param {boolean} [prefixed] - Whether the symbol will be
 *   prefixed or suffixed to the number.
 * @param {string} [locale]
 * @param {string} [display] - A display value as accepted by
 *   `Intl.NumberFormat`
 * @return {string}
 */
export function formatSymbol(symbol, prefixed, locale, display) {
  if (prefixed) {
    if (display === 'code') {
      return `${symbol} `;
    } else {
      return symbol;
    }
  } else {
    if (display === 'narrow') {
      return symbol;
    } else {
      return ` ${symbol}`;
    }
  }
}

/**
 * @private
 * Add a currency symbol to the given `NumberDisplay` props either
 * prefixed or suffixed based on the browser locale.
 * @param {object} target - The `NumberDisplay` props to which you wish to
 *   add either a `prefix` or `suffix` prop.
 * @param {string} symbol - The symbol to add to the number.
 * @param {string} [locale]
 * @param {string} [currencyDisplay] - One of the `currencyDisplay`
 *   formats that can be accepted by `Intl.NumberFormat`.
 * @return {string}
 */
export function addCurrencyPrefixOrSuffix(target, symbol, locale, currencyDisplay) {
  if (localeCurrencyIsPrefixed(locale, currencyDisplay)){
    target.prefix = formatSymbol(symbol, true, locale, currencyDisplay);
    // Ensure only one or the other is set.
    delete target.suffix;
  } else {
    target.suffix = formatSymbol(symbol, false, locale, currencyDisplay);
    // Ensure only one or the other is set.
    delete target.prefix;
  }

  return target;
}

/**
 * @private
 * Prefix or suffix a number with the given unit symbol.
 * @param {object} target - The props object to modify
 * @param {string} unit - The unit name to add to the number.
 * @param {string} symbol - The symbol for the unit to add to the number.
 * @param {string} [locale]
 * @param {string} [currencyDisplay] - One of the `currencyDisplay`
 *   formats that can be accepted by `Intl.NumberFormat`.
 * @return {string}
 */
export function addUnitPrefixOrSuffix(target, unit, symbol, locale, unitDisplay) {
  if (localeUnitIsPrefixed(unit, locale, unitDisplay)){
    target.prefix = formatSymbol(symbol, true, locale, unitDisplay);
    // Ensure only one or the other is set.
    delete target.suffix;
  } else {
    target.suffix = formatSymbol(symbol, false, locale, unitDisplay);
    // Ensure only one or the other is set.
    delete target.prefix;
  }

  return target;
}

