import {useMemo, useState} from "react";
import {Table, TableHeaders, TableRow} from "@/components/ui/Table";
import {Search} from "@/components/ui/Search";
import {pagerPerPage, pagerSize} from "@/constants";
import {getSliceIndex, Pager} from "@/components/ui/Pager";

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
                // メタ文字のエスケープ
                // https://shanabrian.com/web/javascript/regular-expression-escape.php
                const escaped = raw.replace(/[-\/\\^$*+?.()|\[\]{}]/g, '\\$&')
                // AND検索
                // https://qiita.com/n4o847/items/dbcd0b8af3781d221424
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

export type SearchableTableProps<T> = {
    headers: TableHeaders
    items: Array<T>
    searchTexts: (item: T) => Array<string>
    row: (item: T) => TableRow
}

export const SearchableTable = <T, >({ headers, items, searchTexts, row }: SearchableTableProps<T>) => {
    if (headers.length === 0) {
        throw new Error('headers must not be empty')
    }

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const regexp = useMemo(() => createSearchRegexp(query), [query])

    const filtered = items.filter(item => regexp.test(createSearchText(...searchTexts(item))))
    const rows = filtered.length > 0 ? filtered
        .map(item => row(item))
        .slice(...getSliceIndex(page, pagerPerPage)) : []

    const handleChangeQuery = (newQuery: string) => {
        setQuery(newQuery)
        setPage(1)
    }
    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    return (<>
        <div style={{marginBottom: '0.2rem'}}>
            <Search
                query={query}
                totalCount={filtered.length}
                onChange={({ query }) => handleChangeQuery(query)}
                children={<Pager
                    page={page}
                    perPage={pagerPerPage}
                    size={pagerSize}
                    total={filtered.length}
                    onChange={({ page }) => handleChangePage(page)}
                />}
            />
        </div>
        <Table headers={headers} rows={rows} />
    </>)
}
