// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { Directive, Input } from '@angular/core';
import { IComboBoxOption } from 'office-ui-fabric-react';

/**
 * Wrapper directive for creating a ComboBoxOption
 */
@Directive({ selector: 'fab-combo-box-option' })
export class ComboBoxOptionDirective {
  @Input() optionKey: IComboBoxOption['key'];
  @Input() text: IComboBoxOption['text'];
  @Input() title?: IComboBoxOption['title'];
  @Input() itemType: IComboBoxOption['itemType'];
  @Input() index?: IComboBoxOption['index'];
  @Input() ariaLabel?: IComboBoxOption['ariaLabel'];
  @Input() selected?: IComboBoxOption['selected'];
  @Input() disabled?: IComboBoxOption['disabled'];
  @Input() data?: IComboBoxOption['data'];
  @Input() styles?: IComboBoxOption['styles'];
  @Input() useAriaLabelAsText?: IComboBoxOption['useAriaLabelAsText'];
}
