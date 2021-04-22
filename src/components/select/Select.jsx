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
 */
/**
 * @type React.FC<SelectMenuProps>
 */
export const SelectMenu = React.forwardRef(({
  items,
  selectedItem,
  getItemProps,
  className,
  children,
  ...rest
}, ref) => {
  return (
    <ol
      className={combineClasses(styles.SelectMenu, className, 'menu')}
      {...rest}
      ref={ref}
    >
      {items && items.map((item, i) =>
        <li
          key={i}
          className={combineClasses(
            'menu-item',
            item === selectedItem ? 'selected' : null,
          )}
          className="menu-item"
          children={children(
            getItemProps({item, index: i}),
            item,
            item === selectedItem,
            i
          )}
        />
      )}
    </ol>
  );
});


/**
 * @typedef {object} SelectProps
 * @property {*[]} items
 * @property {function} itemToString
 * @property {function} onChange
 * @property {function} content
 * @property {*} children
 * @property {function} onOpen
 * @property {function} onClose
 * @property {boolean} isOpen
 * @property {object} layerOptions
 * @property {object} selectOptions
 * @property {string} className
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
 * (this should be a `<button>` or `<a>` for accessiblity)
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
 * - `content`: This class is applied to the wrapper around the `<ol>` element which is positioned
 *     above the arrow.
 * - `arrow`: This class is applied to the arrow rectangle.
 * - className: The className prop will be pass to the outer most element around the
 *     arrow and content.
 *
 * @type React.FC<SelectProps>
 */
export const Select = React.forwardRef(({
  items,
  itemToString = item => item ? String(item) : '',
  onChange,
  content,
  children,
  onOpen,
  onClose,
  isOpen,
  layerOptions,
  selectOptions,
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
    getToggleButtonProps,
    getMenuProps,
    getItemProps,
  } = useSelect({
    isOpen,
    items,
    itemToString,
    onIsOpenChange: handleOpenStateChange,
    onSelectedItemChange: handleChange,
    ...selectOptions
  })

  const {ref: triggerRef, ...triggerProps} = getToggleButtonProps(children?.props);

  const {ref: contentRef, ...contentProps} = getMenuProps();

  // TODO This doesn't seem to work with non-button elements.
  // TODO Clicking on the button is causing the page to scroll to the top.
  let childrenFunc = children;
  if (typeof(children) !== 'function') {
    childrenFunc = props => React.cloneElement(content, props);
  }

  return (
    <Popover
      data-testid="Select"
      ref={contentRef}
      isOpen={isOpenLocal}
      contentWrapperProps={contentProps}
      layerOptions={layerOptions}
      className={combineClasses(styles.Select, className)}
      content={
        <SelectMenu
          items={items}
          selectedItem={selectedItem}
          getItemProps={getItemProps}
          children={content}
        />
      }
      children={
        <Trigger
          children={childrenFunc(triggerProps, selectedItem)}
          ref={mergeRefs(triggerRef, children?.ref)}
        />
      }
      {...rest}
    />
  );
});

Select.propTypes = {
  /**
   * The list of items to render as select options.
   * These can be of any type and will be pass back to
   * your content render function when rendering the select options.
   */
  items: PropTypes.arrayOf(PropTypes.any).isRequired,
  /**
   * This is a callback that will be used to convert
   * each item into a string for user in ARIA properties.
   * This function is only required if the items you
   * pass are not strings. It recieves the item and
   * should return the string representation of that item.
   *
   * @param {*} item
   */
  itemToString: PropTypes.func,
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
   * The callback recieves the following parameters:
   *
   * @param {object} props - The props that you must apply to
   *   your returned element.
   * @param {*} item - An item from the `items` prop which is the
   *   item being rendered.
   * @param {boolean} selected - Whether the current item is the
   *   selected item.
   * @param {number} index - The index of this item in the `items`
   *   prop array.
   */
  content: PropTypes.func.isRequired,
  /**
   * The element to render as the select trigger. This can be
   * either a JSX node or a function. The function variant is useful
   * because it will receive the currently selected item which you
   * can use to set the text of your trigger element.
   * Your trigger can be any valid JSX but it is recommended that you return a button
   * or link for accessiblility purposes.
   *
   * The function variant will be called with the following parameters:
   *
   * @param {object} props - Props to apply to the trigger element.
   * @param {*} item - The currently selected item.
   */
  children: PropTypes.oneOfType([PropTypes.func, PropTypes.node]).isRequired,
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
   * Any other props you pass will be applied to the
   * popover `content` div.
   */
  // @ts-ignore
  'other props...': PropTypes.any,
};

