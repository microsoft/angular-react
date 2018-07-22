/**
 * Remove all undefined properties from obj.
 *
 * Does **not** modify the original object.
 * @returns A clone of `obj`, with all `undefined` properties removed
 */
const clearUndefinedProperties = <T extends object>(obj: T): Partial<T> => {
  return Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) _acc[key] = obj[key];
    return _acc;
  }, {});
};

export default clearUndefinedProperties;
