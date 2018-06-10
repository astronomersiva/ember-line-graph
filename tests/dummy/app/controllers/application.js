import Controller from '@ember/controller';
import { computed } from '@ember/object';

export default Controller.extend({
  shouldAnimate: true,
  points: computed('i', function() {
    let dataPoints = [];
    let n = 10;
    while(n--) {
      dataPoints.push(Math.floor(Math.random() * 50) + 1);
    }

    return dataPoints;
  }),
  colors: computed('i', function() {
    let colorCodes = [
      ['#FF512F', '#F09819'],
      ['#12c2e9', '#c471ed', '#f64f59'],
      ['#8E2DE2', '#4A00E0'],
      ['#06beb6', '#48b1bf']
    ];

    return colorCodes[Math.floor(Math.random() * 4)];
  }),
  gradient: ['#EB6B9D', '#EE8C68'], // eslint-disable-line
  actions: {
    animate() {
      this.set('shouldAnimate', true);
    }
  }
});
