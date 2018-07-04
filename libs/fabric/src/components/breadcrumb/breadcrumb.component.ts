// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { IBreadcrumbItem, IBreadcrumbProps } from 'office-ui-fabric-react/lib/components/Breadcrumb';

@Component({
  selector: 'fab-breadcrumb',
  exportAs: 'fabBreadcrumb',
  template: `
    <Breadcrumb
      #reactNode
      [componentRef]="componentRef"
      [items]="items"
      [className]="className"
      [dividerAs]="dividerAs"
      [maxDisplayedItems]="maxDisplayedItems"
      [ariaLabel]="ariaLabel"
      [overflowAriaLabel]="overflowAriaLabel"
      [overflowIndex]="overflowIndex"
      [styles]="styles"
      [theme]="theme"
      [RenderItem]="item && onRenderItem"
      [ReduceData]="onReduceData"
      >
    </Breadcrumb>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-breadcrumb' }
})
export class FabBreadcrumbComponent extends ReactWrapperComponent<IBreadcrumbProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IBreadcrumbProps['componentRef'];
  @Input() items: IBreadcrumbProps['items'];
  @Input() className?: IBreadcrumbProps['className'];
  @Input() dividerAs?: IBreadcrumbProps['dividerAs'];
  @Input() maxDisplayedItems?: IBreadcrumbProps['maxDisplayedItems'];
  @Input() ariaLabel?: IBreadcrumbProps['ariaLabel'];
  @Input() overflowAriaLabel?: IBreadcrumbProps['overflowAriaLabel'];
  @Input() overflowIndex?: IBreadcrumbProps['overflowIndex'];
  @Input() styles?: IBreadcrumbProps['styles'];
  @Input() theme?: IBreadcrumbProps['theme'];

  @Input() item?: InputRendererOptions<IBreadcrumbItem>;
  @Input() onReduceData?: IBreadcrumbProps['onReduceData'];

  private _renderItem: JsxRenderFunc<IBreadcrumbItem>;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    this.onRenderItem = this.onRenderItem.bind(this);
  }

  ngOnInit() {
    this._renderItem = this.createInputJsxRenderer(this.item);
  }

  onRenderItem(props?: IBreadcrumbItem, defaultRender?: JsxRenderFunc<IBreadcrumbItem>): JSX.Element {
    if (!this.item) {
      return typeof defaultRender === 'function' ? defaultRender(props) : null;
    }

    return this._renderItem(props);
  }
}
