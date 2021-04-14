import React from 'react';

import { useTimeout } from '../useTimeout';

/**
 * Track focus inside of a component. This is useful for
 * components that may have multiple focusable children
 * and will only call the blur callback if none of the
 * children have focus. Because of focus event ordering,
 * the blur event will occure one tick after focus leaves
 * the component.
 *
 * @param {function} [onFocus] - This callback will be called
 *   after focus is first recieved by the component or any
 *   of it's children.
 * @param {function} [onBlur] - This callback will be called
 *   after blur of the component and all of it's children.
 * @param {boolean} [active] - Allows you to toggle listening
 *   on and off. When off, all event listeners are removed
 *   for efficiency.
 *
 * @return {object} Returns an object with a `ref` to attach
 * to the root of your component and `focused` which tells
 * you if the component is currently focused.
 */
export function useFocus(onFocus, onBlur, active = true) {
  const ref = React.useRef();

  const [focused, setFocused] = React.useState(false);
  const [id, setId] = React.useState(null);

  const wait = useTimeout();

  React.useEffect(() => {
    if (active && ref.current) {
      const el = ref.current;

      const cancel = () => {
        clearTimeout(id);
        setId(null);
      };

      const handleFocus = e => {
        if (id) cancel();
        setFocused(true);
        if (onFocus) onFocus(e);
      };

      const handleBlur = e => {
        const tid = wait(() => {
          setFocused(false);
          setId(null);
          if (onBlur) onBlur(e);
        });

        setId(tid);
      };

      el.addEventListener('focusin', handleFocus);
      el.addEventListener('focusout', handleBlur);

      return () => {
        el.removeEventListener('focusin', handleFocus);
        el.removeEventListener('focusout', handleBlur);
      };
    }
  }, [active]); // eslint-disable-line react-hooks/exhaustive-deps

  return { ref, focused };
}
