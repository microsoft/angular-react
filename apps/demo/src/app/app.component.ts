import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input } from '@angular/core';
import { IBreadcrumbItem } from 'office-ui-fabric-react/lib/Breadcrumb';
import { IButtonProps } from 'office-ui-fabric-react/lib/Button';
import { ICommandBarItemProps } from 'office-ui-fabric-react/lib/CommandBar';
import { DialogType } from 'office-ui-fabric-react/lib/Dialog';
import { PanelType } from 'office-ui-fabric-react/lib/Panel';

@Component({
  selector: 'fab-panel-header',
  template: `
    <div>props: {{ props }}</div>

    <div>{{ dynamicText }}</div>

    <button (click)="onClick()">Click</button>
  `
})
export class PanelBodyComponent {
  @Input() props: any;

  @Input() headerTextId: any;

  dynamicText: string = "initial";

  constructor(private cd: ChangeDetectorRef) { }

  onClick() {
    this.dynamicText = "new text!";
    this.cd.detectChanges();
  }
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  entryComponents: [PanelBodyComponent]
})
export class AppComponent {
  DialogType = DialogType;

  dialogHidden = true;
  counter = 0;

  isPanelOpen = false;
  isCustomPanelOpen = false;

  isChecked = true;

  panelType = PanelType.smallFixedFar;

  constructor(injector: Injector, componentFactoryResolver: ComponentFactoryResolver) {
    this.panelBodyComponent = {
      componentType: PanelBodyComponent,
      factoryResolver: componentFactoryResolver,
      injector: injector
    };
  }

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

  panelBodyComponent;

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

  breadcrumbItems: IBreadcrumbItem[] = [
    { text: 'Files', 'key': 'Files', href: '#/examples/breadcrumb' },
    { text: 'This is link 1', 'key': 'l1', href: '#/examples/breadcrumb' },
    { text: 'This is link 2', 'key': 'l2', href: '#/examples/breadcrumb' },
    { text: 'This is link 3 with a long name', 'key': 'l3', href: '#/examples/breadcrumb', onClick: () => alert('link 3 clicked') },
    { text: 'This is link 4', 'key': 'l4', href: '#/examples/breadcrumb' },
    { text: 'This is link 5', 'key': 'l5', href: '#/examples/breadcrumb', isCurrentItem: true },
  ]

  toggleDialog() {
    this.dialogHidden = !this.dialogHidden;
  }

  onClick() {
    alert('clicked!');
  }

  incrementCounter() {
    this.counter += 1;
  }

  onMenuClick(event: MouseEvent | KeyboardEvent) {
    alert('menuButton Clicked');
  }

  onActionButtonClicked(event: MouseEvent) {
    alert('action button clicked');
  }

  onCommandBarButtonClicked(event: MouseEvent) {
    alert('commandbar button clicked');
  }

  onCompoundButtonClicked(event: MouseEvent) {
    alert('compound button clicked');
  }

}
