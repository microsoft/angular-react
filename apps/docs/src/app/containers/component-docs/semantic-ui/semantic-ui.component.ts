import { Component } from '@angular/core';

@Component({
  selector: 'app-semantic-ui',
  templateUrl: './semantic-ui.component.html',
  styleUrls: ['./semantic-ui.component.scss']
})
export class SemanticUiComponent {

  sampleContentCounter = 0;

  get sampleContent() {
    return `Button clicked ${this.sampleContentCounter} times.`;
  }

  onClick(ev: MouseEvent) {
    this.sampleContentCounter += 1;
  }

}
