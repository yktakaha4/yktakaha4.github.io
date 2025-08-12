import { fetchQiitaItems } from '@/services/scripts/fetchQiitaItems';
import * as constants from '@/constants';
import * as qiita from '@/services/sns/qiita';
import { tempDir } from '@/test/helper';
import { readJsonSync } from 'fs-extra';
import { vi } from 'vitest';

const mockedGetSNSDataPath = vi.fn();
vi
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

const mockedFetchItems = vi.fn();
vi
  .spyOn(qiita, 'fetchItems')
  .mockImplementation((...args) => mockedFetchItems(...args));

describe('fetchQiitaItems', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetSNSDataPath.mockImplementation((name) => `${dir}/${name}.json`);

    const expectedItems = [
      {
        name: 'dummy item 1',
      },
      {
        name: 'dummy item 2',
      },
    ];
    mockedFetchItems.mockImplementation(() => expectedItems);

    await fetchQiitaItems();

    const items = readJsonSync(`${dir}/qiitaItems.json`);
    expect(items).toEqual({
      items: expectedItems,
    });
  });
});
