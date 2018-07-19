import { Component, OnInit, ChangeDetectionStrategy, ChangeDetectorRef } from '@angular/core';

@Component({
  selector: 'counter',
  template: `
    <div>{{ count }}</div>
    <button (click)="onClick()">+</button>
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
