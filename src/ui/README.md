### Hi there, welcome to `ui` 

Here we place atomic components, that are completely de-coupled from application.
- They do not receive business related props.
- The are exported to use all through `app` and `modules`.
- Most of them work as wrappers, and the logic is contained on { children }, so components are essentially agnostic to whatever they're being used for.

Components WIA-aria standards, should be accessible.
**The tech choice, is RadixUI + Tailwindcss**
_Some helper libraries, are clsx, cva_