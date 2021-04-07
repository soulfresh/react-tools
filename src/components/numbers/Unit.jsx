import React from 'react';
import PropTypes from 'prop-types';

import {
  localeUnitSymbol,
  localeUnitName,
  addUnitPrefixOrSuffix,
} from './number-util';

import { NumberDisplay } from './NumberDisplay.jsx';

/**
 * The `<Unit>` renders number values with a unit
 * such as "inches", "miles-per-hour", etc. It builds
 * off of the `NumberDisplay` component so accepts all
 * of the same props and can render either an input
 * element or a span.
 *
 * @param {object} props
 * @param {string} props.unit - The unit that this number
 *   is measured in as accepted by `Intl.NumberFormat`.
 * @param {string} [props.unitDisplay] - A `unitDisplay`
 *   value as accepted by `Intl.NumberFormat`.
 * @param {string} [props.locale] - The locale to display
 *   the number in. Defaults to the browser locale.
 */
export function Unit({
  unit,
  unitDisplay,
  locale,
  ...rest
}) {
  const [localeProps] = React.useState(() => {
    const p = {
      locale,
    };

    try {
      let symbol;
      switch (unitDisplay) {
        case 'long':
          // Just use the plural version here since there is a specialized
          // input that handles pluralization.
          symbol = localeUnitName(11, unit, locale);
          break;
        default:
          symbol = localeUnitSymbol(unit, locale, unitDisplay);
          break;
      }

      return addUnitPrefixOrSuffix(p, unit, symbol, locale, unitDisplay);
    } catch (e) {
      // Does not support unit localization.
      return p;
    }
  });

  return (
    <NumberDisplay data-test="currencyNameInput"
      {...localeProps}
      {...rest}
    />
  );
}

Unit.propTypes = {
  /**
   * The name of the unit this number represents. See the `unit`
   * property from `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  unit: PropTypes.string.isRequired,
  /**
   * How to format the unit name. See `unitDisplay`
   * property of `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  unitDisplay: PropTypes.string,
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
   * `react-number-format` or `input` element.
   * See https://www.npmjs.com/package/react-number-format
   */
  'other props...': PropTypes.any,
};


