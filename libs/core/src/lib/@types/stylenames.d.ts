declare module 'stylenames' {
  export type StyleValueConditionFunction = () => boolean | null | undefined;

  export type StyleValueObject = Record<string, boolean | StyleValueConditionFunction>;

  export type StyleValue = null | undefined | string | StyleValueObject;

  export type StyleObject = Record<keyof CSSStyleDeclaration, StyleValue>;

  export type StyleNamesFn = (styles: StyleObject) => string;

  export type StyleNamesExport = StyleNamesFn & { default: StyleNamesFn };

  declare const styleNames: StyleNamesExport;

  export = styleNames;
  export as namespace styleNames;
}
