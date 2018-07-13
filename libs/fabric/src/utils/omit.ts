/**
 * Omit a a set of properties from an object.
 *
 * Does **not** modify the original object.
 * @param obj the object
 * @param keys the keys
 * @returns A new object with all properties apart from the `keys` from `obj`
 */
// TODO: Change return type to `Omit` type once upgrading to TS 2.8
export function omit<T extends object, K extends keyof T>(
  obj: T,
  ...keys: K[]
): Partial<T> /* Can replace with Exclude type from TS 2.8 */ {
  return Object.keys(obj)
    .filter(key => !keys.includes(key as K))
    .reduce<Partial<T>>((acc, key) => Object.assign(acc, { [key]: obj[key] }), {});
}

export default omit;
