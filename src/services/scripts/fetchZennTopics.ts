import * as process from 'process';
import zennTopics from '@/services/sns/data/zennTopics.json';
import zennArticles from '@/services/sns/data/zennArticles.json';
import { fetchTopics, storeTopics } from '@/services/sns/zenn';
import { logger } from '@/services/logging';

export const fetchZennTopics = async (force?: boolean) => {
  logger.info('start', { force });
  const topics = await fetchTopics(zennArticles, zennTopics, force);
  logger.info('total', { count: topics.length });
  await storeTopics(topics);
  logger.info('end');
};

if (require.main === module) {
  const force = process.argv.includes('--force');
  fetchZennTopics(force).catch((e) => {
    logger.error(e);
    throw e;
  });
}
