import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';

import { Percent } from './Percent.jsx';

describe('Percent', () => {
  let onValueChange;

  beforeEach(function() {
    onValueChange = jest.fn();
  });

  describe('en-US', () => {
    xit('should place the percent symbol after the number.', () => {});
    xit('should show decimal values as a percentage.', () => {});
    xit('should show the defaultValue as a percentage.', () => {});
    describe('after changing the value', () => {
      xit('should emit the floatValue and value as decimal values.', () => {});
      xit('should emit the formatted value as a percentage value.', () => {});
    });
  });

  describe('precision', () => {
    let rerender;
    beforeEach(() => {
      ({rerender} = render(
        <Percent
          data-testid="input"
          input
          value={8500}
          precision={4}
          onValueChange={onValueChange}
        />
      ));
    });

    it('should accept values in the given precision.', () => {
      expect(screen.getByTestId('input')).toHaveValue('85%');
    });

    it('should not emit a value change.', () => {
      expect(onValueChange).not.toHaveBeenCalled();
    });

    describe('after changing the value', () => {
      beforeEach(() => {
        fireEvent.change(screen.getByTestId('input'), {target: {value: '44.00'}});
      });

      it('should format the input text.', () => {
        expect(screen.getByTestId('input')).toHaveValue('44.00%');
      });

      it('should include the integer prop in the onValueChange callback.', () => {
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith({
          formattedValue: '44.00%',
          value: '0.44',
          floatValue: 0.44,
          integer: 4400,
          info: expect.any(Object),
        })
      });
    });

    describe('after rerendering with a null value', () => {
      beforeEach(() => {
        rerender(
          <Percent
            data-testid="input"
            input
            value={null}
            precision={4}
            onValueChange={onValueChange}
          />
        )
      });

      it('should render an empty input.', () => {
        expect(screen.getByTestId('input')).toHaveValue('');
      });

      it('should emit a value change event.', () => {
        expect(onValueChange).toHaveBeenCalledTimes(1);
        expect(onValueChange).toHaveBeenCalledWith({
          formattedValue: '',
          value: '',
          floatValue: null,
          integer: null,
          info: expect.any(Object),
        });
      })
    });
  });

  describe('xx-XX', () => {
    // Some locales should do this but I'm not sure which ones.
    xit('should place the percent symbol before the number.', () => {});
  });
});
