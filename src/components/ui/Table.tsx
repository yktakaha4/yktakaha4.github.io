import React, { FC } from 'react';
import dayjs from 'dayjs';
import { Icon, Tag, TagColor } from '@/components/ui/Tag';
import Link from '@docusaurus/Link';

type Optional<T> = T | null | undefined;

export type CellValueOptions = {
  link?: {
    type?: 'external' | 'internal';
    href: string;
  };
};

export type CellValue = {
  type?: undefined;
  value: Optional<string>;
};

export type StringCellValue = {
  type: 'string';
  value: Optional<string>;
};

export type NumberCellValue = {
  type: 'number';
  value: Optional<number>;
  format?: Intl.NumberFormat;
};

export type DateCellValue = {
  type: 'date';
  value: Optional<Date>;
  format?: 'YYYY/M/D' | 'YYYY/M';
};

export type TagsCellTag = {
  icon?: Icon;
  value: string;
  color?: TagColor;
};

export type TagsCellValue = {
  type: 'tags';
  values: Array<TagsCellTag>;
};

export type TableCell =
  | ((CellValue | StringCellValue | NumberCellValue | DateCellValue) &
      CellValueOptions)
  | TagsCellValue;

export type TableHeader = {
  label?: string;
  align?: 'left' | 'center' | 'right';
  width?: string | number;
};

export type TableRow = Array<TableCell>;
export type TableHeaders = Array<TableHeader>;
export type TableRows = Array<TableRow>;

export type TableProps = {
  headers: TableHeaders;
  rows: TableRows;
};

export const decorate = (
  value: Optional<string>,
  options: CellValueOptions,
) => {
  if (options.link) {
    const text = value || '#';
    const { href, type } = options.link;
    if (type === 'external') {
      return (
        <Link to={href} target="_blank" rel="noopener noreferrer">
          {text}
        </Link>
      );
    }
    return <Link to={href}>{text}</Link>;
  } else {
    return value;
  }
};

export const Table: FC<TableProps> = ({ headers, rows }) => {
  for (const row of rows) {
    if (row.length !== headers.length) {
      throw new Error(
        'The number of cells in the row does not match the number of headers',
      );
    }
  }

  return (
    <table style={{ margin: 0 }}>
      <thead>
        <tr>
          {headers.map(({ align: textAlign, width, label }, i) => (
            <th key={i} style={{ textAlign, width }}>
              {label ?? ''}
            </th>
          ))}
        </tr>
      </thead>
      <tbody>
        {rows.length === 0 && (
          <tr>
            <td style={{ textAlign: 'center' }} colSpan={headers.length}>
              No data
            </td>
          </tr>
        )}
        {rows.map((row, i) => (
          <tr key={i}>
            {row.map((cell, j) => {
              if (cell.type === 'number') {
                const numberFormat = cell.format ?? new Intl.NumberFormat();
                if (cell.value != null) {
                  const value = decorate(numberFormat.format(cell.value), cell);
                  return <td key={j}>{value}</td>;
                }
              } else if (cell.type === 'date') {
                if (cell.value) {
                  const format = cell.format ?? 'YYYY/M/D';
                  const value = decorate(
                    dayjs(cell.value).format(format),
                    cell,
                  );
                  return <td key={j}>{value}</td>;
                }
              } else if (cell.type === 'tags') {
                return (
                  <td key={j}>
                    <div
                      style={{
                        display: 'flex',
                        gap: '0.2rem',
                        flexWrap: 'wrap',
                      }}
                    >
                      {cell.values.map(({ icon, value, color }, k) => (
                        <Tag icon={icon} name={value} color={color} key={k} />
                      ))}
                    </div>
                  </td>
                );
              } else {
                const value = decorate(cell.value, cell);
                return <td key={j}>{value}</td>;
              }
              return <td key={j}></td>;
            })}
          </tr>
        ))}
      </tbody>
    </table>
  );
};
