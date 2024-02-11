import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should add two numbers', () => {
    const rawInput = { a: 8, b: 9, action: Action.Add };
    expect(simpleCalculator(rawInput)).toBe(17);
  });

  test('should subtract two numbers', () => {
    const rawInput = { a: 9, b: 6, action: Action.Subtract };
    expect(simpleCalculator(rawInput)).toBe(3);
  });

  test('should multiply two numbers', () => {
    const rawInput = { a: 2, b: 3, action: Action.Multiply };
    expect(simpleCalculator(rawInput)).toBe(6);
  });

  test('should divide two numbers', () => {
    const rawInput = { a: 12, b: 3, action: Action.Divide };
    expect(simpleCalculator(rawInput)).toBe(4);
  });

  test('should exponentiate two numbers', () => {
    const rawInput = { a: 3, b: 4, action: Action.Exponentiate };
    expect(simpleCalculator(rawInput)).toBe(81);
  });

  test('should return null for invalid action', () => {
    const rawInput = { a: 3, b: 4, action: null };
    expect(simpleCalculator(rawInput)).toBeNull();
  });

  test('should return null for invalid arguments', () => {
    const rawInput = { a: 3, b: null, action: Action.Exponentiate };
    expect(simpleCalculator(rawInput)).toBeNull();
  });
});
