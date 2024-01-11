import React from 'react';

/**
 * Determine if a component is currently mounted.
 * Use this in instances where you need to ensure that async
 * actions only happen while a component is mounted and
 * you are unable to cancel those async actions on unount.
 * It is preferred to cancel an async work started by your
 * component if possible.
 */
export function useIsMounted() {
  const state = React.useRef(true);

  React.useEffect(() => {
    // React 18 will double render this effect during development so we need to
    // ensure the state is reset to true.
    state.current = true;
    return () => {
      state.current = false;
    }
  }, []);

  return React.useCallback(() => state.current, []);
}
