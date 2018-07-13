const clearUndefinedProperties = <T extends object>(obj: T): Partial<T> => {
  return Object.keys(obj).reduce((acc, key) => {
    const _acc = acc;
    if (obj[key] !== undefined) _acc[key] = obj[key];
    return _acc;
  }, {});
};

export default clearUndefinedProperties;
