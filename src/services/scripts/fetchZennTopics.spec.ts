import { fetchZennTopics } from '@/services/scripts/fetchZennTopics';
import * as zenn from '@/services/sns/zenn';
import * as constants from '@/constants';
import { tempDir } from '@/test/helper';
import { readJsonSync } from 'fs-extra';
import { vi } from 'vitest';

const mockedGetSNSDataPath = vi.fn();
vi
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

const mockedFetchTopics = vi.fn();
vi
  .spyOn(zenn, 'fetchTopics')
  .mockImplementation((...args) => mockedFetchTopics(...args));

describe('fetchZennTopics', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetSNSDataPath.mockImplementation((name) => `${dir}/${name}.json`);

    const expectedTopics = [
      {
        slug: 'dummy_topic_1',
      },
      {
        slug: 'dummy_topic_2',
      },
    ];
    mockedFetchTopics.mockImplementation(() => expectedTopics);

    await fetchZennTopics();

    const articles = readJsonSync(`${dir}/zennTopics.json`);
    expect(articles).toEqual({
      topics: expectedTopics,
    });
  });
});
