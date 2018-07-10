import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild, OnInit, ChangeDetectorRef } from '@angular/core';
import { ISearchBoxProps } from 'office-ui-fabric-react/lib/SearchBox';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { IContextualMenuProps } from 'office-ui-fabric-react/lib/ContextualMenu';
import omit from '../../utils/omit';

@Component({
  selector: 'fab-search-box',
  exportAs: 'fabSearchBox',
  template: `
    <SearchBox
      #reactNode
      [componentRef]="componentRef"
      [placeholder]="placeholder"
      [labelText]="labelText"
      [value]="value"
      [defaultValue]="defaultValue"
      [className]="className"
      [ariaLabel]="ariaLabel"
      [clearButtonProps]="clearButtonProps"
      [underlined]="underlined"
      [theme]="theme"
      [styles]="styles"
      [disableAnimation]="disableAnimation"
      [Change]="onChangeHandler"
      [Search]="onSearchHandler"
      [Clear]="onClearHandler"
      [Escape]="onEscapeHandler"
      [Changed]="onChangedHandler">
    </SearchBox>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-search-box' }
})
export class FabSearchBoxComponent extends ReactWrapperComponent<ISearchBoxProps> {

  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ISearchBoxProps['componentRef'];
  @Input() placeholder?: ISearchBoxProps['placeholder'];
  @Input() labelText?: ISearchBoxProps['labelText'];
  @Input() value?: ISearchBoxProps['value'];
  @Input() defaultValue?: ISearchBoxProps['defaultValue'];
  @Input() className?: ISearchBoxProps['className'];
  @Input() ariaLabel?: ISearchBoxProps['ariaLabel'];
  @Input() underlined?: ISearchBoxProps['underlined'];
  @Input() theme?: ISearchBoxProps['theme'];
  @Input() styles?: ISearchBoxProps['styles'];
  @Input() disableAnimation?: ISearchBoxProps['disableAnimation'];
  @Input() set clearButtonOptions(value: IButtonOptions) {
    this._clearButtonOptions = value;

    if (value) {
      this.clearButtonProps = this._transformButtonOptionsToProps(value);
    }
  }

  get clearButtonOptions(): IButtonOptions {
    return this._clearButtonOptions;
  }

  @Output() readonly onChange = new EventEmitter<{ newValue: any }>();
  @Output() readonly onSearch = new EventEmitter<{ newValue: any }>();
  @Output() readonly onClear = new EventEmitter<{ ev?: any }>();
  @Output() readonly onEscape = new EventEmitter<{ ev?: any }>();
  @Output() readonly onChanged = new EventEmitter<{ newValue: any }>();

  clearButtonProps: IButtonProps;

  private _clearButtonOptions: IButtonOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);

    this.onChangeHandler = this.onChangeHandler.bind(this);
    this.onSearchHandler = this.onSearchHandler.bind(this);
    this.onClearHandler = this.onClearHandler.bind(this);
    this.onEscapeHandler = this.onEscapeHandler.bind(this);
    this.onChangedHandler = this.onChangedHandler.bind(this);
  }

  onChangeHandler(newValue: any) {
    this.onChange.emit({
      newValue
    });
  }
  onSearchHandler(newValue: any) {
    this.onSearch.emit({
      newValue
    });
  }
  onClearHandler(ev?: any) {
    this.onClear.emit({
      ev: ev && ev.nativeElement || ev,
    });
  }
  onEscapeHandler(ev?: any) {
    this.onEscape.emit({
      ev: ev && ev.nativeElement || ev,
    });
  }
  onChangedHandler(newValue: any) {
    this.onChange.emit({
      newValue
    });
  }

  private _transformButtonOptionsToProps(options: IButtonOptions): IButtonProps {
    const iconRenderer = this.createInputJsxRenderer(options.renderIcon);
    const textRenderer = this.createInputJsxRenderer(options.renderText);
    const descriptionRenderer = this.createInputJsxRenderer(options.renderDescription);
    const ariaDescriptionRenderer = this.createInputJsxRenderer(options.renderAriaDescription);
    const childrenRenderer = this.createInputJsxRenderer(options.renderChildren);
    const menuIconRenderer = this.createInputJsxRenderer(options.renderMenuIcon);
    const menuRenderer = this.createInputJsxRenderer(options.renderMenu);

    return Object.assign(
      options,
      iconRenderer && { onRenderIcon: props => iconRenderer(props) } as Pick<IButtonProps, 'onRenderIcon'>,
      textRenderer && { onRenderText: props => textRenderer(props) } as Pick<IButtonProps, 'onRenderText'>,
      descriptionRenderer && { onRenderDescription: props => descriptionRenderer(props) } as Pick<IButtonProps, 'onRenderDescription'>,
      ariaDescriptionRenderer && { onRenderAriaDescription: props => ariaDescriptionRenderer(props) } as Pick<IButtonProps, 'onRenderAriaDescription'>,
      childrenRenderer && { onRenderChildren: props => childrenRenderer(props) } as Pick<IButtonProps, 'onRenderChildren'>,
      menuIconRenderer && { onRenderMenuIcon: props => menuIconRenderer(props) } as Pick<IButtonProps, 'onRenderMenuIcon'>,
      menuRenderer && { onRenderMenu: props => menuRenderer(props) } as Pick<IButtonProps, 'onRenderMenu'>,
    );
  }

}

export interface IButtonOptions extends Pick<IButtonProps, 'componentRef' | 'href' | 'primary' | 'uniqueId' | 'disabled' | 'allowDisabledFocus' | 'primaryDisabled' | 'styles' | 'theme' | 'checked' | 'className' | 'ariaLabel' | 'ariaDescription' | 'ariaHidden' | 'text' | 'iconProps' | 'menuProps' | 'onAfterMenuDismiss' | 'split' | 'menuIconProps' | 'splitButtonAriaLabel' | 'onMenuClick' | 'secondaryText' | 'toggled' | 'data' | 'getClassNames' | 'getSplitButtonClassNames' | 'menuTriggerKeyCode' | 'keytipProps' | 'persistMenu'> {
  readonly renderIcon: InputRendererOptions<IButtonProps>;
  readonly renderText: InputRendererOptions<IButtonProps>;
  readonly renderDescription: InputRendererOptions<IButtonProps>;
  readonly renderAriaDescription: InputRendererOptions<IButtonProps>;
  readonly renderChildren: InputRendererOptions<IButtonProps>;
  readonly renderMenuIcon: InputRendererOptions<IButtonProps>;
  readonly renderMenu: InputRendererOptions<IContextualMenuProps>;
}
