// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ElementRef, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { IComboBoxOption, IComboBoxProps } from 'office-ui-fabric-react/lib/components/ComboBox';

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

  @Output() readonly onChanged = new EventEmitter<{ option?: IComboBoxOption, index?: number, value?: string, submitPendingValueEvent?: any }>();
  @Output() readonly onPendingValueChanged = new EventEmitter<{ option?: IComboBoxOption, index?: number, value?: string }>();
  @Output() readonly onMenuOpen = new EventEmitter<void>();
  @Output() readonly onMenuDismissed = new EventEmitter<void>();
  @Output() readonly onScrollToItem = new EventEmitter<{ itemIndex: number }>();

  onRenderLowerContent: (props?: IComboBoxProps, defaultRender?: JsxRenderFunc<IComboBoxProps>) => JSX.Element;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onChangedHandler = this.onChangedHandler.bind(this);
    this.onPendingValueChangedHandler = this.onPendingValueChangedHandler.bind(this);
    this.onScrollToItemHandler = this.onScrollToItemHandler.bind(this);
  }

  ngOnInit() {
    this.onRenderLowerContent = this.createRenderPropHandler(this.renderLowerContent);
  }

  onChangedHandler(option?: IComboBoxOption, index?: number, value?: string, submitPendingValueEvent?: any) {
    this.onChanged.emit({
      option,
      index,
      value,
      submitPendingValueEvent,
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
      itemIndex
    });
  }
}
