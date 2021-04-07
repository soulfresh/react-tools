import React from 'react';
import { render, screen } from '@testing-library/react';

import { UnitName } from './UnitName.jsx';
import {
  supportsLocaleUnits,
} from './number-util';

const supported = supportsLocaleUnits();

describe('UnitName', function() {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', function() {
    beforeEach(function() {
      render(
        <>
          <UnitName input locale="en-US" data-testid="thousands" unit="inch"          value={50000} />
          <UnitName input locale="en-US" data-testid="decimal"   unit="liter"         value={50000.6666} onValueChange={onValueChange} />
          <UnitName input locale="en-US" data-testid="truncated" unit="liter"         value={50000.4444} decimalScale={2} />
          <UnitName input locale="en-US" data-testid="rounded"   unit="mile-per-hour" value={50000.7777} decimalScale={2} />
          <UnitName input locale="en-US" data-testid="single"    unit="foot"          value={1}          decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      if (supported) {
        expect(screen.getByTestId('thousands')).toHaveValue('50,000 inches');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,000.6666 liters');
        expect(screen.getByTestId('truncated')).toHaveValue('50,000.44 liters');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,000.78 miles per hour');
        expect(screen.getByTestId('single')   ).toHaveValue('1 foot');
      } else {
        expect(screen.getByTestId('thousands')).toHaveValue('50,000');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,000.6666');
        expect(screen.getByTestId('truncated')).toHaveValue('50,000.44');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,000.78');
        expect(screen.getByTestId('single')   ).toHaveValue('1');
      }
    });
  });

  describe('de-DE', function() {
    beforeEach(function() {
      render(
        <>
          <UnitName input locale="de-DE" data-testid="thousands" unit="inch"          value={50000} />
          <UnitName input locale="de-DE" data-testid="decimal"   unit="liter"         value={50000.6666} onValueChange={onValueChange} />
          <UnitName input locale="de-DE" data-testid="truncated" unit="liter"         value={50000.4444} decimalScale={2} />
          <UnitName input locale="de-DE" data-testid="rounded"   unit="mile-per-hour" value={50000.7777} decimalScale={2} />
          <UnitName input locale="de-DE" data-testid="single"    unit="foot"          value={1}          decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      if (supported) {
        expect(screen.getByTestId('thousands')).toHaveValue('50.000 Zoll');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,6666 Liter');
        expect(screen.getByTestId('truncated')).toHaveValue('50.000,44 Liter');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78 Meilen pro Stunde');
        expect(screen.getByTestId('single')   ).toHaveValue('1 Fuß');
      } else {
        expect(screen.getByTestId('thousands')).toHaveValue('50.000');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50.000,6666');
        expect(screen.getByTestId('truncated')).toHaveValue('50.000,44');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50.000,78');
        expect(screen.getByTestId('single')   ).toHaveValue('1');
      }
    });
  });

  describe('hi-IN', function() {
    beforeEach(function() {
      render(
        <>
          <UnitName input locale="hi-IN" data-testid="thousands" unit="inch"          value={5000000} />
          <UnitName input locale="hi-IN" data-testid="decimal"   unit="liter"         value={5000000.6666} onValueChange={onValueChange} />
          <UnitName input locale="hi-IN" data-testid="truncated" unit="liter"         value={5000000.4444} decimalScale={2} />
          <UnitName input locale="hi-IN" data-testid="rounded"   unit="mile-per-hour" value={5000000.7777} decimalScale={2} />
          <UnitName input locale="hi-IN" data-testid="single"    unit="foot"          value={1}          decimalScale={2} />
        </>
      );
    });

    it('should format the value as expected.', () => {
      if (supported) {
        expect(screen.getByTestId('thousands')).toHaveValue('50,00,000 इंच');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,00,000.6666 लीटर');
        expect(screen.getByTestId('truncated')).toHaveValue('50,00,000.44 लीटर');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,00,000.78 मील प्रति घंटा');
        expect(screen.getByTestId('single')   ).toHaveValue('1 फ़ुट');
      } else {
        expect(screen.getByTestId('thousands')).toHaveValue('50,00,000');
        expect(screen.getByTestId('decimal')  ).toHaveValue('50,00,000.6666');
        expect(screen.getByTestId('truncated')).toHaveValue('50,00,000.44');
        expect(screen.getByTestId('rounded')  ).toHaveValue('50,00,000.78');
        expect(screen.getByTestId('single')   ).toHaveValue('1');
      }
    });
  });
});

