// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { InputRendererOptions, Omit, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, ChangeDetectorRef, Component, ElementRef, EventEmitter, Input, Output, Renderer2, ViewChild } from '@angular/core';
import { ITooltipHostProps, ITooltipProps } from 'office-ui-fabric-react/lib/Tooltip';
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
      <ReactContent><ng-content></ng-content></ReactContent>
    </TooltipHost>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabTooltipHostComponent extends ReactWrapperComponent<ITooltipHostProps> {
  @ViewChild('reactNode')
  protected reactNodeRef: ElementRef;

  @Input()
  componentRef?: ITooltipHostProps['componentRef'];
  @Input()
  calloutProps?: ITooltipHostProps['calloutProps'];
  @Input()
  setAriaDescribedBy?: ITooltipHostProps['setAriaDescribedBy'];
  @Input()
  delay?: ITooltipHostProps['delay'];
  @Input()
  content?: ITooltipHostProps['content'];
  @Input()
  directionalHint?: ITooltipHostProps['directionalHint'];
  @Input()
  directionalHintForRTL?: ITooltipHostProps['directionalHintForRTL'];
  @Input()
  overflowMode?: ITooltipHostProps['overflowMode'];
  @Input()
  hostClassName?: ITooltipHostProps['hostClassName'];
  @Input()
  closeDelay?: ITooltipHostProps['closeDelay'];

  @Input()
  set tooltipOptions(value: ITooltipOptions) {
    this._tooltipOptions = value;
    if (value) {
      this.transformedTooltipProps = this._transformTooltipOptionsToProps(value);
    }
  }

  get tooltipOptions(): ITooltipOptions {
    return this._tooltipOptions;
  }

  @Output()
  readonly onTooltipToggle = new EventEmitter<{ isTooltipVisible: boolean }>();

  transformedTooltipProps: ITooltipHostProps['tooltipProps'];
  private _tooltipOptions: ITooltipOptions;

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer, true);

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
      contentRenderer && ({ onRenderContent: data => contentRenderer(data) } as Pick<ITooltipProps, 'onRenderContent'>)
    );
  }
}

/**
 * Counterpart of `ITooltipProps`, with Angular adjustments.
 */
export interface ITooltipOptions extends Omit<ITooltipProps, 'onRenderContent'> {
  readonly renderContent?: InputRendererOptions<ITooltipProps>;
}
