import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';
import * as React from 'react';
import * as ReactDOM from 'react-dom';

@Component({
  selector: 'app-react-dot',
  template: `
    <ReactDot [text]="hover ? '*' + text + '*' : text">
    </ReactDot>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
  styles: [ 'react-renderer' ],
})
export class ReactDotComponent implements OnChanges {

  @Input() x: number;
  @Input() y: number;
  @Input() size: number;
  @Input() text: string;

  hover = false;
  style: { [k: string]: any };
  bgColor: string;

  ngOnChanges(changes: SimpleChanges) {
    const shapeChanged = 'x' in changes || 'y' in changes || 'size' in changes;

    if (shapeChanged) {
      this.updateStyle();
    }
  }

  enter() {
    this.hover = true;
    this.bgColor = '#ff0';
  }

  leave() {
    this.hover = false;
    this.bgColor = undefined;
  }

  private updateStyle() {
    const s = this.size * 1.3;
    this.style = {
      width: s + 'px',
      height: s + 'px',
      left: (this.x) + 'px',
      top: (this.y) + 'px',
      borderRadius: (s / 2) + 'px',
      lineHeight: (s) + 'px',
    };
  }

}

export class ReactDot extends React.Component {

  private divStyle = {
    position: 'absolute',
    background: '#61dafb',
    font: 'normal 15px sans-serif',
    textAlign: 'center',
    cursor: 'pointer'
  }


  constructor(props) {
    super(props);

  }

  render() {
    return React.createElement('div', { style: this.divStyle }, [this.props['text']]);
  }

}
