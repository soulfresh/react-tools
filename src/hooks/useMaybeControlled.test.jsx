import React from 'react';
import { render, act } from '@testing-library/react';
import { useMaybeControlled } from './useMaybeControlled';

/** @param {*} [props] */
const Example = ({value: v, setValue: setV, defaultValue: defaultV, children}) => {
  children(
    useMaybeControlled(v, setV, defaultV)
  );
  return null;
}

const mostRecentCall = mockFunc => mockFunc.mock.calls.slice(-1)[0][0];

describe('useMaybeControlled', () => {
  let setValue, children;

  beforeEach(() => {
    setValue = jest.fn();
    children = jest.fn();
  });

  describe('uncontrolled', () => {
    describe('with a default value', () => {
      beforeEach(() => {
        render(
          <Example
            setValue={setValue}
            defaultValue={20}
            children={children}
          />
        );
      });

      it('should indicate that it is uncontrolled.', () => {
        expect(children).toHaveBeenCalledTimes(1);
        expect(children).toHaveBeenCalledWith([
          expect.anything(),
          expect.anything(),
          false
        ]);
      });

      it('should return the default value and a setter function.', () => {
        expect(children).toHaveBeenCalledWith([
          20,
          expect.any(Function),
          expect.anything()
        ]);
      });

      describe('after calling the setter', () => {
        beforeEach(() => {
          const setter = mostRecentCall(children)[1];
          act(() => setter(30));
        });

        it('should rerender with the updated value.', () => {
          expect(children).toHaveBeenCalledTimes(2);
          expect(children).toHaveBeenCalledWith([
            30,
            expect.any(Function),
            false
          ]);
        });

        it('should call through to the parent setter prop.', () => {
          expect(setValue).toHaveBeenCalledTimes(1);
          expect(setValue).toHaveBeenCalledWith(30);
        });
      });
    });

    describe('without a default value or a setter prop', () => {
      beforeEach(() => {
        render(
          <Example
            children={children}
          />
        );
      });

      it('should return undefined as the default value.', () => {
        expect(children).toHaveBeenCalledTimes(1);
        expect(children).toHaveBeenCalledWith([
          undefined,
          expect.any(Function),
          false
        ]);
      });

      describe('after calling the setter', () => {
        beforeEach(() => {
          const setter = mostRecentCall(children)[1];
          act(() => setter(40));
        });

        it('should rerender with the updated value.', () => {
          expect(children).toHaveBeenCalledTimes(2);
          expect(children).toHaveBeenCalledWith([
            40,
            expect.any(Function),
            false
          ]);
        });

        it('should not try to call through to the parent setter prop.', () => {
          expect(setValue).not.toHaveBeenCalled();
        });
      });
    });
  });

  describe('controlled', () => {
    beforeEach(() => {
      render(
        <Example
          value={10}
          setValue={setValue}
          children={children}
        />
      );
    });

    it('should indicate that it is controlled.', () => {
      expect(children).toHaveBeenCalledWith([
        expect.anything(),
        expect.anything(),
        true
      ]);
    });

    it('should return the value passed and a setter function.', () => {
      expect(children).toHaveBeenCalledTimes(1);
      expect(children).toHaveBeenCalledWith([
        10,
        expect.any(Function),
        expect.anything(),
      ]);
    });

    describe('after calling the setter', () => {
      beforeEach(() => {
        const setter = mostRecentCall(children)[1];
        act(() => setter(60));
      });

      it('should not rerender before the value is changed.', () => {
        expect(children).toHaveBeenCalledTimes(1);
      });

      it('should call through to the parent setter prop.', () => {
        expect(setValue).toHaveBeenCalledTimes(1);
        expect(setValue).toHaveBeenCalledWith(60);
      });
    });
  });
});

