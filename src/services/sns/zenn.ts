import { writeJson } from 'fs-extra';
import { getSNSDataPath } from '@/constants';
import { logger } from '@/services/logging';

const baseUri = 'https://zenn.dev/api/articles';

type ZennApiGetArticlesResponse = {
  articles: Array<Record<string, unknown>>;
  next_page: number | null;
};

type ZennApiGetArticleResponse = {
  article: {
    topics: Array<{
      display_name: string;
    }>;
    status: string;
  };
};

export const fetchTopics = async (
  { articles }: { articles: Array<{ slug: string }> },
  {
    topics,
  }: {
    topics: Array<{ slug: string; topics: Array<string>; published: boolean }>;
  },
  force?: boolean,
) => {
  const sleepTime = 1500;
  let sleepTimer: Promise<void> | null = null;

  logger.debug('start', { count: articles.length, force });
  const newTopics: typeof topics = [];
  for (const { slug } of articles) {
    const topic = topics.find((topic) => topic.slug === slug);
    if (topic && !force) {
      logger.debug('found', { slug });
      newTopics.push(topic);
      continue;
    }

    if (sleepTimer) {
      logger.debug('sleep', { sleepTime });
      await sleepTimer;
    }

    logger.debug('fetch', { baseUri, slug });
    const response = await fetch(`${baseUri}/${slug}`);
    logger.debug('fetched', { response });
    if (!response.ok) {
      if (response.status === 404) {
        logger.debug('not found', { slug, status: response.status });
        continue;
      }
      throw new Error('Failed to fetch articles');
    }

    sleepTimer = new Promise((resolve) => setTimeout(resolve, sleepTime));

    const { article }: ZennApiGetArticleResponse = await response.json();

    const articleTopics = article.topics
      .map((topic) => topic.display_name)
      .filter((topic) => !!topic);
    articleTopics.sort((lhs, rhs) => lhs.localeCompare(rhs));

    const published = article.status === 'published';
    if (!published) {
      logger.debug('not published', { slug });
      continue;
    }

    logger.debug('new topic', { slug, articleTopics, published });
    newTopics.push({
      slug,
      topics: articleTopics,
      published,
    });
  }

  newTopics.sort((lhs, rhs) => lhs.slug.localeCompare(rhs.slug));

  logger.debug('end');
  return newTopics as Array<unknown>;
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
