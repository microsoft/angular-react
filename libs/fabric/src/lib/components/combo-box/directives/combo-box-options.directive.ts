// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';
import { IComboBoxOption } from 'office-ui-fabric-react';

import { ComboBoxOptionDirective } from "./combo-box-option.directive";

/**
 * Wrapper directive for creating multiple ComboBoxOptions
 */
@Directive({ selector: 'fab-combo-box > options' })
export class ComboBoxOptionsDirective {
  @ContentChildren(ComboBoxOptionDirective) readonly directiveItems: QueryList<ComboBoxOptionDirective>;

  get items() {
    return this.directiveItems.map<IComboBoxOption>(directiveItem => {
      return {
        key: directiveItem.optionKey,
        text: directiveItem.text,
        title: directiveItem.title,
        itemType: directiveItem.itemType,
        index: directiveItem.index,
        ariaLabel: directiveItem.ariaLabel,
        selected: directiveItem.selected,
        disabled: directiveItem.disabled,
        data: directiveItem.data,
        styles: directiveItem.styles,
        useAriaLabelAsText: directiveItem.useAriaLabelAsText
      }
    });
  }
}
