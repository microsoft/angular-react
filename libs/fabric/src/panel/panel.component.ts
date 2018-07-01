// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ReactContent, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, TemplateRef, ViewChild, ViewContainerRef } from '@angular/core';
import { IPanelHeaderRenderer, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

@Component({
  selector: 'fab-panel-header',
  exportAs: 'fabPanelHeader',
  template: `
      <ReactContent #contentTemplate><ng-content></ng-content></ReactContent>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-panel-header' }
})
export class FabPanelHeaderComponent {

  @ViewChild('contentTemplate') contentTemplate: ElementRef;

}


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
      (onDismiss)="onDismiss.emit($event)"
      (onDismissed)="onDismissed.emit($event)"
      (onLightDismissClick)="onLightDismissClick.emit($event)"
      [RenderHeader]="onRenderHeader">
      <!--
      (onRenderBody)="onRenderBody.emit($event)"
      (onRenderFooter)="onRenderFooter.emit($event)"
      (onRenderFooterContent)="onRenderFooterContent.emit($event)"
      (onRenderNavigation)="onRenderNavigation.emit($event)"
      -->
    </Panel>
  `,
  styles: [
    'react-renderer',
  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-panel' }
})
export class FabPanelComponent extends ReactWrapperComponent<IPanelProps> {
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

  // @Input() headerTemplate?: TemplateRef<IPanelHeaderTemplateContext>

  @Output() onLightDismissClick = new EventEmitter<void>();
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onDismissed = new EventEmitter<void>();
  @Output() onRenderNavigation = new EventEmitter<IPanelProps>();
  // @Output() onRenderHeader = new EventEmitter<IPanelProps['onRenderHeader']>();
  // @Output() onRenderBody = new EventEmitter<IPanelProps['onRenderBody']>();
  // @Output() onRenderFooter = new EventEmitter<IPanelProps['onRenderFooter']>();
  // @Output() onRenderFooterContent = new EventEmitter<IPanelProps['onRenderFooterContent']>();

  // @ContentChild(FabPanelHeaderComponent) headerComponent?: FabPanelHeaderComponent;

  // @ViewChild('headerTmplRef') headerTmplRef: TemplateRef<any>;

  @Input() panelHeader: TemplateRef<any>;

  // @ViewChild('headerPlaceholder', { read: TemplateRef }) headerPlaceholder: TemplateRef<any>;

  constructor(
    elementRef: ElementRef,
    private readonly vcr: ViewContainerRef
  ) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onRenderHeader = this.onRenderHeader.bind(this);
  }

  onRenderHeader(props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element {
    /*  if (!this.panelHeader) {
       return defaultRender(props, defaultRender, headerTextId);
     } */

    const x = this.panelHeader.createEmbeddedView(null);
    return React.createElement(
      ReactContent,
      {
        ['children-to-append']: x.rootNodes
      } as any
    );
  }

}

/**
 * Counterpart of `IPanelHeaderRenderer`.
 */
export interface IPanelHeaderTemplateContext {
  props?: IPanelProps
  headerTextId?: string | undefined
}
