import React from 'react';

let counter = 0;

/**
 * Generate a unique id string. This id will
 * not repeat for the duration of the applicaiton.
 * However, it is predictable so do not use it
 * for sensitive or secure information.
 *
 * @param {string} [prefix] - A string to use as
 *   the prefix of the id.
 * @return {string} A unique string that can be
 * use in the application.
 */
export function useId(prefix) {
  const [id] = React.useState(() => ++counter);
  return String(prefix) + String(id);
}
