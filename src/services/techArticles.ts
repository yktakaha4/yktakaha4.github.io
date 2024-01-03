import zennArticles from '@/services/sns/data/zennArticles.json'
import {TechArticle} from "@/components/TechArticles";
import dayjs from "dayjs";

export type TechArticleSortOrder = 'publishedAt desc' | 'likes desc, publishedAt desc'

export const getTechArticles = () => {
    const zennBaseURL = 'https://zenn.dev'

    const techArticles: Array<TechArticle> = zennArticles.articles.map(({ title, path, published_at, liked_count  }) => {
        return {
            title,
            url: `${zennBaseURL}/${path}`,
            publishedAt: dayjs(published_at).toDate(),
            likes: liked_count,
            publisher: 'zenn',
            tags: [],
        }
    })

    return sortTechArticles(techArticles, 'publishedAt desc')
}

export const sortTechArticles = (techArticles: Array<TechArticle>, order: TechArticleSortOrder) => {
    if (order === 'likes desc, publishedAt desc') {
        return [...techArticles].sort((a, b) => {
            if (a.likes === b.likes) {
                return b.publishedAt.getTime() - a.publishedAt.getTime()
            } else {
                return b.likes - a.likes
            }
        })
    } else {
        return [...techArticles].sort((a, b) => {
            return b.publishedAt.getTime() - a.publishedAt.getTime()
        })
    }
}
