import { module, test } from 'qunit';
import { setupRenderingTest } from 'ember-qunit';
import { render } from '@ember/test-helpers';
import hbs from 'htmlbars-inline-precompile';

module('Integration | Component | line-graph', function(hooks) {
  setupRenderingTest(hooks);

  test('it renders', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('points', [1, 2, 3, 10, 2]);
    await render(hbs`{{line-graph points=points}}`);

    assert.dom(this.element).hasText('');
  });

  test('it renders with equal values', async function(assert) {
    // Set any properties with this.set('myProperty', 'value');
    // Handle any actions with this.set('myAction', function(val) { ... });
    this.set('points', [2, 2, 2, 2]);
    await render(hbs`{{line-graph points=points}}`);

    assert.dom(this.element).hasText('');
  });
});
