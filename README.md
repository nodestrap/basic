# &lt;Basic /&gt;
A basic building block with standard stylesheet of nodestrap components.  
This is a themed generic element for the base of Nodestrap components.

## Preview

```jsx
<Basic tag='span' theme='primary' size='lg' gradient={true} outlined={true} >
    hello world
</Basic>
```
Rendered to:
```html
<span class="c1 thPrimary szLg gradient outlined">
    hello world
</span>
```

## Features
* Includes all features in [`<Element />`](https://www.npmjs.com/package/@nodestrap/element).
* 3 size variants: small (sm), normal (unset), large (lg).
* Themeable (default themes are: primary, secondary, success, info, warning, danger, dark & light).
* Normal mode (background color as theme color and contrast text color).
* Gradient mode (semi 3D view).
* Outlined mode (transparent view with contrast borders).
* Mild mode (smooth background color near to page's background and strong text color).
* Nice borders, border radius and paddings (based on it's size, theme and mode).
* Dynamic theming. All theming stuff based on `css variables`, no compilation required after modification.
* Theming is customizable & shared to another Nodestrap based components (via `css variables`).
* Written with TypeScript (superset of JavaScript) & compiled to ES6 module.
* IntelliSense supported.

## Installation

Using npm:
```
npm i @nodestrap/basic
```

## Support Us

If you feel our lib is useful for your projects,  
please make a donation to avoid our project from extinction.

We always maintain our projects as long as we're still alive.

[[Make a donation](https://ko-fi.com/heymarco)]
