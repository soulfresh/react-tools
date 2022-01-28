import React from 'react';
import PropTypes from 'prop-types';
import { mergeRefs } from 'react-laag';
import { useSelect } from 'downshift';
import { combineClasses } from '@thesoulfresh/utils';

import { Popover, Trigger } from '../popover/Popover.jsx';

import styles from './Select.module.scss';

/**
 * @typedef {object} SelectMenuProps
 * @property {*} [ref]
 * @property {*[]} items
 * @property {function} [itemToString]
 * @property {*} [selectedItem]
 * @property {number} [highlightedIndex]
 * @property {function} getItemProps
 * @property {string} [className]
 * @property {boolean} [isOpen]
 * @property {*} children
 */
/**
 * @type React.FC<SelectMenuProps>
 */
export const SelectMenu = React.forwardRef(({
  isOpen,
  items,
  itemToString,
  selectedItem,
  highlightedIndex,
  getItemProps,
  className,
  children,
  ...rest
}, ref) => {
  console.log('highlightedIndex', highlightedIndex);
  return (
    <ol
      className={combineClasses(
        styles.SelectMenu,
        className,
        'menu',
        !!selectedItem ? 'hasValue' : null,
        isOpen ? 'open' : 'closed',
      )}
      {...rest}
      ref={ref}
    >
      {items && items.map((item, i) =>
        // eslint-disable-next-line jsx-a11y/role-supports-aria-props
        <li
          key={i}
          className={combineClasses(
            'menu-item',
            item === selectedItem ? 'selected' : null,
            i === highlightedIndex ? 'highlighted' : null,
          )}
          {...getItemProps({item, index: i})}
          aria-selected={(highlightedIndex === -1 && item === selectedItem) || i === highlightedIndex}
          children={typeof(children) === 'function'
            ? children(item, item === selectedItem, i === highlightedIndex, i)
            : !!itemToString
              ? itemToString(item)
              : String(item)
          }
        />
      )}
    </ol>
  );
});


/**
 * @typedef {object} SelectProps
 * @property {*[]} options
 * @property {function} [optionToString]
 * @property {*} [value]
 * @property {function} [onChange]
 * @property {function} content
 * @property {*} children
 * @property {*} [label]
 * @property {function} [onOpen]
 * @property {function} [onClose]
 * @property {boolean} [isOpen]
 * @property {object} [layerOptions]
 * @property {object} [selectOptions]
 * @property {string} [className]
 * @property {string} [transitionProperty]
 * @property {boolean} [disableTransitions]
 * @property {boolean} [disableArrow]
 * @property {object} [wrapperProps]
 */
/**
 * `<Select>` renders a list of items for the user to select
 * similar to a native select element. The difference is you
 * have full control over the rendering of the select options.
 * This component is fully ARIA complient thanks to the `Downshift`
 * library used under the hood. Additionally, this component
 * allows you to use CSS transitions for the enter/leave state
 * of the menu.
 *
 * #### Usage
 *
 * This component takes a trigger element or function as it's `children`
 * (this should be a `<button>` for accessiblity)
 * and a `content` function for rendering each of the select
 * options. If you pass a function as the `children` prop, it
 * will receive both the props to apply to your returned trigger
 * element and the currently selected item which you can use
 * in rendering your trigger. The `content` prop will be called
 * for each option to render and will receive the props to
 * apply to that item, the item being rendered, whether that
 * item is the currently selected item and the current index.
 *
 * Additionally, this component can function as either a controlled
 * or uncontrolled component. It becomes controlled if `isOpen`
 * is anything other than undefined. When this is the case, you should
 * provide the `onOpen` and `onClose` callbacks in order to show/hide
 * the component.
 *
 * #### Downshift
 *
 * Under the hood, this component uses the `Downshift` library
 * to handle ARIA and other select element functionality. You
 * can pass any options along to the `useSelect` hook via the
 * `selectOptions` prop.
 *
 * See https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#basic-props
 *
 * #### Popover
 *
 * This component builds off of the `<Popover>` component
 * so all of its documentation is relavent to this component.
 * This includes all of the CSS styling options and
 * the `layerOptions` prop for customizing
 * the `useLayer()` hook from `react-laag`.
 *
 * #### Styling
 *
 * The following classes can be used to help you style
 * your menu:
 *
 * - `menu`: This class is applied to the `<ol>` element that wraps your menu items.
 * - `menu-item`: This class is applied to the `<li>` elements that wrapy your individual items.
 * - `selected`: This class is applied to the `menu-item` that is currently selected.
 * - `highlighted`: This class is applied to the `menu-item` that is currently highlighted
 *     by the user, either through the mouse or keyboard events.
 * - `open`: When the menu is visible (including when it is transitioning to and from the open state).
 * - `closed`: When the menu is not visible.
 * - `content`: This class is applied to the wrapper around the `<ol>` element which is positioned
 *     above the arrow.
 * - `arrow`: This class is applied to the arrow rectangle.
 * - `hasValue`: This class is applied to the trigger element and the wrapping `<ol>` element
 *     if a value is currently selected.
 * - className: The className prop will be pass to the outer most element around the
 *     arrow and content.
 *
 * For a good example of how to style this component,
 * see the `examples` folder in this package.
 *
 * @type React.FC<SelectProps>
 */
