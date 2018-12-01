# Office Fabric React support for Angular

[![npm version](https://badge.fury.io/js/%40angular-react%2Ffabric.svg)](https://www.npmjs.com/package/@angular-react/fabric)

Industry trends, organizational pressures, and other factors can lead to mandates regarding the use of component libraries or migration from one technology to another. In the case of [Office UI Fabric][fab], where its use is required, the client must be written in React (there is no Angular component library for the latest version). Rewrite from Angular to React may be cost-prohibitive or ill advised for other reasons.

Use of Angular-React allows consuming any React elements, but specifically Office UI Fabric, within an Angular [2+] application. The library of wrappers for Office UI Fabric simplifies the use of these components with Angular. However, any React code can make use of the custom Angular-React renderer.

#### Quick links

[@angular-react/core](https://www.npmjs.com/package/@angular-react/core) |
[Documentation, quick start, and guides][ard] |
[Demo][ard-demo] |
[Contributing](https://github.com/microsoft/angular-react/blob/master/CONTRIBUTING.md) |
[StackBlitz Template](https://stackblitz.com/edit/angular-react) |
[Office Fabric](https://developer.microsoft.com/en-us/fabric)

### Typical Use Cases

- Use React component libraries with Angular
- Incrementally rewrite an Angular application into React (moving from atomic/leaf nodes upward into full features/pages until the entire app is re-written)

### Getting started

See our [Getting Started Guide][getting-started]
if you're building your first project with Angular-React.

If you'd like to contribute, you must follow our [contributing guidelines](https://github.com/angular/material2/blob/master/CONTRIBUTING.md).
You can look through the issues (which should be up-to-date on who is working on which features and which pieces are blocked) and make a comment.

High level stuff planned for Q2 2018 (April - June):

- Extend support for Fabric Buttons
- Extend support for Fabric Dialog
- Additional Fabric components TBD
- Table feature improvements
- Improve docs

#### Available Fabric features

| Feature         | Notes                                   | Docs      |
| --------------- | --------------------------------------- | --------- |
| breadcrumb      | Beta                                    | [Docs][0] |
| button          | Beta                                    | [Docs][0] |
| callout         | Beta                                    | [Docs][0] |
| choice-group    | Beta                                    | [Docs][0] |
| combo-box       | Beta                                    | [Docs][0] |
| command-bar     | Heavily tested, most scenarios covered. | [Docs][0] |
| contextual-menu | Beta                                    | [Docs][0] |
| date-picker     | Beta                                    | [Docs][0] |
| dialog          | Beta                                    | [Docs][1] |
| divider         | Beta                                    | [Docs][0] |
| grouped-list    | Beta                                    | [Docs][0] |
| hover-card      | Beta                                    | [Docs][0] |
| icon            | Beta                                    | [Docs][0] |
| image           | Beta                                    | [Docs][0] |
| link            | Beta                                    | [Docs][0] |
| message-bar     | Beta                                    | [Docs][0] |
| modal           | Beta                                    | [Docs][0] |
| panel           | Beta                                    | [Docs][0] |
| persona         | Beta                                    | [Docs][0] |
| pickers         | Beta                                    | [Docs][0] |
| pivot           | Beta                                    | [Docs][0] |
| search-box      | Beta                                    | [Docs][0] |
| shimmer         | Beta                                    | [Docs][0] |
| slider          | Beta                                    | [Docs][0] |
| spinner         | Beta                                    | [Docs][0] |
| toggle          | Beta                                    | [Docs][0] |
| tooltip         | Beta                                    | [Docs][0] |

#### In progress, planned, and non-planned Fabric features

| Feature    | Status                   | Docs | Issue    |
| ---------- | ------------------------ | ---- | -------- |
| bottom-nav | Not started, not planned | -    | [TBD][0] |

[0]: https://microsoft.github.io/angular-react/docs/fabric
[1]: https://microsoft.github.io/angular-react/docs/fabric
[ard]: https://microsoft.github.io/angular-react
[ard-demo]: https://microsoft.github.io/angular-react/demo
[getting-started]: https://microsoft.github.io/angular-react/docs/getting-started
[fab]: https://developer.microsoft.com/en-us/fabric

## The goal of Angular React

### What do we mean by "high-quality"?

## Browser and screen reader support
