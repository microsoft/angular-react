// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { ReactContent, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ComponentFactoryResolver, ElementRef, EventEmitter, Injector, Input, Output, TemplateRef, Type, ViewChild } from '@angular/core';
import { IPanelHeaderRenderer, IPanelProps } from 'office-ui-fabric-react/lib/Panel';
import * as React from 'react';

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
      [RenderHeader]="onRenderHeader"
      [RenderBody]="onRenderBody">
      <!--
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

  @Input() headerTemplate?: TemplateRef<IPanelHeaderTemplateContext>;
  @Input() bodyComponent?: { componentType: Type<Component>, factoryResolver: ComponentFactoryResolver, injector: Injector };

  @Output() onLightDismissClick = new EventEmitter<void>();
  @Output() onDismiss = new EventEmitter<void>();
  @Output() onDismissed = new EventEmitter<void>();
  @Output() onRenderNavigation = new EventEmitter<IPanelProps>();
  // @Output() onRenderFooter = new EventEmitter<IPanelProps['onRenderFooter']>();
  // @Output() onRenderFooterContent = new EventEmitter<IPanelProps['onRenderFooterContent']>();

  constructor(
    elementRef: ElementRef,
  ) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onRenderHeader = this.onRenderHeader.bind(this);
    this.onRenderBody = this.onRenderBody.bind(this);
  }

  onRenderHeader(props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element {
    if (!this.headerTemplate) {
      return defaultRender(props, defaultRender, headerTextId);
    }

    const viewRef = this.headerTemplate.createEmbeddedView({ props, headerTextId });
    viewRef.detectChanges();

    return React.createElement(
      ReactContent,
      {
        ['children-to-append']: viewRef.rootNodes
      } as any
    );
  }

  onRenderBody(props?: IPanelProps, defaultRender?: IPanelHeaderRenderer, headerTextId?: string | undefined): JSX.Element {
    if (!this.bodyComponent) {
      return defaultRender(props, defaultRender, headerTextId);
    }

    const bodyFactory = this.bodyComponent.factoryResolver.resolveComponentFactory(this.bodyComponent.componentType);
    const bodyComponentRef = bodyFactory.create(this.bodyComponent.injector);

    Object.assign(bodyComponentRef.instance, {
      props,
      headerTextId
    });

    bodyComponentRef.hostView.detectChanges();

    return React.createElement(
      ReactContent,
      {
        ['children-to-append']: [bodyComponentRef.location.nativeElement]
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
