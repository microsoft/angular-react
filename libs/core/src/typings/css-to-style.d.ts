// NOTE: a [PR in DefinitelyTyped has been sent](https://github.com/DefinitelyTyped/DefinitelyTyped/pull/27253).
// Once it gets in this type can be remove from here and required from there instead.
declare module 'css-to-style' {
  export default function toStyle(cssText: string): CSSStyleDeclaration;
}
