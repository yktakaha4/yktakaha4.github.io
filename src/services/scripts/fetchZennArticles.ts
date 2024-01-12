import { zennUserName } from '@/constants';
import { fetchArticles, storeArticles } from '@/services/sns/zenn';
import { logger } from '@/services/logging';

export const fetchZennArticles = async () => {
  logger.info('start');
  const articles = await fetchArticles(zennUserName);
  logger.info('total', { count: articles.length });
  await storeArticles(articles);
  logger.info('end');
};

if (require.main === module) {
  fetchZennArticles().catch((e) => {
    logger.error(e);
    throw e;
  });
}
