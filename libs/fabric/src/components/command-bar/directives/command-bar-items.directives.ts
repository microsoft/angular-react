import {
  Directive,
  ContentChildren,
  QueryList,
  OnDestroy,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { ICommandBarItemOptions } from '../command-bar.component';
import { Subscription } from 'rxjs';
import { CommandBarItemDirective, CommandBarItemChangedPayload } from './command-bar-item.directives';

export abstract class CommandBarItemsDirectiveBase implements AfterContentInit, OnDestroy {
  private readonly _subscriptions: Subscription[] = [];

  abstract readonly directiveItems: QueryList<CommandBarItemDirective>;

  @Output() readonly onItemChanged = new EventEmitter<CommandBarItemChangedPayload>();
  @Output() readonly onItemsChanged = new EventEmitter<QueryList<CommandBarItemDirective>>();

  get items() {
    return (
      this.directiveItems &&
      this.directiveItems.map<ICommandBarItemOptions>(directiveItem => ({
        ...directiveItem,
        onClick: (ev, item) => {
          directiveItem.click.emit({
            ev: ev && ev.nativeEvent,
            item: item,
          });
        },
      }))
    );
  }

  ngAfterContentInit() {
    this._subscriptions.push(
      ...this.directiveItems.map(directiveItem =>
        // Propagate the change to the parent CommandBarComponent
        directiveItem.onItemChanged.subscribe(changes => this.onItemChangedHandler(changes))
      )
    );

    this._subscriptions.push(
      this.directiveItems.changes.subscribe((newValue: this['directiveItems']) => {
        this.onItemsChanged.emit(newValue);
      })
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private onItemChangedHandler(payload: CommandBarItemChangedPayload) {
    this.onItemChanged.emit(payload);
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
