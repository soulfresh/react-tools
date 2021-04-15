## Functions

* [isReactText(children)](#isReactText) ⇒ <code>boolean</code>
* [mergeCallbacks(...callback)](#mergeCallbacks) ⇒ <code>function</code>

<a name="isReactText"></a>

## isReactText(children) ⇒ <code>boolean</code>
Determine if a component's children are text.

**Kind**: global function  

| Param | Type |
| --- | --- |
| children | <code>\*</code> | 

<a name="mergeCallbacks"></a>

## mergeCallbacks(...callback) ⇒ <code>function</code>
Combines a list of functions into a single function
that forwards its parameters to all of the functions you passed.
The functions will be called in the order they are received.
This is usefull when you want to merge callbacks
from multiple sources into one.

Additionally, any undefined or null functions will
be filtered out allowing you to pass functions
that may or not be defined at run time.

```js
const parentOnFocus = (e) => console.log('PARENT', e);
const localOnFocus = (e) => console.log('LOCAL', e);

const onFocus = mergeCallbacks(parentOnFocus, localOnFocus, otherOnFocus);

onFocus('foo');
// The following will be output to the console.
// --> 'PARENT foo'
// --> 'LOCAL foo'
// 'otherOnFocus' was filtered because it is undefined
```

**Kind**: global function  

| Param | Type | Description |
| --- | --- | --- |
| ...callback | <code>function</code> | Any callback functions you want to combine   into a single function. |

