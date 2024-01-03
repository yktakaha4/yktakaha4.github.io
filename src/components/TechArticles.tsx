import {FC, useMemo, useState} from "react";
import {createSearchRegexp, createSearchText, Search} from "@/components/ui/Search";
import {getSliceIndex, Pager} from "@/components/ui/Pager";
import {Table, TableHeaders, TableRow, TagsCellTag} from "@/components/ui/Table";
import {pagerPerPage, pagerSize, getTechArticlePublisherName} from "@/constants";
import dayjs from "dayjs";
import {TechArticle} from "@/services/techArticles";

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

    const filtered = articles.filter(article => filterTechArticle(regexp, article))
    const rows = filtered.length > 0 ? filtered.map(({ publishedAt, title, url, likes, tags, publisher}): TableRow => {
        const tagValues: Array<TagsCellTag> = [{
            icon: '📰',
            value: getTechArticlePublisherName(publisher),
            color: 'primary',
        }]

        if (likes != null) {
            tagValues.push({
                icon: '♥',
                value: likes.toLocaleString(),
                color: 'danger',
            })
        }

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
            values: tagValues,
        }]
    }).slice(...getSliceIndex(page, pagerPerPage)) : []

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