export const Select = React.forwardRef(({
  options,
  optionToString = item => item ? String(item) : '',
  value,
  onChange,
  content,
  children,
  onOpen,
  onClose,
  isOpen,
  layerOptions,
  selectOptions,
  label,
  transitionProperty,
  disableTransitions,
  disableArrow,
  wrapperProps,
  className,
  ...rest
}, ref) => {
  const handleChange = state => {
    if (onChange) onChange(state.selectedItem, state);
  };

  const handleOpenStateChange = state => {
    if (state.isOpen && onOpen) onOpen(state);
    else if (!state.isOpen && onClose) onClose(state);
  };

  const {
    isOpen: isOpenLocal,
    selectedItem,
    highlightedIndex,
    getLabelProps,
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    isOpen,
    items: options || [],
    itemToString: optionToString,
    selectedItem: value,
    onIsOpenChange: handleOpenStateChange,
    onSelectedItemChange: handleChange,
    ...selectOptions
  });

  const labelProps = getLabelProps();

  const {ref: triggerRef, ...triggerProps} = getToggleButtonProps({
    // If non-function children are passed, ensure their props are retained.
    ...children?.props,
    className: combineClasses(
      children?.props?.className,
      !!selectedItem ? 'hasValue' : null
    ),
  });

  if (!label) {
    // If we don't include a label element, then
    // we should associate the trigger element with
    // the menu instead of the label element.
    triggerProps.id = labelProps.id;
    delete triggerProps['aria-labelledby'];
  }

  const {ref: contentRef, ...contentProps} = getMenuProps({ref, ...rest});

  let trigger = typeof(children) === 'function'
    ? children(triggerProps, selectedItem)
    : React.cloneElement(children, triggerProps);

  return (
    <Popover
      data-testid="Select"
      isOpen={isOpenLocal}
      layerOptions={layerOptions}
      className={combineClasses(styles.Select, className)}
      persistent
      disableArrow={disableArrow}
      disableTransitions={disableTransitions}
      transitionProperty={transitionProperty}
      content={
        <SelectMenu
          isOpen={isOpenLocal}
          items={options}
          itemToString={optionToString}
          selectedItem={selectedItem}
          highlightedIndex={highlightedIndex}
          getItemProps={getItemProps}
          children={content}
          ref={contentRef}
          {...contentProps}
        />
      }
      children={
        label
          ? (
            <span>
              { label }
              <Trigger
                children={trigger}
                ref={mergeRefs(triggerRef, trigger?.ref)}
              />
            </span>
          )
          : (
            <Trigger
              children={trigger}
              ref={mergeRefs(triggerRef, trigger?.ref)}
            />
          )
      }
      {...wrapperProps}
    />
  );
});

