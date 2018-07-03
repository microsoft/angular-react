// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IToggleProps } from 'office-ui-fabric-react/lib/components/Toggle';

@Component({
  selector: 'fab-toggle',
  exportAs: 'fabToggle',
  template: `
    <Toggle
      #reactNode
      [componentRef]="componentRef"
      [label]="label"
      [Text]="onText"
      [offText]="offText"
      [AriaLabel]="onAriaLabel"
      [offAriaLabel]="offAriaLabel"
      [checked]="checked"
      [defaultChecked]="defaultChecked"
      [disabled]="disabled"
      [theme]="theme"
      [styles]="styles"
      [keytipProps]="keytipProps"
      (onChanged)="onChanged.emit($event)">
    </Toggle>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-toggle' }
})
export class FabToggleComponent extends ReactWrapperComponent<IToggleProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() as?: IToggleProps['as'];
  @Input() componentRef?: IToggleProps['componentRef'];
  @Input() label?: IToggleProps['label'];

  /**
   * Counterpart of `IToggleProps['onText']`.
   * Angular doesn't allow Inputs to be prefixed with "on", so this is misspelled as "onn".
   */
  @Input('onnText') onText?: IToggleProps['onText'];
  @Input() offText?: IToggleProps['offText'];

  /**
   * Counterpart of `IToggleProps['onAriaLabel']`.
   * Angular doesn't allow Inputs to be prefixed with "on", so this is misspelled as "onn".
   */
  @Input('onnAriaLabel') onAriaLabel?: IToggleProps['onAriaLabel'];
  @Input() offAriaLabel?: IToggleProps['offAriaLabel'];
  @Input() checked?: IToggleProps['checked'];
  @Input() defaultChecked?: IToggleProps['defaultChecked'];
  @Input() disabled?: IToggleProps['disabled'];
  @Input() theme?: IToggleProps['theme'];
  @Input() styles?: IToggleProps['styles'];
  @Input() keytipProps?: IToggleProps['keytipProps'];

  @Output() onChanged = new EventEmitter<boolean>();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
