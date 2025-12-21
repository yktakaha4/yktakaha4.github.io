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

export type OSSContributionSizeKind = 'xs' | 's' | 'm' | 'l' | 'xl';
const OSSContributionSizeKindName: {
  [key in OSSContributionSizeKind]: string;
} = {
  xs: 'XS',
  s: 'S',
  m: 'M',
  l: 'L',
  xl: 'XL',
} as const;
export const getOssContributionSizeKind = (
  lines: number,
): OSSContributionSizeKind => {
  if (lines < 10) {
    return 'xs';
  } else if (lines < 100) {
    return 's';
  } else if (lines < 500) {
    return 'm';
  } else if (lines < 1000) {
    return 'l';
  } else {
    return 'xl';
  }
};
export const getOSSContributionSizeKindName = (lines: number) => {
  const kind = getOssContributionSizeKind(lines);
  return OSSContributionSizeKindName[kind];
};

const snsDataBasePath = `${__dirname}/services/sns/data`;
export type SNSData =
  | 'gitHubPullRequests'
  | 'zennArticles'
  | 'zennTopics'
  | 'qiitaItems'
  | 'noteContents'
  | 'speakerDeckSlides';
export const getSNSDataPath = (snsData: SNSData) =>
  `${snsDataBasePath}/${snsData}.json`;

const componentsDataBasePath = `${__dirname}/components/data`;
export type ComponentsData = 'techArticles' | 'ossContributions';
export const getComponentsDataPath = (componentsData: ComponentsData) =>
  `${componentsDataBasePath}/${componentsData}.json`;

export const pagerSize = 3;
export const pagerPerPage = 10;

export const zennUserName = 'yktakaha4';
export const zennBaseURL = 'https://zenn.dev';

export const qiitaUserName = 'yktakaha4';

export const gitHubLogin = 'yktakaha4';
export const gitHubStargazersCountThreshold = 10;
export const gitHubLanguageSizeThreshold = 0.3;
export const gitHubIgnoreOwnerNames = ['yktakaha4', 'lapras-inc'];

export const speakerDeckUserName = 'yktakaha4';

export const noteUrlName = 'yktakaha4';
