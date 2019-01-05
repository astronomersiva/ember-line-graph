/* eslint-disable ember/avoid-leaking-state-in-ember-objects */

import Controller from '@ember/controller';

export default Controller.extend({
  shouldAnimate: true,
  points: [0, 2, 5, 9, 5, 10, 3, 0, 0, 1, 8, 2, 9, 0],
  colors: [
    '#12C2E9', '#C471ED', '#F64F59'
    // ['#FF512F', '#F09819'],
    // ['#12C2E9', '#C471ED', '#F64F59'],
    // ['#8E2DE2', '#4A00E0'],
    // ['#06BEB6', '#48B1BF']
  ],
  gradient: ['#EB6B9D', '#EE8C68'],
  actions: {
    animate() {
      this.set('shouldAnimate', true);
    }
  }
});
