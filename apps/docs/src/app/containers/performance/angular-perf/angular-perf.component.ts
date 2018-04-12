import { Component, ViewChild } from '@angular/core';
import { TriangleComponent } from '../../../components/triangle/triangle.component';

@Component({
  selector: 'app-angular-perf',
  templateUrl: './angular-perf.component.html',
  styleUrls: ['./angular-perf.component.scss']
})
export class AngularPerfComponent {

  @ViewChild(TriangleComponent) triangle: TriangleComponent;

  get toggleTriangleLabel() {
    return this.triangle.isActive ? 'Stop' : 'Restart';
  }

  toggleTriangle() {
    this.triangle.toggle();
  }

}
