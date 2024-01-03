import {FC, useMemo, useState} from "react";
import {createSearchRegexp, createSearchText, Search} from "@/components/ui/Search";
import {getSliceIndex, Pager} from "@/components/ui/Pager";
import {Table, TableHeaders, TableRow, TableRows} from "@/components/ui/Table";
import {pagerPerPage, pagerSize, TechArticlePublisher, getTechArticlePublisherName} from "@/constants";
import dayjs from "dayjs";

export type TechArticle = {
    publishedAt: Date
    title: string
    url: string
    likes: number
    publisher: TechArticlePublisher
    tags: Array<string>
}

export type TechArticlesProps = {
    articles: Array<TechArticle>
}

export const filterTechArticle = (regexp: RegExp, article: TechArticle) => {
    return regexp.test(createSearchText(
        article.title,
        ...article.tags,
        getTechArticlePublisherName(article.publisher),
        dayjs(article.publishedAt).format('YYYY/M/D'),
    ))
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

    const filteredArticles = articles.filter(article => filterTechArticle(regexp, article))
    const rows: TableRows = filteredArticles.map(({ publishedAt, title, url, likes, tags, publisher}): TableRow => {
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
            type: 'tags',
            values: [{
                icon: '📰',
                value: getTechArticlePublisherName(publisher),
                color: 'primary',
            }, {
                icon: '♥',
                value: likes.toLocaleString(),
                color: 'danger',
            }, ...tags.map((tag) => ({ value: tag }))],
        }]
    }).slice(...getSliceIndex(page, pagerPerPage))

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
                onChange={({ query }) => handleChangeQuery(query)}
                children={<Pager
                    page={page}
                    perPage={pagerPerPage}
                    size={pagerSize}
                    total={filteredArticles.length}
                    onChange={({ page }) => handleChangePage(page)}
                />}
            />
        </div>
        <Table headers={headers} rows={rows} />
    </>)
}
