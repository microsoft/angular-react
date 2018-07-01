// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { JsxRenderFunc, ReactWrapperComponent, RenderInput } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
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
      [RenderHeader]="header && onRenderHeader"
      [RenderNavigation]="navigation && onRenderNavigation"
      [RenderBody]="body && onRenderBody"
      [RenderFooter]="footer && onRenderFooter"
      [RenderFooterContent]="footerContent && onRenderFooterContent"
      (onDismiss)="onDismiss.emit($event)"
      (onDismissed)="onDismissed.emit($event)"
      (onLightDismissClick)="onLightDismissClick.emit($event)">
        <ReactContent><ng-content></ng-content></ReactContent>
    </Panel>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-panel' }
})
export class FabPanelComponent extends ReactWrapperComponent<IPanelProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IPanelProps['componentRef'];
  @Input() isOpen?: IPanelProps['isOpen'];
  @Input() hasCloseButton?: IPanelProps['hasCloseButton'];
  @Input() isLightDismiss?: IPanelProps['isLightDismiss'];
  @Input() isHiddenOnDismiss?: IPanelProps['isHiddenOnDismiss'];
  @Input() isBlocking?: IPanelProps['isBlocking'];
  @Input() isFooterAtBottom?: IPanelProps['isFooterAtBottom'];
  @Input() headerText?: IPanelProps['headerText'];
  @Input() className?: IPanelProps['className'];
  @Input() type?: IPanelProps['type'];
  @Input() customWidth?: IPanelProps['customWidth'];
  @Input() closeButtonAriaLabel?: IPanelProps['closeButtonAriaLabel'];
  @Input() headerClassName?: IPanelProps['headerClassName'];
  @Input() elementToFocusOnDismiss?: IPanelProps['elementToFocusOnDismiss'];
  @Input() ignoreExternalFocusing?: IPanelProps['ignoreExternalFocusing'];
  @Input() forceFocusInsideTrap?: IPanelProps['forceFocusInsideTrap'];
  @Input() firstFocusableSelector?: IPanelProps['firstFocusableSelector'];
  @Input() focusTrapZoneProps?: IPanelProps['focusTrapZoneProps'];
  @Input() layerProps?: IPanelProps['layerProps'];
  @Input() componentId?: IPanelProps['componentId'];

  @Input() navigation?: RenderInput<IPanelRenderContext>;
  @Input() header?: RenderInput<IPanelHeaderRenderContext>;
  @Input() body?: RenderInput<IPanelRenderContext>;
  @Input() footer?: RenderInput<IPanelRenderContext>;
  @Input() footerContent?: RenderInput<IPanelRenderContext>;

  @Output() onLightDismissClick = new EventEmitter<void>();
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onDismissed = new EventEmitter<void>();

  private _renderNavigation: JsxRenderFunc<IPanelRenderContext>;
  private _renderHeader: JsxRenderFunc<IPanelHeaderRenderContext>;
  private _renderBody: JsxRenderFunc<IPanelRenderContext>;
  private _renderFooter: JsxRenderFunc<IPanelRenderContext>;
  private _renderFooterContent: JsxRenderFunc<IPanelRenderContext>;

  constructor(elementRef: ElementRef) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onRenderHeader = this.onRenderHeader.bind(this);
    this.onRenderBody = this.onRenderBody.bind(this);
    this.onRenderFooter = this.onRenderFooter.bind(this);
    this.onRenderFooterContent = this.onRenderFooterContent.bind(this);
    this.onRenderNavigation = this.onRenderNavigation.bind(this);
  }

  ngOnInit() {
    this._renderNavigation = this.initRenderInput(this.navigation);
    this._renderHeader = this.initRenderInput(this.header);
    this._renderBody = this.initRenderInput(this.body);
    this._renderFooter = this.initRenderInput(this.footer);
    this._renderFooterContent = this.initRenderInput(this.footerContent);
  }

  onRenderNavigation(props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>): JSX.Element {
    if (!this.navigation) {
      return typeof defaultRender === 'function' ? defaultRender(props) : null;
    }

    return this._renderNavigation({ props });
  }

  onRenderHeader(props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element {
    if (!this.header) {
      return typeof defaultRender === 'function' ? defaultRender(props, defaultRender, headerTextId) : null;
    }

    return this._renderHeader({ props, headerTextId });
  }

  onRenderBody(props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>): JSX.Element {
    if (!this.body) {
      return typeof defaultRender === 'function' ? defaultRender(props) : null;
    }

    return this._renderBody({ props });
  }

  onRenderFooter(props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>): JSX.Element {
    if (!this.footer) {
      return typeof defaultRender === 'function' ? defaultRender(props) : null;
    }

    return this._renderFooter({ props });
  }

  onRenderFooterContent(props?: IPanelProps, defaultRender?: JsxRenderFunc<IPanelProps>): JSX.Element {
    if (!this.footerContent) {
      return typeof defaultRender === 'function' ? defaultRender(props) : null;
    }

    return this._renderFooterContent({ props });
  }
}

/**
 * Counterpart of `IPanelHeaderRenderer`.
 */
export interface IPanelHeaderRenderContext {
  props?: IPanelProps
  headerTextId?: string | undefined
}

export interface IPanelRenderContext {
  props: IPanelProps;
}
