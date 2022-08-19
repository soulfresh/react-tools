import React from 'react';
import { render } from '@testing-library/react';

import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  let id, id2, spy, unmount;
  const delay = 60;

  describe('with a single timeout', () => {
    const Component = ({ done }) => {
      const timeout = useTimeout();
      id = timeout(done, delay);
      return null;
    };

    beforeEach(() => {
      spy = jest.fn();

      ({unmount} = render(
        <Component done={spy} />
      ));
    });

    describe('after the timeout', () => {
      beforeEach((done) => {
        // Wait for the delay to pass and then
        // check to see if the spy was called.
        setTimeout(done, delay);
      });

      it('should call the spy.', () => {
        expect(spy).toHaveBeenCalledTimes(1);
      });

      it('should return a timeout id to cancel the timeout.', () => {
        expect(id).toBeGreaterThan(0);
      });
    });

    describe('before the timeout', () => {
      it('should not have called the spy.', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('after being destroyed', () => {
      beforeEach((done) => {
        unmount();
        setTimeout(done, delay * 2);
      });

      it('should not call the spy.', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });

  describe('with multiple timeouts', () => {
    const Component = ({ done }) => {
      const timeout = useTimeout();
      id = timeout(done, delay);
      id2 = timeout(done, delay);
      return null;
    };

    beforeEach(() => {
      spy = jest.fn();

      ({unmount} = render(
        <Component done={spy} />
      ));
    });

    describe('after the timeout', () => {
      beforeEach((done) => {
        // Wait for the delay to pass and then
        // check to see if the spy was called.
        setTimeout(done, delay);
      });

      it('should call the spy twice.', () => {
        expect(spy).toHaveBeenCalledTimes(2);
      });

      it('should return all timeout ids.', () => {
        expect(id).toBeGreaterThan(0);
        expect(id2).toBeGreaterThan(0);
      });
    });

    describe('before the timeout', () => {
      it('should not have called the spy.', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });

    describe('after being destroyed', () => {
      beforeEach((done) => {
        unmount();
        setTimeout(done, delay * 2);
      });

      it('should not call the spy.', () => {
        expect(spy).not.toHaveBeenCalled();
      });
    });
  });
});
