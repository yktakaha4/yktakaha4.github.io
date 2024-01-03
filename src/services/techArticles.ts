import zennArticles from '@/services/sns/data/zennArticles.json'
import qiitaItems from '@/services/sns/data/qiitaItems.json'
import {TechArticle} from "@/components/TechArticles";
import dayjs from "dayjs";
import {othersArticles} from "@/services/sns/others";

export type TechArticleSortOrder = 'publishedAt desc' | 'likes desc, publishedAt desc'

export const getTechArticles = () => {
    const zennBaseURL = 'https://zenn.dev'

    const techArticles: Array<TechArticle> = zennArticles.articles.map(({ title, path, published_at, liked_count  }): TechArticle => {
        return {
            title,
            url: `${zennBaseURL}/${path}`,
            publishedAt: dayjs(published_at).toDate(),
            likes: liked_count,
            publisher: 'zenn',
            tags: [],
        }
    }).concat(qiitaItems.items.map(({ title, url, created_at, likes_count, tags }):TechArticle => {
        return {
            title,
            url,
            publishedAt: new Date(created_at),
            likes: likes_count,
            publisher: 'qiita',
            tags: tags.map(({ name }) => name)
        }
    })).concat(othersArticles)

    return sortTechArticles(techArticles, 'publishedAt desc')
}

export const sortTechArticles = (techArticles: Array<TechArticle>, order: TechArticleSortOrder) => {
    if (order === 'likes desc, publishedAt desc') {
        return [...techArticles].sort((a, b) => {
            if (a.likes === b.likes) {
                return b.publishedAt.getTime() - a.publishedAt.getTime()
            } else {
                return (b.likes || 0) - (a.likes || 0)
            }
        })
    } else {
        return [...techArticles].sort((a, b) => {
            return b.publishedAt.getTime() - a.publishedAt.getTime()
        })
    }
}
