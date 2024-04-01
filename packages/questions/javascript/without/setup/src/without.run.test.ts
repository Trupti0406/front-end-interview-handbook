import without from './without';

describe('without', () => {
  test('empty input array', () => {
    expect(without([], 1, 2, 3)).toEqual([]);
  });

  test('values array is empty', () => {
    expect(without([1, 2, 3])).toEqual([1, 2, 3]);
  });

  test('unique values that are present in array but not in values', () => {
    expect(without([1, 2, 3], 2, 3, 4)).toEqual([1]);
  });

  test('all values in array are present in values', () => {
    expect(without([1, 2, 3], 1, 2, 3)).toEqual([]);
  });
});
