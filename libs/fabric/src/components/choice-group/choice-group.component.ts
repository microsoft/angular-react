import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { IChoiceGroupOption, IChoiceGroupProps } from 'office-ui-fabric-react/lib/components/ChoiceGroup';

@Component({
  selector: 'fab-choice-group',
  exportAs: 'fabChoiceGroup',
  template: `
    <ChoiceGroup
      #reactNode
      [componentRef]="componentRef"
      [options]="options"
      [defaultSelectedKey]="defaultSelectedKey"
      [selectedKey]="selectedKey"
      [label]="label"
      [required]="required"
      [theme]="theme"
      [styles]="styles"
      [Changed]="onChangedHandler"
      [Change]="onChangeHandler"
      >
    </ChoiceGroup>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-choice-group' }
})
export class FabChoiceGroupComponent extends ReactWrapperComponent<IChoiceGroupProps>  {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IChoiceGroupProps['componentRef'];
  @Input() options?: IChoiceGroupProps['options'];
  @Input() defaultSelectedKey?: IChoiceGroupProps['defaultSelectedKey'];
  @Input() selectedKey?: IChoiceGroupProps['selectedKey'];
  @Input() label?: IChoiceGroupProps['label'];
  @Input() theme?: IChoiceGroupProps['theme'];
  @Input() styles?: IChoiceGroupProps['styles'];

  /** HTML Input props */
  @Input() required?: IChoiceGroupProps['required'];

  @Output() readonly onChanged = new EventEmitter<{ option: IChoiceGroupOption, evt?: Event }>();
  @Output() readonly onChange = new EventEmitter<{ ev?: Event, option?: IChoiceGroupOption }>();

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.onChangedHandler = this.onChangedHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
  }

  onChangedHandler(option: IChoiceGroupOption, evt?: React.FormEvent<HTMLElement | HTMLInputElement>) {
    this.onChanged.emit({
      option,
      evt: evt && evt.nativeEvent,
    });
  }

  onChangeHandler(ev?: React.FormEvent<HTMLElement | HTMLInputElement>, option?: IChoiceGroupOption) {
    this.onChange.emit({
      ev: ev && ev.nativeEvent,
      option,
    });
  }
}
