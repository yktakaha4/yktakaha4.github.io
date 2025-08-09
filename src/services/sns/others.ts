import { TechArticle } from '@/services/techArticles';

export const othersArticles: Array<TechArticle> = [
  {
    title: 'すごいVBAをLambda+HTML帳票+Puppeteerに置き換えた話',
    url: 'https://web.archive.org/web/20250328120534/https://www.hands-lab.com/tech/t4835/',
    publishedAt: new Date('2019-07-05'),
    publisher: 'techBlog',
    tags: ['AWS', 'Node.js', 'PDF'],
  },
  {
    title: 'GitHub ActionsでServerless FrameworkのCI/CDパイプラインを構築する',
    url: 'https://web.archive.org/web/20250328120534/https://www.hands-lab.com/tech/t5202/',
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
      'Python Social Authで学ぶ、OAuth2.0認可コードフローにおける異常系への対処',
    url: 'https://speakerdeck.com/yktakaha4/python-social-authdexue-bu-oauth2-dot-0ren-ke-kodohuroniokeruyi-chang-xi-henodui-chu',
    publishedAt: new Date('2021-10-15'),
    likes: 3,
    publisher: 'speakerDeck',
    tags: ['Django'],
  },
];
