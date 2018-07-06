import { ReactWrapperComponent, InputRendererOptions, JsxRenderFunc } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, OnInit, EventEmitter, Output } from '@angular/core';
import { ITooltipHostProps } from 'office-ui-fabric-react/lib/components/Tooltip';
import { ITooltipProps } from 'office-ui-fabric-react';
import { omit } from '../../utils/omit';

@Component({
  selector: 'fab-tooltip-host',
  exportAs: 'fabTooltipHost',
  template: `
    <TooltipHost
      #reactNode
      [componentRef]="componentRef"
      [calloutProps]="calloutProps"
      [setAriaDescribedBy]="setAriaDescribedBy"
      [delay]="delay"
      [content]="content"
      [directionalHint]="directionalHint"
      [directionalHintForRTL]="directionalHintForRTL"
      [overflowMode]="overflowMode"
      [hostClassName]="hostClassName"
      [closeDelay]="closeDelay"
      [tooltipProps]="transformedTooltipProps"
      [TooltipToggle]="onTooltipToggleHandler"
      >
      <ReactContent [experimentalMode]="true"><ng-content></ng-content></ReactContent>
    </TooltipHost>
  `,
  styles: [    'react-renderer'  ],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-tooltip-host' }
})
export class FabTooltipHostComponent extends ReactWrapperComponent<ITooltipHostProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ITooltipHostProps['componentRef'];
  @Input() calloutProps?: ITooltipHostProps['calloutProps'];
  @Input() setAriaDescribedBy?: ITooltipHostProps['setAriaDescribedBy'];
  @Input() delay?: ITooltipHostProps['delay'];
  @Input() content?: ITooltipHostProps['content'];
  @Input() directionalHint?: ITooltipHostProps['directionalHint'];
  @Input() directionalHintForRTL?: ITooltipHostProps['directionalHintForRTL'];
  @Input() overflowMode?: ITooltipHostProps['overflowMode'];
  @Input() hostClassName?: ITooltipHostProps['hostClassName'];
  @Input() closeDelay?: ITooltipHostProps['closeDelay'];

  @Input() set tooltipOptions(value: ITooltipOptions) {
     this._tooltipOptions = value;
     if (value) {
       this.transformedTooltipProps = this._transformTooltipOptionsToProps(value);
     }

  }

  get tooltipOptions() : ITooltipOptions {
    return this._tooltipOptions;
  }

  @Output() readonly onTooltipToggle = new EventEmitter< { isTooltipVisible: boolean }>();

  transformedTooltipProps: ITooltipHostProps['tooltipProps'];
  private _tooltipOptions: ITooltipOptions;

  constructor(elementRef: ElementRef) {
    super(elementRef, true);

    this.onTooltipToggleHandler = this.onTooltipToggleHandler.bind(this);
  }

  onTooltipToggleHandler(isTooltipVisible: boolean) {
    this.onTooltipToggle.emit({ isTooltipVisible });
  }

  private _transformTooltipOptionsToProps(options: ITooltipOptions): ITooltipProps {
    const sharedProperties = omit(options, 'renderContent');

    const contentRenderer = this.createInputJsxRenderer(options.renderContent);

    return Object.assign(
      {},
      sharedProperties,
      contentRenderer && { onRenderContent: data => contentRenderer(data) } as Pick<ITooltipProps, 'onRenderContent'>,
    );
  }
}

/**
 * Counterpart of `ITooltipProps`, with Angular adjustments.
 */
export interface ITooltipOptions extends Pick<ITooltipProps, 'componentRef' | 'calloutProps' | 'content' | 'delay' | 'maxWidth' | 'targetElement' | 'directionalHint' | 'directionalHintForRTL' | 'theme' | 'styles'> {
  renderContent?: InputRendererOptions<ITooltipProps>;
}
