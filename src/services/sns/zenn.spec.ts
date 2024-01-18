import { fetchArticles, storeArticles, storeTopics } from '@/services/sns/zenn';
import { tempDir } from '@/jest/helper';
import { existsSync, readJsonSync } from 'fs-extra';
import nock from 'nock';
import zennApiGetArticlesResponse from '@/services/sns/mocks/zennApiGetArticlesResponse.json';
import * as constants from '@/constants';

const mockedGetSNSDataPath = jest.fn();
jest
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

describe('storeTopics', () => {
  test('トピックが保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath);

    const topics = [
      {
        dummy: 'dummy',
      },
    ];
    await storeTopics(topics);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual({
      topics,
    });
  });
});

describe('fetchArticles', () => {
  beforeEach(() => {
    nock.cleanAll();
  });

  test('記事が取得できる', async () => {
    nock('https://zenn.dev')
      .get('/api/articles')
      .query({
        username: 'yktakaha4',
        order: 'latest',
      })
      .reply(200, zennApiGetArticlesResponse);

    const articles = await fetchArticles('yktakaha4');

    expect(articles.length).toBe(2);
    expect(articles[0].title).toBe(
      '（SRE的）作ってよかったドキュメント・表・運用',
    );
  });
});

describe('storeArticles', () => {
  test('記事が保存できる', async () => {
    const dir = tempDir();
    const mockedJsonPath = `${dir}/dummy.json`;
    mockedGetSNSDataPath.mockImplementation(() => mockedJsonPath);

    const articles = [
      {
        dummy: 'dummy',
      },
    ];
    await storeArticles(articles);

    expect(existsSync(mockedJsonPath)).toBeTruthy();
    expect(readJsonSync(mockedJsonPath)).toEqual({
      articles,
    });
  });
});
