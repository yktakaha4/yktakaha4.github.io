import React, { FC } from 'react';
import Link from '@docusaurus/Link';

export type PagerProps = {
  page: number;
  perPage: number;
  total: number;
  size: number;
  onChange?: (args: { page: number }) => void;
};

export const getSliceIndex = (page: number, perPage: number) => {
  if (page < 1) {
    throw new Error(`page must be greater than or equal to 1`);
  }
  return [(page - 1) * perPage, page * perPage];
};

export const Pager: FC<PagerProps> = ({
  page,
  perPage,
  total,
  size,
  onChange,
}) => {
  const minSize = 3;
  if (size < minSize) {
    throw new Error(`size must be greater than or equal to ${minSize}`);
  }

  const totalPages = Math.ceil(total / perPage);
  const currentPage = Math.min(Math.max(1, page), totalPages);
  const startPage = Math.min(
    Math.max(1, currentPage - Math.floor(size / 2)),
    Math.max(totalPages - size + 1, 1),
  );
  const pagesLength = Math.max(1, Math.min(size, totalPages));
  const pages = Array.from({ length: pagesLength }).map(
    (_, i) => startPage + i,
  );

  const handleClick = (p: number) => {
    return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
      e.preventDefault();
      if (onChange) {
        onChange({ page: p });
      }
    };
  };

  return (
    <ul className="pagination" style={{ margin: 0 }}>
      <li className="pagination__item">
        <Link className="pagination__link" to="#" onClick={handleClick(1)}>
          &laquo;
        </Link>
      </li>
      {pages.length > 1 && pages[0] !== 1 && (
        <li className="pagination__item">
          <span>…</span>
        </li>
      )}
      {pages.map((p) => (
        <li
          key={p}
          className={`pagination__item ${
            p === currentPage ? 'pagination__item--active' : ''
          }`}
        >
          <Link className="pagination__link" to="#" onClick={handleClick(p)}>
            {p}
          </Link>
        </li>
      ))}
      {pages.length > 1 && pages[pages.length - 1] !== totalPages && (
        <li className="pagination__item">
          <span>…</span>
        </li>
      )}
      <li className="pagination__item">
        <Link
          className="pagination__link"
          to="#"
          onClick={handleClick(totalPages)}
        >
          &raquo;
        </Link>
      </li>
    </ul>
  );
};
