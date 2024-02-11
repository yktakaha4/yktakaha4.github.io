import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
export type CustomFields = {
  buildAt: string;
  commitHash: string;
  isDevelopment: boolean;
  isProduction: boolean;
  withEmbeddedContent: boolean;
};

export const getCustomFields = (): CustomFields => {
  const {
    siteConfig: { customFields },
  } = useDocusaurusContext();
  if (customFields) {
    return customFields as CustomFields;
  }
  throw new Error('customFields is not defined');
};
