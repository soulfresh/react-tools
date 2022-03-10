import React from 'react';
import PropTypes from 'prop-types';

import {
  localeCurrencySymbol,
  localeCurrencyName,
  addCurrencyPrefixOrSuffix,
} from './number-util';

import { NumberDisplay } from './NumberDisplay.jsx';

const toPennies = v => {
  v = Number(v);
  if (isNaN(v)) return undefined;
  else {
    return v * 100;
  }
};

const fromPennies = v => {
  v = Number(v)
  if (isNaN(v)) return undefined;
  else {
    return v / 100;
  }
};

// TODO Handle negative number formatting.
// The negative sign can be either prefixed
// or suffixed. With some currencies, the negative
// sign can appear before or after the currency
// symbol.

/**
 * @typedef {object} CurrencyProps
 * @property {string} [currency]
 * @property {string} [currencyDisplay]
 * @property {string} [locale]
 * @property {string|number} [value]
 * @property {string|number} [defaultValue]
 * @property {boolean} [pennies]
 * @property {function} [onValueChange]
 * @property {boolean} [allowNegative]
 * @property {boolean} [input]
 * @property {number} [decimalScale]
 * @property {*} [ref]
 */
/**
 * The `<Currency>` displays a currency value with
 * its currency symbol and formatted in the browser locale
 * as the user types. If no currency is specified it
 * assumes you intend to use 'USD'.
 *
 * To get the number value from the input, you can use the
 * `onValueChange` callback. It will give you an object with
 * the number value, input string without formatting, and
 * the formatted/localized string the user sees. It will also
 * include an `info` property with the event that caused the
 * change and a reason for the change.
 *
 * See the `NumberDisplay` component (which this component
 * uses under the hood) for more details.
 *
 * @type React.FC<CurrencyProps>
 */
export const Currency = React.forwardRef(({
  currency = 'USD',
  currencyDisplay = 'symbol',
  value,
  defaultValue,
  pennies,
  locale,
  onValueChange,
  ...rest
}, ref) => {
  value = pennies && value != null ? fromPennies(value) : value;
  defaultValue = pennies && defaultValue != null ? fromPennies(defaultValue) : defaultValue;

  const localeProps = React.useMemo(() => {
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
  }, [currency, currencyDisplay, locale]);

  const handleValueChange = values => {
    if (onValueChange) {
      const float = values.floatValue != null ? Number(values.floatValue) : values.floatValue;
      values = {
        ...values,
        floatValue: float,
        pennies: isNaN(float)
          ? undefined
          : float == null
          ? float
          : toPennies(float)
      };

      onValueChange(values);
    }
  }

  return (
    <NumberDisplay data-test="currencyNameInput"
      value={value}
      defaultValue={defaultValue}
      onValueChange={handleValueChange}
      {...localeProps}
      {...rest}
      ref={ref}
    />
  );
});

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
   * Allows you to specify the value in pennies. This is useful
   * for avoiding [floating point errors](https://floating-point-gui.de/).
   * When `pennies` is true, the value `prop` is expected to be in
   * pennies and will be coerced into a dollar value. Additionally,
   * you can use the `pennies` property from the `onValueChange` to
   * store the currency as pennies as the user types.
   *
   * If the user types in fractional pennies, then you will recieve
   * fractional pennies in the `onValueChange` event. You can prevent
   * users from entering fractional pennies by setting `decimalScale={2}`
   * (see `react-number-format` for more information).
   */
  pennies: PropTypes.bool,
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
   * @param {object} values.info
   * @param {string} values.info.source
   * @param {object} values.info.event
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

