import * as AngularCore from '@angular/core';

export interface TypedChange<T> extends AngularCore.SimpleChange {
  readonly previousValue: T;
  readonly currentValue: T;
}

export type TypedChanges<TComponent> = AngularCore.SimpleChanges &
  { [P in keyof TComponent]: TypedChange<TComponent[P]> };

export interface OnChanges<TComponent> extends AngularCore.OnChanges {
  ngOnChanges(changes: Partial<TypedChanges<TComponent>>): void;
}
