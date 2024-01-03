import {writeJson} from "fs-extra";
import {getSNSDataPath} from "@/constants";
import dayjs from "dayjs";

export type ZennApiGetArticlesResponse = {
    articles: Array<unknown>
    next_page: number | null
}

export const fetchArticles = async (userName: string) => {
    if (!userName) {
        throw new Error('userName is not specified')
    }

    const params = new URLSearchParams({
        username: userName,
        order: 'latest',
    });

    const response = await fetch(`https://zenn.dev/api/articles?${params.toString()}`);
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
