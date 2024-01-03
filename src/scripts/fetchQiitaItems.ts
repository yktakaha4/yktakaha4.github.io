import {qiitaUserName} from "@/constants";
import {fetchItems, storeItems} from "@/services/sns/qiita";

export const fetchQiitaItems = async () => {
    const items = await fetchItems(qiitaUserName)
    await storeItems(items)
}

if (require.main === module) {
    fetchQiitaItems().then().catch()
}
