import { Component, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material';

import { TriangleComponent, DEFAULT_DOT_SIZE } from '../../../components/triangle/triangle.component';

@Component({
  selector: 'app-angular-perf',
  templateUrl: './angular-perf.component.html',
  styleUrls: ['./angular-perf.component.scss'],
})
export class AngularPerfComponent {
  DEFAULT_DOT_SIZE = DEFAULT_DOT_SIZE;

  @ViewChild(TriangleComponent, { static: true }) readonly triangle: TriangleComponent;

  get toggleTriangleLabel() {
    return this.triangle.isActive ? 'Stop' : 'Restart';
  }

  toggleTriangle() {
    this.triangle.toggle();
  }

  dotSizeChanged(ev: MatSliderChange) {
    this.triangle.start({ dotSize: ev.value, redraw: true });
  }
}
