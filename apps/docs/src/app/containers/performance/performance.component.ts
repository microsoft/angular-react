import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-performance',
  templateUrl: './performance.component.html',
  styleUrls: ['./performance.component.scss'],
})
export class PerformanceComponent {
  @HostBinding('class.page')
  page = true;
}
