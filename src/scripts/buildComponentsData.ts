import {
  getOSSContributions,
  storeOSSContributions,
} from '@/services/ossContributions';
import { getTechArticles, storeTechArticles } from '@/services/techArticles';

export const buildComponentsData = async () => {
  const contributions = getOSSContributions();
  const articles = getTechArticles();

  await storeOSSContributions(contributions);
  await storeTechArticles(articles);
};

if (require.main === module) {
  buildComponentsData().then().catch();
}
