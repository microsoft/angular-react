// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  NgZone,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { FabBaseComboBoxComponent } from './base-combo-box.component';
import { Styled } from '@angular-react/fabric/lib/utils';

@Styled('FabComboBoxComponent')
@Component({
  selector: 'fab-combo-box',
  exportAs: 'fabComboBox',
  template: `
    <ComboBox
      #reactNode
      [componentRef]="componentRef"
      [label]="label"
      [defaultSelectedKey]="defaultSelectedKey"
      [selectedKey]="selectedKey"
      [options]="options"
      [allowFreeform]="allowFreeform"
      [autoComplete]="autoComplete"
      [text]="text"
      [buttonIconProps]="buttonIconProps"
      [autofill]="autofill"
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
      [ariaDescribedBy]="ariaDescribedBy"
      [persistMenu]="persistMenu"
      [shouldRestoreFocus]="shouldRestoreFocus"
      [RenderLowerContent]="renderLowerContent && onRenderLowerContent"
      [ItemClick]="onItemClickHandler"
      [Change]="onChangeHandler"
      [PendingValueChanged]="onPendingValueChangedHandler"
      [ResolveOptions]="resolveOptions"
      [ScrollToItem]="onScrollToItemHandler"
      (onMenuOpen)="onMenuOpen.emit()"
      (onMenuDismissed)="onMenuDismissed.emit()"
      (onMenuDismiss)="onMenuDismiss.emit()"
    >
    </ComboBox>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabComboBoxComponent extends FabBaseComboBoxComponent {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, ngZone);
  }
}
