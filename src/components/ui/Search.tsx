import React, {FC} from "react";

const normalizeForm = 'NFKC'

export const createSearchRegexp = (query: string) => {
    const conditions = query
        .trim()
        .normalize(normalizeForm)
        .split(/\s+/)

    if (conditions.length === 1 && conditions[0] === '') {
        return new RegExp('^.*$')
    } else {
        const condition = conditions
            .map(raw => {
                const escaped = raw.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&')
                return `(?=.*${escaped})`
            })
            .join('')

        return new RegExp(`^${condition}`, 'i')
    }
}

export const createSearchText = (...texts: Array<string>) => {
    return texts
        .map(t => t
            .trim()
            .normalize(normalizeForm)
            .replace(/\s+/g, '\x20'))
        .join('\x20')
}

export interface SearchInputProps {
    query?: string
    onChange?: (args: { query: string, current?: string }) => void
    children?: React.ReactNode
}

export const Search: FC<SearchInputProps> = ({ query, onChange, children }: SearchInputProps) => {
    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        e.preventDefault()
        if (onChange) {
            onChange({
                query: e.target.value,
                current: query,
            })
        }
    }

    return (
        <nav className="navbar" style={{margin: 0, padding: 0, backgroundColor: 'transparent', boxShadow: 'none'}}>
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
                </div>
                <div className="navbar__items navbar__items--right">
                    <div className="navbar__item">
                        {children}
                    </div>
                </div>
            </div>
        </nav>
    )
}
