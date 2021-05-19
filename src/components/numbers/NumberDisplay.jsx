import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {
  localeThousandsSeparator,
  localeThousandsGroupStyle,
  localeDecimalSeparator,
} from './number-util';


/**
 * @typedef {object} NumberDisplayProps
 * @property {string|number} [value] - The current value of
 *   the input.
 * @property {string|number} [defaultValue] - A default value
 *   to set as the input value if the input is left empty.
 * @property {string} [locale]
 * @property {boolean} [input]
 * @property {function} [onBlur]
 * @property {function} [onValueChange]
 */
/**
 * The `<NumberDisplay>` component renders numbers formatted
 * in the user's locale. It can render either a `<span>` or
 * an `<input>` which maintains the locale number formatting
 * as the user types. This makes it easier to read long
 * numbers by adding thousands separators based
 * on the formatting rules of the user's locale. You can also
 * specify a locale if you need to format the numbers in a
 * specific locale.
 *
 * Under the hood, this component uses `react-number-format`
 * and can accept any of its props or those of standard `<span>`
 * and `<input>` elements.
 *
 * @type React.FC<NumberDisplayProps>
 */
export const NumberDisplay = React.forwardRef(({
  locale,
  value,
  defaultValue,
  input = false,
  onBlur,
  onValueChange,
  ...rest
}, ref) => {
  const hasDefaultValue = defaultValue != null && defaultValue !== '';
  const hasValue = value != null && value !== '';
  // Ensure defaultValue is a number or gets ignored by NumberDisplay
  // if it was not passed.
  const dv = hasDefaultValue ? Number(defaultValue) : undefined;
  // Convert '' to undefined so that NumberDisplay will use
  // the defaultValue if it was passed.
  const v = value === '' ? undefined : value;

  const lastValue = React.useRef({
    formattedValue: value,
    value: v,
    floatValue: v,
  });

  // Store these in the state so they only get generated once.
  const localeProps = React.useMemo(() => ({
    thousandSeparator: localeThousandsSeparator(locale),
    decimalSeparator: localeDecimalSeparator(locale),
    thousandsGroupStyle: localeThousandsGroupStyle(locale),
  }), [locale]);

  // Set the initial field value from the defaultValue
  // at initialization.
  React.useEffect(() => {
    if (!hasValue && hasDefaultValue && v !== dv) {
      lastValue.current = {
        formattedValue: defaultValue,
        value: dv,
        floatValue: dv
      };

      if (onValueChange) onValueChange(lastValue.current);
    }
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  const handleChange = (values) => {
    // Store the last value so we can
    // verify it against the defaultValue
    // onBlur.
    lastValue.current = {
      ...values,
      // Use null instead of undefined in order to treat the value as set.
      floatValue: values.floatValue === undefined ? null : values.floatValue
    };

    if (onValueChange) onValueChange(lastValue.current);
  };

  const handleBlur = e => {
    const empty = lastValue.current.floatValue == null || lastValue.current.floatValue === '';
    if (hasDefaultValue && empty) {
      // Set the value to the defaultValue.
      if (onValueChange) {
        onValueChange({
          formattedValue: defaultValue,
          value: dv,
          floatValue: dv,
        });
      }
    } else if (onBlur) {
      // Or run the normal blur operation.
      onBlur(e);
    }
  };

  return (
    <NumberFormat data-test="numberInput"
      value={v}
      defaultValue={dv}
      onValueChange={handleChange}
      onBlur={handleBlur}
      displayType={input ? 'input' : 'text'}
      {...localeProps}
      {...rest}
      getInputRef={ref}
    />
  );
});

NumberDisplay.propTypes = {
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


