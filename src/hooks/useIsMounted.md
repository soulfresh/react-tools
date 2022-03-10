<a name="useIsMounted"></a>

## useIsMounted()
Determine if a component is currently mounted.
Use this in instances where you need to ensure that async
actions only happen while a component is mounted and
you are unable to cancel those async actions on unount.
It is preferred to cancel an async work started by your
component if possible.

**Kind**: global function  
