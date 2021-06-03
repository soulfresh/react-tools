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
 * @param {Window|HTMLElement} [el] - The element on which to listen for key events.
 *   Defaults to window.
 */
export function useKeyWhenActive(key, cb, active = true, el = window) {
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
      el.addEventListener('keydown', onKeyDown);
      el.addEventListener('keyup', onKeyUp);

      return () => {
        el.removeEventListener('keydown', onKeyDown);
        el.removeEventListener('keyup', onKeyUp);
      };
    } else {
      pressed.current = false;
    }
  }, [active, key, cb, el]);
}

