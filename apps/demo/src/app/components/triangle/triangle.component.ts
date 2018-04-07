import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges, OnInit, ViewEncapsulation } from '@angular/core';
import { DomSanitizer, SafeStyle } from '@angular/platform-browser';

@Component({
  selector: 'app-triangle',
  templateUrl: './triangle.component.html',
  styleUrls: ['./triangle.component.scss'],
})
export class TriangleComponent implements OnInit {

  seconds = 0;
  start;
  elapsed;
  scale = 3;
  dots;
  isActive;

  callback;
  interval;

  constructor() {
    // Force stop after limited time during development.
    setTimeout(() => {
      this.stop();
    }, 3000);
  }

  ngOnInit() {
    this.dots = (new SierpinskiTriangle({x: 0, y: 0, s: 1000}, 500)).getDots();

    // this.begin();
  }

  update(elapsed) {
    const t = (elapsed / 1000) % 10;
    const scale = 1 + (t > 5 ? 10 - t : t) / 10;
    this.scale = scale / 2.1;
  }

  begin() {
    this.isActive = true;

    this.interval = setInterval(() => {
      this.seconds = (this.seconds % 10) + 1;
    }, 1000);

    this.start = new Date().getTime();

    const callback = () => {
      this.update(Date.now() - this.start);
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
    if (this.isActive) {
      this.stop();
    } else {
      this.begin();
    }
  }

}

class SierpinskiTriangle {

  triangles: Array<SierpinskiTriangle> | any = [];
  dot: SierpinskiTriangleDot;

  constructor({ x, y, s }, targetSize) {
    if (s <= targetSize) {
      this.dot = new SierpinskiTriangleDot(
        x - (targetSize / 2),
        y - (targetSize / 2),
        targetSize
      );
    } else {
      const newSize = s / 2;
      s /= 2;
      this.triangles = [
        new SierpinskiTriangle({x, y: y - (s / 2), s}, targetSize),
        new SierpinskiTriangle({x: x - s, y: y + (s / 2), s}, targetSize),
        new SierpinskiTriangle({x: x + s, y: y + (s / 2), s}, targetSize)
      ];
    }
  }

  getDots() {
    return this.triangles.reduce( (acc, t) => [...acc, ...t.getDots(), ...(t.dot || [])], []);
  }

}

class SierpinskiTriangleDot {

  get x() {
    return this._x + 'px';
  }

  get y() {
    return this._y + 'px';
  }

  get size() {
    return this._size * 0.9 + 'px';
  }

  constructor(private _x, private _y, private _size) { }

}
