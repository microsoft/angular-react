// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator

import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, EventEmitter, Input, Output, ViewChild } from '@angular/core';
import { DialogType, IDialogProps } from 'office-ui-fabric-react/lib/components/Dialog';

@Component({
  selector: 'fab-dialog',
  exportAs: 'fabDialog',
  template: `
    <Dialog
      #reactNode
      [hidden]="hidden"
      (onDismiss)="onDismiss($event)"
      [dialogContentProps]="{
        type: this.type,
        title: this.title,
        subText: this.subText
      }"
      [modalProps]="{
        isBlocking: this.isBlocking,
        containerClassName: this.containerClassName
      }"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </Dialog>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-dialog' }
})
export class FabDialogComponent extends ReactWrapperComponent<IDialogProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() hidden = false;
  @Input() type = DialogType.normal;
  @Input() title: string;
  @Input() subText: string;

  @Input() isBlocking = false;
  @Input() containerClassName = 'ms-dialogMainOverride';

  @Output('onDismiss') dismiss = new EventEmitter<MouseEvent>();

  constructor(elementRef: ElementRef) {
    super(elementRef);
  }

  onDismiss(reactEvent: React.MouseEvent<HTMLButtonElement>) {
    this.dismiss.emit(reactEvent.nativeEvent);
  }
}

@Component({
  selector: 'fab-dialog-footer',
  exportAs: 'fabDialogFooter',
  template: `
    <DialogFooter>
      <ReactContent><ng-content></ng-content></ReactContent>
    </DialogFooter>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-dialog-footer' }
})
export class FabDialogFooterComponent {

}
