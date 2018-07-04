import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild } from '@angular/core';
import { ILinkProps } from 'office-ui-fabric-react/lib/components/Link';

@Component({
  selector: 'fab-link',
  exportAs: 'fabLink',
  template: `
    <!--<Link
      #reactNode
      [componentRef]="componentRef"
      [disabled]="disabled"
      [styles]="styles"
      [theme]="theme"
      [keytipProps]="keytipProps">
      <ReactContent><ng-content></ng-content></ReactContent>
    </Link> -->
    <div>PLACEHOLDER</div>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-link' }
})
export class FabLinkComponent extends ReactWrapperComponent<ILinkProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ILinkProps['componentRef'];
  @Input() disabled?: ILinkProps['disabled'];
  @Input() styles?: ILinkProps['styles'];
  @Input() theme?: ILinkProps['theme'];
  @Input() as?: string | React.ComponentClass | React.StatelessComponent;
  @Input() keytipProps?: ILinkProps['keytipProps'];

  @Input() href: ILinkProps['href'];
  @Input() type?: ILinkProps['type'];
  @Input() download?: ILinkProps['download'];
  @Input() hrefLang?: ILinkProps['hrefLang'];
  @Input() media?: ILinkProps['media'];
  @Input() rel?: ILinkProps['rel'];
  @Input() target?: ILinkProps['target'];
  @Input() autoFocus?: ILinkProps['autoFocus'];
  @Input() form?: ILinkProps['form'];
  @Input() formAction?: ILinkProps['formAction'];
  @Input() formEncType?: ILinkProps['formEncType'];
  @Input() formMethod?: ILinkProps['formMethod'];
  @Input() formNoValidate?: ILinkProps['formNoValidate'];
  @Input() formTarget?: ILinkProps['formTarget'];
  @Input() name?: ILinkProps['name'];
  @Input() value?: ILinkProps['value'];

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

}
