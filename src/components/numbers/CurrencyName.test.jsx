import React from 'react';
import { render, screen } from '@testing-library/react';

import { CurrencyName } from './CurrencyName.jsx';

describe('CurrencyName', function() {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <CurrencyName input locale="en-US" data-testid="thousands" currency="USD" value={50000} />
          <CurrencyName input locale="en-US" data-testid="decimal"   currency="USD" value={50000.6666} onValueChange={onValueChange} />
          <CurrencyName input locale="en-US" data-testid="truncated" currency="USD" value={50000.4444} decimalScale={2} currencyDisplay="code" />
          <CurrencyName input locale="en-US" data-testid="rounded"   currency="EUR" value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50,000 US dollar');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50,000.67 US dollar');
      expect(screen.getByTestId('truncated')).toHaveValue('50,000.44 US dollar');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50,000.78 euro');
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <CurrencyName input locale="de-DE" data-testid="thousands" currency="USD" value={50000} />
          <CurrencyName input locale="de-DE" data-testid="decimal"   currency="USD" value={50000.6666} onValueChange={onValueChange} />
          <CurrencyName input locale="de-DE" data-testid="truncated" currency="USD" value={50000.4444} decimalScale={2} currencyDisplay="code" />
          <CurrencyName input locale="de-DE" data-testid="rounded"   currency="EUR" value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50.000 US-Dollar');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,67 US-Dollar');
      expect(screen.getByTestId('truncated')).toHaveValue('50.000,44 US-Dollar');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78 Euro');
    });
  });

  describe('hi-IN', function() {
    beforeEach(function() {
      render(
        <>
          <CurrencyName input locale="hi-IN" data-testid="thousands" currency="USD" value={5000000} />
          <CurrencyName input locale="hi-IN" data-testid="decimal"   currency="USD" value={5000000.6666} onValueChange={onValueChange} />
          <CurrencyName input locale="hi-IN" data-testid="truncated" currency="USD" value={5000000.4444} decimalScale={2} currencyDisplay="code" />
          <CurrencyName input locale="hi-IN" data-testid="rounded"   currency="EUR" value={5000000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50,00,000 यूएस डॉलर');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50,00,000.67 यूएस डॉलर');
      expect(screen.getByTestId('truncated')).toHaveValue('50,00,000.44 यूएस डॉलर');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50,00,000.78 यूरो');
    });
  });
});

