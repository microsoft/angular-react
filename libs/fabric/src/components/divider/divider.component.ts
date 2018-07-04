// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { IVerticalDividerProps } from 'office-ui-fabric-react/lib/components/Divider';

@Component({
  selector: 'fab-vertical-divider',
  exportAs: 'fabVerticalDivider',
  template: `
    <VerticalDivider
      #reactNode
      [getClassNames]="getClassNames">
    </VerticalDivider>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-vertical-divider' }
})
export class FabDividerComponent extends ReactWrapperComponent<IVerticalDividerProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() getClassNames?: IVerticalDividerProps['getClassNames'];

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
