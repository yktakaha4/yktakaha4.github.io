import {getZennContentArticlesDirectoryPath} from "@/constants";
import {scrapeTopics, storeTopics} from "@/services/sns/zenn";

export const fetchZennTopics = async () => {
    const directoryPath = getZennContentArticlesDirectoryPath()
    const topics = await scrapeTopics(directoryPath)
    await storeTopics(topics)
}

if (require.main === module) {
    fetchZennTopics().then().catch()
}
