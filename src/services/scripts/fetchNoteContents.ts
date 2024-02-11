import { logger } from '@/services/logging';
import { fetchContents, storeContents } from '@/services/sns/note';

export const fetchNoteContents = async () => {
  logger.info('start');
  const contents = await fetchContents('yktakaha4');
  logger.info('total', { count: contents.length });
  await storeContents(contents);
  logger.info('end');
};

if (require.main === module) {
  fetchNoteContents().catch((e) => {
    logger.error(e);
    throw e;
  });
}
