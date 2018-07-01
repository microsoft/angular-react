// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';

@Component({
  selector: 'fab-button',
  exportAs: 'fabButton',
  template: `
    <DefaultButton
      [primary]="primary"
      [disabled]="disabled"
      [text]="text"
      [split]="split"
      [href]="href"
      [menuProps]="menuProps"
      [iconProps]="iconProps"
      (onClick)="onClick.emit($event)">
      <ReactContent><ng-content></ng-content></ReactContent>
    </DefaultButton>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-button' }
})
export class FabButtonComponent {

  @Input() disabled?: IButtonProps['disabled'];
  @Input() primary?: IButtonProps['primary'];
  @Input() checked?: IButtonProps['checked'];
  @Input() href?: IButtonProps['href'];
  @Input() text?: IButtonProps['text'];
  @Input() split?: IButtonProps['split'];
  @Input() menuProps?: IButtonProps['menuProps'];
  @Input() iconProps?: IButtonProps['iconProps'];
  @Input() primaryDisabled?: IButtonProps['primaryDisabled'];

  @Output() onClick: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

}
