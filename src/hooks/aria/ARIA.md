## Functions

<dl>
<dt><a href="#useDropdownAria">useDropdownAria(isOpen, [prefix])</a> ⇒ <code>object</code></dt>
<dd><p>A hook that generates the aria properties necessary for
a dropdown component.</p>
</dd>
<dt><a href="#useTooltipAria">useTooltipAria([options])</a> ⇒ <code>object</code></dt>
<dd><p>Generate the ARIA attributes required for a tooltip.
This will return two objects, one with the properties to
attach to the tooltip trigger and one to attach to the
tooltip content.</p>
<p>This hook only provides ARIA related attributes like
<code>arai-describedby</code>. It does not handle keyboard or
other concerns.</p>
<p>See <a href="https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/">https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/</a></p>
<pre><code class="language-js">// &quot;id&quot; is an id prop received by your component in the case
// you need to use a specific id value.
const {triggerProps, tooltipProps} = useTooltipAria({id});
return (
   &lt;div&gt;
     &lt;Tooltip {...triggerProps}&gt;&lt;/Tooltip&gt;
     &lt;span {...tooltipProps}&gt;Tooltip content here!&lt;/span&gt;
   &lt;/div&gt;
);
</code></pre>
</dd>
</dl>

<a name="useDropdownAria"></a>

## useDropdownAria(isOpen, [prefix]) ⇒ <code>object</code>
A hook that generates the aria properties necessary for
a dropdown component.

**Kind**: global function  
**Returns**: <code>object</code> - - An object with `triggerProps` and `menuProps`
  to attach to the associated elements.
  `triggerProps` includes 'id', 'aria-controls' and 'aria-expanded' props.
  `menuProps` includes 'id' and 'aria-labelledby' props.  

| Param | Type | Description |
| --- | --- | --- |
| isOpen | <code>boolean</code> |  |
| [prefix] | <code>string</code> | A prefix to use for the id names generated   for the trigger and menu elements. |

<a name="useTooltipAria"></a>

## useTooltipAria([options]) ⇒ <code>object</code>
Generate the ARIA attributes required for a tooltip.
This will return two objects, one with the properties to
attach to the tooltip trigger and one to attach to the
tooltip content.

This hook only provides ARIA related attributes like
`arai-describedby`. It does not handle keyboard or
other concerns.

See https://www.accede-web.com/en/guidelines/rich-interface-components/customized-tooltips/

```js
// "id" is an id prop received by your component in the case
// you need to use a specific id value.
const {triggerProps, tooltipProps} = useTooltipAria({id});
return (
   <div>
     <Tooltip {...triggerProps}></Tooltip>
     <span {...tooltipProps}>Tooltip content here!</span>
   </div>
);
```

**Kind**: global function  
**Returns**: <code>object</code> - Returns an object with `triggerProps` and
  `tooltipProps` which should be applied to their associated
  elements.  

| Param | Type | Description |
| --- | --- | --- |
| [options] | <code>object</code> |  |
| [options.id] | <code>string</code> | The id value to use in order to   connect the tooltip element to its trigger. If you do   not pass this, then an id will be automatically generated   for you. |
| [options.prefix] | <code>string</code> | If you want to customize the   name of the auto-generated id, you can pass a prefix   which will then have a unique number suffixed to it. |

