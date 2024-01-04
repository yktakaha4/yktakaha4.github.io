import { TechArticle } from '@/services/techArticles';

export const othersArticles: Array<TechArticle> = [
  {
    title: 'すごいVBAをLambda+HTML帳票+Puppeteerに置き換えた話',
    url: 'https://www.hands-lab.com/tech/t4835/',
    publishedAt: new Date('2019-07-05'),
    publisher: 'techBlog',
    tags: ['AWS', 'Node.js', 'PDF'],
  },
  {
    title: 'GitHub ActionsでServerless FrameworkのCI/CDパイプラインを構築する',
    url: 'https://www.hands-lab.com/tech/t5202/',
    publishedAt: new Date('2019-10-04'),
    publisher: 'techBlog',
    tags: ['AWS'],
  },
  {
    title: 'LAPRAS Tech Blogのアーキテクチャ（インフラ編）',
    url: 'https://tech-blog.lapras.com/techBlogs/tech-blog-infra',
    publishedAt: new Date('2022-07-04'),
    publisher: 'techBlog',
    tags: ['AWS', 'AWS Amplify', 'Terraform', 'MicroCMS'],
  },
  {
    title:
      'LAPRASの採用選考を受けて感じたCX(Candidate Experience)と、その重要性',
    url: 'https://note.com/yktakaha4/n/n67789c25ad73',
    publishedAt: new Date('2021-01-27'),
    likes: 49,
    publisher: 'note',
    tags: [],
  },
  {
    title:
      '新しいチームに加わるエンジニアのための "被" オンボーディングガイド v0.1.1',
    url: 'https://note.com/yktakaha4/n/n2acd5a198fa3',
    publishedAt: new Date('2021-04-23'),
    likes: 28,
    publisher: 'note',
    tags: [],
  },
  {
    title:
      'Python Social Authで学ぶ、OAuth2.0認可コードフローにおける異常系への対処',
    url: 'https://speakerdeck.com/yktakaha4/python-social-authdexue-bu-oauth2-dot-0ren-ke-kodohuroniokeruyi-chang-xi-henodui-chu',
    publishedAt: new Date('2021-10-15'),
    likes: 3,
    publisher: 'speakerDeck',
    tags: ['Django'],
  },
];
