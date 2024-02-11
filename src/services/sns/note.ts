import { logger } from '@/services/logging';
import { getSNSDataPath } from '@/constants';
import { writeJson } from 'fs-extra';

type NoteApiGetContentsResponse = {
  data: {
    contents: Array<Record<string, unknown>>;
    isLastPage: boolean;
    totalCount: number;
  };
};

export const fetchContents = async (urlName: string) => {
  logger.debug('start', { urlName });
  if (!urlName) {
    throw new Error('urlName is not specified');
  }

  const baseUri = `https://note.com/api/v2/creators/${urlName}/contents`;
  const params = new URLSearchParams({
    kind: 'note',
    page: '1',
  });

  logger.debug('fetch', { baseUri, params });
  const response = await fetch(`${baseUri}?${params.toString()}`);
  logger.debug('fetched', { response });
  if (!response.ok) {
    throw new Error('Failed to fetch items');
  }

  const getContentsResponse: NoteApiGetContentsResponse = await response.json();
  const { contents, isLastPage, totalCount } = getContentsResponse.data;
  logger.debug('fetched', { isLastPage, totalCount });
  if (!isLastPage) {
    throw new Error(
      `Pagination is not implemented: totalCount=${totalCount}, isLastPage=${isLastPage}`,
    );
  }

  return contents;
};

export const storeContents = async (contents: Array<unknown>) => {
  logger.debug('start', { count: contents.length });
  const dataPath = getSNSDataPath('noteContents');
  const data = {
    contents,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};
