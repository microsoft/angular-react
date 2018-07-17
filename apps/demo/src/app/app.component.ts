import {
  ChangeDetectorRef,
  ViewEncapsulation,
  Component,
  ComponentFactoryResolver,
  Injector,
  Input,
  ComponentRef,
  TemplateRef,
  ViewChild,
  AfterViewInit,
} from '@angular/core';
import {
  DialogType,
  ITheme,
  IChoiceGroupProps,
  SpinnerSize,
  PersonaSize,
  PersonaPresence,
  PivotLinkSize,
  SelectableOptionMenuItemType,
  PanelType,
  ICommandBarItemProps,
  IBreadcrumbItem,
  IButtonProps,
  Button,
  MessageBarType,
  ShimmerElementType,
  IContextualMenuProps,
} from 'office-ui-fabric-react';
import { IExpandingCardOptions } from '@angular-react/fabric/src/components/hover-card';
import { ICommandBarItemOptions, FabCommandBarComponent } from '@angular-react/fabric/src/components/command-bar';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class AppComponent {
  @ViewChild('customRange')
  customRangeTemplate: TemplateRef<{ item: any; dismissMenu: (ev?: any, dismissAll?: boolean) => void }>;

  runDisabled: boolean;

  onNewClicked() {
    console.log('New clicked');
  }

  onCopyClicked() {
    console.log('Copy clicked');
  }

  onSaveAsClicked() {
    console.log('Save as clicked');
  }

  onSaveAsFirstClicked() {
    console.log('Save as 1 clicked');
  }

  onSaveAsSecondClicked() {
    console.log('Save as 2 clicked');
  }

  onCustomItemClick(item: any) {
    this.customItemCount++;
    console.log('custom item clicked', item);
    this.cd.detectChanges();
  }

  constructor(private readonly cd: ChangeDetectorRef) {}

  customItemCount = 1;

  // FIXME: Allow declarative syntax too
  saveSubMenuProps: Partial<IContextualMenuProps> = {
    gapSpace: 10,
    /*     items: [
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
            console.log(`${item.text} clicked`);
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
    ], */
  };

  /*   commandBarItems: ReadonlyArray<ICommandBarItemOptions> = [
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
      subMenuProps: {
        onItemClick: (ev, item) => {
          console.log(item.text, 'clicked');

          this.commandBarItems.find(item => item.key === 'date-picker').text = item.text;
          this.commandBarItems = [...this.commandBarItems];
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
              this.commandBarItems = [
                ...this.commandBarItems,
                {
                  key: 'custom-range-range',
                  data: {
                    earliestDateAllowed: new Date(2015, 2, 15),
                  },
                  render: this.customRangeTemplate,
                  onClick: () => {
                    debugger;
                  }
                },
              ];
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

  commandBarFarItems: ReadonlyArray<ICommandBarItemOptions> = [
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
  ]; */

  isPanelOpen = false;

  toggleRun() {
    this.runDisabled = !this.runDisabled;
  }

  toggleFullScreen() {
    this.fullScreenIcon = this.fullScreenIcon === 'BackToWindow' ? 'MiniExpand' : 'BackToWindow';
  }

  fullScreenIcon = 'MiniExpand';
}
