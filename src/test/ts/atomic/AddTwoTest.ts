import { UnitTest, assert } from '@ephox/bedrock';
import { addTwo } from '../../../main/ts/core/AddTwo';

// This is an example of an atomic test, that is a test of some functionality separated from the editor.
UnitTest.test('atomic.AddTwoTest', () => {
  assert.eq(3, addTwo(1), '1 + 2 = 3, hopefully');
});
