import React from 'react';

/**
 * Calls the provided callback on key down once while
 * the active flag is true. Toggling the flag resets the
 * counter allowing the callback to be tracked again.
 *
 * For efficiency, all event listeners are removed when active is false.
 *
 * @param {string} key - The event.key value
 * @param {function} cb
 * @param {boolean} active - Whether or not event listening is
 *   currently enabled.
 */
export function useKeyWhenActive(key, cb, active = true) {
  // Track the first key event after the props change.
  const pressed = React.useRef(false);

  React.useEffect(() => {
    if (active) {
      const onKeyDown = e => {
        if (e.key === key && !pressed.current) {
          pressed.current = true;
          cb(e);
        }
      };

      const onKeyUp = e => {
        if (e.key === key) {
          pressed.current = false;
        }
      };

      // TODO Optimize for many listeners
      window.addEventListener('keydown', onKeyDown);
      window.addEventListener('keyup', onKeyUp);

      return () => {
        window.removeEventListener('keydown', onKeyDown);
        window.removeEventListener('keyup', onKeyUp);
      };
    } else {
      pressed.current = false;
    }
  }, [active, key, cb]);
}
