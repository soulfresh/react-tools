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
 * @return {number}
 */
function toPercent(value) {
  if (value == null || value === '') return undefined;

  const v = Number(value);
  if (isNaN(v)) return undefined;
  else return v * 100;
}

function fromPercent(value) {
  return value / 100;
}

/**
 * @typedef {object} PercentProps
 * @property {string|number} value
 * @property {string|number} [defaultValue]
 * @property {string} [locale]
 * @property {function} [onValueChange]
 * @property {boolean} [input]
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
 * @type React.FC<PercentProps>
 */
export const Percent = React.forwardRef(({
  value,
  defaultValue,
  locale,
  onValueChange,
  ...rest
}, ref) => {
  const localeProps = React.useMemo(() => {
    const p = {
      locale,
      value: toPercent(value),
      defaultValue: toPercent(defaultValue),
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
      onValueChange({
        ...v,
        floatValue: coerced,
        value: String(coerced),
      });
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


