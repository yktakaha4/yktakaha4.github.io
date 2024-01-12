import { qiitaUserName } from '@/constants';
import { fetchItems, storeItems } from '@/services/sns/qiita';
import { logger } from '@/services/logging';

export const fetchQiitaItems = async () => {
  logger.info('start');
  const items = await fetchItems(qiitaUserName);
  logger.info('total', { count: items.length });
  await storeItems(items);
  logger.info('end');
};

if (require.main === module) {
  fetchQiitaItems().catch((e) => {
    logger.error(e);
    throw e;
  });
}
