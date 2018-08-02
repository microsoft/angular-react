/**
 * A utility function that can be used for exhaustiveness checks in switch statements.
 * @see [Docs](https://www.typescriptlang.org/docs/handbook/advanced-types.html#exhaustiveness-checking).
 */
export function unreachable(x: never): never {
  throw new Error(`Unexpected object: ${x}`);
}
