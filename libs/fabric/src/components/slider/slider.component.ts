import { ReactWrapperComponent } from '@angular-react/core';
import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  Input,
  ViewChild,
  Output,
  EventEmitter,
  ChangeDetectorRef,
} from '@angular/core';
import { ISliderProps } from 'office-ui-fabric-react/lib/Slider';

@Component({
  selector: 'fab-slider',
  exportAs: 'fabSlider',
  template: `
    <Slider
      #reactNode
      [componentRef]="componentRef"
      [styles]="styles"
      [theme]="theme"
      [label]="label"
      [defaultValue]="defaultValue"
      [value]="value"
      [min]="min"
      [max]="max"
      [step]="step"
      [showValue]="showValue"
      [ariaLabel]="ariaLabel"
      [ariaValueText]="ariaValueText"
      [vertical]="vertical"
      [disabled]="disabled"
      [className]="className"
      [buttonProps]="buttonProps"
      (onChange)="onChange.emit($event)">
    </Slider>
  `,
  styles: ['react-renderer'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class FabSliderComponent extends ReactWrapperComponent<ISliderProps> {
  @ViewChild('reactNode') protected reactNodeRef: ElementRef;

  @Input() componentRef?: ISliderProps['componentRef'];
  @Input() styles?: ISliderProps['styles'];
  @Input() theme?: ISliderProps['theme'];
  @Input() label?: ISliderProps['label'];
  @Input() defaultValue?: ISliderProps['defaultValue'];
  @Input() value?: ISliderProps['value'];
  @Input() min?: ISliderProps['min'];
  @Input() max?: ISliderProps['max'];
  @Input() step?: ISliderProps['step'];
  @Input() showValue?: ISliderProps['showValue'];
  @Input() ariaLabel?: ISliderProps['ariaLabel'];
  @Input() ariaValueText?: ISliderProps['ariaValueText'];
  @Input() vertical?: ISliderProps['vertical'];
  @Input() disabled?: ISliderProps['disabled'];
  @Input() className?: ISliderProps['className'];
  @Input() buttonProps?: ISliderProps['buttonProps'];

  @Output() readonly onChange = new EventEmitter<number>();

  constructor(elementRef: ElementRef, changeDetectorRef: ChangeDetectorRef) {
    super(elementRef, changeDetectorRef);
  }
}
