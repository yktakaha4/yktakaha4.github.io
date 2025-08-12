import nock from 'nock';
import qiitaApiGetItemsResponse from '@/services/sns/mocks/qiitaApiGetItemsResponse.json';
import { fetchItems, storeItems } from '@/services/sns/qiita';
import { tempDir } from '@/test/helper';
import { existsSync, readJsonSync } from 'fs-extra';
import * as constants from '@/constants';

const mockedGetSNSDataPath = jest.fn();
jest
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

describe('fetchItems', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  test('記事が取得できる', async () => {
    nock('https://qiita.com')
      .get('/api/v2/items')
      .query({
        query: `user:yktakaha4`,
        per_page: '100',
      })
      .reply(200, qiitaApiGetItemsResponse, {
        'total-count': '2',
      });

    const articles = await fetchItems('yktakaha4');

    expect(articles.length).toBe(2);
    expect(articles[0].title).toBe(
      'Serverless FrameworkでLambdaコンテナイメージを利用する',
    );
  });
});

describe('storeItems', () => {
  test('記事が保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath);

    const items = [
      {
        dummy: 'dummy',
      },
    ];
    await storeItems(items);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual({
      items,
    });
  });
});
