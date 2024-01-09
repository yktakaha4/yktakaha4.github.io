import { DocusaurusContext } from '@docusaurus/types';
import dayjs from 'dayjs';

const useDocusaurusContext = (): DocusaurusContext => {
  return {
    siteConfig: {
      customFields: {
        buildAt: dayjs().format(),
        commitHash: 'dummy_commit_hash',
      } as Record<string, unknown>,
    },
  } as DocusaurusContext;
};

export default useDocusaurusContext;
