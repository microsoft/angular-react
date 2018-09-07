# Change Log

All notable changes to this project will be documented in this file.
See [Conventional Commits](https://conventionalcommits.org) for commit guidelines.

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
