import React from 'react';
import PropTypes from 'prop-types';

import {
  localeUnitName,
  supportsLocaleUnits,
  addUnitPrefixOrSuffix,
} from './number-util';

import { UnitInput } from './UnitInput.jsx';

/**
 * The `<UnitNameInput>` renders number values with a unit
 * using the long name of the unit. This component
 * off of the `UnitNameInput` component so accepts all
 * of the same props and can render either an input
 * element or a span.
 *
 * @param {object} props
 * @param {string} props.unit - The unit that this number
 *   is measured in as accepted by `Intl.NumberFormat`.
 * @param {string} [props.locale] - The locale to display
 *   the number in. Defaults to the browser locale.
 */
export function UnitNameInput(props) {
  const { unit, locale, value, onValueChange } = props;
  const unitDisplay = 'long';
  const [supported] = React.useState(() => supportsLocaleUnits());
  const [symbol, setSymbol] = React.useState(() =>
    supported
      ? localeUnitName(value || 1, unit, locale)
      : null
  );

  const handleValueChange = (values) => {
    if (supported) {
      setSymbol(
        localeUnitName(values.floatValue, unit, locale)
      );
    }
    if (onValueChange) onValueChange(values);
  };

  const localeProps = {
    ...props,
    unitDisplay,
  };

  if (supported) {
    localeProps.onValueChange = handleValueChange;

    // TODO Find a way to reduce how often locale props are determined.
    addUnitPrefixOrSuffix(localeProps, unit, symbol, locale, unitDisplay);
  }

  return (
    <UnitInput {...localeProps} />
  )
}

UnitNameInput.propTypes = {
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
   */
  onValueChange: PropTypes.func,
  /**
   * Render the number in a `<span>` instead of as
   * an `<input>`.
   */
  text: PropTypes.bool,
  /**
   * Any other props will be passed along to the underlying
   * `react-number-format` or `input` element.
   * See https://www.npmjs.com/package/react-number-format
   */
  'other props...': PropTypes.any,
};


