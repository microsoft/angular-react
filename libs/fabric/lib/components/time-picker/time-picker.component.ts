// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  Renderer2,
  ViewChild,
} from '@angular/core';
import type { ITimePickerProps } from '@fluentui/react/lib/TimePicker';
import { Styled } from '@angular-react/fabric/lib/utils';
import { AngularReact } from '@angular-react/core';
import type { IComboBox, IComboBoxOption } from '@fluentui/react/lib/components/ComboBox';
import { formatTimeString } from '@fluentui/date-time-utilities';

@AngularReact()
@Styled('FabTimePickerComponent')
@Component({
  selector: 'fab-time-picker',
  exportAs: 'fabTimePicker',
  template: `
    <TimePicker
      #reactNode
      [componentRef]="componentRef"
      [theme]="theme"
      [styles]="styles"
      [label]="label"
      [increments]="increments"
      [showSeconds]="showSeconds"
      [useHour12]="useHour12"
      [allowFreeform]="allowFreeform"
      [autoComplete]="autoComplete"
      [timeRange]="timeRange"
      [strings]="strings"
      [defaultValue]="defaultValue"
      [useComboBoxAsMenuWidth]="useComboBoxAsMenuWidth"
      [FormatDate]="onFormatDate"
      [ValidateUserInput]="onValidateUserInput"
      [Change]="handleChange"
      [ItemClick]="handleItemClick"
      [InputValueChange]="handleInputValueChange"
      [MenuOpen]="handleMenuOpen"
      [MenuDismissed]="handleMenuDismissed"
      [MenuDismiss]="handleMenuDismiss"
    >
    </TimePicker>
  `
})
export class FabTimePickerComponent extends ReactWrapperComponent<ITimePickerProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  @Input() componentRef?: ITimePickerProps['componentRef'];
  @Input() theme?: ITimePickerProps['theme'];
  @Input() styles?: ITimePickerProps['styles'];
  @Input() label?: ITimePickerProps['label'];
  @Input() increments?: ITimePickerProps['increments'];
  @Input() showSeconds?: ITimePickerProps['showSeconds'];
  @Input() useHour12?: ITimePickerProps['useHour12'];
  @Input() allowFreeform?: ITimePickerProps['allowFreeform'];
  @Input() autoComplete?: ITimePickerProps['autoComplete'];
  @Input() timeRange?: ITimePickerProps['timeRange'];
  @Input() strings?: ITimePickerProps['strings'];
  @Input() defaultValue?: ITimePickerProps['defaultValue'];
  @Input() useComboBoxAsMenuWidth?: ITimePickerProps['useComboBoxAsMenuWidth'] = true;
  @Input() onFormatDate?: ITimePickerProps['onFormatDate']
  @Input() onValidateUserInput?: ITimePickerProps['onValidateUserInput']

  @Output() readonly onChange = new EventEmitter<{event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string}>();
  @Output() readonly onItemClick = new EventEmitter<{event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number}>();
  @Output() readonly onInputValueChange = new EventEmitter<string>();
  @Output() readonly onMenuOpen = new EventEmitter();
  @Output() readonly onMenuDismissed = new EventEmitter();
  @Output() readonly onMenuDismiss = new EventEmitter();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }

  handleChange = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) => {
    this.onChange.emit({ event, option, index, value })
  }

  handleItemClick = (event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) => {
    this.onItemClick.emit({ event, option, index });
  }

  handleInputValueChange = (text: string) => {
    this.onInputValueChange.emit(text);
  }

  handleMenuOpen = () => {
    this.onMenuOpen.emit();
  }

  handleMenuDismissed = () => {
    this.onMenuDismissed.emit();
  }

  handleMenuDismiss = () => {
    this.onMenuDismiss.emit();
  }
}