import path from 'dummy/utils/path';
import { module, test } from 'qunit';

module('Unit | Utility | path', function() {
  test('it works', function(assert) {
    let result = path({
      points: [10, 20, 30],
      type: 'line'
    });
    assert.equal(result, 'M 10,65 L 150 37.5 L 290 10', 'Path has to be constructed properly.');
  });
});
