import { DocusaurusContext } from '@docusaurus/types';
import dayjs from 'dayjs';
import { CustomFields } from '@/components/helper';

const useDocusaurusContext = (): DocusaurusContext => {
  const customFields: CustomFields = {
    buildAt: dayjs().format(),
    commitHash: 'dummy_commit_hash',
    isDevelopment: true,
    isProduction: false,
    withEmbeddedContent: false,
  };

  return {
    siteConfig: {
      customFields: customFields as Record<string, unknown>,
    },
  } as DocusaurusContext;
};

export default useDocusaurusContext;
