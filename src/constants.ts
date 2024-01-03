export type TechArticlePublisher = 'zenn' | 'qiita'
const techArticlePublisherName: {
    [key in TechArticlePublisher]: string
} = {
    'zenn': 'Zenn',
    'qiita': 'Qiita',
} as const
export const getTechArticlePublisherName = (publisher: TechArticlePublisher) => techArticlePublisherName[publisher]

const snsDataBasePath = `${__dirname}/services/sns/data`
export type SNSData = 'githubPullRequests' | 'zennArticles' | 'qiitaItems'
export const getSNSDataPath = (snsData: SNSData) => `${snsDataBasePath}/${snsData}.json`

export const pagerSize = 3
export const pagerPerPage = 10

export const zennUserName = 'yktakaha4'
export const qiitaUserName = 'yktakaha4'
