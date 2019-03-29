# Office UI Fabric React support for Angular

[![npm version](https://badge.fury.io/js/%40angular-react%2Ffabric.svg)](https://www.npmjs.com/package/@angular-react/fabric)

## Table of Contents
[Introduction](#introduction)  
[Available Components](#available-components)  
[Getting Started](#getting-started)  
&nbsp;&nbsp;&nbsp;&nbsp;[Install packages](#install-packages)  
&nbsp;&nbsp;&nbsp;&nbsp;[Import modules](#import-modules)  
&nbsp;&nbsp;&nbsp;&nbsp;[Use components](#use-components)  
[Notes and Tips](#notes-and-tips)  
&nbsp;&nbsp;&nbsp;&nbsp;[click vs. onClick](#click-vs-onclick)  
[Convenience Components](#convenience-components)  
&nbsp;&nbsp;&nbsp;&nbsp;[contextual-menu-item](#contextual-menu-item)  
&nbsp;&nbsp;&nbsp;&nbsp;[fab-calendar-strings](#fab-calendar-strings)  
&nbsp;&nbsp;&nbsp;&nbsp;[fab-combo-box-option](#fab-combo-box-option)  
&nbsp;&nbsp;&nbsp;&nbsp;[fab-command-bar-item](#fab-command-bar-item)  
&nbsp;&nbsp;&nbsp;&nbsp;[fab-details-list-column](#fab-details-list-column)  
&nbsp;&nbsp;&nbsp;&nbsp;[fab-dropdown-option](#fab-dropdown-option)  
&nbsp;&nbsp;&nbsp;&nbsp;[fab-group-item](#fab-group-item)

---

<a name="introduction"></a>
## Introduction

Industry trends, organizational pressures, and other factors can lead to mandates regarding the use of component libraries or migration from one technology to another. In the case of [Office UI Fabric][fab-home], where its use is required, the client must be written in React (there is no Angular component library for the latest version). Rewrite from Angular to React may be cost-prohibitive or ill advised for other reasons.

Use of Angular-React allows consuming any React elements, but specifically Office UI Fabric, within an Angular [2+] application. The library of wrappers for Office UI Fabric simplifies the use of these components with Angular. However, any React code can make use of the custom Angular-React renderer.

If you'd like to contribute, you must follow our [contributing guidelines](https://github.com/angular/material2/blob/master/CONTRIBUTING.md).
You can look through the issues (which should be up-to-date on who is working on which features and which pieces are blocked) and make a comment.

#### Quick links

[@angular-react/core](https://www.npmjs.com/package/@angular-react/core)
([demo](https://microsoft.github.io/angular-react)) |
[@angular-react/fabric](https://www.npmjs.com/package/@angular-react/fabric)
([demo](https://microsoft.github.io/angular-react/demo)) |
[Contributing](https://github.com/microsoft/angular-react/blob/master/CONTRIBUTING.md) |
[StackBlitz Template](https://stackblitz.com/edit/angular-react) |
[Office UI Fabric][fab-home]

### Typical use cases

- Use React component libraries with Angular
- Incrementally rewrite an Angular application into React (moving from atomic/leaf nodes upward into full features/pages until the entire app is re-written)

---

<a name="available-components"></a>
## Available Components

The following are Fabric components that are readily available to be used. For the most up-to-date version of this list or more details for a specific component, refer to the [components folder][ar-components].

| Component         | Notes                                                                                               | Docs                                      |
| ----------------- | --------------------------------------------------------------------------------------------------- | ----------------------------------------- |
| breadcrumb        |                                                                                                     | [Breadcrumb][fab-breadcrumb]              |
| button            | Different [button types][ar-button]<br>Supports [contextual-menu-item](#contextual-menu-item)       | [Button][fab-button]                      |
| calendar          | Supports [fab-calendar-strings](#fab-calendar-strings)                                              | [Calendar][fab-calendar]                  |
| callout           | Different [callout types][ar-callout]                                                               | [Callout][fab-callout]                    |
| checkbox          |                                                                                                     | [Checkbox][fab-checkbox]                  |
| choice-group      |                                                                                                     | [ChoiceGroup][fab-choice-group]           |
| combo-box         | Different [combo-box types][ar-combo-box]<br>Supports [fab-combo-box-option](#fab-combo-box-option) | [ComboBox][fab-combo-box]                 |
| command-bar       | Supports [fab-command-bar-item](#fab-command-bar-item)                                              | [CommandBar][fab-command-bar]             |
| contextual-menu   | See [contextual-menu-item](#contextual-menu-item)                                                   | [ContextualMenu][fab-contextual-menu]     |
| date-picker       |                                                                                                     | [DatePicker][fab-date-picker]             |
| details-list      | Supports [fab-details-list-column](#fab-details-list-column) and [fab-group-item](#fab-group-item)  | [DetailsList][fab-details-list]           |
| dialog            | fab-dialog-content and fab-dialog-footer are also supported                                         | [Dialog][fab-dialog]                      |
| divider           |                                                                                                     | N/A                                       |
| dropdown          | Supports [fab-dropdown-option](#fab-dropdown-option)                                                | [Dropdown][fab-dropdown]                  |
| grouped-list      |                                                                                                     | [GroupedList][fab-grouped-list]           |
| hover-card        | Different [hover-card types][ar-hover-card]                                                         | [HoverCard][fab-hover-card]               |
| icon              |                                                                                                     | [Icon][fab-icon]                          |
| image             |                                                                                                     | [Image][fab-image]                        |
| link              |                                                                                                     | [Link][fab-link]                          |
| marquee-selection |                                                                                                     | [MarqueeSelection][fab-marquee-selection] |
| message-bar       | Must bind `[dismissible]="true"` for `(onDismiss)` to work                                          | [MessageBar][fab-message-bar]             |
| modal             |                                                                                                     | [Modal][fab-modal]                        |
| nav               |                                                                                                     | [Nav][fab-nav]                            |
| panel             |                                                                                                     | [Panel][fab-panel]                        |
| persona           | fab-persona-coin is also supported                                                                  | [Persona][fab-persona]                    |
| pickers           | Currently only fab-tag-picker is supported                                                          | [Pickers][fab-pickers]                    |
| pivot             | fab-pivot-item is also supported                                                                    | [Pivot][fab-pivot]                        |
| search-box        |                                                                                                     | [SearchBox][fab-search-box]               |
| shimmer           | fab-shimmer-elements-group is also supported                                                        | [Shimmer][fab-shimmer]                    |
| slider            |                                                                                                     | [Slider][fab-slider]                      |
| spin-button       |                                                                                                     | [SpinButton][fab-spin-button]             |
| spinner           |                                                                                                     | [Spinner][fab-spinner]                    |
| text-field        | Different [text-field types][ar-text-field]                                                         | [TextField][fab-text-field]               |
| toggle            |                                                                                                     | [Toggle][fab-toggle]                      |
| tooltip           | Applies to child element of fab-tooltip-host                                                        | [Tooltip][fab-tooltip]                    |

---

<a name="getting-started"></a>
## Getting Started

<a name="install-packages"></a>
### Install packages

First, install the following packages required for Angular-React to run:

`npm install --save @angular-react/core @angular-react/fabric office-ui-fabric-react@6.151.0 react@^16.6.3 react-dom@^16.6.3`  

Then, install the following dev dependencies for React typings:

`npm install --save-dev @types/react@~16.7.13 @types/react-dom@^16.0.11`

<a name="import-modules"></a>
### Import modules

In app.module.ts, add an import for AngularReactBrowserModule. To use Fabric icon functionality (i.e. for icon buttons), the `initializeIcons()` function also needs to be called in the constructor.

```typescript
import { AngularReactBrowserModule } from "@angular-react/core";
import { initializeIcons } from "office-ui-fabric-react/lib/Icons";

@NgModule({
  imports: [AngularReactBrowserModule]
})
export class AppModule {
  constructor() {
    initializeIcons();
  }
}
```

<a name="use-components"></a>
### Use components

To use a specific Fabric component, the corresponding module needs to be imported. The module name can be inferred from the component name or found in the [components folder][ar-components], for example:

```typescript
import { FabButtonModule, FabDetailsListModule } from "@angular-react/fabric";

@NgModule({
  imports: [FabButtonModule, FabDetailsListModule]
})
export class ComponentModule { }
```

After the necessary modules are imported, the Fabric components can be used on the template. The component's tag is typically `fab-` followed by its name in the [components list](#available-components). There are a few components that deviate from this pattern, especially when there are multiple flavors of a component, such as buttons (`fab-default-button`, `fab-primary-button`, etc...).

For component bindings, refer to the [Fabric documentation][fab-components]. Binding names should match what is listed with the only difference being the brackets which should match the type of binding (i.e. `[]` for inputs and `()` for outputs). For example, the following template will render a standard Fabric button with an icon and click handler event:

```html
<fab-default-button [iconProps]="{ iconName: 'Emoji2' }" (onClick)="doSomething()">
  Click me!
</fab-default-button>
```

For more examples of component usage, check out the [demo app](https://github.com/Microsoft/angular-react/tree/master/apps/demo/src/app).

---

<a name="notes-and-tips"></a>
## Notes and Tips

<a name="click-vs-onclick"></a>
### click vs. onClick

Angular's default click binding is `(click)` while the Fabric components follow React's `(onClick)`. For safety, it is typically advised to stick with the `(onClick)` binding. Although both bindings will "work", there will be different behaviors in certain circumstances.

For example, in the following code, the click event will still fire even though the button is disabled. This is because the `(click)` binding is attached to the Angular wrapper around the React component.

```html
<fab-default-button [disabled]="true" (click)="doSomething()">
  This will still fire an event!
</fab-default-button>
```

The correct way would be to use `(onClick)` as that event is what gets fired by the actual React button itself:

```html
<fab-default-button [disabled]="true" (onClick)="doSomething()">
  This will not fire an event
</fab-default-button>
```

---

<a name="convenience-components"></a>
## Convenience Components

Fabric components often have input members that expect an object, such as the `columns` member of DetailsList. Although objects can be passed through Angular input bindings, this may be inconvenient if you want to avoid declaring extra objects or have other requirements such as i18n.

The following components and directives have been added to simplify this process for a couple of common scenarios. If what you're looking for is not in the following list, you will need to create a wrapper component in your project to handle passing in different properties of a certain input object. Alternatively, consider contributing to this project to get it added :)

<a name="contextual-menu-item"></a>
### contextual-menu-item ([FabContextualMenuModule][ar-contextual-menu])

Declarative syntax for [IContextualMenuItem](https://github.com/OfficeDev/office-ui-fabric-react/tree/master/packages/office-ui-fabric-react/src/components/ContextualMenu) interface.
Currently supported by different flavors of `fab-*-button` and `fab-command-bar-item`.
Supports additional nesting of `contextual-menu-item`.
Usage example:

```html
<fab-default-button text="Button">
  <contextual-menu-item key="item-1" text="Item 1"></contextual-menu-item>
  <contextual-menu-item key="item-2" text="Item 2">
    <contextual-menu-item key="item-2-1" text="Item 2.1"></contextual-menu-item>
    <contextual-menu-item key="item-2-2" text="Item 2.2"></contextual-menu-item>
  </contextual-menu-item>
  <contextual-menu-item key="item-3" text="Item 3"></contextual-menu-item>
</fab-default-button>
```

<a name="fab-calendar-strings"></a>
### fab-calendar-strings ([FabCalendarModule][ar-calendar])

Declarative syntax for [ICalendarStrings](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Calendar/Calendar.types.ts) interface.
Currently only supported by `fab-calendar`.
Usage example:

```html
<fab-calendar>
  <fab-calendar-strings
    [months]="['January', 'Fabruary', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December']"
    [shortMonths]="['Jan', 'Fab', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']"
    [days]="['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']"
    [shortDays]="['S', 'M', 'T', 'W', 'T', 'F', 'S']"
    goToToday="Go to today"
    weekNumberFormatString="Week number {0}"
  ></fab-calendar-strings>
</fab-calendar>
```

<a name="fab-combo-box-option"></a>
### fab-combo-box-option ([FabComboBoxModule][ar-combo-box])

Declarative syntax for [IComboBoxOption](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/ComboBox/ComboBox.types.ts) interface.
Currently only supported by `fab-combo-box`.
Usage example:  
<sub>Note that the `key` input is actually `optionKey` here.</sub>

```html
<fab-combo-box placeholder="ComboBox">
  <options>
    <fab-combo-box-option optionKey="option-1" text="Option 1">
    <fab-combo-box-option optionKey="option-2" text="Option 2">
    <fab-combo-box-option optionKey="option-3" text="Option 3">
  </options>
</fab-combo-box>
```

<a name="fab-command-bar-item"></a>
### fab-command-bar-item ([FabCommandBarModule][ar-command-bar])

Declarative syntax for [ICommandBarItemProps](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/CommandBar/CommandBar.types.ts) interface.
Currently only supported by `fab-command-bar`.
Supports additional nesting of `contextual-menu-item` and custom renderer via `render` (same parameters as IContextualMenuItem's `onRender`).
Usage example:

```html
<fab-command-bar>
  <items>
    <fab-command-bar-item key="item-1" text="Item 1"></fab-command-bar-item>
    <fab-command-bar-item key="item-2" text="Item 2">
      <contextual-menu-item key="item-2-1" text="Item 2.1"></contextual-menu-item>
      <contextual-menu-item key="item-2-2" text="Item 2.2"></contextual-menu-item>
    </fab-command-bar-item>
  </items>
  <far-items>
    <fab-command-bar-item key="fitem-1" text="F. Item 1"></fab-command-bar-item>
    <fab-command-bar-item key="fitem-2" text="F. Item 2">
      <render>
        <ng-template let-item="item">
          Custom item content
        </ng-template>
      </render>
    </fab-command-bar-item>
  </far-items>
  <overflow-items>
    <fab-command-bar-item key="oitem-1" text="O. Item 1"></fab-command-bar-item>
    <fab-command-bar-item key="oitem-2" text="O. Item 2"></fab-command-bar-item>
  </overflow-items>
</fab-command-bar>
```

<a name="fab-details-list-column"></a>
### fab-details-list-column ([FabDetailsListModule][ar-details-list])

Declarative syntax for [IColumn](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/DetailsList/DetailsList.types.ts) interface.
Currently only supported by `fab-details-list`.
Supports custom renderer via `render` (same parameters as IColumn's `onRender`).
Usage example:

```html
<fab-details-list [items]="shapes">
  <columns>
    <fab-details-list-column key="column-1" name="Column 1" fieldName="name"></fab-details-list-column>
    <fab-details-list-column key="column-2" name="Column 2">
      <render>
        <ng-template let-item="item" let-index="index" let-column="column">
          Size: {{ item.size }}, Index: {{ index }}, Column: {{ column.name }}
        </ng-template>
      </render>
    </fab-details-list-column>
    <fab-details-list-column key="column-3" name="Column 3" fieldName="color"></fab-details-list-column>
  </columns>
</fab-details-list>
```

<a name="fab-dropdown-option"></a>
### fab-dropdown-option ([FabDropdownModule][ar-dropdown])

Declarative syntax for [IDropdownOption](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/Dropdown/Dropdown.types.ts) interface.
Currently only supported by `fab-dropdown`.
Usage example:  
<sub>Note that the `key` input is actually `optionKey` here.</sub>

```html
<fab-dropdown placeholder="Dropdown">
  <options>
    <fab-dropdown-option optionKey="option-1" text="Option 1">
    <fab-dropdown-option optionKey="option-2" text="Option 2">
    <fab-dropdown-option optionKey="option-3" text="Option 3">
  </options>
</fab-dropdown>
```

<a name="fab-group-item"></a>
### fab-group-item ([FabGroupModule][ar-group])

Declarative syntax for [IGroup](https://github.com/OfficeDev/office-ui-fabric-react/blob/master/packages/office-ui-fabric-react/src/components/GroupedList/GroupedList.types.ts) interface.
Currently only supported by `fab-details-list`.
Supports additional nesting of `fab-group-item`.
Usage example:

```html
<fab-details-list [items]="items">
  <groups>
    <fab-group-item key="group-1" name="Group 1" [count]="3" [startIndex]="0"></fab-group-item>
    <fab-group-item key="group-2" name="Group 2" [count]="3" [startIndex]="3">
      <fab-group-item key="group-2-1" name="Group 2.1" [count]="2" [startIndex]="3"></fab-group-item>
      <fab-group-item key="group-2-2" name="Group 2.2" [count]="1" [startIndex]="5"></fab-group-item>
    </fab-group-item>
    <fab-group-item key="group-3" name="Group 3" [count]="10" [startIndex]="6"></fab-group-item>
  </groups>
</fab-details-list>
```

[ar-components]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components
[ar-button]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/button
[ar-calendar]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/calendar
[ar-callout]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/callout
[ar-combo-box]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/combo-box
[ar-command-bar]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/command-bar
[ar-contextual-menu]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/contextual-menu
[ar-details-list]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/details-list
[ar-dropdown]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/dropdown
[ar-group]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/group
[ar-hover-card]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/hover-card
[ar-text-field]: https://github.com/Microsoft/angular-react/tree/master/libs/fabric/src/lib/components/text-field
[fab-home]: https://developer.microsoft.com/en-us/fabric
[fab-components]: https://developer.microsoft.com/en-us/fabric#/components
[fab-breadcrumb]: https://developer.microsoft.com/en-us/fabric#/components/breadcrumb
[fab-button]: https://developer.microsoft.com/en-us/fabric#/components/button
[fab-calendar]: https://developer.microsoft.com/en-us/fabric#/components/calendar
[fab-callout]: https://developer.microsoft.com/en-us/fabric#/components/callout
[fab-checkbox]: https://developer.microsoft.com/en-us/fabric#/components/checkbox
[fab-choice-group]: https://developer.microsoft.com/en-us/fabric#/components/choicegroup
[fab-combo-box]: https://developer.microsoft.com/en-us/fabric#/components/combobox
[fab-command-bar]: https://developer.microsoft.com/en-us/fabric#/components/commandbar
[fab-contextual-menu]: https://developer.microsoft.com/en-us/fabric#/components/contextualmenu
[fab-date-picker]: https://developer.microsoft.com/en-us/fabric#/components/datepicker
[fab-details-list]: https://developer.microsoft.com/en-us/fabric#/components/detailslist
[fab-dialog]: https://developer.microsoft.com/en-us/fabric#/components/dialog
[fab-dropdown]: https://developer.microsoft.com/en-us/fabric#/components/dropdown
[fab-grouped-list]: https://developer.microsoft.com/en-us/fabric#/components/groupedlist
[fab-hover-card]: https://developer.microsoft.com/en-us/fabric#/components/hovercard
[fab-icon]: https://developer.microsoft.com/en-us/fabric#/components/icon
[fab-image]: https://developer.microsoft.com/en-us/fabric#/components/image
[fab-link]: https://developer.microsoft.com/en-us/fabric#/components/link
[fab-marquee-selection]: https://developer.microsoft.com/en-us/fabric#/components/marqueeselection
[fab-message-bar]: https://developer.microsoft.com/en-us/fabric#/components/messagebar
[fab-modal]: https://developer.microsoft.com/en-us/fabric#/components/modal
[fab-nav]: https://developer.microsoft.com/en-us/fabric#/components/nav
[fab-panel]: https://developer.microsoft.com/en-us/fabric#/components/panel
[fab-persona]: https://developer.microsoft.com/en-us/fabric#/components/persona
[fab-pickers]: https://developer.microsoft.com/en-us/fabric#/components/pickers
[fab-pivot]: https://developer.microsoft.com/en-us/fabric#/components/pivot
[fab-search-box]: https://developer.microsoft.com/en-us/fabric#/components/searchbox
[fab-shimmer]: https://developer.microsoft.com/en-us/fabric#/components/shimmer
[fab-slider]: https://developer.microsoft.com/en-us/fabric#/components/slider
[fab-spin-button]: https://developer.microsoft.com/en-us/fabric#/components/spinbutton
[fab-spinner]: https://developer.microsoft.com/en-us/fabric#/components/spinner
[fab-text-field]: https://developer.microsoft.com/en-us/fabric#/components/textfield
[fab-toggle]: https://developer.microsoft.com/en-us/fabric#/components/toggle
[fab-tooltip]: https://developer.microsoft.com/en-us/fabric#/components/tooltip
