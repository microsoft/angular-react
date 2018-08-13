import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <fab-default-button [text]="count + '+'" (onClick)="onClick()"></fab-default-button>
    `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class CounterComponent {
  count = 0;

  constructor(private readonly cd: ChangeDetectorRef) {}

  onClick() {
    this.count++;
    this.cd.detectChanges();
  }
}
