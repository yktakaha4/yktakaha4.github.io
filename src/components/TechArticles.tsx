import {FC, useMemo, useState} from "react";
import {createSearchRegexp, createSearchText, Search} from "@/components/ui/Search";
import {Pager} from "@/components/ui/Pager";
import {Table, TableHeaders, TableRow, TableRows} from "@/components/ui/Table";
import {pagerPerPage, pagerSize, TechArticlePublisher} from "@/constants";

export interface TechArticle {
    publishedAt: Date
    title: string
    url: string
    likes: number
    publisher: TechArticlePublisher
    tags: Array<string>
}

export interface TechArticlesProps {
    articles: Array<TechArticle>
}

export const TechArticles: FC<TechArticlesProps> = ({ articles }) => {
    const headers: TableHeaders = [{
        label: '公開日',
        align: 'center',
        width: '10%',
    }, {
        label: 'タイトル',
        align: 'left',
        width: '70%',
    }, {
        label: 'タグ',
        align: 'left',
        width: '20%',
    }]

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const regexp = useMemo(() => createSearchRegexp(query), [query])

    const rows: TableRows = articles.filter(({ title, tags, publisher }) => {
        return regexp.test(createSearchText(title, ...tags, publisher))
    }).map(({ publishedAt, title, url, likes, tags}): TableRow => {
        return [{
            type: 'date',
            value: publishedAt,
            format: 'YYYY/M/D',
        }, {
            type: 'string',
            value: title,
            link: {
                type: 'external',
                href: url,
            },
        }, {
            type: 'string',
            value: tags.join(', '),
        }]
    }).slice((page - 1) * pagerPerPage, page * pagerPerPage)

    const handleChangeQuery = (newQuery: string) => {
        setQuery(newQuery)
    }
    const handleChangePage = (newPage: number) => {
        setPage(newPage)
    }

    return (<>
        <Search
            query={query}
            onChange={({ query }) => handleChangeQuery(query)}
            children={<Pager
                page={page}
                perPage={pagerPerPage}
                size={pagerSize}
                total={articles.length}
                onChange={({ page }) => handleChangePage(page)}
            />}
        />
        <Table headers={headers} rows={rows} />
    </>)
}
