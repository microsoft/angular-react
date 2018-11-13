// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { AfterContentInit, ContentChild, Directive, EventEmitter, Input, Output, TemplateRef }
  from '@angular/core';
import { InputRendererOptions } from '@angular-react/core';
import { IColumn } from 'office-ui-fabric-react';

import { ChangeableItemDirective } from '../../core/shared/changeable-item.directive';

/**
 * Wrapper directive for rendering a custom column to a DetailsListColumn
 */
@Directive({ selector: 'fab-details-list-column > render' })
export class DetailsListColumnRenderDirective {
  @ContentChild(TemplateRef)
  readonly templateRef: TemplateRef<IDetailsListColumnOptionsRenderContext>;
}

/**
 * Wrapper directive for creating a DetailsListColumn
 */
@Directive({ selector: 'fab-details-list-column' })
export class DetailsListColumnDirective extends ChangeableItemDirective<IDetailsListColumnOptions>
  implements AfterContentInit {

  @ContentChild(DetailsListColumnRenderDirective)
  readonly renderDirective: DetailsListColumnRenderDirective;

  // Required members
  @Input()
  minWidth: IColumn['minWidth'];
  @Input()
  name: IColumn['name'];

  // Optional members
  @Input()
  ariaLabel?: IColumn['ariaLabel'];
  @Input()
  calculatedWidth?: IColumn['calculatedWidth'];
  @Input()
  columnActionsMode?: IColumn['columnActionsMode'];
  @Input()
  currentWidth?: IColumn['currentWidth'];
  @Input()
  data?: IColumn['data'];
  @Input()
  fieldName?: IColumn['fieldName'];
  @Input()
  filterAriaLabel?: IColumn['filterAriaLabel'];
  @Input()
  groupAriaLabel?: IColumn['groupAriaLabel'];
  @Input()
  headerClassName?: IColumn['headerClassName'];
  @Input()
  iconClassName?: IColumn['iconClassName'];
  @Input()
  iconName?: IColumn['iconName'];
  @Input()
  isCollapsable?: IColumn['isCollapsable'];
  @Input()
  isFiltered?: IColumn['isFiltered'];
  @Input()
  isGrouped?: IColumn['isGrouped'];
  @Input()
  isIconOnly?: IColumn['isIconOnly'];
  @Input()
  isMultiline?: IColumn['isMultiline'];
  @Input()
  isPadded?: IColumn['isPadded'];
  @Input()
  isResizable?: IColumn['isResizable'];
  @Input()
  isRowHeader?: IColumn['isRowHeader'];
  @Input()
  isSorted?: IColumn['isSorted'];
  @Input()
  isSortedDescending?: IColumn['isSortedDescending'];
  @Input()
  maxWidth?: IColumn['maxWidth'];
  @Input()
  onRender?: IColumn['onRender'];
  @Input()
  onRenderDivider?: IColumn['onRenderDivider'];
  @Input()
  sortAscendingAriaLabel?: IColumn['sortAscendingAriaLabel'];
  @Input()
  sortDescendingAriaLabel?: IColumn['sortDescendingAriaLabel'];

  // Render members
  @Input()
  render: IDetailsListColumnOptions['render'];

  // Callback members
  @Output()
  readonly onColumnClick = new EventEmitter<{ ev: Event, column: IColumn }>();
  @Output()
  readonly onColumnContextMenu = new EventEmitter<{ column?: IColumn, ev?: Event }>();
  @Output()
  readonly onColumnResize = new EventEmitter<{ width?: number }>();

  ngAfterContentInit() {
    if (this.renderDirective && this.renderDirective.templateRef) {
      this.render = this.renderDirective.templateRef;
    }
  }
}

export interface IDetailsListColumnOptions<TData = any>
  extends Pick<IColumn, Exclude<KnownKeys<IColumn>, 'onRender'>> {
  readonly render?: InputRendererOptions<IDetailsListColumnOptionsRenderContext>;
  readonly onColumnClick?: any;
  readonly onColumnContextMenu?: any;
  readonly onColumnResize?: any;
  readonly data?: TData;
}

export interface IDetailsListColumnOptionsRenderContext {
  item?: any;
  index?: number;
  column?: IColumn;
}
