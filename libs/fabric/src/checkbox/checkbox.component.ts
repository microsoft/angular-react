// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { ICheckboxProps } from 'office-ui-fabric-react/lib/components/Checkbox';
import { FormEvent } from 'react';

@Component({
  selector: 'fab-checkbox',
  exportAs: 'fabCheckbox',
  template: `
    <Checkbox
      #reactNode
      [componentRef]="componentRef"
      [className]="className"
      [checked]="checked"
      [defaultChecked]="defaultChecked"
      [label]="label"
      [disabled]="disabled"
      [inputProps]="inputProps"
      [boxSide]="boxSide"
      [theme]="theme"
      [ariaLabel]="ariaLabel"
      [ariaLabelledBy]="ariaLabelledBy"
      [ariaDescribedBy]="ariaDescribedBy"
      [ariaPositionInSet]="ariaPositionInSet"
      [ariaSetSize]="ariaSetSize"
      [checkmarkIconProps]="checkmarkIconProps"
      [keytipProps]="keytipProps"
      [styles]="styles"
      [RenderLabel]="renderLabel && onRenderLabel"
      [Change]="onChangeHandler">
    </Checkbox>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-checkbox' }
})
export class FabCheckboxComponent extends ReactWrapperComponent<ICheckboxProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ICheckboxProps['componentRef'];
  @Input() className?: ICheckboxProps['className'];
  @Input() checked?: ICheckboxProps['checked'];
  @Input() defaultChecked?: ICheckboxProps['defaultChecked'];
  @Input() label?: ICheckboxProps['label'];
  @Input() disabled?: ICheckboxProps['disabled'];
  @Input() inputProps?: React.ButtonHTMLAttributes<HTMLElement | HTMLButtonElement>;
  @Input() boxSide?: ICheckboxProps['boxSide'];
  @Input() theme?: ICheckboxProps['theme'];
  @Input() ariaLabel?: ICheckboxProps['ariaLabel'];
  @Input() ariaLabelledBy?: ICheckboxProps['ariaLabelledBy'];
  @Input() ariaDescribedBy?: ICheckboxProps['ariaDescribedBy'];
  @Input() ariaPositionInSet?: ICheckboxProps['ariaPositionInSet'];
  @Input() ariaSetSize?: ICheckboxProps['ariaSetSize'];
  @Input() checkmarkIconProps?: ICheckboxProps['checkmarkIconProps'];
  @Input() keytipProps?: ICheckboxProps['keytipProps'];
  @Input() styles?: ICheckboxProps['styles'];

  @Input() renderLabel?: InputRendererOptions<ICheckboxProps>;

  @Output() onChange = new EventEmitter<{ ev?: Event, checked?: boolean }>();

  /* Non-React props, more native support for Angular */
  // support for two-way data binding for `@Input() checked`.
  @Output() checkedChange = new EventEmitter<boolean>();

  onRenderLabel: (props?: ICheckboxProps, defaultRender?: JsxRenderFunc<ICheckboxProps>) => JSX.Element;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderLabel = this.createRenderPropHandler(this.renderLabel);
  }

  onChangeHandler(ev?: FormEvent<HTMLElement | HTMLInputElement>, checked?: boolean) {
    this.onChange.emit({
      ev: ev && ev.nativeEvent,
      checked,
    });

    this.checkedChange.emit(checked);
  }
}
