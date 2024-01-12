import { getZennContentArticlesDirectoryPath } from '@/constants';
import { scrapeTopics, storeTopics } from '@/services/sns/zenn';
import { logger } from '@/services/logging';

export const fetchZennTopics = async () => {
  logger.info('start');
  const directoryPath = getZennContentArticlesDirectoryPath();
  const topics = await scrapeTopics(directoryPath);
  logger.info('total', { count: topics.length });
  await storeTopics(topics);
  logger.info('end');
};

if (require.main === module) {
  fetchZennTopics().catch((e) => {
    logger.error(e);
    throw e;
  });
}
