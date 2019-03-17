# Render flow

The render flow of a sample app is described by the below diagram, Fabric is used to demonstrate things, but the same ideas translate over to any other wrapper library:
![render-flow](./render-flow.svg)

- Things in <span style="color:#F9F7ED">brown</span> are app modules and components.
- Things in <span style="color:#EEEEEE">gray</span> are from `office-ui-fabric-react` (or any other React UI library).
- Things in <span style="color:#D5E8D4">green</span> are from `@angular-react/core`.
- Things in <span style="color:#F8CECC">red</span> are from `@angular-react/fabric` (or any other wrapper library).

## The flow

### Initial bootstrap (in general and of each component)

Usually Angular apps' `AppModule` include [`BrowserModule`](https://angular.io/api/platform-browser/BrowserModule). When using `@angular-react`, you replace this with `AngularReactBrowserModule`, which in turn renders **all components in the app**.

When a component is created, Angular creates a renderer (`Renderer2`) for it, using the renderer factory `ɵDomRendererFactory2`. We `extend ɵDomRendererFactory2`, and when `createRenderer(element, type)` is called, we either return a singleton instance of `ReactRenderer`, or delegate the work to `super` - depending on whether the element is a React wrapper one or not, respectively.

### `RenderRenderer`

`ReactRenderer` is an implementation of Angular's `Renderer2`, which for the most part - is just a manager of `ReactNode`s, mostly for adding and removing them from the DOM. The `ReactNode`s themselves handle the React rendering part and interoperability with Angular (or delegate it further down to other stuff).

### `ReactNode`

Finally, a `ReactNode` is what introduces React into Angular-land (all other stuff up until now had nothing to do with the `react` or `react-dom` packages, and would theoretically translate over to other frameworks like Vue etc.).

A `ReactNode` is a logical representation of everything needed to render a React element in the DOM, and includes two key components:

1. `type` - the type of React element to render. Either a `React.ReactType` or a `string`.
2. `domElement` - the DOM element to render to.

Furthermore, it also includes methods to update its underlying React element, these include (but not limited to):

- `setProperties` - pass down `props` to the React element.
- `addChild` - to add another `ReactNode` as a child of this one.
- `render` - trigger a render of the node.
  - Calls `ReactDOM.render()` under the hood, so think of this like React's `render`, without the VDOM abstraction. This does indeed mean calling this method is costly, as you may expect.
- `destroyNode` - trigger `ReactDOM.unmountComponentAtNode()` on the node.
