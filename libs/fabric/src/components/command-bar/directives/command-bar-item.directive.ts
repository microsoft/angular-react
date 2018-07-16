import {
  Directive,
  Input,
  TemplateRef,
  Output,
  EventEmitter,
  ContentChildren,
  QueryList,
  AfterContentInit,
} from '@angular/core';

import { OnChanges, TypedChanges } from '../../../types/angular/typed-changes';
import { ICommandBarItemOptions } from '../command-bar.component';
import { IContextualMenuItem, ICommandBarItemProps } from 'office-ui-fabric-react';
import { ContextualMenuItemDirective } from '../../contextual-menu';
import { ItemChangedPayload } from '../../core/declarative/item-changed.payload';

export type CommandBarItemChangedPayload = ItemChangedPayload<ICommandBarItemOptions['key'], ICommandBarItemOptions>;

@Directive({ selector: 'fab-command-bar-item' })
export class CommandBarItemDirective
  implements ICommandBarItemOptions, OnChanges<CommandBarItemDirective>, AfterContentInit {
  @ContentChildren(ContextualMenuItemDirective) readonly menuItemsDirectives: QueryList<ContextualMenuItemDirective>;

  // ICommandBarItemOptions implementation
  @Input() key: ICommandBarItemOptions['key'];
  @Input() text?: ICommandBarItemOptions['text'];
  @Input() iconProps?: ICommandBarItemOptions['iconProps'];
  @Input() disabled?: ICommandBarItemOptions['disabled'];
  @Input() iconOnly?: ICommandBarItemOptions['iconOnly'];
  @Input() subMenuProps?: ICommandBarItemOptions['subMenuProps'];
  @Input() buttonStyles?: ICommandBarItemOptions['buttonStyles'];
  @Input() cacheKey?: ICommandBarItemOptions['cacheKey'];
  @Input() renderedInOverflow?: ICommandBarItemOptions['renderedInOverflow'];
  @Input() componentRef?: ICommandBarItemOptions['componentRef'];
  @Input() secondaryText?: ICommandBarItemOptions['secondaryText'];
  @Input() submenuIconProps?: ICommandBarItemOptions['submenuIconProps'];
  @Input() primaryDisabled?: ICommandBarItemOptions['primaryDisabled'];
  @Input() shortCut?: ICommandBarItemOptions['shortCut'];
  @Input() canCheck?: ICommandBarItemOptions['canCheck'];
  @Input() checked?: ICommandBarItemOptions['checked'];
  @Input() split?: ICommandBarItemOptions['split'];
  @Input() href?: ICommandBarItemOptions['href'];
  @Input() target?: ICommandBarItemOptions['target'];
  @Input() rel?: ICommandBarItemOptions['rel'];
  @Input() getItemClassNames?: ICommandBarItemOptions['getItemClassNames'];
  @Input() getSplitButtonVerticalDividerClassNames?: ICommandBarItemOptions['getSplitButtonVerticalDividerClassNames'];
  @Input() sectionProps?: ICommandBarItemOptions['sectionProps'];
  @Input() className?: ICommandBarItemOptions['className'];
  @Input() style?: ICommandBarItemOptions['style'];
  @Input() ariaLabel?: ICommandBarItemOptions['ariaLabel'];
  @Input() title?: ICommandBarItemOptions['title'];
  @Input() onMouseDown?: ICommandBarItemOptions['onMouseDown'];
  @Input() role?: ICommandBarItemOptions['role'];
  @Input() customOnRenderListLength?: ICommandBarItemOptions['customOnRenderListLength'];
  @Input() keytipProps?: ICommandBarItemOptions['keytipProps'];
  @Input() inactive?: ICommandBarItemOptions['inactive'];
  @Input() data: ICommandBarItemOptions['data'];
  @Input() render: ICommandBarItemOptions['render'];
  @Input() renderIcon: ICommandBarItemOptions['renderIcon'];

  @Output() readonly click = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent; item?: IContextualMenuItem }>();

  // Directive properties
  @Output() readonly onItemChanged = new EventEmitter<CommandBarItemChangedPayload>();

  ngOnChanges(changes: TypedChanges<this>) {
    this.onItemChanged.emit({
      key: this.key,
      changes,
    });
  }

  ngAfterContentInit() {
    if (this.menuItemsDirectives.length === 0) {
      return;
    }

    const items = this.menuItemsDirectives.map<IContextualMenuItem>(directiveItem => ({
      ...directiveItem,
      onClick: (ev, item) => {
        directiveItem.click.emit({
          ev: ev && ev.nativeEvent,
          item: item,
        });
      },
    }));

    if (!this.subMenuProps) {
      this.subMenuProps = { items: items };
    } else {
      this.subMenuProps.items = items;
    }
  }
}
