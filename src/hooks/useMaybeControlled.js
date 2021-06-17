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
 * - `return[0]` gives you the state value.
 *
 * - `return[1]` gives you a function to set either the
 * local value or the external value when the component
 * is being controlled. When in a controlled situation
 * but `setValue` is not passed, calling `return[1]` has
 * no effect. This can be useful if you want to notify
 * the external state of value changes but you don't actually
 * want to change the value.
 *
 * - `return[2]` tells you if the value is controlled externally.
 *
 * #### Example
 *
 * In this example, your component controls its state unless
 * the user passes something for the value prop. In that case,
 * the user must pass both the `value` and `setValue` props in order
 * to control the component's state.
 *
 * ```js
 *     function MyComponent({
 *       value,
 *       setValue,
 *     }) {
 *       const [valueLocal, setValueLocal, isControlled] = useMaybeControlled(value, setValue);
 *
 *       // Now you can use 'valueLocal' instead of 'value'.
 *       // You should also use 'setValueLocal' instead of 'setValue'.
 *       // You can also use the 'isControlled' value to do specific
 *       // work if the component is being controlled.
 *     }
 * ```
 *
 * #### Example 2
 *
 * In this example, you want to provide two different callbacks
 * for setting a toggle state instead of a single `setValue` prop.
 *
 * ```js
 *     function MyComponent({
 *       value,
 *       onOpen,
 *       onClose,
 *     }) {
 *       const [valueLocal, setValueLocal, isControlled] = useMaybeControlled(
 *         value,
 *         v => {
 *           if (!!v && onOpen) onOpen();
 *           else if (!v && onClose) onClose();
 *         }
 *       );
 *
 *       // Now you use 'valueLocal' and 'setValueLocal' in place of
 *       // the versions from props.
 *     }
 * ```
 *
 * @param {*} [value] - The possible external value to track.
 * @param {function} [setValue] - The external setter for changing
 * the external value.
 * @return {Array} Returns an array structured as
 *   [value: *, setValue: function, isControlled: boolean]
 */
export function useMaybeControlled(value, setValue) {
  const [localValue, setLocalValue] = React.useState(value);
  const isControlled = value !== undefined;

  const handleValueChange = v => {
    // If this is not a controlled component, then
    // set the local value to force a re-render.
    if (!isControlled) setLocalValue(v);
    // Otherwise, push the update to the external
    // state and we will re-render once the external
    // value changes.
    else if (setValue && v !== value) setValue(v);
  };

  return [
    isControlled ? value : localValue,
    handleValueChange,
    isControlled
  ];
}

