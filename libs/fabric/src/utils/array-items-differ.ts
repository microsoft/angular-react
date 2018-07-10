import { IterableDiffers, KeyValueDiffers, IterableDiffer, KeyValueDiffer, IterableChanges, KeyValueChanges } from "@angular/core";

export interface Keyed {
  key: string;
}

export class ArrayItemsDiffer<T extends (Keyed & StringMap)> {

  private readonly itemsKvDiffers = new Map<string, KeyValueDiffer<{}, {}>>();

  constructor(
    private readonly iterableDiffer: IterableDiffer<T>,
    private readonly keyValueDiffers: KeyValueDiffers,
    private readonly onArrayChanges: (changes: IterableChanges<T>) => void,
    private readonly onItemChanges: (changes: KeyValueChanges<string, {}>) => void
  ) {
  }

  detectChanges(newItems: T[]) {
    const itemsChanges = this.iterableDiffer.diff(newItems);
    if (itemsChanges) {
      this.onArrayChanges(itemsChanges);

      itemsChanges.forEachAddedItem(itemChangeRecord => {
        this.itemsKvDiffers.set(itemChangeRecord.item.key, this.keyValueDiffers.find(itemChangeRecord.item).create());
      });

      itemsChanges.forEachRemovedItem(itemChangeRecord => {
        this.itemsKvDiffers.delete(itemChangeRecord.item.key);
      });
    }

    this.itemsKvDiffers.forEach((differ, key) => {
      const itemChanges = differ.diff(newItems.find(item => item.key === key));
      if (itemChanges) {
        this.onItemChanges(itemChanges);
      }
    });
  }
}

export class ArrayItemsDifferFactory {
  constructor(
    private readonly iterableDiffers: IterableDiffers,
    private readonly keyValueDiffers: KeyValueDiffers
  ) { }

  createDiffer<T extends Keyed>(
    items: T[],
    onArrayChanges: (changes: IterableChanges<T>) => void,
    onItemChanges: (changes: KeyValueChanges<string, {}>) => void
  ): ArrayItemsDiffer<T> {
    const itemsDiffer = this.iterableDiffers.find(items).create<T>();

    return new ArrayItemsDiffer(itemsDiffer, this.keyValueDiffers, onArrayChanges, onItemChanges);
  }
}
