import { Component, HostBinding } from '@angular/core';

@Component({
  selector: 'app-component-docs',
  templateUrl: './component-docs.component.html',
  styleUrls: ['./component-docs.component.scss']
})
export class ComponentDocsComponent {

  @HostBinding('class.page') page = true;

}
