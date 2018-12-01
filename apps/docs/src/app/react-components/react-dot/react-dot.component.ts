// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
import { Component, ChangeDetectionStrategy, Input, Output, EventEmitter, OnChanges } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-react-dot',
  templateUrl: './react-dot.component.html',
  styleUrls: ['./react-dot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: ['react-renderer'],
})
export class ReactDotComponent implements OnChanges {
  style: ReactDotStyle;

  @Input() x: string;
  @Input() y: string;
  @Input() size: string;
  @Input('text') _text: string;
  @Input() color: string;
  @Input() backgroundColor: string;
  @Input() textOverride: string;

  @Output('onMouseEnter') readonly mouseEnter = new EventEmitter<MouseEvent>();
  @Output('onMouseLeave') readonly mouseLeave = new EventEmitter<MouseEvent>();

  onMouseEnter = (ev: MouseEvent) => this.mouseEnter.emit(ev);
  onMouseLeave = (ev: MouseEvent) => this.mouseLeave.emit(ev);

  get text() {
    return this.textOverride && this._text ? this.textOverride : this._text;
  }

  ngOnChanges() {
    this.style = {
      width: this.size,
      lineHeight: this.size,
      height: this.size,
      left: this.x,
      top: this.y,
      color: this.color,
      backgroundColor: this.backgroundColor,
      fontSize: this.size,
    };
  }
}

interface ReactDotStyle {
  display?: string;
  position?: string;
  textAlign?: string;
  borderRadius?: string;
  cursor?: string;

  width?: string;
  lineHeight?: string;
  height?: string;
  left?: string;
  top?: string;
  color?: string;
  backgroundColor?: string;
  fontSize?: string;
}

interface ReactDotProps {
  style: ReactDotStyle;
  onMouseEnter?: (ev) => void;
  onMouseLeave?: (ev) => void;
}

export class ReactDot extends React.Component {
  private propsOut: ReactDotProps = {
    style: {
      display: 'block',
      position: 'absolute',
      textAlign: 'center',
      borderRadius: '30%',
      cursor: 'pointer',
    },
  };

  render() {
    this.propsOut.style = { ...this.propsOut.style, ...this.props['dynamicStyle'] };
    this.propsOut.onMouseEnter = this.props['onMouseEnter'];
    this.propsOut.onMouseLeave = this.props['onMouseLeave'];

    return React.createElement('div', this.propsOut, [this.props['text'], ...(this.props.children as any)]);
  }
}
