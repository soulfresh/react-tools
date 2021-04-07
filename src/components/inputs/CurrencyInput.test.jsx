import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { CurrencyInput } from './CurrencyInput.jsx';

describe('CurrencyInput', function() {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <CurrencyInput locale="en-US" data-testid="thousands" currency="USD" value={50000} />
          <CurrencyInput locale="en-US" data-testid="decimal"   currency="USD" value={50000.6666} onValueChange={onValueChange} />
          <CurrencyInput locale="en-US" data-testid="truncated" currency="USD" value={50000.4444} decimalScale={2} currencyDisplay="code" />
          <CurrencyInput locale="en-US" data-testid="rounded"   currency="EUR" value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue(   '$50,000');
      expect(screen.getByTestId('decimal')  ).toHaveValue(   '$50,000.67');
      expect(screen.getByTestId('truncated')).toHaveValue('USD 50,000.44');
      expect(screen.getByTestId('rounded')  ).toHaveValue(   '€50,000.78');
    });

    describe('after changing the value', function() {
      beforeEach(function() {
        const input = screen.getByTestId('decimal');
        userEvent.clear(input);
        userEvent.type(input, '333444000.6666');
      });

      it('should format the value.', () => {
        expect(screen.getByTestId('decimal')).toHaveValue('$333,444,000.66');
      });

      it('should notify of the new values.', () => {
        expect(onValueChange).toHaveBeenCalledWith({
          value: '333444000.66',
          formattedValue: '$333,444,000.66',
          floatValue: 333444000.66,
        });
      });
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <CurrencyInput locale="de-DE" data-testid="thousands" currency="USD" value={50000} />
          <CurrencyInput locale="de-DE" data-testid="decimal"   currency="USD" value={50000.6666} onValueChange={onValueChange} />
          <CurrencyInput locale="de-DE" data-testid="truncated" currency="USD" value={50000.4444} decimalScale={2} currencyDisplay="code" />
          <CurrencyInput locale="de-DE" data-testid="rounded"   currency="EUR" value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50.000 $');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,67 $');
      expect(screen.getByTestId('truncated')).toHaveValue('50.000,44 USD');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78 €');
    });
  });

  describe('hi-IN', function() {
    beforeEach(function() {
      render(
        <>
          <CurrencyInput locale="hi-IN" data-testid="thousands" currency="USD" value={5000000} />
          <CurrencyInput locale="hi-IN" data-testid="decimal"   currency="USD" value={5000000.6666} onValueChange={onValueChange} />
          <CurrencyInput locale="hi-IN" data-testid="truncated" currency="USD" value={5000000.4444} decimalScale={2} currencyDisplay="code" />
          <CurrencyInput locale="hi-IN" data-testid="rounded"   currency="EUR" value={5000000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue(   '$50,00,000');
      expect(screen.getByTestId('decimal')  ).toHaveValue(   '$50,00,000.67');
      expect(screen.getByTestId('truncated')).toHaveValue('USD 50,00,000.44');
      expect(screen.getByTestId('rounded')  ).toHaveValue(   '€50,00,000.78');
    });
  });
});

