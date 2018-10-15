/**
 * Gets the index signature of a type.
 *
 * @example
 ```typescript
interface Options {
  key: string;
  title: string;
  [dataProperty: string]: string | number;
}

type IndexOfOptions = IndexSignature<Options>; // { [x: string]: string | number; [x: number]: string | number; }
```
 */
export type IndexSignature<T> = Pick<T, keyof T>;
