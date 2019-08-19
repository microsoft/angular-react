# React support for Angular

[![CircleCI](https://circleci.com/gh/microsoft/angular-react.svg?style=svg)](https://circleci.com/gh/Microsoft/angular-react)

Industry trends, organizational pressures, and other factors can lead to mandates regarding the use of component libraries or migration from one technology to another. In the case of [Office UI Fabric][fab], where its use is required, the client must be written in React (there is no Angular component library for the latest version). Rewrite from Angular to React may be cost-prohibitive or ill advised for other reasons.

Use of Angular-React allows consuming any React elements, but specifically Office UI Fabric, within an Angular [2+] application. The library of wrappers for Office UI Fabric simplifies the use of these components with Angular. However, any React code can make use of the custom Angular-React renderer.

## Libraries

@angular-react contains two separate libraries:

- [**core**][lib-core]: [![npm version](https://badge.fury.io/js/%40angular-react%2Fcore.svg)](https://www.npmjs.com/package/@angular-react/core) 

    Includes the Renderer and supporting logic to render Angular components with React implementations as React components. 

- [**fabric**][lib-fab]: [![npm version](https://badge.fury.io/js/%40angular-react%2Ffabric.svg)](https://www.npmjs.com/package/@angular-react/fabric)
    
    The light-weight Angular component wrappers that expose the Fabric React component API through common Angular components (including both imperative AND declarative syntax in many cases).


### Quick links

[Documentation, quick start, and guides][ard] |
[Demo][ard-demo] |
[Contributing](https://github.com/microsoft/angular-react/blob/master/CONTRIBUTING.md) |
[StackBlitz Template](https://stackblitz.com/edit/angular-react) |
[Office UI Fabric](https://developer.microsoft.com/en-us/fabric)

### Typical Use Cases

- Use React component libraries with Angular
- Incrementally rewrite an Angular application into React 
(moving from atomic/leaf nodes upward into full features/pages until the entire app is re-written)

## Getting started

See a simple [StackBlitz Template](https://stackblitz.com/edit/angular-react)

# Roadmap & Support

Both the `core` and `fabric` libraries are in production use in consumer-facing applications at Microsoft. That said, 
we (the team that currently maintains this project) are a product team, and @angular-react is not our primary focus. 
We maintain this because we need it and we share it with the wider community with the hope that it will prove useful to others.
Of course, we attempt to provide help when possible and we love getting pull requests for 
improvements/enhancement/fixes from community members. But we don't have any specific plans for the future of this project.

Please take this in to consideration when evaluating this project's suitability for your own needs. 

## Contributing

If you'd like to contribute, you must follow our [contributing guidelines](https://github.com/microsoft/angular-react/blob/master/CONTRIBUTING.md).
You can look through the issues (which should be up-to-date on who is working on which features and which pieces are blocked) and make a comment.

[ard]: https://microsoft.github.io/angular-react
[ard-demo]: https://microsoft.github.io/angular-react/demo
[getting-started]: https://microsoft.github.io/angular-react/docs/getting-started
[fab]: https://developer.microsoft.com/en-us/fabric
[fab-c]: https://developer.microsoft.com/en-us/fabric#/components
[lib-core]: ./libs/core/README.md
[lib-fab]: ./libs/fabric/README.md
