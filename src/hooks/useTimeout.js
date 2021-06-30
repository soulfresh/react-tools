import React from 'react';

/**
 * Returns a wrapper around `setTimeout` that will
 * automatically clear the timeout if the component
 * is destroyed before the timeout. Use it in exactly
 * the same manner as `setTimeout`
 *
 * ```js
 * const wait = useTimeout();
 * if (something) {
 *   wait(() => console.log('Did it'), 1000);
 * }
 * ```
 *
 * @return {function}
 */
export function useTimeout() {
  const idRef = React.useRef();

  React.useEffect(() => {
    return () => {
      // When the component is destroyed,
      // if the timeout was created, then clear it.
      if (idRef.current) {
        clearTimeout(idRef.current);
      }
    };
  }, []);

  return (cb, delay, ...rest) => {
    return idRef.current = setTimeout(() => {
      idRef.current = null;
      cb(...rest);
    }, delay);
  };
}
