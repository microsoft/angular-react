// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ChangeDetectionStrategy, Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'sem-button',
  exportAs: 'semButton',
  template: `
    <!-- prettier-ignore -->
    <Button
      [primary]="primary"
      [secondary]="secondary"
      [disabled]="disabled"
      [loading]="loading"
      [content]="content"
      (onClick)="onClick.emit($event)"
    ></Button>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { class: 'sem-button' },
})
export class SemButtonComponent {
  @Input() disabled = false;
  @Input() primary = false;
  @Input() secondary = false;
  @Input() loading = false;
  @Input('label') content = '';

  @Output() readonly onClick = new EventEmitter<MouseEvent>();
}
