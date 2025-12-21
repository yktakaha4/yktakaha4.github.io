import { speakerDeckUserName } from '@/constants';
import { fetchSlides, storeSlides } from '@/services/sns/speakerDeck';
import { logger } from '@/services/logging';

export const fetchSpeakerDeckSlides = async () => {
  logger.info('start');
  const slides = await fetchSlides(speakerDeckUserName);
  logger.info('total', { count: slides.length });
  await storeSlides(speakerDeckUserName, slides);
  logger.info('end');
};

if (require.main === module) {
  fetchSpeakerDeckSlides().catch((e) => {
    logger.error(e);
    throw e;
  });
}
