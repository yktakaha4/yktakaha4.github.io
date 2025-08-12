import { vi } from 'vitest';

const mockedLog = vi.fn();
vi.spyOn(console, 'log').mockImplementation(mockedLog);

import { logger } from '@/services/logging';

describe('logger', () => {
  // FIXME: モックできなかった
  test.skip('所定の情報が出力される', async () => {
    logger.info('テストメッセージ');

    expect(mockedLog.mock.calls.length).toBe(1);
    expect(mockedLog.mock.calls[0][0]).toContain('INFO');
    expect(mockedLog.mock.calls[0][0]).toContain('logging.spec.ts:8');
    expect(mockedLog.mock.calls[0][0]).toContain('テストメッセージ');
  });
});
