import {
  getOSSContributions,
  storeOSSContributions,
} from '@/services/ossContributions';
import { getTechArticles, storeTechArticles } from '@/services/techArticles';
import { logger } from '@/services/logging';

export const buildComponentsData = async () => {
  logger.info('start');
  const contributions = getOSSContributions();
  logger.info('contributions', { count: contributions.length });
  const articles = getTechArticles();
  logger.info('articles', { count: articles.length });

  await storeOSSContributions(contributions);
  await storeTechArticles(articles);
  logger.info('end');
};

if (require.main === module) {
  buildComponentsData().catch((e) => {
    logger.error(e);
    throw e;
  });
}
