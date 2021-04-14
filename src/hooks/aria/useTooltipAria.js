import { useId } from '../useId';

/**
 * Generate the ARIA attributes required for a tooltip.
 * This will return two objects, one with the properties to
 * attach to the tooltip trigger and one to attach to the
 * tooltip content.
 *
 * This hook only provides ARIA related attributes like
 * `arai-describedby`. It does not handle keyboard or
 * other concerns.
 *
 * See https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/
 *
 * ```js
 * // "id" is an id prop received by your component in the case
 * // you need to use a specific id value.
 * const {triggerProps, tooltipProps} = useTooltipAria({id});
 * return (
 *    <div>
 *      <Tooltip {...triggerProps}></Tooltip>
 *      <span {...tooltipProps}>Tooltip content here!</span>
 *    </div>
 * );
 * ```
 *
 * @param {object} [options]
 * @param {string} [options.id] - The id value to use in order to
 *   connect the tooltip element to its trigger. If you do
 *   not pass this, then an id will be automatically generated
 *   for you.
 * @param {string} [options.prefix] - If you want to customize the
 *   name of the auto-generated id, you can pass a prefix
 *   which will then have a unique number suffixed to it.
 * @return {object} Returns an object with `triggerProps` and
 *   `tooltipProps` which should be applied to their associated
 *   elements.
 */
export function useTooltipAria({
  id,
  prefix = 'sf-tooltip',
}) {
  const ariaId = useId(prefix);

  // If an id was passed, use that. Otherwise generate one.
  id = id || ariaId;

  return {
    triggerProps: {
      tabIndex: 0,
      'aria-describedby': id,
    },
    tooltipProps: {
      id,
      role: 'tooltip',
    }
  };
}
