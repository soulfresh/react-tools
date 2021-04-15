## Functions

* [userLocale()](#userLocale) ⇒ <code>string</code>
* [fromHundredths(pennies)](#fromHundredths) ⇒ <code>number</code>
* [toHundredths(dollars)](#toHundredths) ⇒ <code>number</code>
* [localeThousandsSeparator([locale])](#localeThousandsSeparator) ⇒ <code>string</code>
* [localeThousandsGroupStyle([locale])](#localeThousandsGroupStyle) ⇒ <code>string</code>
* [localeDecimalSeparator([locale])](#localeDecimalSeparator) ⇒ <code>string</code>
* [localeCurrencySymbol([currency], [locale])](#localeCurrencySymbol) ⇒ <code>string</code>
* [localeCurrencyName(value, currency, [locale])](#localeCurrencyName) ⇒ <code>string</code>
* [localeCurrencyIsPrefixed([local], [currencyDisplay])](#localeCurrencyIsPrefixed) ⇒ <code>boolean</code>
* [supportsLocaleUnits()](#supportsLocaleUnits) ⇒ <code>boolean</code>
* [localeUnitSymbol(unit, [locale], [unitDisplay])](#localeUnitSymbol) ⇒ <code>string</code>
* [localeUnitName(value, unit, [locale])](#localeUnitName) ⇒ <code>string</code>
* [localeUnitIsPrefixed(unit, [locale], [unitDisplay])](#localeUnitIsPrefixed) ⇒ <code>boolean</code>

<a name="userLocale"></a>

## userLocale() ⇒ <code>string</code>
Determine the user locale or fallback to "en-US"
if the browser locale cannot be determined.

**Kind**: global function  
<a name="fromHundredths"></a>

## fromHundredths(pennies) ⇒ <code>number</code>
Convert an integer representing 100ths of a unit
into that unit.
For example:
  11122 -> 111.22
  null -> 0

**Kind**: global function  

| Param | Type |
| --- | --- |
| pennies | <code>number</code> | 

<a name="toHundredths"></a>

## toHundredths(dollars) ⇒ <code>number</code>
Convert a fractional unit into an integer representing
100ths of that unit.
For example:
  111.22 -> 11122
  null -> 0

**Kind**: global function  

| Param | Type |
| --- | --- |
| dollars | <code>number</code> | 

<a name="localeThousandsSeparator"></a>

## localeThousandsSeparator([locale]) ⇒ <code>string</code>
Determine the character used to group large numbers
in the locale specified (or the browser locale
if none is passed).

**Kind**: global function  

| Param | Type |
| --- | --- |
| [locale] | <code>string</code> | 

<a name="localeThousandsGroupStyle"></a>

## localeThousandsGroupStyle([locale]) ⇒ <code>string</code>
Determine the style of grouping used for large numbers
in the locale specified (or the browser locale
if none is passed).

**Kind**: global function  
**Returns**: <code>string</code> - One of 'thousand', 'lahk', 'wan'  

| Param | Type |
| --- | --- |
| [locale] | <code>string</code> | 

<a name="localeDecimalSeparator"></a>

## localeDecimalSeparator([locale]) ⇒ <code>string</code>
Determine the character used to signify fractions
in the locale specified (or the browser locale
if none is passed).

**Kind**: global function  

| Param | Type |
| --- | --- |
| [locale] | <code>string</code> | 

<a name="localeCurrencySymbol"></a>

## localeCurrencySymbol([currency], [locale]) ⇒ <code>string</code>
Determine the symbol used for a currency code
in the locale specified (or the browser locale
if none is passed). For example, what character is
used for "USD" in Chinese.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [currency] | <code>string</code> | The symbol to translate (ex. 'USD', 'GBP'). |
| [locale] | <code>string</code> |  |

<a name="localeCurrencyName"></a>

## localeCurrencyName(value, currency, [locale]) ⇒ <code>string</code>
Determine the full name used for a currency code and value,
in the locale specified (or the browser locale
if none is passed). For example, how do you translate
"USD" into Chinese?

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> |  |
| currency | <code>string</code> | The currency to translate (ex. 'USD') |
| [locale] | <code>string</code> |  |

<a name="localeCurrencyIsPrefixed"></a>

## localeCurrencyIsPrefixed([local], [currencyDisplay]) ⇒ <code>boolean</code>
Determine if a currency symbol/name should be prefixed
in the locale specified (or the browser locale
if none is passed). For example, in the Germany the
currency symbol is suffixed so this function would return
false.

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| [local] | <code>string</code> |  |
| [currencyDisplay] | <code>string</code> | One of the `currencyDisplay`   formats that can be accepted by `Intl.NumberFormat`. |

<a name="supportsLocaleUnits"></a>

## supportsLocaleUnits() ⇒ <code>boolean</code>
Determine if the browser supports translating units
like feet, inches, etc.

**Kind**: global function  
<a name="localeUnitSymbol"></a>

## localeUnitSymbol(unit, [locale], [unitDisplay]) ⇒ <code>string</code>
Determine the symbol for the given unit
in the locale specified (or the browser locale
if none is passed). For example, for the unit "inch" and
locale `en-US`, the result is "in" but in `de-DE` it is "Zoll".

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| unit | <code>string</code> | One of the units accepted by `Intl.NumberFormat`. |
| [locale] | <code>string</code> |  |
| [unitDisplay] | <code>string</code> | One of the `unitDisplay` values accepted   by `Intl.NumberFormat` |

<a name="localeUnitName"></a>

## localeUnitName(value, unit, [locale]) ⇒ <code>string</code>
Determine the full name for the given unit
in the locale specified (or the browser locale
if none is passed).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| value | <code>number</code> | The value to use when translating. |
| unit | <code>string</code> | The unit to translate. |
| [locale] | <code>string</code> |  |

<a name="localeUnitIsPrefixed"></a>

## localeUnitIsPrefixed(unit, [locale], [unitDisplay]) ⇒ <code>boolean</code>
Determine the unit symbol/name should be prefixed
in the locale specified (or the browser locale
if none is passed).

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| unit | <code>string</code> | One of the units accepted by `Intl.NumberFormat` |
| [locale] | <code>string</code> |  |
| [unitDisplay] | <code>string</code> | One of the `unitDisplay` values accepted   by `Intl.NumberFormat` |

