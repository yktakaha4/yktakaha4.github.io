import { Icon } from '@/components/ui/Tag';

export type TechArticlePublisher =
  | 'zenn'
  | 'qiita'
  | 'note'
  | 'techBlog'
  | 'speakerDeck'
  | 'others'
  | string;
const techArticlePublisherName: {
  [key in TechArticlePublisher]: string;
} = {
  zenn: 'Zenn',
  qiita: 'Qiita',
  note: 'note',
  techBlog: '技術ブログ',
  speakerDeck: 'SpeakerDeck',
  others: 'その他',
} as const;
export const getTechArticlePublisherName = (publisher: TechArticlePublisher) =>
  techArticlePublisherName[publisher];

export type OSSContributionKind = 'mergedPullRequest' | string;
const ossContributionKindName: {
  [key in OSSContributionKind]: string;
} = {
  mergedPullRequest: 'PRマージ',
} as const;
export const getOSSContributionKindName = (kind: OSSContributionKind) =>
  ossContributionKindName[kind];
export const getOssContributionIcon = (
  kind: OSSContributionKind,
): Icon | null => {
  switch (kind) {
    case 'mergedPullRequest':
      return 'prMerge';
    default:
      return null;
  }
};

const snsDataBasePath = `${__dirname}/services/sns/data`;
export type SNSData =
  | 'gitHubPullRequests'
  | 'zennArticles'
  | 'zennTopics'
  | 'qiitaItems';
export const getSNSDataPath = (snsData: SNSData) =>
  `${snsDataBasePath}/${snsData}.json`;

const componentsDataBasePath = `${__dirname}/components/data`;
export type ComponentsData = 'techArticles' | 'ossContributions';
export const getComponentsDataPath = (componentsData: ComponentsData) =>
  `${componentsDataBasePath}/${componentsData}.json`;

export const getZennContentArticlesDirectoryPath = () =>
  `${__dirname}/../zenn-content/articles`;

export const pagerSize = 3;
export const pagerPerPage = 10;

export const zennUserName = 'yktakaha4';
export const zennBaseURL = 'https://zenn.dev';

export const qiitaUserName = 'yktakaha4';

export const gitHubLogin = 'yktakaha4';
export const gitHubStargazersCountThreshold = 10;
export const gitHubLanguageSizeThreshold = 0.3;
export const gitHubIgnoreOwnerNames = ['yktakaha4', 'lapras-inc'];
