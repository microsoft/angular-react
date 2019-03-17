// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  Output,
  EventEmitter,
  ElementRef,
  ViewChild,
  ChangeDetectorRef,
  Renderer2,
  NgZone,
} from '@angular/core';
import * as React from 'react';
import { ReactWrapperComponent } from '@angular-react/core';

@Component({
  selector: 'app-react-dot',
  template: `
    <ReactDot
      #reactNode
      [text]="text"
      (onMouseEnter)="onMouseEnter($event)"
      (onMouseLeave)="onMouseLeave($event)"
      [styles]="{
        width: size,
        lineHeight: size,
        height: size,
        left: x,
        top: y,
        color: color,
        backgroundColor: backgroundColor,
        fontSize: size
      }"
    >
      <react-content> <ng-content></ng-content> </react-content>
    </ReactDot>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['react-renderer'],
})
export class ReactDotComponent extends ReactWrapperComponent<ReactDotProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() x: string;
  @Input() y: string;
  @Input() size: string;
  @Input() text: string;
  @Input() color: string;
  @Input() backgroundColor: string;
  @Input() textOverride: string;

  @Output('onMouseEnter') readonly mouseEnter = new EventEmitter<MouseEvent>();
  @Output('onMouseLeave') readonly mouseLeave = new EventEmitter<MouseEvent>();

  onMouseEnter = (ev: MouseEvent) => this.mouseEnter.emit(ev);
  onMouseLeave = (ev: MouseEvent) => this.mouseLeave.emit(ev);

  get computedText() {
    return this.textOverride && this.text ? this.textOverride : this.text;
  }

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2, ngZone: NgZone) {
    super(elementRef, changeDetectorRef, renderer, { ngZone, setHostDisplay: true });
  }
}

interface ReactDotProps {
  onMouseEnter?: (ev: MouseEvent) => void;
  onMouseLeave?: (ev: MouseEvent) => void;
  text: string;
  styles?: object;
}

export class ReactDot extends React.Component<ReactDotProps> {
  private static defaultStyle = {
    display: 'block',
    position: 'absolute',
    textAlign: 'center',
    borderRadius: '30%',
    cursor: 'pointer',
  };

  render() {
    const { text, styles, ...rest } = this.props;

    return React.createElement(
      'div',
      {
        ...rest,
        style: {
          ...ReactDot.defaultStyle,
          ...styles,
        },
      },
      [this.props['text'], ...(this.props.children as any)]
    );
  }
}
