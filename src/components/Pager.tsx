import React, { FC } from 'react';

export interface PagerProps {
    page: number
    perPage: number
    total: number
    size: number
    onChange: (page: number) => void
}

export const Pager: FC<PagerProps> = ({ page, perPage, total, size, onChange }) => {
    const totalPages = Math.ceil(total / perPage);
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startPage = Math.min(Math.max(1, currentPage - Math.floor(size / 2)), Math.max(totalPages - size + 1, 1));
    const pages = Array.from({ length: size }).map((_, i) => startPage + i);

    const onClick = (p: number) => {
        return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            onChange(p);
        }
    }

    return (
        <ul className="pagination">
            <li className="pagination__item">
                <a className="pagination__link" href="#" onClick={onClick(1)}>&laquo;</a>
            </li>
            {pages[0] !== 1 && (
                <li className="pagination__item">
                    <span>…</span>
                </li>
            )}
            {pages.map(p => (
                <li key={p} className={`pagination__item ${p === currentPage ? 'pagination__item--active' : ''}`}>
                    <a className="pagination__link" href="#" onClick={onClick(p)}>{p}</a>
                </li>
            ))}
            {pages[pages.length - 1] !== totalPages && (
                <li className="pagination__item">
                    <span>…</span>
                </li>
            )}
            <li className="pagination__item">
                <a className="pagination__link" href="#" onClick={onClick(totalPages)}>&raquo;</a>
            </li>
        </ul>
    );
}
