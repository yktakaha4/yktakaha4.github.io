import { checkGitHubPAT } from '@/services/sns/gitHub';
import { logger } from '@/services/logging';

export const checkPreconditions = async () => {
  logger.info('start');
  await checkGitHubPAT();
  logger.info('end');
};

if (require.main === module) {
  checkPreconditions().catch((e) => {
    logger.error(e);
    throw e;
  });
}
