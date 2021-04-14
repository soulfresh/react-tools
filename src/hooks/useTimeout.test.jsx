import React from 'react';
import { render } from '@testing-library/react';

import { useTimeout } from './useTimeout';

describe('useTimeout', () => {
  let id, spy, unmount;
  const delay = 60;

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
