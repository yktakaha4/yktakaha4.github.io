import {getSNSDataPath} from "@/constants";
import dayjs from "dayjs";
import {writeJson} from "fs-extra";

export type QiitaApiGetItemsResponse = Array<unknown>


export const fetchItems = async (userName: string) => {
    if (!userName) {
        throw new Error('userName is not specified')
    }

    const perPage = 100
    const baseUri = 'https://qiita.com/api/v2/items'
    const params = new URLSearchParams({
        query: `user:${userName}`,
        per_page: `${perPage}`,
    });

    const response = await fetch(`${baseUri}?${params.toString()}`);
    if (!response.ok) {
        throw new Error('Failed to fetch items');
    }

    const getItemsResponse: QiitaApiGetItemsResponse = await response.json();
    const totalCount = Number(response.headers.get('total-count'))
    if (isNaN(totalCount)) {
        throw new Error(`invalid total-count: ${totalCount}`)
    }

    if (totalCount > perPage) {
        throw new Error('Pagination is not implemented');
    }

    return getItemsResponse
}

export const storeItems = async (items: Array<unknown>) => {
    const dataPath = getSNSDataPath('qiitaItems')
    const data = {
        fetchedAt: dayjs().toISOString(),
        items,
    }
    await writeJson(dataPath, data, {spaces: 2})
}
