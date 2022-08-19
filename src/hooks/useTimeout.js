import React from 'react';

/**
 * Returns a wrapper around `setTimeout` that will automatically clear the
 * timeout if the component is destroyed before the timeout. Use the returned
 * function in exactly the same manner as `setTimeout`.
 *
 * IMPORTANT: `useTimeout` returns a function that is a wrapper around
 * `setTimeout`. This means you need to call the returned wrapper function where
 * you need timeouts (as opposed to calling `useTimeout` where you need the
 * timeouts). This has the advantage that you can use the returned function even
 * in places where hooks can't be used (ex. conditional statements, inside
 * callbacks or effects, etc).
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
  const idRef = React.useRef([]);

  React.useEffect(() => {
    return () => {
      // When the component is destroyed,
      // if the timeout was created, then clear it.
      idRef.current.forEach(id => {
        clearTimeout(id);
      })
    };
  }, []);

  return React.useCallback((cb, delay, ...rest) => {
    const t = setTimeout(() => {
      idRef.current = idRef.current.filter(id => id !== t)

      cb(...rest);
    }, delay);

    idRef.current.push(t);
    return t;
  }, []);
}

