import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from 'react-number-format';

import {
  localeThousandsSeparator,
  localeThousandsGroupStyle,
  localeDecimalSeparator,
  localeCurrencySymbol,
  localeCurrencyName,
  localeCurrencyIsPrefixed,
  localeUnitSymbol,
  localeUnitName,
  localeUnitIsPrefixed,
  supportsLocaleUnits,
} from './number-util';

function formatSymbol(symbol, prefixed, locale, display) {
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

function addCurrencyPrefixOrSuffix(target, symbol, locale, currencyDisplay) {
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

function addUnitPrefixOrSuffix(target, unit, symbol, locale, unitDisplay) {
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

/**
 * The `<NumberInput>` component renders an input element with
 * numbers formatted in the user's locale. The number format is
 * updated as the user types. This makes it easier to read long
 * numbers in inputs by adding thousands separators based
 * on the formatting rules of the user's locale. You can also
 * specify a locale if you need to format the numbers in a
 * specific locale.
 *
 * Additionally, you can use this input to display a number
 * as plain text in the user's locale by passing the `text`
 * prop. Or you can pass any props of `react-number-format`
 * or standard input elements.
 *
 * @param {object} props
 * @param {string|number} [props.value] - The current value of
 *   the input.
 * @param {string|number} [props.defaultValue] - A default value
 *   to set as the input value if the input is left empty.
 */
export function NumberInput({
  locale,
  value,
  defaultValue,
  text = false,
  onBlur,
  onValueChange,
  ...rest
}) {
  const hasDefaultValue = defaultValue != null && defaultValue !== '';
  const hasValue = value != null && value !== '';
  // Ensure defaultValue is a number or gets ignored by NumberInput
  // if it was not passed.
  const dv = hasDefaultValue ? Number(defaultValue) : undefined;
  // Convert '' to undefined so that NumberInput will use
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
      displayType={text ? 'text' : 'input'}
      {...localeProps}
      {...rest}
    />
  );
}

NumberInput.propTypes = {
  /**
   * The locale to use when formatting the currency.
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
   * `NumberFormat` component or `input` element.
   * See https://www.npmjs.com/package/react-number-format
   */
  'other props...': PropTypes.any,
};


export function UnitInput({
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
    <NumberInput data-test="currencyNameInput"
      {...localeProps}
      {...rest}
    />
  );
}

UnitInput.propTypes = {
  /**
   * The initial value of the input.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
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
   * See the `locale` property of `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  locale: PropTypes.string,
  // Form and Name are required but that is not enforced
  // here because they receive those from `FormikLabeledInput`
  // or Formik `Field`.
  // name: PropTypes.string,
  // form: PropTypes.shape({
  //   setFieldValue: PropTypes.func.isRequired
  // }),
};


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
   * The initial value of the input.
   */
  value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
  /**
   * The name of the unit this number represents. See the `unit`
   * property from `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  unit: PropTypes.string.isRequired,
  /**
   * The locale to use when formatting the currency.
   * See the `locale` property of `Intl.NumberFormat`
   * https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/NumberFormat
   */
  locale: PropTypes.string,
  // Form an Name are required but that is not enforced
  // here because they receive those from `FormikLabeledInput`
  // or Formik `Field`.
  // name: PropTypes.string,
  // form: PropTypes.shape({
  //   setFieldValue: PropTypes.func.isRequired
  // }),
};

// TODO Handle negative number formatting.
// The negative sign can be either prefixed
// or suffixed. With some currencies, the negative
// sign can appear before or after the currency
// symbol.
export function CurrencyInput({
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
    <NumberInput data-test="currencyNameInput"
      {...localeProps}
      {...rest}
    />
  );
}

CurrencyInput.propTypes = {
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
   * See https://tools.ietf.org/html/rfc5646
   */
  locale: PropTypes.string,
};

CurrencyInput.defaultProps = {
  currency: 'USD',
  currencyDisplay: 'symbol',
}

export function CurrencyNameInput(props) {
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

  // TODO Find a way to reduce how often locale props are determined.
  addCurrencyPrefixOrSuffix(localeProps, symbol, locale, currencyDisplay);

  return <CurrencyInput {...localeProps} />
}

CurrencyNameInput.propTypes = {
  /**
   * The currency code for the currency being displayed.
   * Defaults to 'USD'. See https://www.currency-iso.org/en/home/tables/table-a1.html
   */
  currency: PropTypes.string,
  /**
   * The locale to use when formatting the currency.
   * See https://tools.ietf.org/html/rfc5646
   */
  locale: PropTypes.string,
};

CurrencyNameInput.defaultProps = {
  currency: 'USD',
};

// TODO This needs to handle international phone number formatting.
// Maybe use a phone specific input library.
export function PhoneNumberInput({
  ...rest
}) {
  return (
    <NumberInput data-test="PhoneNumberInput"
      format="(###) ###-####"
      mask="_"
      allowEmptyFormatting={false}
      {...rest}
    />
  );
}

