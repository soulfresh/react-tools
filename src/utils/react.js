
/**
 * Determine if a component's children are text.
 * @param {*} children
 * @return {boolean}
 */
export function isReactText(children) {
  return ["string", "number"].includes(typeof children);
}
