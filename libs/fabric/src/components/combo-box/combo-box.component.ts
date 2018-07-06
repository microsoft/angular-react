import { ChangeDetectionStrategy, Component, ElementRef, ViewChild } from '@angular/core';
import { FabBaseComboBoxComponent } from './base-combo-box.component';

@Component({
  selector: 'fab-combo-box',
  exportAs: 'fabComboBox',
  template: `
    <ComboBox
      #reactNode
      [componentRef]="componentRef"
      [options]="options"
      [allowFreeform]="allowFreeform"
      [autoComplete]="autoComplete"
      [text]="text"
      [buttonIconProps]="buttonIconProps"
      [theme]="theme"
      [styles]="styles"
      [getClassNames]="getClassNames"
      [caretDownButtonStyles]="caretDownButtonStyles"
      [comboBoxOptionStyles]="comboBoxOptionStyles"
      [scrollSelectedToTop]="scrollSelectedToTop"
      [dropdownWidth]="dropdownWidth"
      [useComboBoxAsMenuWidth]="useComboBoxAsMenuWidth"
      [multiSelect]="multiSelect"
      [isButtonAriaHidden]="isButtonAriaHidden"
      [keytipProps]="keytipProps"
      [RenderLowerContent]="renderLowerContent && onRenderLowerContent"
      [Changed]="onChangedHandler"
      [PendingValueChanged]="onPendingValueChangedHandler"
      [ResolveOptions]="resolveOptions"
      [ScrollToItem]="onScrollToItemHandler"
      (onMenuOpen)="onMenuOpen.emit()"
      (onMenuDismissed)="onMenuDismissed.emit()">
    </ComboBox>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-combo-box' }
})
export class FabComboBoxComponent extends FabBaseComboBoxComponent {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }
}
