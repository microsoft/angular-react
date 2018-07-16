import { Directive, Input, TemplateRef, ContentChild, Output, EventEmitter } from '@angular/core';

import { OnChanges, TypedChanges } from '../../../types/angular/typed-changes';
import { ICommandBarItemOptions } from '../command-bar.component';
import { IContextualMenuItem } from 'office-ui-fabric-react';

export interface CommandBarItemPropertiesChangedPayload {
  readonly key: ICommandBarItemOptions['key'];
  readonly changes: TypedChanges<ICommandBarItemOptions>;
}

@Directive({ selector: 'fab-command-bar-item' })
export class CommandBarItemDirective implements ICommandBarItemOptions, OnChanges<CommandBarItemDirective> {
  @ContentChild(TemplateRef) template: TemplateRef<any>;

  @Input() key: ICommandBarItemOptions['key'];
  @Input() text?: ICommandBarItemOptions['text'];
  @Input() iconProps?: ICommandBarItemOptions['iconProps'];
  @Input() disabled?: ICommandBarItemOptions['disabled'];
  @Input() iconOnly?: ICommandBarItemOptions['iconOnly'];
  @Input() subMenuProps?: ICommandBarItemOptions['subMenuProps'];

  @Output() readonly onClick = new EventEmitter<{ ev?: MouseEvent | KeyboardEvent; item?: IContextualMenuItem }>();

  @Output() readonly onItemChanged = new EventEmitter<CommandBarItemPropertiesChangedPayload>();

  ngOnChanges(changes: TypedChanges<this>) {
    this.onItemChanged.emit({
      key: this.key,
      changes: Object.assign<{}, TypedChanges<this>, Pick<TypedChanges<this>, 'onClick'>>(
        {},
        changes,
        changes.onClick && {
          onClick: {
            ...changes.onClick,
            isFirstChange: changes.onClick.isFirstChange,
          },
        }
      ),
    });
  }
}
