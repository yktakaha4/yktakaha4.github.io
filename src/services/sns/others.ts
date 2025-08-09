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
    publishedAt: new Date('2022-10-15'),
    likes: 3,
    publisher: 'speakerDeck',
    tags: ['Django', 'OAuth'],
  },
  {
    title: 'オンコール⼊⾨〜ページャーが鳴る前に、あなたが備えられること〜',
    url: 'https://speakerdeck.com/yktakaha4/before-the-pager-rings',
    publishedAt: new Date('2025-07-12'),
    likes: 2,
    publisher: 'speakerDeck',
    tags: ['SRE', 'オンコール対応'],
  },
  {
    title: 'Karpenterを再導入してEC2コストを削減した話',
    url: 'https://team-blog.mitene.us/72e9cc4ce08f',
    publishedAt: new Date('2025-05-28'),
    likes: 67,
    publisher: 'techBlog',
    tags: ['AWS', 'Karpenter', 'EKS'],
  },
];
