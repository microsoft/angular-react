// Copyright (c) Microsoft Corporation. All rights reserved.
// Licensed under the MIT License.

import { ReactWrapperComponent } from '@angular-react/core';
import { INavProps, INavLink, INav } from 'office-ui-fabric-react';
import {
  Component,
  ChangeDetectionStrategy,
  Input,
  ViewChild,
  ElementRef,
  ChangeDetectorRef,
  Renderer2,
  Output,
  EventEmitter,
} from '@angular/core';

@Component({
  selector: 'fab-nav',
  exportAs: 'fabNav',
  template: `
    <Nav
      #reactNode
      [groups]="groups"
      [LinkClick]="onLinkClickHandler"
      [selectedKey]="selectedKey"
      [expandButtonAriaLabel]="expandButtonAriaLabel"
      [expandedStateText]="expandedStateText"
      [collapsedStateText]="collapsedStateText"
      [LinkExpandClick]="onLinkExpandClickHandler"
      [isOnTop]="isOnTop"
      [initialSelectedKey]="initialSelectedKey"
      [ariaLabel]="ariaLabel"
    >
    </Nav>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabNavComponent extends ReactWrapperComponent<INavProps> {
  @ViewChild('reactNode', { static: true })
  protected reactNodeRef: ElementRef;

  @Input() componentRef?: INavProps['componentRef'];
  @Input() groups: INavProps["groups"];
  @Input() selectedKey: INavProps["selectedKey"];
  @Input() expandedStateText: INavProps["expandedStateText"];
  @Input() collapsedStateText: INavProps["collapsedStateText"];
  @Input() isOnTop: INavProps["isOnTop"];
  @Input() initialSelectedKey: INavProps["initialSelectedKey"];
  @Input() ariaLabel: INavProps["ariaLabel"];
  @Input() expandButtonAriaLabel: INavProps["expandButtonAriaLabel"];


  @Output() readonly onLinkClick = new EventEmitter<{
    event: Event,
    link: INavLink
  }>();
  @Output() readonly onLinkExpandClick = new EventEmitter<{
    event: Event,
    link: INavLink
  }>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef, renderer: Renderer2) {
    super(elementRef, changeDetectorRef, renderer);
    this.onLinkClickHandler = this.onLinkClickHandler.bind(this);
    this.onLinkExpandClickHandler = this.onLinkExpandClickHandler.bind(this);
  }

  onLinkClickHandler(event: React.MouseEvent<HTMLElement>, link?: INavLink): void {
    this.onLinkClick.emit({
      event: event.nativeEvent,
      link: link
    });
  }

  onLinkExpandClickHandler(event: React.MouseEvent<HTMLElement>, link?: INavLink): void {
    this.onLinkExpandClick.emit({
      event: event.nativeEvent,
      link: link
    });
  }
}
