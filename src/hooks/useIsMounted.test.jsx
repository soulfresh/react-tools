import React from 'react';
import { render } from '@testing-library/react';

import { useIsMounted } from './useIsMounted';

describe('useIsMounted', () => {
  let isMounted, unmount;

  const Example = () => {
    isMounted = useIsMounted();
    return null;
  };

  beforeEach(() => {
    ({unmount} = render(<Example />));
  });

  it('should be able to tell when the component is mounted.', () => {
    expect(isMounted()).toBe(true);

    unmount();

    expect(isMounted()).toEqual(false);
  });
});
