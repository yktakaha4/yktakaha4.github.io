import { zennUserName } from '@/constants';
import { fetchArticles, storeArticles } from '@/services/sns/zenn';

export const fetchZennArticles = async () => {
  const articles = await fetchArticles(zennUserName);
  await storeArticles(articles);
};

if (require.main === module) {
  fetchZennArticles().then().catch();
}
