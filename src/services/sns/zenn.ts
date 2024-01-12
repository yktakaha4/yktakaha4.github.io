import { existsSync, readdirSync, writeJson } from 'fs-extra';
import { getSNSDataPath } from '@/constants';
import { read } from 'gray-matter';
import { logger } from '@/services/logging';

type ZennApiGetArticlesResponse = {
  articles: Array<Record<string, unknown>>;
  next_page: number | null;
};

export const scrapeTopics = async (articlesDirectoryPath: string) => {
  logger.debug('start', { articlesDirectoryPath });
  if (!existsSync(articlesDirectoryPath)) {
    throw new Error(`Directory not found: ${articlesDirectoryPath}`);
  }

  const articleFileNames = readdirSync(articlesDirectoryPath).filter(
    (fileName) => fileName.endsWith('.md'),
  );

  return articleFileNames
    .map((articleFileName) => {
      const { data } = read(`${articlesDirectoryPath}/${articleFileName}`);

      const slug = articleFileName.replace(/\.md$/, '');
      const topics = Array.isArray(data.topics) ? data.topics.map(String) : [];
      const published = !!data.published;

      return {
        slug,
        topics,
        published,
      };
    })
    .filter(({ topics, published }) => topics.length > 0 && published)
    .map((value) => {
      logger.debug('found', value);
      return value;
    });
};

export const storeTopics = async (topics: Array<unknown>) => {
  logger.debug('start', { count: topics.length });
  const dataPath = getSNSDataPath('zennTopics');
  const data = {
    topics,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};

export const fetchArticles = async (userName: string) => {
  logger.debug('start', { userName });
  if (!userName) {
    throw new Error('userName is not specified');
  }

  const baseUri = 'https://zenn.dev/api/articles';
  const params = new URLSearchParams({
    username: userName,
    order: 'latest',
  });

  logger.debug('fetch', { baseUri, params });
  const response = await fetch(`${baseUri}?${params.toString()}`);
  logger.debug('fetched', { response });
  if (!response.ok) {
    throw new Error('Failed to fetch articles');
  }

  const getArticlesResponse: ZennApiGetArticlesResponse = await response.json();
  const nextPage = getArticlesResponse.next_page;
  logger.debug('fetched', { nextPage });
  if (nextPage) {
    throw new Error('Pagination is not implemented');
  }

  return getArticlesResponse.articles;
};

export const storeArticles = async (articles: Array<unknown>) => {
  logger.debug('start', { count: articles.length });
  const dataPath = getSNSDataPath('zennArticles');
  const data = {
    articles,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};
