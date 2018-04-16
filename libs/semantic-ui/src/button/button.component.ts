// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator

import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output } from '@angular/core';

import { IButtonProps, DefaultButton } from 'office-ui-fabric-react/lib/Button';


@Component({
  selector: 'sem-button',
  exportAs: 'semButton',
  template: `
    <Button
      [primary]="primary"
      [secondary]="secondary"
      [disabled]="disabled"
      [loading]="loading"
      [content]="content"
      (onClick)="onClick($event)"
    ></Button>
  `,
  styleUrls: ['./button.component.css'],
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'sem-button' }
})
export class SemButtonComponent {

  @Input() disabled = false;
  @Input() primary = false;
  @Input() secondary = false;
  @Input() loading = false;
  @Input('label') content = '';

  @Output('onClick') click: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  onClick = ev => this.click.emit(ev as any);

}
