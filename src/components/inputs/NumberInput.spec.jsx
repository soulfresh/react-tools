import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberInput } from './NumberInput.jsx';

// import NumberInputPageObject from './NumberInput.page-object';

describe('NumberInput', function() {
  let onValueChange, selectors;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <NumberInput locale="en-US" data-testid="thousands" value={50000} />
          <NumberInput locale="en-US" data-testid="decimal"   value={50000.6666} onValueChange={onValueChange} />
          <NumberInput locale="en-US" data-testid="truncated" value={50000.4444} decimalScale={2} />
          <NumberInput locale="en-US" data-testid="rounded"   value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50,000');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50,000.6666');
      expect(screen.getByTestId('truncated')).toHaveValue('50,000.44');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50,000.78');
    });

    describe('after changing the value', function() {
      beforeEach(function() {
        const input = screen.getByTestId('decimal');
        userEvent.clear(input);
        userEvent.type(input, '3456.78');
      });

      it('should format the value.', () => {
        expect(screen.getByTestId('decimal')).toHaveValue('3,456.78');
      });

      it('should notify of the new values.', () => {
        expect(onValueChange).toHaveBeenCalledWith({
          value: '3456.78',
          formattedValue: '3,456.78',
          floatValue: 3456.78,
        });
      });
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <NumberInput locale="de-DE" data-testid="thousands" value={50000} />
          <NumberInput locale="de-DE" data-testid="decimal"   value={50000.6666} onValueChange={onValueChange} />
          <NumberInput locale="de-DE" data-testid="truncated" value={50000.4444} decimalScale={2} />
          <NumberInput locale="de-DE" data-testid="rounded"   value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50.000');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,6666');
      expect(screen.getByTestId('truncated')).toHaveValue('50.000,44');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78');
    });

    describe('after changing the value', function() {
      beforeEach(function() {
        const input = screen.getByTestId('decimal');
        userEvent.clear(input);
        userEvent.type(input, '1234567,89');
      });

      it('should format the value.', () => {
        expect(screen.getByTestId('decimal')).toHaveValue('1.234.567,89');
      });

      it('should notify of the new values.', () => {
        expect(onValueChange).toHaveBeenCalledWith({
          value: '1234567.89',
          formattedValue: '1.234.567,89',
          floatValue: 1234567.89,
        });
      });
    });
  });

  describe('hi-IN', function() {
    beforeEach(function() {
      render(
        <>
          <NumberInput locale="hi-IN" data-testid="thousands" value={5000000} />
          <NumberInput locale="hi-IN" data-testid="decimal"   value={5000000.6666} onValueChange={onValueChange} />
          <NumberInput locale="hi-IN" data-testid="truncated" value={5000000.4444} decimalScale={2} />
          <NumberInput locale="hi-IN" data-testid="rounded"   value={5000000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      expect(screen.getByTestId('thousands')).toHaveValue('50,00,000');
      expect(screen.getByTestId('decimal')  ).toHaveValue('50,00,000.6666');
      expect(screen.getByTestId('truncated')).toHaveValue('50,00,000.44');
      expect(screen.getByTestId('rounded')  ).toHaveValue('50,00,000.78');
    });

    describe('after changing the value', function() {
      beforeEach(function() {
        const input = screen.getByTestId('decimal');
        userEvent.clear(input);
        userEvent.type(input, '1234567.89');
      });

      it('should format the value.', () => {
        expect(screen.getByTestId('decimal')).toHaveValue('12,34,567.89');
      });

      it('should notify of the new values.', () => {
        expect(onValueChange).toHaveBeenCalledWith({
          value: '1234567.89',
          formattedValue: '12,34,567.89',
          floatValue: 1234567.89,
        });
      });
    });
  });
});
