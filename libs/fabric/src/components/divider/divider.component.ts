import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, ChangeDetectorRef } from '@angular/core';
import { IVerticalDividerProps } from 'office-ui-fabric-react/lib/Divider';

@Component({
  selector: 'fab-vertical-divider',
  exportAs: 'fabVerticalDivider',
  template: `
    <VerticalDivider
      #reactNode
      [getClassNames]="getClassNames">
    </VerticalDivider>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDividerComponent extends ReactWrapperComponent<IVerticalDividerProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() getClassNames?: IVerticalDividerProps['getClassNames'];

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);
  }
}
