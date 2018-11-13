// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AfterContentInit, ContentChildren, Directive, Input, OnDestroy, QueryList }
  from '@angular/core';
import { IGroup } from 'office-ui-fabric-react';
import { Subscription } from 'rxjs';

import { ItemChangedPayload } from '../../core/declarative/item-changed';
import { ChangeableItemDirective } from '../../core/shared/changeable-item.directive';

@Directive({ selector: 'fab-group-item' })
export class GroupItemDirective extends ChangeableItemDirective<IGroup>
  implements AfterContentInit, OnDestroy {

  @ContentChildren(GroupItemDirective)
  readonly groupItemsDirectives: QueryList<GroupItemDirective>;

  // Required members
  @Input()
  count: IGroup['count'];
  @Input()
  key: IGroup['key'];
  @Input()
  name: IGroup['name'];
  @Input()
  startIndex: IGroup['startIndex'];

  // Optional members
  @Input()
  ariaLabel?: IGroup['ariaLabel'];
  @Input()
  children?: IGroup['children'];
  @Input()
  data?: IGroup['data'];
  @Input()
  hasMoreData?: IGroup['hasMoreData'];
  @Input()
  isCollapsed?: IGroup['isCollapsed'];
  @Input()
  isDropEnabled?: IGroup['isDropEnabled'];
  @Input()
  isShowingAll?: IGroup['isShowingAll'];
  @Input()
  level?: IGroup['level'];

  private readonly _subscriptions: Subscription[] = [];

  ngAfterContentInit() {
    // @ContentChildren selects host component as well.
    // Relevant GitHub issue: https://github.com/angular/angular/issues/10098
    const nonSelfGroupItemsDirectives = this.groupItemsDirectives.filter(
      (directive: GroupItemDirective) => directive !== this
    );

    this.children = nonSelfGroupItemsDirectives;

    this._subscriptions.push(
      ...nonSelfGroupItemsDirectives.map((groupItem: ChangeableItemDirective<IGroup>) =>
        groupItem.onItemChanged.subscribe((changes: ItemChangedPayload<string, IGroup>) =>
          this.onItemChanged.emit(changes)
        )
      )
    );

    this._subscriptions.push(
      this.groupItemsDirectives.changes.subscribe((newValue: this['groupItemsDirectives']) => {
        this.onItemChanged.emit({
          key: this.key,
          changes: { children: { currentValue: this.children } }
        });
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach((sub: Subscription) => sub.unsubscribe());
  }
}
