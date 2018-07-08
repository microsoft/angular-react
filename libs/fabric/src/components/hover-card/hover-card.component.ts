import { ReactWrapperComponent, InputRendererOptions } from '@angular-react/core';
import { EventEmitter, ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, Output } from '@angular/core';
import { IHoverCardProps, IExpandingCardProps } from 'office-ui-fabric-react/lib/HoverCard';
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
      (onCardVisible)="onCardVisible.emit()"
      (onCardHide)="onCardHide.emit()">
      <ReactContent><ng-content></ng-content></ReactContent>
    </HoverCard>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-hover-card' }
})
export class FabHoverCardComponent extends ReactWrapperComponent<IHoverCardProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IHoverCardProps['componentRef'];
  @Input() setAriaDescribedBy?: IHoverCardProps['setAriaDescribedBy'];
  @Input() cardOpenDelay?: IHoverCardProps['cardOpenDelay'];
  @Input() cardDismissDelay?: IHoverCardProps['cardDismissDelay'];
  @Input() expandedCardOpenDelay?: IHoverCardProps['expandedCardOpenDelay'];
  @Input() sticky?: IHoverCardProps['sticky'];
  @Input() instantOpenOnClick?: IHoverCardProps['instantOpenOnClick'];
  @Input() styles?: IHoverCardProps['styles'];
  @Input() target?: IHoverCardProps['target'];
  @Input() trapFocus?: IHoverCardProps['trapFocus'];
  @Input() shouldBlockHoverCard?: () => boolean; // Workaround for bug in the Fabric React types (() => void)
  @Input() setInitialFocus?: IHoverCardProps['setInitialFocus'];
  @Input() set expandingCardOptions(value: IExpandingCardOptions) {
    this._expandingCardOptions = value;
    if (value) {
      this.transformedExpandingCardProps = this._transformExpandingCardOptionsToProps(value);
    }
  }

  get expandingCardOptions(): IExpandingCardOptions {
    return this._expandingCardOptions;
  }

  @Output() readonly onCardVisible = new EventEmitter<void>();
  @Output() readonly onCardHide = new EventEmitter<void>();

  transformedExpandingCardProps: IExpandingCardProps;
  private _expandingCardOptions: IExpandingCardOptions;

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  private _transformExpandingCardOptionsToProps(options: IExpandingCardOptions): IExpandingCardProps {
    const sharedProperties = omit(options, 'renderCompactCard', 'renderExpandedCard');

    const compactCardRenderer = this.createInputJsxRenderer(options.renderCompactCard);
    const expandedCardRenderer = this.createInputJsxRenderer(options.renderExpandedCard);

    return Object.assign(
      {},
      sharedProperties,
      compactCardRenderer && { onRenderCompactCard: data => compactCardRenderer({ data }) } as Pick<IExpandingCardProps, 'onRenderCompactCard'>,
      expandedCardRenderer && { onRenderExpandedCard: data => expandedCardRenderer({ data }) } as Pick<IExpandingCardProps, 'onRenderExpandedCard'>,
    );
  }
}

/**
 * Counterpart of `IExpandingCardProps`, with Angular adjustments.
 */
export interface IExpandingCardOptions extends Pick<IExpandingCardProps, 'componentRef' | 'renderData' | 'targetElement' | 'onEnter' | 'onLeave' | 'compactCardHeight' | 'expandedCardHeight' | 'mode' | 'theme' | 'directionalHint' | 'gapSpace' | 'styles' | 'directionalHintFixed' | 'trapFocus' | 'firstFocus'> {
  renderCompactCard?: InputRendererOptions<RenderCardContext>;
  renderExpandedCard?: InputRendererOptions<RenderCardContext>;
}

export interface RenderCardContext<T = any> {
  readonly data: T;
}

