/**
 * Transforms an array of [key, value] tuples to an object
 */
export function toObject<T extends [string, any][]>(pairs: T): object {
  return pairs.reduce(
    (acc, [key, value]) =>
      Object.assign(acc, {
        [key]: value,
      }),
    {}
  );
}
