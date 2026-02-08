import { readFileSync, writeFile } from 'fs-extra';
import { join } from 'path';
import dayjs from 'dayjs';
import { logger } from '@/services/logging';
import techArticlesData from '@/components/data/techArticles.json';
import ossContributionsData from '@/components/data/ossContributions.json';

export const generateLLMTxt = async () => {
  logger.info('start');

  // index.mdxからプレーンテキストを抽出
  const indexMdxPath = join(__dirname, '../../pages/index.mdx');
  const indexMdxContent = readFileSync(indexMdxPath, 'utf-8');

  // MDXからインポート文、JSXコンポーネント、headタグを除去してプレーンテキストを抽出
  const plainTextContent = indexMdxContent
    // インポート文を削除
    .replace(/^import\s+.*?from\s+['"].*?['"];?\s*$/gm, '')
    // <head>タグとその内容を削除
    .replace(/<head>[\s\S]*?<\/head>/g, '')
    // 開始・終了タグのペア（<Component>...</Component>）をその内容のみに置換
    .replace(/<[A-Z][a-zA-Z0-9]*[^>]*>([\s\S]*?)<\/[A-Z][a-zA-Z0-9]*>/g, '$1')
    // 単独のJSXタグ（<Component />）を削除（行全体を削除）
    .replace(/^.*<[A-Z][a-zA-Z0-9]*[^>]*\/>.*$/gm, '')
    // 残ったJSXタグを削除（<Component>や</Component>）
    .replace(/<\/?[A-Z][a-zA-Z0-9]*[^>]*>/g, '')
    // 空行を削除（連続する改行を2つまでに）
    .replace(/\n\s*\n\s*\n+/g, '\n\n')
    .trim();

  // 技術記事セクションを生成
  const techArticlesSection = generateTechArticlesSection();

  // OSS活動セクションを生成
  const ossContributionsSection = generateOSSContributionsSection();

  // 最終的なLLM.txtを構築
  const llmTxt = `${plainTextContent}

${techArticlesSection}

${ossContributionsSection}

---
このファイルは自動生成されました。最終更新: ${dayjs().format('YYYY-MM-DD HH:mm:ss')}
`;

  // static/LLM.txt として保存
  const outputPath = join(__dirname, '../../../static/LLM.txt');
  await writeFile(outputPath, llmTxt, 'utf-8');

  logger.info('end', { outputPath });
};

const generateTechArticlesSection = (): string => {
  const articles = techArticlesData.articles;
  const lines: string[] = ['### 技術記事（詳細）', ''];

  articles.forEach((article, index) => {
    const { title, url, publishedAt, likes, publisher, tags } = article;
    const formattedDate = dayjs(publishedAt).format('YYYY-MM-DD');
    const likesText = likes !== undefined ? `| いいね: ${likes}` : '';
    const tagsText = tags.length > 0 ? `| タグ: ${tags.join(', ')}` : '';

    lines.push(
      `${index + 1}. ${title}`,
      `   URL: ${url}`,
      `   公開日: ${formattedDate} | 媒体: ${publisher} ${likesText} ${tagsText}`.trim(),
      '',
    );
  });

  return lines.join('\n');
};

const generateOSSContributionsSection = (): string => {
  const contributions = ossContributionsData.contributions;
  const lines: string[] = ['### OSS活動（詳細）', ''];

  contributions.forEach((contribution, index) => {
    const { title, url, mergedAt, changedLines, repository } = contribution;
    const formattedDate = dayjs(mergedAt).format('YYYY-MM-DD');
    const { name, stars, languages } = repository;

    lines.push(
      `${index + 1}. ${title}`,
      `   URL: ${url}`,
      `   マージ日: ${formattedDate} | リポジトリ: ${name} (⭐${stars}) | 変更行数: ${changedLines}`,
      `   言語: ${languages.join(', ')}`,
      '',
    );
  });

  return lines.join('\n');
};

if (require.main === module) {
  generateLLMTxt().catch((e) => {
    logger.error(e);
    throw e;
  });
}
