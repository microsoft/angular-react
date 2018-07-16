import { TypedChanges } from '../../../types/angular/typed-changes';

export interface ItemChangedPayload<TKey extends string, TItem> {
  readonly key: TKey;
  readonly changes: TypedChanges<TItem>;
}
