import { Component } from '@angular/core';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { IButtonProps } from '../../../../node_modules/office-ui-fabric-react/lib/Button';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  DialogType = DialogType;

  dialogHidden = true;
  counter = 0;

  isPanelOpen = false;


  menuProps: IButtonProps['menuProps'] = {
    items: [
      {
        key: 'emailMessage',
        text: 'Email message',
        onClick: () => alert('email clicked!'),
        iconProps: {
          iconName: 'Mail',
          style: {
            color: 'red',
          },
        }
      },
      {
        key: 'calendarEvent',
        text: 'Calendar event',
        iconProps: {
          iconName: 'Calendar'
        }
      }
    ]
  }

  iconProps = {
    iconName: 'Add',
    styles: {
      root: { fontSize: 'x-large' }
    }
  };

  toggleDialog() {
    this.dialogHidden = !this.dialogHidden;
  }

  onClick() {
    alert('clicked!');
  }

  incrementCounter() {
    this.counter += 1;
  }

}
