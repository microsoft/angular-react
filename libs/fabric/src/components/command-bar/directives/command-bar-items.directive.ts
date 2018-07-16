import { Directive, ContentChildren, QueryList } from '@angular/core';
import { CommandBarItemDirective } from './command-bar-item.directive';
import { ICommandBarItemOptions } from '../command-bar.component';
import { CommandBarItemsDirectiveBase } from './command-bar-items-base.directive';

@Directive({
  selector: 'fab-command-bar > items',
})
export class CommandBarItemsDirective extends CommandBarItemsDirectiveBase {
  @ContentChildren(CommandBarItemDirective) readonly directiveItems: QueryList<CommandBarItemDirective>;
}
