import { ChangeDetectionStrategy, Component, Input, OnChanges, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-dot',
  templateUrl: './dot.component.html',
  styleUrls: ['./dot.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DotComponent {

  @Input() x: string;
  @Input() y: string;
  @Input() size: string;
  @Input() text: string;

  hover = false;

  onMouseEnter(ev) {
    this.hover = true;
  }

  onMouseLeave(ev) {
    this.hover = false;
  }

}
