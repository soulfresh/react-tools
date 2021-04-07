import React from 'react';
import PropTypes from 'prop-types';

import {
  localeCurrencyName,
  addCurrencyPrefixOrSuffix,
} from './number-util';

import { Currency } from './Currency.jsx';

/**
 * The `<CurrencyName>` displays a currency value
 * using the currency code instead of the currency symbol.
 * For example, "5,000 USD" rather than "$5,000".
 *
 * This component builds off of `<Currency>` but specifically
 * sets the `currencyDisplay` prop to "name".
 */
export function CurrencyName(props) {
  const { currency, locale, onValueChange } = props;
  const currencyDisplay = 'name';
  const [symbol, setSymbol] = React.useState(() => localeCurrencyName(1, currency, locale));

  const handleValueChange = (values) => {
    setSymbol(
      localeCurrencyName(values.floatValue, currency, locale)
    );

    if (onValueChange) onValueChange(values);
  };

  const localeProps = {
    ...props,
    currencyDisplay,
    onValueChange: handleValueChange,
  };

  addCurrencyPrefixOrSuffix(localeProps, symbol, locale, currencyDisplay);

  return <Currency {...localeProps} />
}

CurrencyName.propTypes = {
  /**
   * The currency code for the currency being displayed.
   * Defaults to 'USD'. See https://www.currency-iso.org/en/home/tables/table-a1.html
   */
  currency: PropTypes.string,
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

CurrencyName.defaultProps = {
  currency: 'USD',
};

