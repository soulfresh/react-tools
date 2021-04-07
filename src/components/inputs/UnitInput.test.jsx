import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

import { UnitInput } from './UnitInput.jsx';
import {
  supportsLocaleUnits,
} from './number-util';

const supported = supportsLocaleUnits();

describe('UnitInput', function() {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <UnitInput locale="en-US" data-testid="thousands" unit="inch"          value={50000} />
          <UnitInput locale="en-US" data-testid="decimal"   unit="liter"         value={50000.6666} onValueChange={onValueChange} />
          <UnitInput locale="en-US" data-testid="truncated" unit="liter"         value={50000.4444} decimalScale={2} unitDisplay="narrow" />
          <UnitInput locale="en-US" data-testid="rounded"   unit="mile-per-hour" value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      if (supported) {
        expect(screen.getByTestId('thousands')).toHaveValue('50,000 in');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,000.6666 L');
        expect(screen.getByTestId('truncated')).toHaveValue('50,000.44L');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,000.78 mph');
      } else {
        expect(screen.getByTestId('thousands')).toHaveValue('50,000');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,000.6666');
        expect(screen.getByTestId('truncated')).toHaveValue('50,000.44');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,000.78');
      }
    });

    describe('after changing the value', function() {
      beforeEach(function() {
        const input = screen.getByTestId('decimal');
        userEvent.clear(input);
        userEvent.type(input, '333444000.6666');
      });

      it('should format the value.', () => {
        if (supported) {
          expect(screen.getByTestId('decimal')).toHaveValue('333,444,000.6666 L');
        } else {
          expect(screen.getByTestId('decimal')).toHaveValue('333,444,000.6666');
        }
      });

      it('should notify of the new values.', () => {
        expect(onValueChange).toHaveBeenCalledWith({
          value: '333444000.6666',
          formattedValue: supported ? '333,444,000.6666 L' : '333,444,000.6666' ,
          floatValue: 333444000.6666,
        });
      });
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <UnitInput locale="de-DE" data-testid="thousands" unit="inch"          value={50000} unitDisplay="long" />
          <UnitInput locale="de-DE" data-testid="decimal"   unit="liter"         value={50000.6666} onValueChange={onValueChange} />
          <UnitInput locale="de-DE" data-testid="truncated" unit="liter"         value={50000.4444} decimalScale={2} unitDisplay="narrow" />
          <UnitInput locale="de-DE" data-testid="rounded"   unit="mile-per-hour" value={50000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      if (supported) {
        expect(screen.getByTestId('thousands')).toHaveValue('50.000 Zoll');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,6666 l');
        expect(screen.getByTestId('truncated')).toHaveValue('50.000,44l');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78 mi/h');
      } else {
        expect(screen.getByTestId('thousands')).toHaveValue('50.000');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,6666');
        expect(screen.getByTestId('truncated')).toHaveValue('50.000,44');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78');
      }
    });
  });

  describe('hi-IN', function() {
    beforeEach(function() {
      render(
        <>
          <UnitInput locale="hi-IN" data-testid="thousands" unit="inch"          value={5000000} />
          <UnitInput locale="hi-IN" data-testid="decimal"   unit="liter"         value={5000000.6666} onValueChange={onValueChange} />
          <UnitInput locale="hi-IN" data-testid="truncated" unit="liter"         value={5000000.4444} decimalScale={2} unitDisplay="narrow" />
          <UnitInput locale="hi-IN" data-testid="rounded"   unit="mile-per-hour" value={5000000.7777} decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      if (supported) {
        expect(screen.getByTestId('thousands')).toHaveValue('50,00,000 इंच');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,00,000.6666 ली॰');
        expect(screen.getByTestId('truncated')).toHaveValue('50,00,000.44ली॰');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,00,000.78 मी॰प्र॰घं॰');
      } else {
        expect(screen.getByTestId('thousands')).toHaveValue('50,00,000');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,00,000.6666');
        expect(screen.getByTestId('truncated')).toHaveValue('50,00,000.44');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,00,000.78');
      }
    });
  });
});
