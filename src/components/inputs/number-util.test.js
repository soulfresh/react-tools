import {
  translateInteger,
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

const supported = supportsLocaleUnits();

describe('number-util', function() {
  describe('translateInteger', function() {
    it('should be able to translate a number.', () => {
      expect(translateInteger(1, 'zh-Hans-CN-u-nu-hanidec'))
        .toEqual('一');
      expect(translateInteger(1111, 'zh-Hans-CN-u-nu-hanidec'))
        .toEqual('一一一一');
      expect(translateInteger(1, 'ja-JP'))
        .toEqual('1');
    });
  });

  describe('localeThousandsSeparator', function() {
    it('should be able to determine the thousands separator for a locale.', () => {
      expect(localeThousandsSeparator('en-US'))
        .toEqual(',');
      expect(localeThousandsSeparator('de-DE'))
        .toEqual('.');
      expect(localeThousandsSeparator('hi-IN'))
        .toEqual(',')
      expect(localeThousandsSeparator('ja-JP'))
        .toEqual(',')
      expect(localeThousandsSeparator('zh-Hans-CN-u-nu-hanidec'))
        .toBe(',');
    });
  });

  describe('localeThousandsGroupStyle', function() {
    it('should be able to determine the grouping style for different locales.', () => {
      expect(localeThousandsGroupStyle('en-US'))
        .toEqual('thousand');
      expect(localeThousandsGroupStyle('de-DE'))
        .toEqual('thousand');
      expect(localeThousandsGroupStyle('hi-IN'))
        .toEqual('lakh')
      expect(localeThousandsGroupStyle('ja-JP'))
        .toEqual('thousand')
      expect(localeThousandsGroupStyle('zh-Hans-CN-u-nu-hanidec'))
        .toBe('thousand');
    });
  });

  describe('localeDecimalSeparator', function() {
    it('should be able to determine the decimal separator for a locale.', () => {
      expect(localeDecimalSeparator('en-US'))
        .toEqual('.');
      expect(localeDecimalSeparator('de-DE'))
        .toEqual(',');
      expect(localeDecimalSeparator('hi-IN'))
        .toEqual('.');
      expect(localeDecimalSeparator('ja-JP'))
        .toEqual('.');
      expect(localeDecimalSeparator('zh-Hans-CN-u-nu-hanidec'))
        .toBe('.');
    });
  });

  describe('localeCurrencySymbol', function() {
    it('should be able to determine the symbol for a currency.', () => {
      expect(localeCurrencySymbol('USD', 'en-US'))
        .toEqual('$');
      expect(localeCurrencySymbol('USD', 'de-DE'))
        .toEqual('$');
      expect(localeCurrencySymbol('EUR', 'de-DE'))
        .toEqual('€');
      expect(localeCurrencySymbol('YEN', 'ja-JP'))
        .toEqual('YEN');
      expect(localeCurrencySymbol('THB', 'th'))
        .toEqual('฿');
      expect(localeCurrencySymbol('USD', 'zh-Hans-CN-u-nu-hanidec'))
        .toBe('US$');
      // Symbol varies depending on browser.
      expect('¥￥')
        .toContain(localeCurrencySymbol('CNY', 'zh-Hans-CN-u-nu-hanidec'));
    });
  });

  describe('localeCurrencyName', function() {
    it('should be able to determine the name for a currency.', () => {
      expect(localeCurrencyName(1, 'USD', 'en-US'))
        .toEqual('US dollar');
      expect(localeCurrencyName(1, 'USD', 'de-DE'))
        .toEqual('US-Dollar');
      expect(localeCurrencyName(1, 'EUR', 'de-DE'))
        .toEqual('Euro');
      expect(localeCurrencyName(1, 'YEN', 'ja-JP'))
        .toEqual('YEN');
      expect(localeCurrencyName(1, 'THB', 'th'))
        .toEqual('บาทไทย');
      expect(localeCurrencyName(1, 'USD', 'zh-Hans-CN-u-nu-hanidec'))
        .toBe('美元');
      expect(localeCurrencyName(1, 'CNY', 'zh-Hans-CN-u-nu-hanidec'))
        .toBe('人民币');
    });

    it('should be able to determine the pluralized name for a currency.', () => {
      expect(localeCurrencyName(111, 'USD', 'en-US'))
        .toEqual('US dollars');
      expect(localeCurrencyName(111, 'USD', 'de-DE'))
        .toEqual('US-Dollar');
      expect(localeCurrencyName(111, 'EUR', 'de-DE'))
        .toEqual('Euro');
      expect(localeCurrencyName(111, 'YEN', 'ja-JP'))
        .toEqual('YEN');
      expect(localeCurrencyName(111, 'THB', 'th'))
        .toEqual('บาทไทย');
      expect(localeCurrencyName(111, 'USD', 'zh-Hans-CN-u-nu-hanidec'))
        .toBe('美元');
      expect(localeCurrencyName(111, 'CNY', 'zh-Hans-CN-u-nu-hanidec'))
        .toBe('人民币');
    })
  });

  describe('localeCurrencyIsPrefixed', function() {
    it('should be able to determine if a currency is prefixed for a locale.', () => {
      expect(localeCurrencyIsPrefixed('en-US'))
        .toBe(true);
      expect(localeCurrencyIsPrefixed('de-DE'))
        .toBe(false);
      expect(localeCurrencyIsPrefixed('th'))
        .toBe(true);
      expect(localeCurrencyIsPrefixed('ja-JP'))
        .toBe(true);
      expect(localeCurrencyIsPrefixed('zh-Hans-CN-u-nu-hanidec'))
        .toBe(true);
    });

    it('should be able to determine if a currency is prefixed when using the currency code.', () => {
      expect(localeCurrencyIsPrefixed('en-US', 'code'))
        .toBe(true);
      expect(localeCurrencyIsPrefixed('de-DE', 'code'))
        .toBe(false);
      expect(localeCurrencyIsPrefixed('ja-JP', 'code'))
        .toBe(true);
      expect(localeCurrencyIsPrefixed('th', 'code'))
        .toBe(true);
      expect(localeCurrencyIsPrefixed('zh-Hans-CN-u-nu-hanidec', 'code'))
        .toBe(true);
    });

    it('should be able to determine if a currency is prefixed when using the currency name.', () => {
      expect(localeCurrencyIsPrefixed('en-US', 'name'))
        .toBe(false);
      expect(localeCurrencyIsPrefixed('de-DE', 'name'))
        .toBe(false);
      expect(localeCurrencyIsPrefixed('ja-JP', 'name'))
        .toBe(false);
      expect(localeCurrencyIsPrefixed('th', 'name'))
        .toBe(false);
      expect(localeCurrencyIsPrefixed('zh-Hans-CN-u-nu-hanidec', 'name'))
        .toBe(false);
    });
  });

  // Unit localization isn't supported under all platforms.
  if (supported) {
    describe('localeUnitSymbol', function() {
      it('should be able to determine the symbol for a unit based on locale.', () => {
        expect(localeUnitSymbol('inch', 'en-US'))
          .toEqual('in');
        expect(localeUnitSymbol('hour', 'en-US'))
          .toEqual('hr');
        expect(localeUnitSymbol('liter', 'en-US'))
          .toEqual('L');
        expect(localeUnitSymbol('inch', 'de-DE', 'long'))
          .toEqual('Zoll');
        expect(localeUnitSymbol('hour', 'de-DE'))
          .toEqual('Std.');
        expect(localeUnitSymbol('hour', 'ja-JP'))
          .toEqual('時間');
      });

      it('should be able to determine the symbol for a unit when using a narrow display.', () => {
        expect(localeUnitSymbol('inch', 'en-US', 'narrow'))
          .toEqual('″');
        expect(localeUnitSymbol('hour', 'en-US', 'narrow'))
          .toEqual('h');
        expect(localeUnitSymbol('liter', 'en-US', 'narrow'))
          .toEqual('L');
        expect(localeUnitSymbol('inch', 'de-DE', 'narrow'))
          .toEqual('in');
        expect(localeUnitSymbol('hour', 'de-DE', 'narrow'))
          .toEqual('Std.');
        expect(localeUnitSymbol('hour', 'ja-JP', 'narrow'))
          .toEqual('h');
      });
    });

    describe('localeUnitName', function() {
      it('should be able to determine the name for a unit.', () => {
        expect(localeUnitName(1, 'inch', 'en-US'))
          .toEqual('inch');
        expect(localeUnitName(1, 'hour', 'en-US'))
          .toEqual('hour');
        expect(localeUnitName(1, 'liter', 'en-US'))
          .toEqual('liter');
        expect(localeUnitName(1, 'inch', 'de-DE'))
          .toEqual('Zoll');
        expect(localeUnitName(1, 'hour', 'de-DE'))
          .toEqual('Stunde');
        expect(localeUnitName(1, 'hour', 'ja-JP'))
          .toEqual('時間');
      });

      it('should be able to determine the pluralized name for a unit.', () => {
        expect(localeUnitName(11, 'inch', 'en-US'))
          .toEqual('inches');
        expect(localeUnitName(11, 'hour', 'en-US'))
          .toEqual('hours');
        expect(localeUnitName(11, 'liter', 'en-US'))
          .toEqual('liters');
        expect(localeUnitName(11, 'inch', 'de-DE'))
          .toEqual('Zoll');
        expect(localeUnitName(11, 'hour', 'de-DE'))
          .toEqual('Stunden');
        expect(localeUnitName(11, 'hour', 'ja-JP'))
          .toEqual('時間');
      });
    });

    describe('localeUnitIsPrefixed', function() {
      it('should be able to determine if a unit should be prefixed to the value.', function() {
        expect(localeUnitIsPrefixed('inch', 'en-US'))
          .toBe(false);
        expect(localeUnitIsPrefixed('inch', 'en-US', 'narrow'))
          .toBe(false);
        expect(localeUnitIsPrefixed('inch', 'en-US', 'long'))
          .toBe(false);
        expect(localeUnitIsPrefixed('inch', 'de-DE'))
          .toBe(false);
        expect(localeUnitIsPrefixed('inch', 'de-DE', 'long'))
          .toBe(false);
        expect(localeUnitIsPrefixed('hour', 'de-DE'))
          .toBe(false);
        expect(localeUnitIsPrefixed('hour', 'ja-JP'))
          .toBe(false);
      });
    });
  }
});
