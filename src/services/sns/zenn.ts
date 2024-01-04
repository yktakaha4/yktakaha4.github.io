import {existsSync, readdirSync, writeJson} from "fs-extra";
import {getSNSDataPath} from "@/constants";
import dayjs from "dayjs";
import { read } from 'gray-matter';


type ZennApiGetArticlesResponse = {
    articles: Array<Record<string, unknown>>
    next_page: number | null
}

export const scrapeTopics = async (articlesDirectoryPath: string) => {
    if (!existsSync(articlesDirectoryPath)) {
        throw new Error(`Directory not found: ${articlesDirectoryPath}`)
    }

    const articleFileNames = readdirSync(articlesDirectoryPath)
        .filter(fileName => fileName.endsWith('.md'))

    return articleFileNames.map(articleFileName => {
        const { data } = read(`${articlesDirectoryPath}/${articleFileName}`)

        const slug = articleFileName.replace(/\.md$/, '')
        const topics = Array.isArray(data.topics) ? data.topics.map(String) : []
        const published = !!data.published

        return {
            slug,
            topics,
            published,
        }
    }).filter(({topics, published}) => topics.length > 0 && published)
}

export const storeTopics = async (topics: Array<unknown>) => {
    const dataPath = getSNSDataPath('zennTopics')
    const data = {
        fetchedAt: dayjs().toISOString(),
        topics,
    }
    await writeJson(dataPath, data, {spaces: 2})
}

export const fetchArticles = async (userName: string) => {
    if (!userName) {
        throw new Error('userName is not specified')
    }

    const baseUri = 'https://zenn.dev/api/articles'
    const params = new URLSearchParams({
        username: userName,
        order: 'latest',
    });

    const response = await fetch(`${baseUri}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch articles');
    }

    const getArticlesResponse: ZennApiGetArticlesResponse = await response.json();
    if (getArticlesResponse.next_page) {
        throw new Error('Pagination is not implemented');
    }

    return getArticlesResponse.articles;
}

export const storeArticles = async (articles: Array<unknown>) => {
    const dataPath = getSNSDataPath('zennArticles')
    const data = {
        fetchedAt: dayjs().toISOString(),
        articles,
    }
    await writeJson(dataPath, data, {spaces: 2})
}
