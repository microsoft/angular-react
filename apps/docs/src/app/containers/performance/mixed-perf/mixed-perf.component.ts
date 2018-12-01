import { Component, ViewChild } from '@angular/core';
import { MatSliderChange } from '@angular/material';

import { TriangleComponent, DEFAULT_DOT_SIZE } from '../../../components/triangle/triangle.component';

@Component({
  selector: 'app-mixed-perf',
  templateUrl: './mixed-perf.component.html',
  styleUrls: ['./mixed-perf.component.scss'],
})
export class MixedPerfComponent {
  DEFAULT_DOT_SIZE = DEFAULT_DOT_SIZE;

  @ViewChild(TriangleComponent) readonly triangle: TriangleComponent;

  projectAsAngular = true;
  contentCollapsed = true;

  get toggleTriangleLabel() {
    return this.triangle.isActive ? 'Stop' : 'Restart';
  }

  toggleTriangle() {
    this.triangle.toggle();
  }

  toggle() {
    this.projectAsAngular = !this.projectAsAngular;
  }

  dotSizeChanged(ev: MatSliderChange) {
    this.triangle.start({ dotSize: ev.value, redraw: true });
  }
}
