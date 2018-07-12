import { ChangeDetectorRef, ViewEncapsulation, Component, ComponentFactoryResolver, Injector, Input, ComponentRef, TemplateRef, ViewChild, AfterViewInit } from '@angular/core';
import { DialogType, ITheme, IChoiceGroupProps, SpinnerSize, PersonaSize, PersonaPresence, PivotLinkSize, SelectableOptionMenuItemType, PanelType, ICommandBarItemProps, IBreadcrumbItem, IButtonProps, Button, MessageBarType, ShimmerElementType } from 'office-ui-fabric-react';
import { ICommandBarItemOptions, FabCommandBarComponent, IExpandingCardOptions } from '@angular-react/fabric';

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
  entryComponents: [PanelBodyComponent],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {

  @ViewChild(FabCommandBarComponent) commandBar: FabCommandBarComponent;
  @ViewChild('customRange') customRangeTemplate: TemplateRef<{ item: any, dismissMenu: (ev?: any, dismissAll?: boolean) => void }>;

  x = true;

  commandBarItems: ICommandBarItemOptions[] = [
    {
      key: 'run',
      text: 'Run',
      iconProps: {
        iconName: 'CaretRight',
      },
      disabled: true,
    },
    {
      key: 'new',
      text: 'New',
      iconProps: {
        iconName: 'Add',
      },
      onClick: () => console.log('Add clicked'),
    },
    {
      key: 'save',
      text: 'Save',
      iconProps: {
        iconName: 'Save'
      },
      subMenuProps: {
        items: [
          {
            key: 'save',
            text: 'Save',
            onClick: () => console.log('Save clicked'),
          },
          {
            key: 'save-as',
            text: 'Save as',
            subMenuProps: {
              onItemClick: (ev, item) => {
                console.log(`${item.text} clicked`)
                return true;
              },
              items: [
                {
                  key: 'save-as-1',
                  text: 'Save as 1',
                },
                {
                  key: 'save-as-2',
                  text: 'Save as 2',
                },
              ],
            },
          },
        ],
      },
    },
    {
      key: 'copy',
      text: 'Copy',
      disabled: true,
      iconProps: {
        iconName: 'Copy'
      },
      onClick: () => console.log('Copy clicked'),
    },
    {
      key: 'date-picker',
      text: 'Last 30 days',
      iconProps: {
        iconName: 'Calendar',
      },
      onClick: () => {
        console.log('date-picker clicked');
      },
      subMenuProps: {
        onItemClick: (ev, item) => {
          console.log(item.text, 'clicked');

          this.commandBarItems.find(item => item.key === 'date-picker').text = item.text;

          if (item.key !== 'custom') {
            const rangeItemIndex = this.commandBarItems.findIndex(cbItem => cbItem.key === 'custom-range-range');
            if (rangeItemIndex) {
              this.commandBarItems.splice(rangeItemIndex, 1);
            }
          }
        },
        items: [
          {
            key: '24h',
            text: 'Last 24 hours',
          },
          {
            key: '7d',
            text: 'Last 7 days',
          },
          {
            key: '30d',
            text: 'Last 30 days',
          },
          {
            key: 'custom',
            text: 'Custom range...',
            onClick: () => {
              this.commandBarItems.find(item => item.key === 'date-picker').text = 'Custom range';

              this.commandBarItems.push(
                {
                  key: 'custom-range-range',
                  data: {
                    earliestDateAllowed: new Date(2015, 2, 15),
                  },
                  render: this.customRangeTemplate,
                  onClick: () => {
                    debugger;
                  }
                }
              );
            },
          },
        ]
      }
    },
    {
      key: 'schedule-monitor',
      text: 'Schedule a monitor',
      iconProps: {
        iconName: 'ScheduleEventAction'
      },
      onClick: () => {
        this.isPanelOpen = true;
        console.log('Schedule a monitor clicked');
      }
    },
  ];

  readonly commandBarFarItems: ICommandBarItemOptions[] = [
    {
      key: 'help',
      text: 'Help',
      iconProps: {
        iconName: 'Help'
      },
      onClick: () => console.log('Help clicked'),
    },
    {
      key: 'full-screen',
      iconOnly: true,
      iconProps: {
        iconName: 'MiniExpand'
      },
      onClick: () => console.log('Expand clicked'),
    }
  ];

  isPanelOpen = false;

  constructor(private readonly cd: ChangeDetectorRef) {
  }

  toggleRun() {
    const runItem = this.commandBarItems.find(item => item.key === 'run');
    runItem.disabled = !runItem.disabled;
  }

}
