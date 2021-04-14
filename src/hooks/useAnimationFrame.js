import React from 'react';

/**
 * Returns a wrapper around `requestAnimationFrame` that will
 * automatically clear the request if the component
 * is destroyed before the frame is rendered.
 */
export function useAnimationFrame() {
  const idRef = React.useRef();

  React.useEffect(() => {
    return () => {
      // When the component is destroyed,
      // if the timeout was created, then clear it.
      if (idRef.current) {
        cancelAnimationFrame(idRef.current);
      }
    };
  }, []);

  return (cb, ...rest) => {
    return idRef.current = requestAnimationFrame(() => {
      idRef.current = null;
      cb(...rest);
    });
  };
}
