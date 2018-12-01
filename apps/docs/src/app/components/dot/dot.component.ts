// tslint:disable:no-output-rename
import { ChangeDetectionStrategy, Component, Input, Output, EventEmitter } from '@angular/core';

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
  @Input() color: string;
  @Input() backgroundColor: string;
  @Input() textOverride: string;

  @Output('onMouseEnter') readonly mouseEnter = new EventEmitter<MouseEvent>();
  @Output('onMouseLeave') readonly mouseLeave = new EventEmitter<MouseEvent>();

  onMouseEnter = (ev: MouseEvent) => this.mouseEnter.emit(ev);
  onMouseLeave = (ev: MouseEvent) => this.mouseLeave.emit(ev);
}
