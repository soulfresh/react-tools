import React from 'react';
import PropTypes from 'prop-types';

import {
  localeUnitName,
  supportsLocaleUnits,
  addUnitPrefixOrSuffix,
} from './number-util';

import { Unit } from './Unit.jsx';

/**
 * @typedef {object} UnitNameProps
 * @property {string} unit - The unit that this number
 *   is measured in as accepted by `Intl.NumberFormat`.
 * @property {string} [locale] - The locale to display
 *   the number in. Defaults to the browser locale.
 * @property {string|number} [value]
 * @property {string|number} [defaultValue]
 * @property {boolean} [input]
 * @property {function} [onValueChange]
 */
/**
 * The `<UnitName>` renders number values with a unit
 * using the long name of the unit. This component builds
 * off of the `Unit` component so accepts all
 * of the same props and can render either an input
 * element or a span.
 *
 * To get the number value from the input, you can use the
 * `onValueChange` callback. It will give you an object with
 * the number value, input string without formatting, and
 * the formatted/localized string the user sees. It will also
 * include an `info` property with the event that caused the
 * change and a reason for the change.
 *
 * @type React.FC<UnitNameProps>
 */
export const UnitName = React.forwardRef((props, ref) => {
  const { unit, locale, value, defaultValue, onValueChange } = props;
  const unitDisplay = 'long';
  const [supported] = React.useState(() => supportsLocaleUnits());
  const [symbol, setSymbol] = React.useState(() =>
    supported
      ? localeUnitName(
          value !== undefined
            ? Number(value)
            : defaultValue !== undefined
            ? Number(defaultValue)
            : 0,
          unit,
          locale
        )
      : null
  );

  const handleValueChange = (values) => {
    let symbolChanged = false;
    if (supported) {
      const newSymbol = localeUnitName(values.floatValue, unit, locale);
      if (symbol !== newSymbol) {
        symbolChanged = true;
        setSymbol(newSymbol);
      }
    }
    // If the symbol changed we will render again with the updated symbol
    // which will cause a second 'onValueChange' event, which in turn
    // will pass this conditional and emit the 'onValueChange'
    if (onValueChange && !symbolChanged) {
      onValueChange(values);
    }
  };

  const localeProps = {
    ...props,
    unitDisplay,
  };

  if (supported) {
    localeProps.onValueChange = handleValueChange;

    // TODO Reduce how often locale props are determined.
    addUnitPrefixOrSuffix(localeProps, unit, symbol, locale, unitDisplay);
  }

  return (
    <Unit {...localeProps} ref={ref} />
  );
});

UnitName.propTypes = {
  /**
   * The name of the unit this number represents. See the `unit`
   * property from `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  unit: PropTypes.string.isRequired,
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
   * `react-number-format` or `input` element.
   * See https://www.npmjs.com/package/react-number-format
   */
  'other props...': PropTypes.any,
};


