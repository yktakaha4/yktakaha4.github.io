import React, { FC } from 'react';

export interface PagerProps {
    page: number
    perPage: number
    total: number
    size: number
    onChange?: (args: { page: number }) => void
}

export const Pager: FC<PagerProps> = ({ page, perPage, total, size, onChange }) => {
    const minSize = 3
    if (size < minSize) {
        throw new Error(`size must be greater than or equal to ${minSize}`)
    }

    const totalPages = Math.ceil(total / perPage);
    const currentPage = Math.min(Math.max(1, page), totalPages);
    const startPage = Math.min(Math.max(1, currentPage - Math.floor(size / 2)), Math.max(totalPages - size + 1, 1));
    const pagesLength = Math.max(1, Math.min(size, totalPages))
    const pages = Array.from({ length: pagesLength }).map((_, i) => startPage + i);

    const handleClick = (p: number) => {
        return (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
            e.preventDefault();
            if (onChange) {
                onChange({ page: p })
            }
        }
    }

    return (
        <ul className="pagination" style={{margin: 0}}>
            <li className="pagination__item">
                <a className="pagination__link" href="#" onClick={handleClick(1)}>&laquo;</a>
            </li>
            {pages.length > 1 && pages[0] !== 1 && (
                <li className="pagination__item">
                    <span>…</span>
                </li>
            )}
            {pages.map(p => (
                <li key={p} className={`pagination__item ${p === currentPage ? 'pagination__item--active' : ''}`}>
                    <a className="pagination__link" href="#" onClick={handleClick(p)}>{p}</a>
                </li>
            ))}
            {pages.length > 1 && pages[pages.length - 1] !== totalPages && (
                <li className="pagination__item">
                    <span>…</span>
                </li>
            )}
            <li className="pagination__item">
                <a className="pagination__link" href="#" onClick={handleClick(totalPages)}>&raquo;</a>
            </li>
        </ul>
    );
}
