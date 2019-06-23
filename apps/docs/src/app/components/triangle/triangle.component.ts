// tslint:disable:no-input-rename

import { Component, OnInit, ContentChild, TemplateRef, ElementRef, OnDestroy } from '@angular/core';

export const COLORS = { default: { text: '#222', bg: '#ddd' }, hover: { text: '#fff', bg: '#0078D4' } };
export const DEFAULT_DOT_SIZE = 25;
export const DEFAULT_INTERVAL = 1000;

export interface TriangleConfig {
  redraw?: boolean;
  dotSize?: number;
  interval?: number;
}

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss'],
})
export class TriangleComponent implements OnInit, OnDestroy {
  @ContentChild(TemplateRef, { static: true }) readonly dotTemplate: TemplateRef<{
    dot: SierpinskiTriangleDot;
    text: number;
  }>;

  // These are initially undefined and default CONST is used unless another
  // value is provided in hte config.  Whether default of config value are used,
  // the last used value is stored to allow start/stop operations.
  private interval: number; // Number of milliseconds between counter updates.
  private dotSize: number; // Pixel size for each dot.
  private triangleSize: number; // In pixels, largest triangle size (height and width).

  private startTime: number; // In milliseconds
  private counter = 0; // Revolving counter, 0-9 and back again.
  private _scale: number; // Moves from 1 to 1.5 and back to 1 at a set rate based on time elapsed.
  private timer: number; // Repeating timer that updates the counter once per second.
  private _dots: Array<SierpinskiTriangleDot>; // Collection of dot objects, rendered by the dotTemplate.
  public isActive: boolean; // Used to indicate active looping and to prevent further looping (stop).

  get scale() {
    return this._scale;
  }

  get dots() {
    return this._dots;
  }

  constructor(private el: ElementRef) {}

  ngOnInit() {
    // Force stop after limited time during development.
    // setTimeout(() => this.stop(), 10000);

    // Automatically start the triangle animation using defaults.
    // Note: This delay is necessary as the calculated size is wrong when
    //       evaluated without a delay (flex layout of this element has
    //       not yet happened?).
    setTimeout(() => {
      this.start();
    }, 0);
  }

  ngOnDestroy() {
    this.stop();
  }

  start({ redraw, dotSize, interval }: TriangleConfig = {}) {
    if (redraw || !this._dots) {
      this.dotSize = dotSize || this.dotSize || DEFAULT_DOT_SIZE;
      this.interval = interval || this.interval || DEFAULT_INTERVAL;

      // Calculate size based on this containing element's size. This is
      // intentionally evaluated with each start operation rather than just
      // using the last calculated value.  This allows for recalculating
      // after window size changes by simply restarting the triangle.
      this.triangleSize = Math.min(
        this.el.nativeElement.parentNode.offsetHeight * 1.3 - 40,
        this.el.nativeElement.parentNode.offsetWidth * 0.7
      );

      this._dots = new SierpinskiTriangle({
        x: 0,
        y: 0,
        size: this.triangleSize,
        targetSize: this.dotSize,
      }).getDots();
    }

    // 2 separate actions here.  The first is the update to the counter.
    // The counter is bound to the dom elements (dots) that show the numbers.
    // When the counter changes, an expensive dom update is triggered.
    // Angular is able to manage this update efficiently as it can schedule
    // the updates as it is aware of each node being updated.  React struggles
    // with this update since it is not holistically aware of every node
    // being updated.  Although React Fiber optimizes updates to prevent
    // blocking the single thread and interrupting high priority updates such
    // as animation, each individual React node schedules it's update without
    // knowledge of the other nodes (dots) and they all attempt to update
    // at the same time, blocking the thread.  Further investigation is needed
    // to see if there is a way for the separate React dots to share a scheduler
    // and coordinate DOM updates.

    // Make sure there are no intervals from a previous start.
    if (this.timer) {
      clearInterval(this.timer);
    }

    // Update the counter (the number shown on each dot).
    this.startTime = new Date().getTime();
    this.timer = setInterval(() => this.updateCounter(), this.interval) as any;

    // Update the scale value for the container (applied via css transform
    // on the container).
    this.isActive = true;
    const callback = () => {
      this.updateScale();
      if (this.isActive) {
        requestAnimationFrame(callback);
      }
    };
    callback();
  }

  stop() {
    this.isActive = false;
    clearInterval(this.timer);
  }

  toggle() {
    this.isActive ? this.stop() : this.start();
  }

  private updateCounter() {
    this.counter = (this.counter + 1) % 10;
  }

  private updateScale() {
    const elapsed = Date.now() - this.startTime;
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    this._scale = scale / 2.1;
  }
}

interface SierpinskiTriangleConfig {
  x: number;
  y: number;
  size: number;
  targetSize: number;
}

class SierpinskiTriangle {
  triangles: Array<SierpinskiTriangle> | any = [];
  dot: SierpinskiTriangleDot;

  constructor({ x, y, size, targetSize }: SierpinskiTriangleConfig) {
    if (size <= targetSize) {
      this.dot = new SierpinskiTriangleDot(x - targetSize / 2, y - targetSize / 2, targetSize);
    } else {
      size /= 2;
      this.triangles = [
        new SierpinskiTriangle({ x, y: y - size / 2, size, targetSize }),
        new SierpinskiTriangle({ x: x - size, y: y + size / 2, size, targetSize }),
        new SierpinskiTriangle({ x: x + size, y: y + size / 2, size, targetSize }),
      ];
    }
  }

  getDots() {
    return this.triangles.reduce((acc, t) => [...acc, ...t.getDots(), ...(t.dot || [])], []);
  }
}

class SierpinskiTriangleDot {
  hover = false;

  constructor(private readonly _x: number, private readonly _y: number, private readonly _size: number) {}

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
