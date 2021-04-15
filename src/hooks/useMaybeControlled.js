import React from 'react';

/**
 * Allows you to use a value that can either be set
 * externally or managed internally (ie. controlled vs
 * uncontrolled components). This hook works similar
 * to `React.useState` but returns an additional third
 * boolean which tells you if the value is controlled
 * externally. This is the case if the value is anything
 * other than undefined.
 *
 * `return[0]` gives you the state value.
 *
 * `return[1]` gives you a function to set either the
 * local value or the external value if you also passed
 * the `setValue` parameter. When in a controlled situation
 * but `setValue` is not passed, calling `return[1]` has
 * no effect. This can be useful if you want to notify
 * the external state of value changes but you don't actually
 * want to change the value.
 *
 * `return[2]` tells you if the value is controlled externally.
 *
 * @param {*} [value] - The possible external value to track.
 * @param {function} [setValue] - The external setter for changing
 * the external value.
 * @return {[*, function, boolean]}
 */
export function useMaybeControlled(value, setValue) {
  const [localValue, setLocalValue] = React.useState(value);
  // const isControlled = !!setValue;
  const isControlled = value !== undefined;

  // Keep the local value in sync with the
  // external value. This allows the consumer to
  // use the local value without worrying about
  // who's controlling it.
  React.useEffect(() => {
    setLocalValue(value);
  }, [value]);

  const handleValueChange = value => {
    // If this is not a controlled component, then
    // set the local value to force a re-render.
    if (!isControlled) setLocalValue(value);
    // Otherwise, push the update to the external
    // state and we will re-render once the external
    // value changes.
    else if (setValue) setValue(value);
  }

  return [localValue, handleValueChange, isControlled];
}
