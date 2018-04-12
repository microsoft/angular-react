// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';


@Component({
  selector: 'fab-button',
  exportAs: 'fabButton',
  template: `
    <DefaultButton
      key="c1"
      data-automation-id='test_automation_id'
      [primary]="primary"
      [disabled]="disabled"
      [text]="text"
      (onClick)="onClick($event)"></DefaultButton>
  `,
  styleUrls: ['./button.component.css'],
  styles: [
    'react-renderer',
    ':host { display: inline-block; background: red; }'
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-button' }
})
export class FabButtonComponent {

  @Input() disabled = false;
  @Input() primary = true;
  @Input('label') text = '';

  @Output('onClick') click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  onClick = ev => this.click.emit(ev as any);

}
