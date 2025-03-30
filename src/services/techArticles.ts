import zennArticles from '@/services/sns/data/zennArticles.json';
import zennTopics from '@/services/sns/data/zennTopics.json';
import qiitaItems from '@/services/sns/data/qiitaItems.json';
import noteContents from '@/services/sns/data/noteContents.json';
import { othersArticles } from '@/services/sns/others';
import dayjs from 'dayjs';
import {
  getComponentsDataPath,
  TechArticlePublisher,
  zennBaseURL,
} from '@/constants';
import { writeJson } from 'fs-extra';
import { logger } from '@/services/logging';

export type TechArticleSortOrder =
  | 'publishedAt desc'
  | 'likes desc, publishedAt desc';

export type TechArticle = {
  publishedAt: Date;
  title: string;
  url: string;
  likes?: number;
  publisher: TechArticlePublisher;
  tags: Array<string>;
};

export const getTechArticles = () => {
  const techArticles: Array<TechArticle> = zennArticles.articles
    .map(({ title, path, published_at, liked_count, slug }: { 
      title: string; 
      path: string; 
      published_at: string; 
      liked_count: number; 
      slug: string 
    }): TechArticle => {
      const tags =
        zennTopics.topics.find((topic: { slug: string }) => topic.slug === slug)?.topics || [];
      return {
        title,
        url: `${zennBaseURL}${path}`,
        publishedAt: dayjs(published_at).toDate(),
        likes: liked_count,
        publisher: 'zenn',
        tags,
      };
    })
    .concat(
      qiitaItems.items.map(
        ({ title, url, created_at, likes_count, tags }: { 
          title: string; 
          url: string; 
          created_at: string; 
          likes_count: number; 
          tags: Array<{ name: string }> 
        }): TechArticle => {
          return {
            title,
            url,
            publishedAt: new Date(created_at),
            likes: likes_count,
            publisher: 'qiita',
            tags: tags.map(({ name }: { name: string }) => name),
          };
        },
      ),
    )
    .concat(
      noteContents.contents.map(
        ({ name, noteUrl, publishAt, likeCount, hashtags }: { 
          name: string; 
          noteUrl: string; 
          publishAt: string; 
          likeCount: number; 
          hashtags: Array<{ hashtag: { name: string } }> 
        }): TechArticle => {
          return {
            title: name,
            url: noteUrl,
            publishedAt: new Date(publishAt),
            likes: likeCount,
            publisher: 'note',
            tags: hashtags.map(({ hashtag }: { hashtag: { name: string } }) => hashtag.name.replace(/^#/, '')),
          };
        },
      ),
    )
    .concat(othersArticles)
    .map((article: TechArticle) => {
      const { url, tags } = article;
      logger.debug('article', { url, tags });
      return article;
    });

  return sortTechArticles(techArticles, 'likes desc, publishedAt desc');
};

export const sortTechArticles = (
  techArticles: Array<TechArticle>,
  order: TechArticleSortOrder,
) => {
  if (order === 'likes desc, publishedAt desc') {
    return [...techArticles].sort((lhs, rhs) => {
      if (lhs.likes === rhs.likes) {
        return rhs.publishedAt.getTime() - lhs.publishedAt.getTime();
      } else {
        return (rhs.likes ?? 0) - (lhs.likes ?? 0);
      }
    });
  } else {
    return [...techArticles].sort((lhs, rhs) => {
      return rhs.publishedAt.getTime() - lhs.publishedAt.getTime();
    });
  }
};

export const storeTechArticles = async (articles: Array<unknown>) => {
  logger.debug('start', { count: articles.length });
  const dataPath = getComponentsDataPath('techArticles');
  const data = {
    articles,
  };
  await writeJson(dataPath, data, { spaces: 2 });
  logger.debug('stored', { dataPath });
};
