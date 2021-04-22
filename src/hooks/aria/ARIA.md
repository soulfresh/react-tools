## Functions

* [useDialogAria(isOpen, onClose, [options])](#useDialogAria) ⇒ <code>object</code>
* [useTooltipAria(isOpen, onOpen, onClose, [options])](#useTooltipAria) ⇒ <code>object</code>

<a name="useDialogAria"></a>

## useDialogAria(isOpen, onClose, [options]) ⇒ <code>object</code>
A hook that generates the aria properties necessary to meet
the ARIA dialog pattern. In this pattern, a popover is opened/closed
by a trigger element and focus gets trapped within the popover
until it is closed. Keyboard events within the menu are dependent
on the contents of the menu.

See: https://www.w3.org/TR/wai-aria-practices/examples/dialog-modal/datepicker-dialog.html

This hook generates all of the necessary keyboard listeners
for the pattern as well as aria attributes. It does NOT handle
visibility/positioning of the menu or
mouse events for opening/closing the menu. It also follows the
controlled component pattern which means that you are responsible
for maintaining the open state of the menu.

#### Usage

This hook returns an object with properties that must be attached
to your trigger and menu elements. Additionally, there are 3 refs
you must attach to the trigger and the first/last elements in the
menu that can receive keyboard focus. These refs ensure that focus
is maintained within the menu when it is open and that the trigger
receives focus when the menu is closed.

#### Options

This hook will generate unique id attributes for both your
trigger and menu elements. However, you can pass your own
id values for these if you choose. This hook
will also set a tab index on your trigger element unless
you pass your own. This ensures that the trigger element
is keyboard reachable.

#### Return Value

Here is the structure of the object returned from this hook:

| Property | Type | Description |
| -------- | ---- | ----------- |
| **triggerRef** | `object` | A ref to attach to the element that opens the menu. |
| **firstFocusRef** | `object` | A ref to attach to the first element that will receive keyboard focus within the menu. |
| **lastFocusRef** | `object` | A ref to attach to the last element that will receive keyboard focus within the menu. |
| **triggerProps** | `object` | An object of properties to spread on your trigger element. |
| **triggerProps.id** | `string` | A unique id attribute for the trigger element. |
| **triggerProps.aria-controls** | `string` | The id attribute of the menu element. |
| **triggerProps.aria-expanded** | `boolean` | Whether the menu is currently open. |
| **triggerProps.tabIndex** | `number` | The tab index of the trigger element. |
| **menuProps** | `object` | An object of properties for the root of your menu element. |
| **menuProps.id** | `string` | A unique id attribute for the menu element. |
| **menuProps.arial-labelledby** | `string` | The id attribute of the menu element. |

#### API

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| isOpen | <code>boolean</code> | The current open state of the menu. |
| onClose | <code>function</code> | A callback that will be called when   the user tries to close the menu through keyboard events. |
| [options] | <code>object</code> |  |
| [options.menuId] | <code>string</code> | An id to use for the menu element   rather than generating one. |
| [options.triggerId] | <code>string</code> | An id to use for the trigger element   rather than generating one. |
| [options.tabIndex] | <code>number</code> | The tab index to use for your trigger   element. If not passed, then tabIndex will be 0, ensuring the button is part   of the standard tab order. |
| [options.prefix] | <code>string</code> | A prefix to use for the id names generated   for the trigger and menu elements. |

<a name="useTooltipAria"></a>

## useTooltipAria(isOpen, onOpen, onClose, [options]) ⇒ <code>object</code>
A hook that generates the aria properties necessary to meet the
ARIA tooltip pattern. In this pattern, a popover is opened/closed
by a trigger element when it is focused. The popover element cannot
receive focus itself but provides additional information about the
trigger element.

See https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/

This hook generates all of the necessary keyboard listeners
for the pattern as well as aria attributes. It does NOT handle
visibility/positioning of the menu or
mouse events for opening/closing the menu. It also follows the
controlled component pattern which means that you are responsible
for maintaining the open state of the menu.

#### Usage

This hook returns an object with properties that must be
attached to the trigger and menu elements.

```js
const [isOpen, setIsOpen] = React.useState(false);
const onOpen = () => setIsOpen(true);
const onClose = () => setIsOpen(false);
const {triggerProps, tooltipProps} = useTooltipAria(isOpen, onOpen, onClose);
return (
  <Tooltip isOpen={isOpen} {...triggerProps} content={<p>My Content</p>}>focus me</Tooltip>
);
```

#### Return Value

Here is the structure of the object returned from this hook:

| Property | Type | Description |
| -------- | ---- | ----------- |
| **triggerProps** | `object` | An object of properties to spread on your trigger element. |
| **triggerProps.aria-describedby** | `string` | The id attribute of the tooltip element. |
| **triggerProps.tabIndex** | `number` | The tab index of the trigger element. |
| **triggerProps.onFocus** | `number` | A focus handler that must be attached to the trigger element in order to open the menu. |
| **triggerProps.onBlur** | `number` | A blur handler that must be attached to the trigger element in order to close the menu. |
| **tooltipProps** | `object` | An object of properties for the root of your menu element. |
| **tooltipProps.id** | `string` | A unique id attribute for the menu element. |
| **tooltipProps.role** | `string` | The element's role attribute. |

#### API

**Kind**: global function  
**Returns**: <code>object</code> - Returns an object with `triggerProps` and
  `tooltipProps` which should be applied to their associated
  elements.  

| Param | Type | Description |
| --- | --- | --- |
| isOpen | <code>boolean</code> | Whether the tooltip is currently open. |
| onOpen | <code>function</code> | A callback that will be called when   the users tries to open the tooltip through keyboard events. |
| onClose | <code>function</code> | A callback that will be called when   the user tries to close the tooltip through keyboard events. |
| [options] | <code>object</code> |  |
| [options.id] | <code>string</code> | The id value to use in order to   connect the tooltip element to its trigger. If you do   not pass this, then an id will be automatically generated   for you. |
| [options.prefix] | <code>string</code> | If you want to customize the   name of the auto-generated id, you can pass a prefix   which will then have a unique number suffixed to it. |

