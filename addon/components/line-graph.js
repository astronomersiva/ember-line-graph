import Component from '@ember/component';
import { computed } from '@ember/object';
import path from '../utils/path';
import layout from '../templates/components/line-graph';

export default Component.extend({
  layout,
  strokeWidth: 2,
  type: 'line',
  minY: undefined,
  maxY: undefined,
  fillOpacity: 1,
  svgWidth: computed('width', function() {
    return this.getWithDefault('width', '100%');
  }),
  svgHeight: computed('height', function() {
    return this.getWithDefault('height', '25%');
  }),
  graphId: computed(function() {
    return `${Math.round(Math.random() * Math.pow(10, 10))}`;
  }),
  gradientColors: computed('colors', function() {
    let colors = this.getWithDefault('colors', ['#0973d8']);
    if (typeof colors === 'string') {
      colors = [colors];
    }

    let { length } = colors;
    let cutoff = length - 1 || 1;
    return colors.map((color, index) => {
      return {
        code: color,
        offset: index/cutoff
      };
    });
  }),
  dataPoints: computed('points', 'type', 'smoothness', function() {
    let {
      type,
      points = [],
      smoothness = 2,
      minY,
      maxY
    } = this.getProperties('points', 'type', 'smoothness', 'minY', 'maxY');

    if (points.length < 2) {
      return;
    }

    smoothness = 0.1 + (smoothness / 100);
    return path({ points, type, smoothness, minY, maxY });
  }),
  style: computed('animation', 'animationDuration', 'animationTimingFunction', function() {
    let {
      graphId,
      animation,
      animationDuration = 2500,
      animationTimingFunction = 'ease-in'
    } = this.getProperties('animation', 'animationDuration', 'animationTimingFunction', 'graphId');
    if (!animation) {
      return;
    }

    return `
      animation: ember-line-animation-${graphId} ${animationDuration}ms ${animationTimingFunction},
      ember-line-animation-cleanup-${graphId} 1ms ${animationDuration}ms
    `
  }),
  didRender() {
    this._super(...arguments);

    this.set('pathLength', this.get('element').getElementsByTagName('path')[0].getTotalLength());
  }
});
