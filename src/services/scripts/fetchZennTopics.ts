import { getZennContentArticlesDirectoryPath } from '@/constants';
import { scrapeTopics, storeTopics } from '@/services/sns/zenn';
import { logger } from '@/services/logging';

export const fetchZennTopics = async () => {
  logger.info('start');
  const directoryPath = getZennContentArticlesDirectoryPath();
  try {
    const topics = await scrapeTopics(directoryPath);
    logger.info('total', { count: topics.length });

    await storeTopics(topics);
  } catch (e) {
    if (e instanceof Error && e.message.startsWith('Directory not found:')) {
      logger.warn(e.message);
    } else {
      throw e;
    }
  }
  logger.info('end');
};

if (require.main === module) {
  fetchZennTopics().catch((e) => {
    logger.error(e);
    throw e;
  });
}
