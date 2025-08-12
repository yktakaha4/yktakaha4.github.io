import {
  fetchArticles,
  fetchTopics,
  storeArticles,
  storeTopics,
} from '@/services/sns/zenn';
import { tempDir } from '@/test/helper';
import { existsSync, readJsonSync } from 'fs-extra';
import nock from 'nock';
import zennApiGetArticleResponse from '@/services/sns/mocks/zennApiGetArticleResponse.json';
import zennApiGetArticlesResponse from '@/services/sns/mocks/zennApiGetArticlesResponse.json';
import * as constants from '@/constants';
import { vi } from 'vitest';

const mockedGetSNSDataPath = vi.fn();
vi
  .spyOn(constants, 'getSNSDataPath')
  .mockImplementation((...args) => mockedGetSNSDataPath(...args));

describe('fetchTopics', () => {
  const alreadySavedSlug = 'already_saved_slug';
  const notFoundSlug = 'not_found_slug';
  const newSlug = 'new_slug';
  const errorSlug = 'error_slug';

  beforeEach(() => {
    nock.cleanAll();
    nock('https://zenn.dev')
      .get(`/api/articles/${alreadySavedSlug}`)
      .reply(200, zennApiGetArticleResponse)
      .get(`/api/articles/${newSlug}`)
      .reply(200, zennApiGetArticleResponse)
      .get(`/api/articles/${notFoundSlug}`)
      .reply(404)
      .get(`/api/articles/${errorSlug}`)
      .reply(500);
  });

  test.skip('トピックが差分取得できる', async () => {
    const topics = await fetchTopics(
      {
        articles: [
          {
            slug: alreadySavedSlug,
          },
          {
            slug: notFoundSlug,
          },
          {
            slug: newSlug,
          },
        ],
      },
      {
        topics: [
          {
            slug: alreadySavedSlug,
            topics: ['topic1'],
            published: true,
          },
        ],
      },
      false,
    );

    expect(topics).toEqual([
      {
        slug: alreadySavedSlug,
        topics: ['topic1'],
        published: true,
      },
      {
        slug: newSlug,
        topics: ['Terraform', 'uptimerobot', '監視'],
        published: true,
      },
    ]);
  });

  test.skip('トピックが強制取得できる', async () => {
    const topics = await fetchTopics(
      {
        articles: [
          {
            slug: alreadySavedSlug,
          },
          {
            slug: notFoundSlug,
          },
          {
            slug: newSlug,
          },
        ],
      },
      {
        topics: [
          {
            slug: alreadySavedSlug,
            topics: ['topic1'],
            published: true,
          },
        ],
      },
      true,
    );

    expect(topics).toEqual([
      {
        slug: alreadySavedSlug,
        topics: ['Terraform', 'uptimerobot', '監視'],
        published: true,
      },
      {
        slug: newSlug,
        topics: ['Terraform', 'uptimerobot', '監視'],
        published: true,
      },
    ]);
  });

  test.skip('APIエラーの場合は処理が失敗する', async () => {
    const promise = fetchTopics(
      {
        articles: [
          {
            slug: alreadySavedSlug,
          },
          {
            slug: notFoundSlug,
          },
          {
            slug: errorSlug,
          },
        ],
      },
      {
        topics: [
          {
            slug: alreadySavedSlug,
            topics: ['topic1'],
            published: true,
          },
        ],
      },
      false,
    );

    await expect(promise).rejects.toThrow('Failed to fetch articles');
  });
});

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

  test.skip('記事が取得できる', async () => {
    nock('https://zenn.dev')
      .get('/api/articles')
      .query({
        username: 'yktakaha4',
        order: 'latest',
        page: String(1),
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
