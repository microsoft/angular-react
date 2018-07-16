import {
  Directive,
  ContentChildren,
  QueryList,
  OnDestroy,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommandBarItemDirective, CommandBarItemChangedPayload } from './command-bar-item.directive';
import { ICommandBarItemOptions } from '../command-bar.component';
import { Subscription } from 'rxjs';

export abstract class CommandBarItemsDirectiveBase implements AfterContentInit, OnDestroy {
  private readonly _subscriptions: Subscription[] = [];

  abstract readonly directiveItems: QueryList<CommandBarItemDirective>;

  @Output() readonly onItemChanged = new EventEmitter<CommandBarItemChangedPayload>();

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
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private onItemChangedHandler(payload: CommandBarItemChangedPayload) {
    this.onItemChanged.emit(payload);
  }
}
