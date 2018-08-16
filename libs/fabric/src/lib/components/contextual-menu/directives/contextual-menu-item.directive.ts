// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  AfterContentInit,
  ContentChildren,
  Directive,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
  QueryList,
} from '@angular/core';
import { IContextualMenuItem } from 'office-ui-fabric-react';
import { Subscription } from 'rxjs';
import { OnChanges, TypedChanges } from '../../../declarations/angular/typed-changes';
import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';

export type ContextualMenuItemChangedPayload = ItemChangedPayload<IContextualMenuItem['key'], IContextualMenuItem>;

@Directive({ selector: 'contextual-menu-item' })
export class ContextualMenuItemDirective
  implements IContextualMenuItem, OnChanges<ContextualMenuItemDirective>, AfterContentInit, OnDestroy {
  @ContentChildren(ContextualMenuItemDirective)
  readonly menuItemsDirectives: QueryList<ContextualMenuItemDirective>;

  @Input()
  key: IContextualMenuItem['key'];
  @Input()
  componentRef?: IContextualMenuItem['componentRef'];
  @Input()
  text?: IContextualMenuItem['text'];
  @Input()
  secondaryText?: IContextualMenuItem['secondaryText'];
  @Input()
  itemType?: IContextualMenuItem['itemType'];
  @Input()
  iconProps?: IContextualMenuItem['iconProps'];
  @Input()
  onRenderIcon?: IContextualMenuItem['onRenderIcon'];
  @Input()
  submenuIconProps?: IContextualMenuItem['submenuIconProps'];
  @Input()
  disabled?: IContextualMenuItem['disabled'];
  @Input()
  primaryDisabled?: IContextualMenuItem['primaryDisabled'];
  @Input()
  shortCut?: IContextualMenuItem['shortCut'];
  @Input()
  canCheck?: IContextualMenuItem['canCheck'];
  @Input()
  checked?: IContextualMenuItem['checked'];
  @Input()
  split?: IContextualMenuItem['split'];
  @Input()
  data?: IContextualMenuItem['data'];
  @Input()
  href?: IContextualMenuItem['href'];
  @Input()
  target?: IContextualMenuItem['target'];
  @Input()
  rel?: IContextualMenuItem['rel'];
  @Input()
  subMenuProps?: IContextualMenuItem['subMenuProps'];
  @Input()
  getItemClassNames?: IContextualMenuItem['getItemClassNames'];
  @Input()
  getSplitButtonVerticalDividerClassNames?: IContextualMenuItem['getSplitButtonVerticalDividerClassNames'];
  @Input()
  sectionProps?: IContextualMenuItem['sectionProps'];
  @Input()
  className?: IContextualMenuItem['className'];
  @Input()
  style?: IContextualMenuItem['style'];
  @Input()
  ariaLabel?: IContextualMenuItem['ariaLabel'];
  @Input()
  title?: IContextualMenuItem['title'];
  @Input()
  onRender?: IContextualMenuItem['onRender'];
  @Input()
  onMouseDown?: IContextualMenuItem['onMouseDown'];
  @Input()
  role?: IContextualMenuItem['role'];
  @Input()
  customOnRenderListLength?: IContextualMenuItem['customOnRenderListLength'];
  @Input()
  keytipProps?: IContextualMenuItem['keytipProps'];
  @Input()
  inactive?: IContextualMenuItem['inactive'];
  @Input()
  name?: IContextualMenuItem['name'];

  @Output()
  readonly click = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent; item?: IContextualMenuItem }>();

  // Directive properties
  @Output()
  readonly onItemChanged = new EventEmitter<ContextualMenuItemChangedPayload>();

  private readonly _subscriptions: Subscription[] = [];

  ngOnChanges(changes: TypedChanges<this>) {
    this.onItemChanged.emit({
      key: this.key,
      changes,
    });
  }

  ngAfterContentInit() {
    // @ContentChildren selects host component as well.
    // Relevant GitHub issue: https://github.com/angular/angular/issues/10098
    const nonSelfMenuItemsDirectives = this.menuItemsDirectives.filter(directive => directive !== this);
    if (nonSelfMenuItemsDirectives.length === 0) {
      return;
    }

    const items = nonSelfMenuItemsDirectives.map(directive => this._directiveToContextualMenuItem(directive));
    if (!this.subMenuProps) {
      this.subMenuProps = { items: items };
    } else {
      this.subMenuProps.items = items;
    }

    this._subscriptions.push(
      this.menuItemsDirectives.changes.subscribe((newValue: this['menuItemsDirectives']) => {
        this.onItemChanged.emit({
          key: this.key,
          changes: {
            subMenuProps: {
              currentValue: {
                ...this.subMenuProps,
                items: newValue.map(directive => this._directiveToContextualMenuItem(directive)),
              },
            },
          },
        });
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private _directiveToContextualMenuItem(directive: ContextualMenuItemDirective): IContextualMenuItem {
    return {
      ...directive,
      onClick: (ev, item) => {
        directive.click.emit({ ev: ev && ev.nativeEvent, item: item });
      },
    };
  }
}
