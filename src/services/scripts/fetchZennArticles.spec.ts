import { fetchZennArticles } from '@/services/scripts/fetchZennArticles';
import * as constants from '@/constants';
import * as zenn from '@/services/sns/zenn';
import { tempDir } from '@/jest/helper';
import { readJsonSync } from 'fs-extra';

const mockedGetSNSDataPath = jest.fn();
jest
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

const mockedFetchArticles = jest.fn();
jest
  .spyOn(zenn, 'fetchArticles')
  .mockImplementation((...args) => mockedFetchArticles(...args));

describe('fetchZennArticles', () => {
  test('正常に動作する', async () => {
    const dir = tempDir();
    mockedGetSNSDataPath.mockImplementation((name) => `${dir}/${name}.json`);

    const expectedArticles = [
      {
        name: 'dummy article 1',
      },
      {
        name: 'dummy article 2',
      },
    ];
    mockedFetchArticles.mockImplementation(() => expectedArticles);

    await fetchZennArticles();

    const articles = readJsonSync(`${dir}/zennArticles.json`);
    expect(articles).toEqual({
      articles: expectedArticles,
    });
  });
});
