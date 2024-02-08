import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 8, b: 9, action: Action.Add, expected: 17 },
  { a: 9, b: 6, action: Action.Subtract, expected: 3 },
  { a: 2, b: 3, action: Action.Multiply, expected: 6 },
  { a: 12, b: 3, action: Action.Divide, expected: 4 },
  { a: 3, b: 4, action: Action.Exponentiate, expected: 81 },
  { a: 3, b: 4, action: null, expected: null },
  { a: 3, b: null, action: Action.Exponentiate, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)(
    'should return correct result for every "testCases.expected"',
    ({ a, b, action, expected }) => {
      const rawInput = { a, b, action };
      expect(simpleCalculator(rawInput)).toBe(expected);
    },
  );
});
