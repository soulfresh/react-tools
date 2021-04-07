## Functions

<dl>
<dt><a href="#userLocale">userLocale()</a> ⇒ <code>string</code></dt>
<dd><p>Determine the user locale or fallback to &quot;en-US&quot;
if the browser locale cannot be determined.</p>
</dd>
<dt><a href="#fromHundredths">fromHundredths(pennies)</a> ⇒ <code>number</code></dt>
<dd><p>Convert an integer representing 100ths of a unit
into that unit.
For example:
  11122 -&gt; 111.22
  null -&gt; 0</p>
</dd>
<dt><a href="#toHundredths">toHundredths(dollars)</a> ⇒ <code>number</code></dt>
<dd><p>Convert a fractional unit into an integer representing
100ths of that unit.
For example:
  111.22 -&gt; 11122
  null -&gt; 0</p>
</dd>
<dt><a href="#localeThousandsSeparator">localeThousandsSeparator([locale])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the character used to group large numbers
in the locale specified (or the browser locale
if none is passed).</p>
</dd>
<dt><a href="#localeThousandsGroupStyle">localeThousandsGroupStyle([locale])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the style of grouping used for large numbers
in the locale specified (or the browser locale
if none is passed).</p>
</dd>
<dt><a href="#localeDecimalSeparator">localeDecimalSeparator([locale])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the character used to signify fractions
in the locale specified (or the browser locale
if none is passed).</p>
</dd>
<dt><a href="#localeCurrencySymbol">localeCurrencySymbol([currency], [locale])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the symbol used for a currency code
in the locale specified (or the browser locale
if none is passed). For example, what character is
used for &quot;USD&quot; in Chinese.</p>
</dd>
<dt><a href="#localeCurrencyName">localeCurrencyName(value, currency, [locale])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the full name used for a currency code and value,
in the locale specified (or the browser locale
if none is passed). For example, how do you translate
&quot;USD&quot; into Chinese?</p>
</dd>
<dt><a href="#localeCurrencyIsPrefixed">localeCurrencyIsPrefixed([local], [currencyDisplay])</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if a currency symbol/name should be prefixed
in the locale specified (or the browser locale
if none is passed). For example, in the Germany the
currency symbol is suffixed so this function would return
false.</p>
</dd>
<dt><a href="#supportsLocaleUnits">supportsLocaleUnits()</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine if the browser supports translating units
like feet, inches, etc.</p>
</dd>
<dt><a href="#localeUnitSymbol">localeUnitSymbol(unit, [locale], [unitDisplay])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the symbol for the given unit
in the locale specified (or the browser locale
if none is passed). For example, for the unit &quot;inch&quot; and
locale <code>en-US</code>, the result is &quot;in&quot; but in <code>de-DE</code> it is &quot;Zoll&quot;.</p>
</dd>
<dt><a href="#localeUnitName">localeUnitName(value, unit, [locale])</a> ⇒ <code>string</code></dt>
<dd><p>Determine the full name for the given unit
in the locale specified (or the browser locale
if none is passed).</p>
</dd>
<dt><a href="#localeUnitIsPrefixed">localeUnitIsPrefixed(unit, [locale], [unitDisplay])</a> ⇒ <code>boolean</code></dt>
<dd><p>Determine the unit symbol/name should be prefixed
in the locale specified (or the browser locale
if none is passed).</p>
</dd>
</dl>

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

