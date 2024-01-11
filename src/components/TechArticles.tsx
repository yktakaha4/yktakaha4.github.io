import { FC } from 'react';
import { TableHeaders, TableRow, TagsCellTag } from '@/components/ui/Table';
import techArticles from '@/components/data/techArticles.json';
import { getTechArticlePublisherName } from '@/constants';
import dayjs from 'dayjs';
import { SearchableTable } from '@/components/ui/SearchableTable';

export const TechArticles: FC = () => {
  const headers: TableHeaders = [
    {
      label: '公開日',
      align: 'center',
      width: '10%',
    },
    {
      label: 'タイトル',
      align: 'left',
      width: '70%',
    },
    {
      label: 'タグ',
      align: 'left',
      width: '20%',
    },
  ];

  const { articles: items } = techArticles;
  type Item = (typeof items)[0];

  const searchTexts = (item: Item) => {
    return [
      item.title,
      ...item.tags,
      getTechArticlePublisherName(item.publisher),
      dayjs(item.publishedAt).format('YYYY/M/D'),
    ];
  };

  const row = (item: Item): TableRow => {
    const tagValues: Array<TagsCellTag> = [
      {
        icon: 'publisher',
        value: getTechArticlePublisherName(item.publisher),
        color: 'primary',
      },
    ];

    if (item.likes != null) {
      tagValues.push({
        icon: 'heart',
        value: item.likes.toLocaleString(),
        color: 'danger',
      });
    }

    return [
      {
        type: 'date',
        value: dayjs(item.publishedAt).toDate(),
        format: 'YYYY/M/D',
      },
      {
        type: 'string',
        value: item.title,
        link: {
          type: 'external',
          href: item.url,
        },
      },
      {
        type: 'tags',
        values: tagValues,
      },
    ];
  };

  return (
    <SearchableTable
      headers={headers}
      items={items}
      searchTexts={searchTexts}
      row={row}
    />
  );
};
