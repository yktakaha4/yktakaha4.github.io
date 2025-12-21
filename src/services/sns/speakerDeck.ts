import { logger } from '@/services/logging';
import { getSNSDataPath } from '@/constants';
import { writeJson } from 'fs-extra';
import { XMLParser } from 'fast-xml-parser';
import dayjs from 'dayjs';

type SpeakerDeckRssResponse = {
  rss: {
    title: string;
    description: string;
    link: string;
    lastBuildDate: string;
    channel: {
      item: Array<{
        title: string;
        link: string;
        pubDate: string;
        description: string;
      }>;
    };
  };
};

export const fetchSlides = async (username: string) => {
  logger.debug('start', { username });

  const rssUrl = `https://speakerdeck.com/${username}.rss`;

  logger.debug('fetch', { rssUrl });
  const response = await fetch(rssUrl);
  if (!response.ok) {
    throw new Error(
      `Failed to fetch RSS feed: ${response.status} ${response.statusText}`,
    );
  }

  const rssText = await response.text();
  const parser = new XMLParser();
  const rssResponse: SpeakerDeckRssResponse = parser.parse(rssText);

  const slides = rssResponse.rss.channel.item
    .map((item) => ({
      title: item.title,
      link: item.link,
      pubDate: dayjs(item.pubDate).toDate(),
      description: item.description,
    }))
    .sort((a, b) => b.pubDate.getTime() - a.pubDate.getTime());

  logger.debug('fetched slides', { count: slides.length });

  return slides;
};

export const storeSlides = async (username: string, slides: Array<unknown>) => {
  logger.debug('start', { username, count: slides.length });

  const path = getSNSDataPath('speakerDeckSlides');
  await writeJson(path, slides, { spaces: 2 });

  logger.debug('stored slides', { path });
};
