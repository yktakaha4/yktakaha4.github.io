import { render } from '@testing-library/react';
import { Timestamp } from '@/components/ui/Timestamp';
import dayjs from 'dayjs';
import { vi } from 'vitest';

describe('Timestamp', () => {
  test('更新時刻とコミットハッシュが描画される', () => {
    const mockedDate = dayjs('2021-02-03 12:34:56').toDate();
    vi.spyOn(global, 'Date').mockImplementation(() => mockedDate);

    const { container } = render(<Timestamp />);
    expect(container.textContent).toBe(
      `最終更新日:2021-02-03T12:34:56+09:00Version:dummy_commit_hash`,
    );
  });
});
