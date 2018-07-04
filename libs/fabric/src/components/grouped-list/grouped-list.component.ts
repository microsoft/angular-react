// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator
// tslint:disable:no-output-on-prefix

import { InputRendererOptions, JsxRenderFunc, ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild } from '@angular/core';
import { IGroupedListProps, IGroupRenderProps } from 'office-ui-fabric-react/lib/components/GroupedList';
import { IListProps } from 'office-ui-fabric-react/lib/components/List/List.types';

@Component({
  selector: 'fab-grouped-list',
  exportAs: 'fabGroupedList',
  template: `
    <GroupedList
      #reactNode
      [componentRef]="componentRef"
      [className]="className"
      [dragDropEvents]="dragDropEvents"
      [dragDropHelper]="dragDropHelper"
      [eventsToRegister]="eventsToRegister"
      [groups]="groups"
      [items]="items"
      [listProps]="listProps"
      [selection]="selection"
      [selectionMode]="selectionMode"
      [viewport]="viewport"
      [usePageCache]="usePageCache"
      [shouldVirtualize]="shouldVirtualize"
      [groupProps]="groupProps"
      [RenderCell]="renderCell && onRenderCell"
      [GroupExpandStateChanged]="onGroupExpandStateChangedHandler"
      >
    </GroupedList>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-grouped-list' }
})
export class FabGroupedListComponent extends ReactWrapperComponent<IGroupedListProps> implements OnInit {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IGroupedListProps['componentRef'];
  @Input() className?: IGroupedListProps['className'];
  @Input() dragDropEvents?: IGroupedListProps['dragDropEvents'];
  @Input() dragDropHelper?: IGroupedListProps['dragDropHelper'];
  @Input() eventsToRegister?: IGroupedListProps['eventsToRegister'];
  @Input() groups?: IGroupedListProps['groups'];
  @Input() items: IGroupedListProps['items'];
  @Input() listProps?: IGroupedListProps['listProps'];
  @Input() selection?: IGroupedListProps['selection'];
  @Input() selectionMode?: IGroupedListProps['selectionMode'];
  @Input() viewport?: IGroupedListProps['viewport'];
  @Input() usePageCache?: IGroupedListProps['usePageCache'];
  @Input() shouldVirtualize?: (props: IListProps) => boolean;
  @Input() groupProps?: IGroupRenderProps;

  @Input() renderCell: InputRendererOptions<ICellRenderContext>;

  @Output() readonly onGroupExpandStateChanged = new EventEmitter<{ isSomeGroupExpanded: boolean }>();

  private _renderCell: JsxRenderFunc<ICellRenderContext>;


  constructor(elementRef: ElementRef) {
    super(elementRef);

    // coming from React context - we need to bind to this so we can access the Angular Component properties
    this.onRenderCell = this.onRenderCell.bind(this);
    this.onGroupExpandStateChangedHandler = this.onGroupExpandStateChangedHandler.bind(this);
  }

  ngOnInit() {
    this._renderCell = this.createInputJsxRenderer(this.renderCell);
  }

  onRenderCell(nestingDepth?: number, item?: any, index?: number): React.ReactNode {
    return this._renderCell({ nestingDepth, item, index });
  }

  onGroupExpandStateChangedHandler(isSomeGroupExpanded: boolean) {
    this.onGroupExpandStateChanged.emit({
      isSomeGroupExpanded,
    });
  }
}

export interface ICellRenderContext {
  nestingDepth?: number;
  item?: any;
  index?: number
}
