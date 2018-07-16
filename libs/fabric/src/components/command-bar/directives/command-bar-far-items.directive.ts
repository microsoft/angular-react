import { Directive, ContentChildren, QueryList } from '@angular/core';
import { CommandBarItemDirective } from './command-bar-item.directive';
import { CommandBarItemsDirectiveBase } from './command-bar-items-base.directive';
import { ICommandBarItemOptions } from '../command-bar.component';

@Directive({
  selector: 'fab-command-bar > far-items',
})
export class CommandBarFarItemsDirective extends CommandBarItemsDirectiveBase {
  @ContentChildren(CommandBarItemDirective) readonly directiveItems: QueryList<CommandBarItemDirective>;
}
