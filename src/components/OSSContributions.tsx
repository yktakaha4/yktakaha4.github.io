import { FC } from 'react';
import ossContributions from '@/components/data/ossContributions.json';
import dayjs from 'dayjs';
import { TableHeaders, TableRow } from '@/components/ui/Table';
import {
  getOssContributionIcon,
  getOSSContributionKindName,
} from '@/constants';
import { SearchableTable } from '@/components/ui/SearchableTable';

export const OSSContributions: FC = () => {
  const headers: TableHeaders = [
    {
      label: '日付',
      align: 'center',
      width: '10%',
    },
    {
      label: 'タイトル',
      align: 'left',
      width: '40%',
    },
    {
      label: 'リポジトリ',
      align: 'left',
      width: '40%',
    },
    {
      label: 'タグ',
      align: 'left',
      width: '10%',
    },
  ];

  const { contributions: items } = ossContributions;
  type Item = (typeof items)[0];

  const searchTexts = (item: Item) => {
    return [
      item.title,
      dayjs(item.mergedAt).format('YYYY/M/D'),
      getOSSContributionKindName(item.kind),
      ...item.repository.languages,
      item.repository.name,
    ];
  };

  const row = (item: Item): TableRow => {
    return [
      {
        type: 'date',
        value: dayjs(item.mergedAt).toDate(),
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
        type: 'string',
        value: item.repository.name,
        link: {
          type: 'external',
          href: item.repository.url,
        },
      },
      {
        type: 'tags',
        values: [
          {
            icon: getOssContributionIcon(item.kind) ?? undefined,
            value: getOSSContributionKindName(item.kind),
            color: 'primary',
          },
        ],
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
