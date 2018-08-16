// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, Omit, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { IExpandingCardProps, IHoverCardProps } from 'office-ui-fabric-react/lib/HoverCard';
import { omit } from '../../utils/omit';

@Component({
  selector: 'fab-hover-card',
  exportAs: 'fabHoverCard',
  template: `
    <HoverCard
      #reactNode
      [componentRef]="componentRef"
      [expandingCardProps]="transformedExpandingCardProps"
      [setAriaDescribedBy]="setAriaDescribedBy"
      [cardOpenDelay]="cardOpenDelay"
      [cardDismissDelay]="cardDismissDelay"
      [expandedCardOpenDelay]="expandedCardOpenDelay"
      [sticky]="sticky"
      [instantOpenOnClick]="instantOpenOnClick"
      [styles]="styles"
      [target]="target"
      [trapFocus]="trapFocus"
      [shouldBlockHoverCard]="shouldBlockHoverCard"
      [setInitialFocus]="setInitialFocus"
      [openHotKey]="openHotKey"
      (onCardVisible)="onCardVisible.emit()"
      (onCardHide)="onCardHide.emit()">
      <ReactContent><ng-content></ng-content></ReactContent>
    </HoverCard>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabHoverCardComponent extends ReactWrapperComponent<IHoverCardProps> {
  @ViewChild('reactNode')
  protected reactNodeRef: ElementRef;

  @Input()
  componentRef?: IHoverCardProps['componentRef'];
  @Input()
  setAriaDescribedBy?: IHoverCardProps['setAriaDescribedBy'];
  @Input()
  cardOpenDelay?: IHoverCardProps['cardOpenDelay'];
  @Input()
  cardDismissDelay?: IHoverCardProps['cardDismissDelay'];
  @Input()
  expandedCardOpenDelay?: IHoverCardProps['expandedCardOpenDelay'];
  @Input()
  sticky?: IHoverCardProps['sticky'];
  @Input()
  instantOpenOnClick?: IHoverCardProps['instantOpenOnClick'];
  @Input()
  styles?: IHoverCardProps['styles'];
  @Input()
  target?: IHoverCardProps['target'];
  @Input()
  trapFocus?: IHoverCardProps['trapFocus'];
  @Input()
  shouldBlockHoverCard?: () => boolean; // Workaround for bug in the Fabric React types (() => void)
  @Input()
  setInitialFocus?: IHoverCardProps['setInitialFocus'];
  @Input()
  openHotKey?: IHoverCardProps['openHotKey'];
  @Input()
  set expandingCardOptions(value: IExpandingCardOptions) {
    this._expandingCardOptions = value;
    if (value) {
      this.transformedExpandingCardProps = this._transformExpandingCardOptionsToProps(value);
    }
  }

  get expandingCardOptions(): IExpandingCardOptions {
    return this._expandingCardOptions;
  }

  @Output()
  readonly onCardVisible = new EventEmitter<void>();
  @Output()
  readonly onCardHide = new EventEmitter<void>();

  transformedExpandingCardProps: IExpandingCardProps;
  private _expandingCardOptions: IExpandingCardOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
  }

  private _transformExpandingCardOptionsToProps(options: IExpandingCardOptions): IExpandingCardProps {
    const sharedProperties = omit(options, 'renderCompactCard', 'renderExpandedCard');

    const compactCardRenderer = this.createInputJsxRenderer(options.renderCompactCard);
    const expandedCardRenderer = this.createInputJsxRenderer(options.renderExpandedCard);

    return Object.assign(
      {},
      sharedProperties,
      compactCardRenderer &&
        ({ onRenderCompactCard: data => compactCardRenderer({ data }) } as Pick<
          IExpandingCardProps,
          'onRenderCompactCard'
        >),
      expandedCardRenderer &&
        ({ onRenderExpandedCard: data => expandedCardRenderer({ data }) } as Pick<
          IExpandingCardProps,
          'onRenderExpandedCard'
        >)
    );
  }
}

/**
 * Counterpart of `IExpandingCardProps`, with Angular adjustments.
 */
export interface IExpandingCardOptions
  extends Omit<IExpandingCardProps, 'onRenderCompactCard' | 'onRenderExpandedCard'> {
  readonly renderCompactCard?: InputRendererOptions<RenderCardContext>;
  readonly renderExpandedCard?: InputRendererOptions<RenderCardContext>;
}

export interface RenderCardContext<T = any> {
  readonly data: T;
}
