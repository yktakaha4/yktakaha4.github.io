import React, { FC } from 'react';

export type SearchInputProps = {
  query?: string;
  onChange?: (args: { query: string; current?: string }) => void;
  totalCount?: number;
  children?: React.ReactNode;
};

export const Search: FC<SearchInputProps> = ({
  query,
  totalCount,
  onChange,
  children,
}: SearchInputProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    if (onChange) {
      onChange({
        query: e.target.value,
        current: query,
      });
    }
  };

  return (
    <nav
      className="navbar"
      style={{
        margin: 0,
        padding: 0,
        backgroundColor: 'transparent',
        boxShadow: 'none',
        height: 'inherit',
      }}
    >
      <div className="navbar__inner">
        <div className="navbar__items">
          <form>
            <div className="navbar__search">
              <input
                className="navbar__search-input"
                onChange={handleChange}
                maxLength={100}
                value={query}
              />
            </div>
          </form>
          {totalCount != null && (
            <div className="navbar__item">{totalCount.toLocaleString()} 件</div>
          )}
        </div>
        <div className="navbar__items navbar__items--right">
          <div className="navbar__item">{children}</div>
        </div>
      </div>
    </nav>
  );
};
