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

  @Output('onMouseEnter') mouseEnter: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  @Output('onMouseLeave') mouseLeave: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();

  onMouseEnter = ev => this.mouseEnter.emit(ev as any);
  onMouseLeave = ev => this.mouseLeave.emit(ev as any);

}
