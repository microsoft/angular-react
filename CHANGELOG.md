# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

<a name="0.4.6"></a>

# [0.4.6](https://github.com/Microsoft/angular-react/compare/v0.4.5...v0.4.6) (2018-10-21)

### Bug fixes

- **core:** Content class and contentStyle refactor and enhancements ([#27](https://github.com/Microsoft/angular-react/pull/27)) ([04f537d](https://github.com/Microsoft/angular-react/commit/04f537d432370c0da4f9afa91b8b4172a8c6df3d))
- **core:** Fix ng-templates rendered as render props not updating when internal bindings change ([#28](https://github.com/Microsoft/angular-react/pull/28)) ([626e9b8](https://github.com/Microsoft/angular-react/commit/626e9b8d7c84f049862cf6b26d9c1a8c334e732c))

- **fabric:** Fix `ICommandBarItemOptions` type (again) ([#23](https://github.com/Microsoft/angular-react/pull/23)) ([0561e92](https://github.com/Microsoft/angular-react/commit/0561e921fb5c4bf40da9fd252973f87249da97fc))
- **fabric:** Fix change detection on items change in command bar when using declarative syntax ([#26](https://github.com/Microsoft/angular-react/pull/26)) ([c1097d3](https://github.com/Microsoft/angular-react/commit/c1097d379017b310495935011899ea640d4d6d4e))

<a name="0.4.5"></a>

# [0.4.5](https://github.com/Microsoft/angular-react/compare/v0.4.4...v0.4.5) (2018-10-16)

### Bug fixes

- **fabric:** Fix wrong intellisense for `ICommandBarItem` ([#21](https://github.com/Microsoft/angular-react/pull/21)) ([ed15a3c](https://github.com/Microsoft/angular-react/commit/ed15a3c2bfbeb28b8b2def33b1098ac5b13c42fe))

<a name="0.4.4"></a>

# [0.4.4](https://github.com/Microsoft/angular-react/compare/v0.4.3...v0.4.4) (2018-10-02)

### Breaking changes

- **fabric:** Fix 'toggled'->'toggle' @Input typo in base-button ([#19](https://github.com/Microsoft/angular-react/pull/19)) ([cbd1f82](https://github.com/Microsoft/angular-react/commit/cbd1f82))

<a name="0.4.3"></a>

# [0.4.3](https://github.com/Microsoft/angular-react/compare/v0.4.2...v0.4.3) (2018-09-27)

### Breaking changes

- **fabric:** Upgrade office-ui-fabric-react to 6.73.0 ([#16](https://github.com/Microsoft/angular-react/issues/16)) ([98fa9f7](https://github.com/Microsoft/angular-react/commit/98fa9f7))

<a name="0.4.2"></a>

# [0.4.2](https://github.com/Microsoft/angular-react/compare/v0.4.1...v0.4.2) (2018-09-07)

### Bug Fixes

- **core:** Fix tree shaking removing code needed for handling `ng-content` in production builds ([#13](https://github.com/Microsoft/angular-react/issues/13)) ([5c15bd2](https://github.com/Microsoft/angular-react/commit/5c15bd2))

<a name="0.4.1"></a>

# [0.4.1](https://github.com/Microsoft/angular-react/compare/v0.4.0...v0.4.1) (2018-08-28)

### Bug Fixes

- **core:** Fix React nodes being removed from DOM when they are still needed ([#7](https://github.com/Microsoft/angular-react/issues/7)) ([184844](https://github.com/Microsoft/angular-react/commit/184844))
- **fabric:** Workaround for components using plain CSS under the hood to not load the style when tree-shaken (using `ng build --prod`) ([#8](https://github.com/Microsoft/angular-react/issues/8)) ([c4e521](https://github.com/Microsoft/angular-react/commit/c4e521))

<a name="0.4.0"></a>

# [0.4.0](https://github.com/Microsoft/angular-react/compare/03ca764...v0.4.0) (2018-08-16)

Initial public release...

### Bug Fixes

- **core:** React-wrapped components inside inside ng-template don't re-render on changes ([#5](https://github.com/Microsoft/angular-react/issues/5)) ([299e4b4](https://github.com/Microsoft/angular-react/commit/299e4b4))

### Features

- **command-bar:** add contrast and luminosity utilities ([#3](https://github.com/Microsoft/angular-react/issues/3)) ([6f002f9](https://github.com/Microsoft/angular-react/commit/6f002f9))

### BREAKING CHANGES

- **n/a**

<a name="<0.4.0"></a>

# < 0.4.0

### Features

- **core:** original core and fabric libraries including docs ([03ca764](https://github.com/Microsoft/angular-react/commit/03ca764))
