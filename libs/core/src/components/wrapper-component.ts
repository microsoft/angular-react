import { isReactNode } from "@angular-react/core/src/renderer/react-node";
import { AfterViewInit, ElementRef } from "@angular/core";

const blacklistedAttributesAsProps = [
  'class',
  'style'
];

const blacklistedAttributeMatchers = [
  /^_ng.*/
]


/**
 * Base class for Angular @Components wrapping React Components.
 * Simplifies some of the handling around passing down props and setting CSS on the host component.
 */
// NOTE: TProps is not used at the moment, but a preparation for a potential future change.
export abstract class ReactWrapperComponent<TProps extends {}> implements AfterViewInit {

  protected abstract reactNodeRef: ElementRef;

  constructor(protected readonly elementRef: ElementRef) { }

  ngAfterViewInit() {
    this._passAttributesAsProps();
    this._setHostDisplay();
  }

  private _passAttributesAsProps() {
    const hostAttributes = Array.from(
      (this.elementRef.nativeElement as HTMLElement).attributes
    );

    const whitelistedHostAttributes = hostAttributes.filter(attr => !this._isBlacklistedAttribute(attr));
    if (!whitelistedHostAttributes || whitelistedHostAttributes.length === 0) {
      return;
    }

    if (!this.reactNodeRef || !isReactNode(this.reactNodeRef.nativeElement)) {
      throw new Error('reactNodeRef must hold a reference to a ReactNode');
    }

    const props = whitelistedHostAttributes.reduce((acc, attr) => ({
      ...acc,
      [attr.name]: attr.value,
    }), {});

    this.reactNodeRef.nativeElement.setProperties(props);
  }

  private _setHostDisplay() {
    const nativeElement: HTMLElement = this.elementRef.nativeElement;

    // setTimeout since we want to wait until child elements are rendered
    setTimeout(() => {
      if (nativeElement.firstElementChild) {
        const rootChildDisplay = getComputedStyle(nativeElement.firstElementChild).display;
        nativeElement.style.display = rootChildDisplay;
      }
    });
  }

  private _isBlacklistedAttribute(attr: Attr) {
    if (blacklistedAttributesAsProps.includes(attr.name)) {
      return true;
    }

    return blacklistedAttributeMatchers.some(regExp => regExp.test(attr.name));
  }
}
