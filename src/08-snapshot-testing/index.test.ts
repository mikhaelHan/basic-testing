import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  test('should generate linked list from values 1', () => {
    const expectedLinkedList = {
      next: {
        next: {
          next: {
            next: null,
            value: null,
          },
          value: 3,
        },
        value: 2,
      },
      value: 1,
    };

    const result = generateLinkedList([1, 2, 3]);
    expect(result).toStrictEqual(expectedLinkedList);
  });

  test('should generate linked list from values 2', () => {
    const linkedList = generateLinkedList([1, 2, 3]);
    expect(linkedList).toMatchSnapshot();
  });
});
