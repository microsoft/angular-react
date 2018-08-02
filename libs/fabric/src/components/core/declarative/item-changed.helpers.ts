import { ItemChangedPayload, ItemChanges, PropertyChange } from './item-changed.payload';

export function mergeItemChanges<T extends object>(target: T, changes: ItemChanges<T>): T {
  const itemChangesOverrides = Object.entries(changes).reduce<Partial<T>>(
    (acc, [propertyKey, change]: [keyof T, PropertyChange<T[keyof T]>]) =>
      ({
        [propertyKey]: change.currentValue,
      } as Partial<T>),
    {}
  );

  return Object.assign({}, target, itemChangesOverrides);
}
