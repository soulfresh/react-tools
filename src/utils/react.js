
/**
 * Determine if a component's children are text.
 * @param {*} children
 * @return {boolean}
 */
export function isReactText(children) {
  return ["string", "number"].includes(typeof children);
}

/**
 * Combines a list of functions into a single function
 * that forwards its parameters to all of the functions you passed.
 * The functions will be called in the order they are received.
 * This is usefull when you want to merge callbacks
 * from multiple sources into one.
 *
 * Additionally, any undefined or null functions will
 * be filtered out allowing you to pass functions
 * that may or not be defined at run time.
 *
 * ```js
 * const parentOnFocus = (e) => console.log('PARENT', e);
 * const localOnFocus = (e) => console.log('LOCAL', e);
 *
 * const onFocus = mergeCallbacks(parentOnFocus, localOnFocus, otherOnFocus);
 *
 * onFocus('foo');
 * // The following will be output to the console.
 * // --> 'PARENT foo'
 * // --> 'LOCAL foo'
 * // 'otherOnFocus' was filtered because it is undefined
 * ```
 * @param {...function} callback - Any callback functions you want to combine
 *   into a single function.
 * @return {function}
 */
export function mergeCallbacks() {
  const callbacks = Array.from(arguments).filter(arg => typeof(arg) === 'function');
  return (...args) => callbacks.forEach(cb => cb(...args));
}

