import { getSNSDataPath } from '@/constants';
import { writeJson } from 'fs-extra';
import { logger } from '@/services/logging';

type QiitaApiGetItemsResponse = Array<Record<string, unknown>>;

export const fetchItems = async (userName: string) => {
  logger.debug('start', { userName });
  if (!userName) {
    throw new Error('userName is not specified');
  }

  const perPage = 100;
  const baseUri = 'https://qiita.com/api/v2/items';
  const params = new URLSearchParams({
    query: `user:${userName}`,
    per_page: `${perPage}`,
  });

  logger.debug('fetch', { baseUri, params });
  const response = await fetch(`${baseUri}?${params.toString()}`);
  logger.debug('fetched', { response });
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  const getItemsResponse: QiitaApiGetItemsResponse = await response.json();
  const totalCount = response.headers.get('total-count');
  logger.debug('fetched', { totalCount });
  if (!totalCount || !isFinite(Number(totalCount))) {
    throw new Error(`invalid total-count: ${totalCount}`);
  }

  if (Number(totalCount) > perPage) {
    throw new Error('Pagination is not implemented');
  }

  return getItemsResponse;
};

export const storeItems = async (items: Array<unknown>) => {
  logger.debug('start', { count: items.length });
  const dataPath = getSNSDataPath('qiitaItems');
  const data = {
    items,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};
