import {
  Directive,
  ContentChildren,
  QueryList,
  OnDestroy,
  AfterContentInit,
  Output,
  EventEmitter,
} from '@angular/core';
import { CommandBarItemDirective, CommandBarItemPropertiesChangedPayload } from './command-bar-item.directive';
import { ICommandBarItemOptions } from '../command-bar.component';
import { Subscription } from 'rxjs';

export abstract class CommandBarItemsDirectiveBase implements AfterContentInit, OnDestroy {
  private readonly _subscriptions: Subscription[] = [];

  abstract readonly directiveItems: QueryList<CommandBarItemDirective>;

  @Output() readonly onItemChanged = new EventEmitter<CommandBarItemPropertiesChangedPayload>();

  get items() {
    return (
      this.directiveItems &&
      this.directiveItems.map<ICommandBarItemOptions>(directiveItem => ({
        key: directiveItem.key,
        text: directiveItem.text,
        iconProps: directiveItem.iconProps,
        iconOnly: directiveItem.iconOnly,
        disabled: directiveItem.disabled,
        onClick: (ev, item) => {
          directiveItem.onClick.emit({
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
        directiveItem.onItemChanged.subscribe(changes => this.onItemChangedHandler(changes))
      )
    );
  }

  ngOnDestroy() {
    this._subscriptions.forEach(subscription => subscription.unsubscribe());
  }

  private onItemChangedHandler(payload: CommandBarItemPropertiesChangedPayload) {
    this.onItemChanged.emit(payload);
  }
}
