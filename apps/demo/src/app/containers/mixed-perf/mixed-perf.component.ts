import { Component } from '@angular/core';


@Component({
  selector: 'app-mixed-perf',
  templateUrl: './mixed-perf.component.html',
  styleUrls: ['./mixed-perf.component.scss']
})
export class MixedPerfComponent {

  projectAsAngular = true;

  toggle() {
    this.projectAsAngular = !this.projectAsAngular;
  }

}
