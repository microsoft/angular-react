import { Component } from '@angular/core';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
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

  commandBarItems: ICommandBarItemProps[] = [
    {
      key: 'newItem',
      text: 'New',
      iconProps: {
        iconName: 'Add'
      },
      subMenuProps: {
        items: [
          {
            key: 'emailMessage',
            text: 'Email message',
            iconProps: {
              iconName: 'Mail'
            }
          },
          {
            key: 'calendarEvent',
            text: 'Calendar event',
            iconProps: {
              iconName: 'Calendar'
            }
          }
        ],
      },
    },
    {
      key: 'upload',
      text: 'Upload',
      iconProps: {
        iconName: 'Upload'
      },
    },
    {
      key: 'share',
      text: 'Share',
      iconProps: {
        iconName: 'Share'
      }
    },
    {
      key: 'download',
      text: 'Download',
      iconProps: {
        iconName: 'Download'
      }
    },
    {
      key: 'disabled',
      text: 'Disabled...',
      iconProps: {
        iconName: 'Cancel'
      },
      disabled: true
    }
  ];

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
