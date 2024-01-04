import {
  createSearchRegexp,
  createSearchText,
  SearchableTable,
} from '@/components/ui/SearchableTable';
import { render, screen } from '@testing-library/react';
import { TableHeaders, TableRow } from '@/components/ui/Table';
import dayjs from 'dayjs';
import { userEvent } from '@testing-library/user-event';

describe('createSearchRegexp', () => {
  test.each([
    ['', '/^.*$/'],
    ['\x20\u3000', '/^.*$/'],
    ['Python', '/^(?=.*Python)/i'],
    ['\x20ＰＩＰ\x20\u3000ﾊﾟｲｿﾝ\x20', '/^(?=.*PIP)(?=.*パイソン)/i'],
    ['C++', '/^(?=.*C\\+\\+)/i'],
  ])('正規表現が生成される #%#', (query, expected) => {
    expect(createSearchRegexp(query).toString()).toBe(expected);
  });

  test.each([
    ['', '', true],
    ['\u3000', 'Python', true],
    ['', 'Python', true],
    ['Python', 'pythonista', true],
    ['Python Python', 'pythonista', true],
    ['\x20Java\x20\x20C++\u3000\x20', 'python JAVA c# c++', true],
    ['\x20Java\x20\x20C++\u3000\x20', 'c++ python c# JAVA', true],
    ['\x20Java\x20\x20C++\u3000\x20', 'c# c+', false],
    ['python', '', false],
    ['pythonista', 'python istanbul', false],
    ['python istanbul', 'pythonista', false],
  ])(`文字列にマッチする #%#`, (pattern, string, expected) => {
    const regexp = createSearchRegexp(pattern);
    expect(regexp.test(string)).toBe(expected);
  });
});

describe('createSearchText', () => {
  test.each<[Array<string>, string]>([
    [[], ''],
    [[''], ''],
    [
      ['\x20Python\x20\u3000ＰＩＰ\x20\u3000ﾊﾟｲｿﾝ\x20'],
      'Python\x20PIP\x20パイソン',
    ],
  ])(`検索テキストが生成される #%#`, (texts, expected) => {
    expect(createSearchText(...texts)).toBe(expected);
  });
});

describe('SearchableTable', () => {
  type Item = {
    name: string;
    description: string;
    url: string;
    amount: number;
    time: Date;
    tags: Array<string>;
  };

  const time = dayjs('2112-09-03T12:34:56+09:00').toDate();
  const headers: TableHeaders = [
    {
      label: 'Name',
    },
    {
      label: 'Description',
    },
    {
      label: 'Amount',
    },
    {
      label: 'Time',
    },
    {
      label: 'Tags',
    },
  ];
  const items: Array<Item> = Array.from({ length: 100 }, (_, i) => ({
    name: `Item [${i}]`,
    description: `Description ${i}`,
    url: `https://example.com/${i}`,
    amount: 100 * i,
    time: dayjs(time).add(i, 'day').toDate(),
    tags: [`Tag${100 * i}`, `Tag${100 * i + 1}`],
  }));
  const searchTexts = (item: Item) => [item.name, item.description];
  const row = (item: Item): TableRow => [
    {
      type: 'string',
      value: item.name,
      link: {
        href: item.url,
        type: 'external',
      },
    },
    {
      type: 'string',
      value: item.description,
    },
    {
      type: 'number',
      value: item.amount,
    },
    {
      type: 'date',
      value: item.time,
    },
    {
      type: 'tags',
      values: item.tags.map((tag) => ({
        value: tag,
      })),
    },
  ];

  test('テーブルが描画される', () => {
    const { container } = render(
      <SearchableTable
        headers={headers}
        items={items}
        searchTexts={searchTexts}
        row={row}
      />,
    );
    expect(container.textContent).toContain('100 件');
    expect(container.textContent).toContain('Item [1]');
    expect(container.textContent).toContain('Item [9]');
    expect(container.textContent).not.toContain('Item [10]');
  });

  test('検索によって行を絞り込める', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchableTable
        headers={headers}
        items={items}
        searchTexts={searchTexts}
        row={row}
      />,
    );

    expect(container.textContent).toContain('100 件');

    const input = container.getElementsByTagName('input')[0];
    expect(input.value).toBe('');

    await user.type(container.getElementsByTagName('input')[0], 'Item 1');
    expect(input.value).toBe('Item 1');

    expect(container.textContent).toContain('19 件');
    expect(container.textContent).toContain('Item [1]');
    expect(container.textContent).not.toContain('Item [9]');
    expect(container.textContent).toContain('Item [10]');
  });

  test('ページングによって異なる行を表示できる', async () => {
    const user = userEvent.setup();
    const { container } = render(
      <SearchableTable
        headers={headers}
        items={items}
        searchTexts={searchTexts}
        row={row}
      />,
    );

    expect(container.textContent).toContain('100 件');

    const input = screen.getByText('»');
    await user.click(input);

    expect(container.textContent).toContain('100 件');
    expect(container.textContent).not.toContain('Item [89]');
    expect(container.textContent).toContain('Item [90]');
    expect(container.textContent).toContain('Item [99]');
  });

  describe('バリデーションエラー', () => {
    beforeAll(() => {
      jest.spyOn(console, 'error').mockImplementation();
    });

    afterAll(() => {
      jest.restoreAllMocks();
    });

    test('headersが空の場合はエラーが発生する', () => {
      expect(() =>
        render(
          <SearchableTable
            headers={[]}
            items={[]}
            searchTexts={() => []}
            row={() => []}
          />,
        ),
      ).toThrow('headers must not be empty');
    });
  });
});
