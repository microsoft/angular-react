// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ChangeDetectionStrategy, Component, Input } from '@angular/core';
import { IIconProps } from 'office-ui-fabric-react/lib/Icon';

@Component({
  selector: 'fab-icon',
  exportAs: 'fabIcon',
  template: `
    <Icon
      [iconName]="iconName"
      [ariaLabel]="ariaLabel"
      [iconType]="iconType"
      [imageProps]="imageProps"
      [imageErrorAs]="imageErrorAs"
      [styles]="styles">
    </Icon>
  `,
  styles: ['react-renderer',],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: {
    'class': 'fab-icon',
  }
})
export class FabIconComponent {

  @Input() iconName?: IIconProps['iconName'];
  @Input() ariaLabel?: IIconProps['ariaLabel'];
  @Input() iconType?: IIconProps['iconType'];
  @Input() imageProps?: IIconProps['imageProps'];
  @Input() imageErrorAs?: IIconProps['imageErrorAs'];
  @Input() styles?: IIconProps['styles'];

}
