// tslint:disable:component-selector
// tslint:disable:no-input-rename
// tslint:disable:no-output-rename
// tslint:disable:use-host-property-decorator

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
  selector: 'fab-dialog',
  exportAs: 'fabDialog',
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
  host: { 'class': 'fab-dialog' }
})
export class FabDialogComponent {

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
  selector: 'fab-dialog-footer',
  exportAs: 'fabDialogFooter',
  template: `
    <DialogFooter key="4">
      <ReactContent><ng-content></ng-content></ReactContent>
    </DialogFooter>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-dialog-footer' }
})
export class FabDialogFooterComponent {

}
