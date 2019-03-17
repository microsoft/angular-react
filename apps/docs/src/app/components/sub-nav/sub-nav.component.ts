import { Component } from '@angular/core';

@Component({
  selector: 'app-sub-nav',
  template: `
    <ng-container *subnav>
      <!-- Content is projected into navbar. -->
      <ng-content></ng-content>
    </ng-container>
  `,
})
export class SubNavComponent {}
