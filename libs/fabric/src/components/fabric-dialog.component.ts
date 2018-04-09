// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename

import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
} from '@angular/core';

import { IDialogProps, Dialog,  } from 'office-ui-fabric-react/lib/Dialog';
import { DialogType, DialogFooter } from 'office-ui-fabric-react/lib/components/Dialog';


@Component({
  selector: 'fabric-dialog',
  template: `
    <Dialog
      [hidden]="hidden"
      (onDismiss)="onDismiss($event)"
      [dialogContentProps]="dialogContentProps"
      [modalProps]="modalProps"
    >
      <ReactContent><ng-content></ng-content></ReactContent>
    </Dialog>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabricDialogComponent {

  dialogContentProps = {
    type: DialogType.largeHeader,
    title: 'All emails together',
    subText: 'Your Inbox has changed. No longer does it include favorites, it is a singular destination for your emails.'
  };

  modalProps = {
    isBlocking: false,
    containerClassName: 'ms-dialogMainOverride'
  };

  @Input() hidden = false;

  @Output('onDismiss') dismiss: EventEmitter<MouseEvent> = new EventEmitter<MouseEvent>();
  onDismiss = ev => this.dismiss.emit(ev as any);
}



@Component({
  selector: 'fabric-dialog-footer',
  template: `
    <DialogFooter key="4">
      <ReactContent><ng-content></ng-content></ReactContent>
    </DialogFooter>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabricDialogFooterComponent {

}
