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
})
export class FabricDialogComponent {

  @Input() hidden = false;
  @Input() type = DialogType.normal;
  @Input() title: string;
  @Input() subText: string;

  @Input() isBlocking = false;
  @Input() containerClassName = 'ms-dialogMainOverride';

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
