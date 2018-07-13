import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
  ChangeDetectorRef,
} from '@angular/core';
import { IDatePickerProps } from 'office-ui-fabric-react/lib/DatePicker';

@Component({
  selector: 'fab-date-picker',
  exportAs: 'fabDatePicker',
  template: `
    <DatePicker
      #reactNode
      [componentRef]="componentRef"
      [calendarProps]="calendarProps"
      [label]="label"
      [isRequired]="isRequired"
      [disabled]="disabled"
      [ariaLabel]="ariaLabel"
      [pickerAriaLabel]="pickerAriaLabel"
      [isMonthPickerVisible]="isMonthPickerVisible"
      [showMonthPickerAsOverlay]="showMonthPickerAsOverlay"
      [allowTextInput]="allowTextInput"
      [disableAutoFocus]="disableAutoFocus"
      [placeholder]="placeholder"
      [today]="today"
      [value]="value"
      [formatDate]="formatDate"
      [parseDateFromString]="parseDateFromString"
      [firstDayOfWeek]="firstDayOfWeek"
      [strings]="strings"
      [highlightCurrentMonth]="highlightCurrentMonth"
      [highlightSelectedMonth]="highlightSelectedMonth"
      [showWeekNumbers]="showWeekNumbers"
      [firstWeekOfYear]="firstWeekOfYear"
      [showGoToToday]="showGoToToday"
      [borderless]="borderless"
      [className]="className"
      [dateTimeFormatter]="dateTimeFormatter"
      [minDate]="minDate"
      [maxDate]="maxDate"
      [initialPickerDate]="initialPickerDate"
      [SelectDate]="onSelectDateHandler"
      (onAfterMenuDismiss)="onAfterMenuDismiss.emit()">
    </DatePicker>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabDatePickerComponent extends ReactWrapperComponent<IDatePickerProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: IDatePickerProps['componentRef'];
  @Input() calendarProps?: IDatePickerProps['calendarProps'];
  @Input() label?: IDatePickerProps['label'];
  @Input() isRequired?: IDatePickerProps['isRequired'];
  @Input() disabled?: IDatePickerProps['disabled'];
  @Input() ariaLabel?: IDatePickerProps['ariaLabel'];
  @Input() pickerAriaLabel?: IDatePickerProps['pickerAriaLabel'];
  @Input() isMonthPickerVisible?: IDatePickerProps['isMonthPickerVisible'];
  @Input() showMonthPickerAsOverlay?: IDatePickerProps['showMonthPickerAsOverlay'];
  @Input() allowTextInput?: IDatePickerProps['allowTextInput'];
  @Input() disableAutoFocus?: IDatePickerProps['disableAutoFocus'];
  @Input() placeholder?: IDatePickerProps['placeholder'];
  @Input() today?: IDatePickerProps['today'];
  @Input() value?: IDatePickerProps['value'];
  @Input() formatDate?: IDatePickerProps['formatDate'];
  @Input() parseDateFromString?: IDatePickerProps['parseDateFromString'];
  @Input() firstDayOfWeek?: IDatePickerProps['firstDayOfWeek'];
  @Input() strings?: IDatePickerProps['strings'];
  @Input() highlightCurrentMonth?: IDatePickerProps['highlightCurrentMonth'];
  @Input() highlightSelectedMonth?: IDatePickerProps['highlightSelectedMonth'];
  @Input() showWeekNumbers?: IDatePickerProps['showWeekNumbers'];
  @Input() firstWeekOfYear?: IDatePickerProps['firstWeekOfYear'];
  @Input() showGoToToday?: IDatePickerProps['showGoToToday'];
  @Input() borderless?: IDatePickerProps['borderless'];
  @Input() className?: IDatePickerProps['className'];
  @Input() dateTimeFormatter?: IDatePickerProps['dateTimeFormatter'];
  @Input() minDate?: IDatePickerProps['minDate'];
  @Input() maxDate?: IDatePickerProps['maxDate'];
  @Input() initialPickerDate?: IDatePickerProps['initialPickerDate'];

  @Output() readonly onSelectDate = new EventEmitter<{ date: Date | null | undefined }>();
  @Output() readonly onAfterMenuDismiss = new EventEmitter<void>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);

    this.onSelectDateHandler = this.onSelectDateHandler.bind(this);
  }

  onSelectDateHandler(date: Date | null | undefined) {
    this.onSelectDate.emit({
      date,
    });
  }
}
