export function pick<T extends object, K extends keyof T>(obj: T, ...keys: K[]): Pick<T, K> {
  return keys.reduce<Pick<T, K>>((acc, key) => Object.assign(acc, { [key]: obj[key] }), {} as any);
}

export default pick;
