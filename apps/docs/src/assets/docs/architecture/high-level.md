## High-level architecture

## Package separation

`@angular-react` is split into 2 main parts:

1. Core (`@angular-react/core`)
2. Wrapper libraries (`@angular-react/fabric`, `@angular-react/semantic-ui`)

The core library takes care of the heavy lifting, orchestrates the rendering of the React components insider Angular, interoperability between Angular and React and provide some functionality that's commonly needed when creating wrapper components (more on that below).

Wrapper libraries create what's called "wrapper components" around React components exposed by the native UI library, as well as handle all the plumbing around binding them to Angular, the logic in these libraries is thus usually pretty limited.

## Concepts

As you can expect, you need to know Angular and React, and in addition to the regular stuff like components' lifecycle etc. you also need a good understanding of how Angular rendering works ([summary](https://alligator.io/angular/using-renderer2/), [full API docs](https://angular.io/api/core/Renderer2)), and how React rendering works in the browser ([`ReactDOM`](https://reactjs.org/docs/react-dom.html)).

Additionally, there are a few concepts that are important to know when dealing with `@angular-react`, and more specifically - `@angular-react/core`:

- `ReactRenderer` - an implementation of Angular's `Renderer2`. This is what drives the whole library and bootstraps the rendering process for each component.
- `ReactNode` - a container of a specific React component instance, the renderer holds a `Set` of these to keep track of what to render. Note that these only exist for the "root" of the React render tree, [more on that here](FILL-IN-PLACEHOLDER).

There are a few more helper React components that we use

- `ReactContent` - a React component used for projecting `<ng-content>` inside React components.
- `ReactTemplate` - a React component used for projecting `<ng-template>`/`TemplateRef` inside React components.
- `Disguise` - a React components used when a React component has a strict parent-child relationship (e.g. checking the type of `children` in the parent component). See [caveats](FILL-IN-PLACEHOLDER) for more info on use-cases.


