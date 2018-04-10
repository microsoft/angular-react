import { Component, ViewChild } from '@angular/core';
import { TriangleComponent } from '../../components/triangle/triangle.component';


@Component({
  selector: 'app-mixed-perf',
  templateUrl: './mixed-perf.component.html',
  styleUrls: ['./mixed-perf.component.scss']
})
export class MixedPerfComponent {

  @ViewChild(TriangleComponent) triangle: TriangleComponent;

  projectAsAngular = true;

  get toggleTriangleLabel() {
    return this.triangle.isActive ? 'Stop' : 'Restart';
  }

  toggleTriangle() {
    this.triangle.toggle();
  }

  toggle() {
    this.projectAsAngular = !this.projectAsAngular;
  }

}
