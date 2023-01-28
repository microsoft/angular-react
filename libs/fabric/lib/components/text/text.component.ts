// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  ElementRef,
  Input,
  Renderer2,
  ViewChild,
} from '@angular/core';
import { ITextProps } from '@fluentui/react/lib/Text';
import { Styled } from '@angular-react/fabric/lib/utils';
import { AngularReact } from '@angular-react/core';

@AngularReact()
@Styled('FabTextComponent')
@Component({
  selector: 'fab-text',
  exportAs: 'fabText',
  template: `
    <Text
      #reactNode
      as="div"
      block="true"
      nowrap="true"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </Text>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabTextComponent extends ReactWrapperComponent<ITextProps> {
  @ViewChild('reactNode', { static: true }) protected reactNodeRef: ElementRef;

  // @FIXME:
  @Input() as?: ITextProps['as'] = 'div';
  @Input() block?: ITextProps['block'] = true;
  @Input() nowrap?: ITextProps['nowrap'] = true;
  @Input() className?: ITextProps['className'] = '';
  @Input() variant?: ITextProps['variant'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }
}
