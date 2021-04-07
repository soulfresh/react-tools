import React from 'react';
import PropTypes from 'prop-types';

import {
  localeCurrencySymbol,
  localeCurrencyName,
  addCurrencyPrefixOrSuffix,
} from './number-util';

import { NumberDisplay } from './NumberDisplay.jsx';

// TODO Handle negative number formatting.
// The negative sign can be either prefixed
// or suffixed. With some currencies, the negative
// sign can appear before or after the currency
// symbol.
/**
 * The `<Currency>` displays a currency value with
 * its currency symbol and formatted in the browser locale
 * as the user types. If no currency is specified it
 * assumes you intend to use 'USD'.
 *
 * See the `NumberDisplay` component (which this component
 * uses under the hood) for more details.
 */
export function Currency({
  currency,
  currencyDisplay,
  locale,
  ...rest
}) {
  const [localeProps] = React.useState(() => {
    const p = {
      locale,
      decimalScale: 2,
    };

    let symbol;
    switch (currencyDisplay) {
      case 'code':
        symbol = currency;
        break;
      case 'name':
        // Just use the plural version here since there is a specialized
        // input that handles pluralization.
        symbol = localeCurrencyName(11, currency, locale);
        break;
      default:
        symbol = localeCurrencySymbol(currency, locale);
        break;
    }

    return addCurrencyPrefixOrSuffix(p, symbol, locale, currencyDisplay);
  });

  return (
    <NumberDisplay data-test="currencyNameInput"
      {...localeProps}
      {...rest}
    />
  );
}

Currency.propTypes = {
  /**
   * The currency code for the currency being displayed.
   * Defaults to 'USD'. See https://www.currency-iso.org/en/home/tables/table-a1.html
   */
  currency: PropTypes.string,
  /**
   * The currency display format to use.
   * See `currencyDisplay` property of `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  currencyDisplay: PropTypes.string,
  /**
   * The locale to use when formatting the currency.
   * This defaults to the user's locale or "en-US" if
   * that can't be determined.
   * See the `locale` property of `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  locale: PropTypes.string,
  /**
   * The current value of the input.
   */
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * A default value to use if the value is empty.
   * This value will be set when the input is initialized
   * and will be emitted on blur. The input is treated as
   * a controlled component so you will need to update
   * it's value on blur if you want to set the input value
   * to the default value.
   */
  defaultValue: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  /**
   * A callback called with the current value
   * whenever it changes.
   * @param {object} values
   * @param {string} values.formattedValue
   * @param {number} values.value
   * @param {number} values.floatValue
   */
  onValueChange: PropTypes.func,
  /**
   * Render an `<input>` instead of a span. This formats
   * the input value as the user types.
   */
  input: PropTypes.bool,
  /**
   * Any other props will be passed along to the underlying
   * `NumberDisplay` or
   * `react-number-format` or `input` element.
   * See https://www.npmjs.com/package/react-number-format
   */
  'other props...': PropTypes.any,
};

Currency.defaultProps = {
  currency: 'USD',
  currencyDisplay: 'symbol',
}

