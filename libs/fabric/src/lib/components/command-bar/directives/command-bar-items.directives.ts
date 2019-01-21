// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';

import { ChangeableItemsDirective } from '../../core/shared/changeable-items.directive';
import { ICommandBarItemOptions } from '../command-bar.component';
import { CommandBarItemDirective } from './command-bar-item.directives';
import { getDataAttributes } from '../../../utils/get-data-attributes';

export abstract class CommandBarItemsDirectiveBase extends ChangeableItemsDirective<ICommandBarItemOptions> {
  abstract readonly directiveItems: QueryList<CommandBarItemDirective>;

  get items() {
    return (
      this.directiveItems &&
      this.directiveItems.map<ICommandBarItemOptions>((directiveItem: CommandBarItemDirective) => ({
        ...directiveItem,
        ...getDataAttributes(directiveItem.elementRef.nativeElement, true),
        onClick: (ev, item) => {
          directiveItem.click.emit({
            ev: ev && ev.nativeEvent,
            item: item,
          });
        },
      }))
    );
  }
}

@Directive({ selector: 'fab-command-bar > items' })
export class CommandBarItemsDirective extends CommandBarItemsDirectiveBase {
  @ContentChildren(CommandBarItemDirective) readonly directiveItems: QueryList<CommandBarItemDirective>;
}

@Directive({ selector: 'fab-command-bar > far-items' })
export class CommandBarFarItemsDirective extends CommandBarItemsDirectiveBase {
  @ContentChildren(CommandBarItemDirective) readonly directiveItems: QueryList<CommandBarItemDirective>;
}

@Directive({ selector: 'fab-command-bar > overflow-items' })
export class CommandBarOverflowItemsDirective extends CommandBarItemsDirectiveBase {
  @ContentChildren(CommandBarItemDirective) readonly directiveItems: QueryList<CommandBarItemDirective>;
}
