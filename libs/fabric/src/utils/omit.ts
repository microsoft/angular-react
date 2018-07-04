export function omit<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Partial<T> /* Can replace with Exclude type from TS 2.8 */ {
  return Object.keys(obj)
    .filter(key => !keys.includes(key as K))
    .reduce<Partial<T>>((acc, key) =>
      Object.assign(
        acc,
        { [key]: obj[key] }
      ), {}
    );
}

export default omit;
