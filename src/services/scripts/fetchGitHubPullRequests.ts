import { gitHubLogin } from '@/constants';
import {
  checkGitHubPAT,
  fetchPullRequests,
  storePullRequests,
} from '@/services/sns/gitHub';
import { logger } from '@/services/logging';

export const fetchGitHubPullRequests = async () => {
  logger.info('start');
  await checkGitHubPAT();
  const pullRequests = await fetchPullRequests(gitHubLogin);
  logger.info('total', { count: pullRequests.length });
  await storePullRequests(pullRequests);
  logger.info('end');
};

if (require.main === module) {
  fetchGitHubPullRequests().catch((e) => {
    logger.error(e);
    throw e;
  });
}
