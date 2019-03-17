# Component hierarchy

The component hierarchy in a typical app is described by the below diagram, Fabric is used to demonstrate things, but the same ideas translate over to any other wrapper library:
![component-hierarchy](./component-hierarchy.svg)

- Things in <span style="color:#F8CECC">red</span> are Angular components (`@Component`).
  - Surrounded by their respective `NgModule`s.
- Things in <span style="color:#DAE8FC">blue</span> are React components (in any form - either class or functional).

This is a pretty small app, but the same idea holds true for larger apps with dozens of `NgModule`s.

> Note that you can also create a `FabricModule` in your app and `import` + `export` all `Fab*Module`s there, similarly to other UI libraries. There are pros and cons to each approach, so choose what works best for your use-case.
