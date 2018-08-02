import { ItemChanges, PropertyChange } from './item-changed.payload';

export function mergeItemChanges<T extends object>(target: T, changes: ItemChanges<T>): T {
  const itemChangesOverrides: Partial<T> = (Object.entries(changes) as Array<
    [keyof T, PropertyChange<T[keyof T]>]
  >).reduce((acc, [propertyKey, change]) => Object.assign(acc, { [propertyKey]: change.currentValue }), {});

  return Object.assign({}, target, itemChangesOverrides);
}
