// tslint:disable:no-input-rename

import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, OnInit, ViewEncapsulation, ContentChild, TemplateRef, ElementRef } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';


export const COLORS = { default: { text: '#222', bg: '#ddd' }, hover: { text: '#fff', bg: '#0078D4' } }

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss'],
})
export class TriangleComponent implements OnInit {

  @ContentChild(TemplateRef) dotTemplate;
  @Input() triangleSize;              // In pixels, largest triangle size (height and width).
  @Input() dotSize = 35;       // In pixels

  seconds = 0;
  start: number;
  scale = 3;
  dots: Array<SierpinskiTriangleDot>;
  isActive: boolean;
  interval: NodeJS.Timer;

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // setTimeout(() => this.stop(), 10000);   // Force stop after limited time during development.

    // This delay is necessary as the calculated size is wrong when evaluated
    // without a delay (flex layout of this element has not yet happened?).
    setTimeout(() => {
      if (!this.triangleSize) {
        // Calculate size based on this element's size.
        this.triangleSize = Math.min(this.el.nativeElement.parentNode.offsetHeight * 1.3, this.el.nativeElement.parentNode.offsetWidth * 0.7);
      }
      this.dots = (new SierpinskiTriangle({x: 0, y: 0, size: this.triangleSize}, this.dotSize)).getDots();
      this.begin();
    }, 0);
  }

  begin() {
    this.isActive = true;
    this.interval = setInterval(() => this.updateSeconds(), 1000);
    this.start = new Date().getTime();

    const callback = () => {
      this.updateScale();
      if (this.isActive) {
        requestAnimationFrame(callback);
      }
    }
    callback();
  }

  stop() {
    this.isActive = false;
    clearInterval(this.interval);
  }

  toggle() {
    this.isActive ? this.stop() : this.begin();
  }

  updateSeconds() {
    this.seconds = (this.seconds % 10) + 1;
  }

  updateScale(elapsed = Date.now() - this.start) {
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    this.scale = scale / 2.1;
  }

}

class SierpinskiTriangle {

  triangles: Array<SierpinskiTriangle> | any = [];
  dot: SierpinskiTriangleDot;

  constructor({ x, y, size }, targetSize) {
    if (size <= targetSize) {
      this.dot = new SierpinskiTriangleDot(
        x - (targetSize / 2),
        y - (targetSize / 2),
        targetSize
      );
    } else {
      const newSize = size / 2;
      size /= 2;
      this.triangles = [
        new SierpinskiTriangle({x, y: y - (size / 2), size}, targetSize),
        new SierpinskiTriangle({x: x - size, y: y + (size / 2), size}, targetSize),
        new SierpinskiTriangle({x: x + size, y: y + (size / 2), size}, targetSize)
      ];
    }
  }

  getDots() {
    return this.triangles.reduce( (acc, t) => [...acc, ...t.getDots(), ...(t.dot || [])], []);
  }

}

class SierpinskiTriangleDot {

  hover = false;

  constructor(private _x, private _y, private _size) { }

  get x() {
    return this._x + 'px';
  }

  get y() {
    return this._y + 'px';
  }

  get size() {
    return this._size * 0.9 + 'px';
  }

  get color() {
    return this.hover ? COLORS.hover.text : COLORS.default.text;
  }

  get backgroundColor() {
    return this.hover ? COLORS.hover.bg : COLORS.default.bg;
  }

  get textOverride() {
    return this.hover ? '-' : '';
  }

}
