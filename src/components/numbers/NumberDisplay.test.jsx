import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { NumberDisplay } from './NumberDisplay.jsx';

describe('NumberDisplay', function() {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <NumberDisplay input locale="en-US" data-testid="thousands" value={50000} />
          <NumberDisplay input locale="en-US" data-testid="decimal"   value={50000.6666} onValueChange={onValueChange} />
          <NumberDisplay input locale="en-US" data-testid="truncated" value={50000.4444} decimalScale={2} />
          <NumberDisplay input locale="en-US" data-testid="rounded"   value={50000.7777} decimalScale={2} />
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
          info: {
            source: 'event',
            event: expect.any(Object),
          }
        });
      });
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <NumberDisplay input locale="de-DE" data-testid="thousands" value={50000} />
          <NumberDisplay input locale="de-DE" data-testid="decimal"   value={50000.6666} onValueChange={onValueChange} />
          <NumberDisplay input locale="de-DE" data-testid="truncated" value={50000.4444} decimalScale={2} />
          <NumberDisplay input locale="de-DE" data-testid="rounded"   value={50000.7777} decimalScale={2} />
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
          info: {
            source: 'event',
            event: expect.any(Object),
          }
        });
      });
    });
  });

  describe('hi-IN', function() {
    beforeEach(function() {
      render(
        <>
          <NumberDisplay input locale="hi-IN" data-testid="thousands" value={5000000} />
          <NumberDisplay input locale="hi-IN" data-testid="decimal"   value={5000000.6666} onValueChange={onValueChange} />
          <NumberDisplay input locale="hi-IN" data-testid="truncated" value={5000000.4444} decimalScale={2} />
          <NumberDisplay input locale="hi-IN" data-testid="rounded"   value={5000000.7777} decimalScale={2} />
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
          info: {
            source: 'event',
            event: expect.any(Object),
          }
        });
      });
    });
  });
});
