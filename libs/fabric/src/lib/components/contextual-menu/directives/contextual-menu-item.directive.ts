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

import { OnChanges } from '../../../declarations/angular/typed-changes';
import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';
import { ChangeableItemsHelper, IChangeableItemsContainer } from '../../core/shared/changeable-helper';
import { ChangeableItemDirective } from '../../core/shared/changeable-item.directive';

@Directive({ selector: 'contextual-menu-item' })
export class ContextualMenuItemDirective extends ChangeableItemDirective<IContextualMenuItem>
  implements
    AfterContentInit,
    IChangeableItemsContainer<IContextualMenuItem>,
    IContextualMenuItem,
    OnChanges<ContextualMenuItemDirective>,
    OnDestroy {
  @ContentChildren(ContextualMenuItemDirective)
  readonly menuItemsDirectives: QueryList<ContextualMenuItemDirective>;

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

  @Output()
  get onChildItemChanged(): EventEmitter<ItemChangedPayload<string, IContextualMenuItem>> {
    return this.changeableItemsHelper && this.changeableItemsHelper.onChildItemChanged;
  }
  @Input()
  get onItemsChanged(): EventEmitter<QueryList<ChangeableItemDirective<IContextualMenuItem>>> {
    return this.changeableItemsHelper && this.changeableItemsHelper.onItemsChanged;
  }

  private changeableItemsHelper: ChangeableItemsHelper<IContextualMenuItem>;

  ngAfterContentInit() {
    this.changeableItemsHelper = new ChangeableItemsHelper(this.menuItemsDirectives, this, nonSelfDirective => {
      const items = nonSelfDirective.map(directive => this._directiveToContextualMenuItem(directive as any));
      if (!this.subMenuProps) {
        this.subMenuProps = { items: items };
      } else {
        this.subMenuProps.items = items;
      }
    });
    this.changeableItemsHelper.afterContentInit();
  }

  ngOnDestroy() {
    this.changeableItemsHelper.onDestroy();
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
