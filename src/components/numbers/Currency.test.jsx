import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { Currency } from './Currency.jsx';

describe('Currency', function() {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <Currency input locale="en-US" data-testid="thousands" currency="USD" value={50000} />
          <Currency input locale="en-US" data-testid="decimal"   currency="USD" value={50000.6666} onValueChange={onValueChange} />
          <Currency input locale="en-US" data-testid="truncated" currency="USD" value={50000.4444} decimalScale={2} currencyDisplay="code" />
          <Currency input locale="en-US" data-testid="rounded"   currency="EUR" value={50000.7777} decimalScale={2} />
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
      beforeEach(async function() {
        const input = screen.getByTestId('decimal');
        userEvent.clear(input);
        await userEvent.type(input, '3344.66');
      });

      it('should format the value.', () => {
        expect(screen.getByTestId('decimal')).toHaveValue('$3,344.66');
      });

      it('should notify of the new values.', () => {
        expect(onValueChange).toHaveBeenCalledWith({
          value: '3344.66',
          formattedValue: '$3,344.66',
          floatValue: 3344.66,
          pennies: 334466,
        });
      });
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <Currency input locale="de-DE" data-testid="thousands" currency="USD" value={50000} />
          <Currency input locale="de-DE" data-testid="decimal"   currency="USD" value={50000.6666} onValueChange={onValueChange} />
          <Currency input locale="de-DE" data-testid="truncated" currency="USD" value={50000.4444} decimalScale={2} currencyDisplay="code" />
          <Currency input locale="de-DE" data-testid="rounded"   currency="EUR" value={50000.7777} decimalScale={2} />
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
          <Currency input locale="hi-IN" data-testid="thousands" currency="USD" value={5000000} />
          <Currency input locale="hi-IN" data-testid="decimal"   currency="USD" value={5000000.6666} onValueChange={onValueChange} />
          <Currency input locale="hi-IN" data-testid="truncated" currency="USD" value={5000000.4444} decimalScale={2} currencyDisplay="code" />
          <Currency input locale="hi-IN" data-testid="rounded"   currency="EUR" value={5000000.7777} decimalScale={2} />
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

  describe('pennies', () => {
    beforeEach(() => {
      render(
        <Currency
          input
          pennies
          value={500}
          decimalScale={2}
          data-testid="pennies"
          locale="en-US"
          currency="USD"
        />
      );
    });

    it('should accept the value in pennies.', () => {
      expect(screen.getByTestId('pennies')).toHaveValue('$5');
    });
  });
});

