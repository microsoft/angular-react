import { ReactWrapperComponent } from '@angular-react/core';
import { ChangeDetectionStrategy, Component, ElementRef, Input, ViewChild, EventEmitter, ChangeDetectorRef, Output } from '@angular/core';
import { IModalProps } from 'office-ui-fabric-react/lib/components/Modal';
import { IAccessiblePopupProps } from 'office-ui-fabric-react/lib/common/IAccessiblePopupProps';
import { IWithResponsiveModeState } from 'office-ui-fabric-react/lib/utilities/decorators/withResponsiveMode';

@Component({
  selector: 'fab-modal',
  exportAs: 'fabModal',
  template: `
    <Modal
      #reactNode

      [responsiveMode]="responsiveMode"

      [elementToFocusOnDismiss]="elementToFocusOnDismiss"
      [ignoreExternalFocusing]="ignoreExternalFocusing"
      [forceFocusInsideTrap]="forceFocusInsideTrap"
      [firstFocusableSelector]="firstFocusableSelector"
      [closeButtonAriaLabel]="closeButtonAriaLabel"
      [isClickableOutsideFocusTrap]="isClickableOutsideFocusTrap"

      [componentRef]="componentRef"
      [isOpen]="isOpen"
      [isDarkOverlay]="isDarkOverlay"
      [isBlocking]="isBlocking"
      [className]="className"
      [containerClassName]="containerClassName"
      [titleAriaId]="titleAriaId"
      [subtitleAriaId]="subtitleAriaId"
      [Dismiss]="onDismissHandler"
      (onLayerDidMount)="onLayerDidMount.emit()"
      (onDismissed)="onDismissed.emit()">
      <ReactContent><ng-content></ng-content></ReactContent>
    </Modal>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  host: { 'class': 'fab-modal' }
})
export class FabModalComponent extends ReactWrapperComponent<IModalProps> implements IWithResponsiveModeState, IAccessiblePopupProps {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() responsiveMode?: IModalProps['responsiveMode'];

  @Input() elementToFocusOnDismiss?: IModalProps['elementToFocusOnDismiss'];
  @Input() ignoreExternalFocusing?: IModalProps['ignoreExternalFocusing'];
  @Input() forceFocusInsideTrap?: IModalProps['forceFocusInsideTrap'];
  @Input() firstFocusableSelector?: IModalProps['firstFocusableSelector'];
  @Input() closeButtonAriaLabel?: IModalProps['closeButtonAriaLabel'];
  @Input() isClickableOutsideFocusTrap?: IModalProps['isClickableOutsideFocusTrap'];

  @Input() componentRef?: IModalProps['componentRef'];
  @Input() isOpen?: IModalProps['isOpen'];
  @Input() isDarkOverlay?: IModalProps['isDarkOverlay'];
  @Input() isBlocking?: IModalProps['isBlocking'];
  @Input() className?: IModalProps['className'];
  @Input() containerClassName?: IModalProps['containerClassName'];
  @Input() titleAriaId?: IModalProps['titleAriaId'];
  @Input() subtitleAriaId?: IModalProps['subtitleAriaId'];

  @Output() readonly onLayerDidMount = new EventEmitter<void>();
  @Output() readonly onDismiss = new EventEmitter<MouseEvent>();
  @Output() readonly onDismissed = new EventEmitter<void>();

  constructor(elementRef: ElementRef, private readonly cd: ChangeDetectorRef) {
    super(elementRef);

    this.onDismissHandler = this.onDismissHandler.bind(this);
  }

  onDismissHandler(ev?: React.MouseEvent<HTMLButtonElement>) {
    this.onDismiss.emit(ev && ev.nativeEvent);
  }
}
