import { ChangeDetectorRef, Component, ComponentFactoryResolver, Injector, Input, ComponentRef } from '@angular/core';
import { DialogType, ITheme, IChoiceGroupProps, SpinnerSize, PersonaSize, PersonaPresence, PivotLinkSize, SelectableOptionMenuItemType, PanelType, ICommandBarItemProps, IBreadcrumbItem, IButtonProps, Button } from 'office-ui-fabric-react';

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

  spinnerSize = SpinnerSize.medium;

  dialogHidden = true;
  counter = 0;

  isPanelOpen = false;
  isCustomPanelOpen = false;

  isChecked = true;

  panelType = PanelType.smallFixedFar;

  personaSize = PersonaSize.size40;
  personaPresence = PersonaPresence.online;

  pivotLinkSize = PivotLinkSize.large;

  constructor(injector: Injector, componentFactoryResolver: ComponentFactoryResolver) {
    this.panelBodyComponent = {
      componentType: PanelBodyComponent,
      factoryResolver: componentFactoryResolver,
      injector: injector
    };
  }

  linkAs = Button;

  getClassNames(theme: ITheme) {
    return {
      wrapper: 'my-wrapper',
      divider: 'my-divider'
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

  choiceGroupOptions: IChoiceGroupProps['options'] = [
    {
      key: 'A',
      text: 'Selected'
    },
    {
      key: 'B',
      text: 'Unselected',
    },
    {
      key: 'C',
      text: 'Disabled',
      disabled: true
    }
  ];

  testOptions = [
    { key: 'Header', text: 'Theme Fonts', itemType: SelectableOptionMenuItemType.Header },
    { key: 'A', text: 'Arial Black' },
    { key: 'B', text: 'Times New Roman' },
    { key: 'divider_2', text: '-', itemType: SelectableOptionMenuItemType.Divider },
    { key: 'Header1', text: 'Other Options', itemType: SelectableOptionMenuItemType.Header },
    { key: 'D', text: 'Option d' },
  ];

  groupedListItems = [{ 'thumbnail': '//placehold.it/175x175', 'key': 'item-0 nostrud proident, id non', 'name': 'id velit labore ipsum magna', 'description': 'dolor nostrud Ut ex dolore mollit veniam, Excepteur aute in magna sint ex sit occaecat non quis cupidatat sit esse', 'color': 'red', 'shape': 'circle', 'location': 'Los Angeles', 'width': 175, 'height': 175 }, { 'thumbnail': '//placehold.it/229x229', 'key': 'item-1 in sunt sed eiusmod', 'name': 'in Duis dolor ex ut', 'description': 'dolor amet, deserunt enim esse mollit ut amet, Excepteur fugiat ex ut amet, laborum ea cupidatat sunt aute quis occaecat dolore sunt cupidatat exercitation laborum aute consectetur laboris ullamco laborum tempor in exercitation dolor aute Lorem dolor minim', 'color': 'green', 'shape': 'circle', 'location': 'Seattle', 'width': 229, 'height': 229 }, { 'thumbnail': '//placehold.it/195x195', 'key': 'item-2 consectetur ut dolor commodo', 'name': 'adipiscing fugiat officia sunt cillum', 'description': 'adipiscing veniam, ea enim pariatur. fugiat quis dolor dolor deserunt Lorem enim veniam, est exercitation reprehenderit minim dolore consectetur dolore ea occaecat culpa consectetur tempor reprehenderit dolore ut sint minim cillum sunt in in ex ad do esse dolore tempor', 'color': 'blue', 'shape': 'square', 'location': 'New York', 'width': 195, 'height': 195 }, { 'thumbnail': '//placehold.it/208x208', 'key': 'item-3 pariatur. id qui voluptate', 'name': 'eu ullamco et commodo aliqua.', 'description': 'laborum nostrud nulla dolore occaecat ut et proident, sed cillum officia ea ea proident, occaecat quis occaecat officia aute non officia esse dolor proident, ad mollit ut in dolor non ipsum adipiscing eiusmod culpa ea in ea dolor ipsum ipsum eu consequat. voluptate fugiat veniam, amet,', 'color': 'red', 'shape': 'triangle', 'location': 'Los Angeles', 'width': 208, 'height': 208 }];
  groupedListItemsGroups = [{ 'count': 4, 'key': 'group0', 'name': 'group 0', 'startIndex': 0, 'level': 0, 'children': [{ 'count': 2, 'key': 'group0-0', 'name': 'group 0-0', 'startIndex': 0, 'level': 1, 'children': [] }, { 'count': 2, 'key': 'group0-1', 'name': 'group 0-1', 'startIndex': 2, 'level': 1, 'children': [] }] }, { 'count': 4, 'key': 'group1', 'name': 'group 1', 'startIndex': 4, 'level': 0, 'children': [{ 'count': 2, 'key': 'group1-0', 'name': 'group 1-0', 'startIndex': 4, 'level': 1, 'children': [] }, { 'count': 2, 'key': 'group1-1', 'name': 'group 1-1', 'startIndex': 6, 'level': 1, 'children': [] }] }];

  date = new Date(2010, 1, 12);

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

  onPivotLinkClick(event: { item?: any, ev?: MouseEvent}) {
    debugger;
  }

}