Select.propTypes = {
  /**
   * The list of items to render as select options.
   * These can be of any type and will be pass back to
   * your content render function when rendering the select options.
   */
  options: PropTypes.arrayOf(PropTypes.any).isRequired,
  /**
   * This is a callback that will be used to convert
   * each item into a string for user in ARIA properties.
   * This function is only required if the items you
   * pass are not strings. It recieves the item and
   * should return the string representation of that item.
   *
   * @param {*} item
   */
  optionToString: PropTypes.func,
  /**
   * Passing a value prop allows you to control the component's
   * selected item state. If you pass a value, you should also
   * pass the `onChange` prop which should update the `value`
   * as needed. If you don't pass a `value`, the the component
   * will maintain its own state.
   */
  value: PropTypes.any,
  /**
   * This callback will be called whenever the selected
   * item changes.
   *
   * It is called with the following parameters:
   *
   * @param {*} item - The newly selected item.
   * @param {object} updateData - The full Downshift update.
   */
  onChange: PropTypes.func,
  /**
   * A function that is used to render each of the items
   * in your select. You can return any JSX from this function
   * and it will be rendered.
   *
   * The callback receives the following parameters:
   *
   * @param {*} item - An item from the `items` prop which is the
   *   item being rendered.
   * @param {boolean} selected - Whether the current item is the
   *   selected item.
   * @param {boolean} highlighted - Whether the current item is
   *   currently highlighted by the user.
   * @param {number} index - The index of this item in the `items`
   *   prop array.
   *
   * If you don't pass the content prop, the items will be rendered
   * as strings and you can use the `.menu-item` class to style them.
   */
  content: PropTypes.func,
  /**
   * The element to render as the select trigger. This can be
   * either a JSX node or a function. The function variant is useful
   * because it will receive the currently selected item which you
   * can use to set the text of your trigger element.
   * Your trigger element should be a button for accessiblility purposes.
   *
   * The function variant will be called with the following parameters:
   *
   * @param {object} props - Props to apply to the trigger element.
   * @param {*} item - The currently selected item.
   */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
  /**
   * The `<label>` element to use as the label describing this select.
   * ex: `<Select label={<label>Select Description</label>} />`
   */
  label: PropTypes.node,
  /**
   * A callback that will be called whenever the menu is opened.
   * This is required if you use this component in a controlled fashion.
   */
  onOpen: PropTypes.func,
  /**
   * A callback that will be called whenever the menu is closed.
   * This is required if you use this component in a controlled fashion.
   */
  onClose: PropTypes.func,
  /**
   * The current open state of the menu. You only need to use this
   * if you want to control the open state of the menu yourself.
   * If you do pass this prop, then you will also need to pass the
   * `onOpen` and `onClose` props which will be called whenever
   * Downshift determines that the menu should be opened or closed.
   */
  isOpen: PropTypes.bool,
  /**
   * Any additional properties that you'd like to pass to the
   * `useSelect` hook from `Downshift`.
   *
   * See https://github.com/downshift-js/downshift/tree/master/src/hooks/useSelect#basic-props
   */
  selectOptions: PropTypes.object,
  /**
   * Configure options for the tooltip layer.
   * Since this component uses `react-laag` under the
   * hood, these options are pass directly to the
   * `useLayer` hook.
   * See https://github.com/everweij/react-laag#uselayeroptions
   */
  layerOptions: PropTypes.object,
  /**
   * The property that the `useEnterExit()` hook should
   * listen to for `transitionend` events which signify
   * the popover content can be removed. See the
   * [useEnterExit](/?path=/docs/hooks-useenterexit--page)
   * for more information.
   */
  transitionProperty: PropTypes.string,
  /**
   * Disable the `useEnterExit()` hook from listening
   * to `transitionend` events before removing the popover content.
   */
  disableTransitions: PropTypes.bool,
  /**
   * Allows you to remove the arrow element from the popover content.
   */
  disableArrow: PropTypes.bool,
  /**
   * The className will be applied to the outer div
   * that wraps both the `content` and `arrow` divs.
   * This allows you to scope the `content` and `arrow`
   * selectors to your specific tooltip component.
   */
  className: PropTypes.string,
  /**
   * Any props you would like to pass to the
   * popover `content` element which wraps the `<ol>`.
   */
  wrapperProps: PropTypes.object,
  /**
   * Any other props you pass will be applied to the
   * popover menu wrapper div.
   */
  // @ts-ignore
  'other props...': PropTypes.any,
};

