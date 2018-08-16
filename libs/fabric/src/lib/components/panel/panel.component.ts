// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, OnInit, Output, Renderer2, ViewChild } from '@angular/core';
import { IPanelHeaderRenderer, IPanelProps } from 'office-ui-fabric-react/lib/Panel';

@Component({
  selector: 'fab-panel',
  exportAs: 'fabPanel',
  template: `
    <Panel
      #reactNode
      [componentRef]="componentRef"
      [isOpen]="isOpen"
      [hasCloseButton]="hasCloseButton"
      [isLightDismiss]="isLightDismiss"
      [isHiddenOnDismiss]="isHiddenOnDismiss"
      [isBlocking]="isBlocking"
      [isFooterAtBottom]="isFooterAtBottom"
      [headerText]="headerText"
      [className]="className"
      [type]="type"
      [customWidth]="customWidth"
      [closeButtonAriaLabel]="closeButtonAriaLabel"
      [headerClassName]="headerClassName"
      [elementToFocusOnDismiss]="elementToFocusOnDismiss"
      [ignoreExternalFocusing]="ignoreExternalFocusing"
      [forceFocusInsideTrap]="forceFocusInsideTrap"
      [firstFocusableSelector]="firstFocusableSelector"
      [focusTrapZoneProps]="focusTrapZoneProps"
      [layerProps]="layerProps"
      [componentId]="componentId"
      [RenderHeader]="renderHeader && onRenderHeader"
      [RenderNavigation]="renderNavigation && onRenderNavigation"
      [RenderBody]="renderBody && onRenderBody"
      [RenderFooter]="renderFooter && onRenderFooter"
      [RenderFooterContent]="renderFooterContent && onRenderFooterContent"
      (onDismiss)="onDismiss.emit($event)"
      (onDismissed)="onDismissed.emit($event)"
      (onLightDismissClick)="onLightDismissClick.emit($event)">
        <ReactContent><ng-content></ng-content></ReactContent>
    </Panel>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabPanelComponent extends ReactWrapperComponent<IPanelProps> implements OnInit {
  @ViewChild('reactNode')
  protected reactNodeRef: ElementRef;

  @Input()
  componentRef?: IPanelProps['componentRef'];
  @Input()
  isOpen?: IPanelProps['isOpen'];
  @Input()
  hasCloseButton?: IPanelProps['hasCloseButton'];
  @Input()
  isLightDismiss?: IPanelProps['isLightDismiss'];
  @Input()
  isHiddenOnDismiss?: IPanelProps['isHiddenOnDismiss'];
  @Input()
  isBlocking?: IPanelProps['isBlocking'];
  @Input()
  isFooterAtBottom?: IPanelProps['isFooterAtBottom'];
  @Input()
  headerText?: IPanelProps['headerText'];
  @Input()
  className?: IPanelProps['className'];
  @Input()
  type?: IPanelProps['type'];
  @Input()
  customWidth?: IPanelProps['customWidth'];
  @Input()
  closeButtonAriaLabel?: IPanelProps['closeButtonAriaLabel'];
  @Input()
  headerClassName?: IPanelProps['headerClassName'];
  @Input()
  elementToFocusOnDismiss?: IPanelProps['elementToFocusOnDismiss'];
  @Input()
  ignoreExternalFocusing?: IPanelProps['ignoreExternalFocusing'];
  @Input()
  forceFocusInsideTrap?: IPanelProps['forceFocusInsideTrap'];
  @Input()
  firstFocusableSelector?: IPanelProps['firstFocusableSelector'];
  @Input()
  focusTrapZoneProps?: IPanelProps['focusTrapZoneProps'];
  @Input()
  layerProps?: IPanelProps['layerProps'];
  @Input()
  componentId?: IPanelProps['componentId'];

  @Input()
  renderNavigation?: InputRendererOptions<IPanelProps>;
  @Input()
  renderHeader?: InputRendererOptions<IPanelHeaderRenderContext>;
  @Input()
  renderBody?: InputRendererOptions<IPanelProps>;
  @Input()
  renderFooter?: InputRendererOptions<IPanelProps>;
  @Input()
  renderFooterContent?: InputRendererOptions<IPanelProps>;

  @Output()
  readonly onLightDismissClick = new EventEmitter<void>();
  @Output()
  readonly onDismiss = new EventEmitter<void>();
  @Output()
  readonly onDismissed = new EventEmitter<void>();

  private _renderHeader: JsxRenderFunc<IPanelHeaderRenderContext>;
  onRenderNavigation: (props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>) => JSX.Element;
  onRenderBody: (props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>) => JSX.Element;
  onRenderFooter: (props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>) => JSX.Element;
  onRenderFooterContent: (props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>) => JSX.Element;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onRenderHeader = this.onRenderHeader.bind(this);
  }

  ngOnInit() {
    this.onRenderNavigation = this.createRenderPropHandler(this.renderNavigation);
    this._renderHeader = this.createInputJsxRenderer(this.renderHeader);
    this.onRenderBody = this.createRenderPropHandler(this.renderBody);
    this.onRenderFooter = this.createRenderPropHandler(this.renderFooter);
    this.onRenderFooterContent = this.createRenderPropHandler(this.renderFooterContent);
  }

  onRenderHeader(
    props?: IPanelProps,
    defaultRender?: IPanelHeaderRenderer,
    headerTextId?: string | undefined
  ): JSX.Element {
    if (!this.renderHeader) {
      return typeof defaultRender === 'function' ? defaultRender(props, defaultRender, headerTextId) : null;
    }

    return this._renderHeader({ props, headerTextId });
  }
}

/**
 * Counterpart of `IPanelHeaderRenderer`.
 */
export interface IPanelHeaderRenderContext {
  readonly props?: IPanelProps;
  readonly headerTextId?: string | undefined;
}
