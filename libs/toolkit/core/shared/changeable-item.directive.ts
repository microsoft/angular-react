// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { EventEmitter, Input, OnInit, Output, Directive } from '@angular/core';

import { OnChanges } from '../../declarations/angular/typed-changes';
import { ItemChangedPayload, ItemChanges } from '../declarative/item-changed.payload';
import { ChangeableItemHelper } from './changeable-helper';

/**
 * Parent class for wrapper directive for single item with OnChanges
 */
@Directive()
export abstract class ChangeableItemDirective<TItem> implements OnChanges<ChangeableItemDirective<TItem>>, OnInit {
  @Input() key: string;

  @Output()
  get onItemChanged(): EventEmitter<ItemChangedPayload<string, TItem>> {
    return this.changeableItemHelper && this.changeableItemHelper.onItemChanged;
  }

  private changeableItemHelper: ChangeableItemHelper<TItem>;

  ngOnInit() {
    this.changeableItemHelper = new ChangeableItemHelper(this.key);
  }

  ngOnChanges(changes: ItemChanges<TItem>) {
    if (this.changeableItemHelper) {
      this.changeableItemHelper.emitChanges(changes);
    }
  }
}
