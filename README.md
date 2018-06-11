ember-line-graph [![Build Status](https://travis-ci.org/astronomersiva/ember-line-graph.svg?branch=master)](https://travis-ci.org/astronomersiva/ember-line-graph)
==============================================================================

ember-line-graph is a tiny(1.74kb gzipped), zero-dependency ember-addon to draw line-charts.

It uses SVGs to create charts so it is scalable and supports animations and gradients.

[Demo](https://astronomersiva.github.io/ember-line-graph/)

Installation
------------------------------------------------------------------------------

```
ember install ember-line-graph
```


Usage
------------------------------------------------------------------------------

```handlebars
{{line-graph
  points=points
  strokeWidth=5
  type="smooth"
  smoothness=10
  colors=colors
  animation=true
  animationDuration=3500
  animationTimingFunction="ease-in"
  width=500
  height=125
  padding=10}}
```

* **points** - an array of values, example - `[1, 10, 45, 3, 4, 6]`.
* **strokeWidth** - width of the SVG path stroke.
* **strokeOpacity** - opacity of the line in the chart. A number between 0 and 1.
* **strokeLinecap** - Specifies the ending style of the line path. One of `butt`, `round` or `square`.
* **strokeDasharray** - Controls the pattern of dashes and gaps used to stroke paths. Refer [MDN Docs](https://developer.mozilla.org/en-US/docs/Web/SVG/Attribute/stroke-dasharray). Not recommended to use this with animation as the animation will first draw a undashed path and the chart will then turn to dashes.
* **type** - `line`(default) or `smooth`.
* **smoothness** - a number between 1 and 10 to determine the curve around the chart's points. Applicable only when `type` is `smooth`.
* **colors** - A color or an array of colors for defining the chart's colors. A color can be any valid CSS color value.
* **animation** - A boolean to specify if the path should be animated from left to right.
* **animationDuration** - A number(in ms) to specify the duration for the animation.
* **animationTimingFunction** - Any valid CSS [animation-timing-function](https://developer.mozilla.org/en-US/docs/Web/CSS/animation-timing-function) for the animation.
* **width** - A number to specify the width of the chart.
* **height** - A number to specify the height of the chart. Optional. Defaults to `width/4`.
* **padding** - A number to specify padding for the chart inside the SVG so that lines are not cut at the edges. Optional.




Contributing
------------------------------------------------------------------------------

### Installation

* `git clone https://github.com/astronomersiva/ember-line-graph`
* `cd ember-line-graph`
* `npm install`

### Linting

* `npm run lint:js`
* `npm run lint:js -- --fix`

### Running tests

* `ember test` – Runs the test suite on the current Ember version
* `ember test --server` – Runs the test suite in "watch mode"
* `ember try:each` – Runs the test suite against multiple Ember versions

### Running the dummy application

* `ember serve`
* Visit the dummy application at [http://localhost:4200](http://localhost:4200).

For more information on using ember-cli, visit [https://ember-cli.com/](https://ember-cli.com/).

### Credits

This addon was inspired by [react-trend](https://github.com/unsplash/react-trend).

Creating this addon would have been impossible if not for these amazing blogs on the math needed to make this work:

* Daniel Pataki - [https://danielpataki.com/svg-chart/](https://danielpataki.com/svg-chart/)
* Francois Romain - [https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74](https://medium.com/@francoisromain/smooth-a-svg-path-with-cubic-bezier-curves-e37b49d46c74)

License
------------------------------------------------------------------------------
MIT © [Sivasubramanyam A](https://sivasubramanyam.me)

This project is licensed under the [MIT License](LICENSE.md).
