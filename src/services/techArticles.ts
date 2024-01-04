import zennArticles from '@/services/sns/data/zennArticles.json';
import zennTopics from '@/services/sns/data/zennTopics.json';
import qiitaItems from '@/services/sns/data/qiitaItems.json';
import { othersArticles } from '@/services/sns/others';
import dayjs from 'dayjs';
import {
  getComponentsDataPath,
  TechArticlePublisher,
  zennBaseURL,
} from '@/constants';
import { writeJson } from 'fs-extra';

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
    .map(({ title, path, published_at, liked_count, slug }): TechArticle => {
      const tags =
        zennTopics.topics.find((topic) => topic.slug === slug)?.topics || [];
      return {
        title,
        url: `${zennBaseURL}/${path}`,
        publishedAt: dayjs(published_at).toDate(),
        likes: liked_count,
        publisher: 'zenn',
        tags,
      };
    })
    .concat(
      qiitaItems.items.map(
        ({ title, url, created_at, likes_count, tags }): TechArticle => {
          return {
            title,
            url,
            publishedAt: new Date(created_at),
            likes: likes_count,
            publisher: 'qiita',
            tags: tags.map(({ name }) => name),
          };
        },
      ),
    )
    .concat(othersArticles);

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
  const dataPath = getComponentsDataPath('techArticles');
  const data = {
    storedAt: dayjs().toISOString(),
    articles,
  };
  await writeJson(dataPath, data, { spaces: 2 });
};
