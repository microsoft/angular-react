// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventEmitter, Input, Output } from '@angular/core';
  
import { OnChanges, TypedChanges } from '../../../declarations/angular/typed-changes';
import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';

/**
 * Parent class for wrapper directive for single item with OnChanges
 */
export abstract class ChangeableItemDirective<TItem>
  implements OnChanges<ChangeableItemDirective<TItem>> {

  @Input()
  key: string;

  @Output()
  readonly onItemChanged = new EventEmitter<ItemChangedPayload<string, TItem>>();

  ngOnChanges(changes: TypedChanges<TItem>) {
    this.onItemChanged.emit({ key: this.key, changes });
  }
}
