import { Component } from '@angular/core';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  DialogType = DialogType;

  dialogHidden = true;
  counter = 0;

  toggleDialog() {
    this.dialogHidden = !this.dialogHidden;
  }

  incrementCounter() {
    this.counter += 1;
  }

}
