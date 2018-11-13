// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AfterContentInit, ContentChildren, EventEmitter, OnDestroy, Output, QueryList }
  from '@angular/core';
import { Subscription } from 'rxjs';

import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';
import { ChangeableItemDirective } from './changeable-item.directive';

/**
 * Parent class for wrapper directive for multiple ChangeableItemDirectives
 */
export abstract class ChangeableItemsDirective<TItem> implements AfterContentInit, OnDestroy {

  @ContentChildren(ChangeableItemDirective)
  readonly directiveItems: QueryList<ChangeableItemDirective<TItem>>;

  @Output()
  readonly onItemChanged = new EventEmitter<ItemChangedPayload<string, TItem>>();
  @Output()
  readonly onItemsChanged = new EventEmitter<QueryList<ChangeableItemDirective<TItem>>>();

  private readonly _subscriptions: Subscription[] = [];

  abstract get items(): TItem[];

  ngAfterContentInit() {
    this._subscriptions.push(
      ...this.directiveItems.map((directiveItem: ChangeableItemDirective<TItem>) =>
        directiveItem.onItemChanged.subscribe((changes: ItemChangedPayload<string, TItem>) =>
          this.onItemChanged.emit(changes)
        )
      )
    );
  
    this._subscriptions.push(
      this.directiveItems.changes.subscribe((newValue: this['directiveItems']) => {
        this.onItemsChanged.emit(newValue);
      })
    );
  }
  
  ngOnDestroy() {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
