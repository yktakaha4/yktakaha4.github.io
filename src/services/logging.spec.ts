import { singleLine } from '@/services/logging';

describe('singleLine', () => {
  test('単一行に変換される', () => {
    const func = () => {};
    const logEvent = {
      data: [
        'test message',
        { key: 'value', func },
        [1, 2, 3],
        null,
        undefined,
      ],
    };
    const result = singleLine(logEvent);
    expect(result).toBe(
      "test message { key: 'value', func: [Function: func] } [ 1, 2, 3 ] null undefined",
    );
  });
});
