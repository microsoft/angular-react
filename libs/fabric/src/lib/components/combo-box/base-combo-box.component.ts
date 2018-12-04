// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectorRef, ElementRef, EventEmitter, Input, NgZone, OnInit, Output, Renderer2 } from '@angular/core';
import { IComboBox, IComboBoxOption, IComboBoxProps } from 'office-ui-fabric-react/lib/ComboBox';

export abstract class FabBaseComboBoxComponent extends ReactWrapperComponent<IComboBoxProps> implements OnInit {
  @Input() componentRef?: IComboBoxProps['componentRef'];
  @Input() options: IComboBoxProps['options'];
  @Input() allowFreeform?: IComboBoxProps['allowFreeform'];
  @Input() autoComplete?: IComboBoxProps['autoComplete'];
  @Input() text?: IComboBoxProps['text'];
  @Input() buttonIconProps?: IComboBoxProps['buttonIconProps'];
  @Input() theme?: IComboBoxProps['theme'];
  @Input() styles?: IComboBoxProps['styles'];
  @Input() getClassNames?: IComboBoxProps['getClassNames'];
  @Input() caretDownButtonStyles?: IComboBoxProps['caretDownButtonStyles'];
  @Input() comboBoxOptionStyles?: IComboBoxProps['comboBoxOptionStyles'];
  @Input() scrollSelectedToTop?: IComboBoxProps['scrollSelectedToTop'];
  @Input() dropdownWidth?: IComboBoxProps['dropdownWidth'];
  @Input() useComboBoxAsMenuWidth?: IComboBoxProps['useComboBoxAsMenuWidth'];
  @Input() multiSelect?: IComboBoxProps['multiSelect'];
  @Input() isButtonAriaHidden?: IComboBoxProps['isButtonAriaHidden'];
  @Input() keytipProps?: IComboBoxProps['keytipProps'];
  @Input() resolveOptions?: (options: IComboBoxOption[]) => IComboBoxOption[] | PromiseLike<IComboBoxOption[]>;

  @Input() renderLowerContent?: InputRendererOptions<IComboBoxProps>;

  @Output() readonly onItemClick = new EventEmitter<{
    event: Event;
    option?: IComboBoxOption;
    index?: number;
  }>();
  @Output() readonly onChange = new EventEmitter<{
    event: Event;
    option?: IComboBoxOption;
    index?: number;
    value?: string;
  }>();
  @Output() readonly onPendingValueChanged = new EventEmitter<{
    option?: IComboBoxOption;
    index?: number;
    value?: string;
  }>();
  @Output() readonly onMenuOpen = new EventEmitter<void>();
  @Output() readonly onMenuDismissed = new EventEmitter<void>();
  @Output() readonly onScrollToItem = new EventEmitter<{ itemIndex: number }>();

  onRenderLowerContent: (props?: IComboBoxProps, defaultRender?: JsxRenderFunc<IComboBoxProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone });

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onItemClickHandler = this.onItemClickHandler.bind(this);
    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onPendingValueChangedHandler = this.onPendingValueChangedHandler.bind(this);
    this.onScrollToItemHandler = this.onScrollToItemHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderLowerContent = this.createRenderPropHandler(this.renderLowerContent);
  }

  onItemClickHandler(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number) {
    this.onItemClick.emit({
      event: event.nativeEvent,
      option,
      index,
    });
  }

  onChangeHandler(event: React.FormEvent<IComboBox>, option?: IComboBoxOption, index?: number, value?: string) {
    this.onChange.emit({
      event: event.nativeEvent,
      option,
      index,
      value,
    });
  }

  onPendingValueChangedHandler(option?: IComboBoxOption, index?: number, value?: string) {
    this.onPendingValueChanged.emit({
      option,
      index,
      value,
    });
  }

  onScrollToItemHandler(itemIndex: number) {
    this.onScrollToItem.emit({
      itemIndex,
    });
  }
}
