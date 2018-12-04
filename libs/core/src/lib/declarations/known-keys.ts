// prettier-ignore
/**
 * Get the known keys (i.e. no index signature) of T.
 *
 * @example
```typescript
interface Options {
  key: string;
  title: string;
  [dataProperty: string]: string | number;
}

type KnownKeysOfOptions = KnownKeys<Options>; // 'key' | 'title';
// (vs. type KeysOfOptions = keyof Options // string | number;)
```

 * Taken from https://stackoverflow.com/questions/51465182/typescript-remove-index-signature-using-mapped-types
 */
export type KnownKeys<T> = {
  [K in keyof T]: string extends K ? never : number extends K ? never : K
} extends { [_ in keyof T]: infer U } ? U : never;
