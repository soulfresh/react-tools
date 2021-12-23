import React from 'react';
import PropTypes from 'prop-types';

import {
  percentPrefixOrSuffix,
} from './number-util';

import { NumberDisplay } from './NumberDisplay.jsx';

/**
 * Convert a number or string representing a decimal value
 * into a percentage value.
 * @param {string|number} value
 * @param {number} precision
 * @return {number}
 */
function toPercent(value, precision) {
  if (value == null || value === '') return undefined;

  const v = Number(value);
  if (isNaN(v)) return undefined;
  else {
    if (precision > 0) {
      return (v / Math.pow(10, precision - 2));
    }
    else {
      return v * 100;
    }
  }
}

function fromPercent(value) {
  // This ignores the precision so we can always
  // output a float value for the percentage.
  return value / 100;
}

/**
 * @typedef {object} PercentProps
 * @property {string|number} value
 * @property {string|number} [defaultValue]
 * @property {string} [locale]
 * @property {function} [onValueChange]
 * @property {boolean} [input]
 * @property {number} [precision]
 * @property {*} [ref]
 */
/**
 * The `<Percent>` renders decimal number values as
 * a percentage. For example, give `0.9` it will output
 * `90%`. This component builds
 * off of the `NumberDisplay` component so accepts all
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
 * @type React.FC<PercentProps>
 */
export const Percent = React.forwardRef(({
  value,
  defaultValue,
  locale,
  onValueChange,
  precision,
  ...rest
}, ref) => {
  // Ensure we got a number for precision
  precision = parseInt(precision, 10);
  if (isNaN(precision)) precision = undefined;

  // Coerce the input values from floats to percentages.
  value = toPercent(value, precision);
  defaultValue = defaultValue != null ? toPercent(defaultValue, precision) : defaultValue;

  const localeProps = React.useMemo(() => {
    const p = {
      locale,
      value,
      defaultValue,
    };

    try {
      return {...p, ...percentPrefixOrSuffix(locale)};
    } catch (e) {
      // Does not support percent localization.
      return {...p, suffix: '%'};
    }
  }, [locale]); // eslint-disable-line react-hooks/exhaustive-deps

  const handleValueChange = (v) => {
    if (onValueChange) {
      // Coerce the value back into a decimal
      const coerced = fromPercent(v.floatValue);
      const values = {
        ...v,
        floatValue: coerced,
        value: String(coerced),
      };

      // If the precision prop is defined, create
      // a version of the value at that precision.
      if (!isNaN(precision) && precision > 0) {
        values.integer = Math.round(coerced * Math.pow(10, precision));
      }

      onValueChange(values);
    }
  }

  return (
    <NumberDisplay data-test="currencyNameInput"
      onValueChange={handleValueChange}
      {...localeProps}
      {...rest}
      ref={ref}
    />
  );
});

Percent.propTypes = {
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
   * This allows you to represent percentages as a fixed value integer.
   * For example, if you pass `precision={5} value={90000}`, then the input
   * will show "90%". If you pass `precision={5} value={90}, then the input
   * will show "0.009%". This is useful for avoiding rounding errors when
   * storing and working with float values. See: https://floating-point-gui.de/
   *
   * If the user types a value to more precision than is allowed, the value
   * will be rounded to the desired precision. You can prevent the user from typing
   * to a higher precision by passing the `decimalScale` prop from `react-number-format`.
   */
  precision: PropTypes.number,
  /**
   * A callback called with the current value
   * whenever it changes.
   * @param {object} values
   * @param {string} values.formattedValue - The value with locale formatting
   * @param {number} values.value - The value as a string in the range of 0 - 1
   * @param {number} values.floatValue - Will be in the range of 0 - 1
   * @param {number} values.integer - If using the `precision` prop, this
   *   will be the percentage value as an integer to the given precision.
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


