// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ContentChildren, Directive, QueryList } from '@angular/core';

import { DropdownOptionDirective } from './dropdown-option.directive';
import { IDropdownOption } from 'office-ui-fabric-react';

/**
 * Wrapper directive for creating multiple DropdownOptions
 */
@Directive({ selector: 'fab-dropdown > options' })
export class DropdownOptionsDirective {
  @ContentChildren(DropdownOptionDirective) readonly directiveItems: QueryList<DropdownOptionDirective>;

  get items() {
    return this.directiveItems.map<IDropdownOption>(directiveItem => {
      return {
        key: directiveItem.optionKey,
        text: directiveItem.text,
        title: directiveItem.title,
        itemType: directiveItem.itemType,
        index: directiveItem.index,
        ariaLabel: directiveItem.ariaLabel,
        selected: directiveItem.selected,
        disabled: directiveItem.disabled,
        data: directiveItem.data
      }
    });
  }
}
