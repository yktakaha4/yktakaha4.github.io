import {FC, useMemo, useState} from "react";
import {OSSContribution} from "@/services/ossContributions";
import {createSearchRegexp, createSearchText, Search} from "@/components/ui/Search";
import dayjs from "dayjs";
import {Table, TableHeaders, TableRow} from "@/components/ui/Table";
import {getSliceIndex, Pager} from "@/components/ui/Pager";
import {getOSSContributionKindName, pagerPerPage, pagerSize} from "@/constants";

export type OSSContributionsProps = {
    contributions: Array<OSSContribution>
}

export const filterOSSContribution = (regexp: RegExp, contribution: OSSContribution) => {
    return regexp.test(createSearchText(
        contribution.title,
        dayjs(contribution.mergedAt).format('YYYY/M/D'),
        getOSSContributionKindName(contribution.kind),
        ...contribution.repository.languages,
        contribution.repository.name,
    ))
}

export const OSSContributions: FC<OSSContributionsProps> = ({ contributions }) => {
    const headers: TableHeaders = [{
        label: '日付',
        align: 'center',
        width: '10%',
    }, {
        label: 'タイトル',
        align: 'left',
        width: '40%',
    }, {
        label: 'リポジトリ',
        align: 'left',
        width: '40%',
    }, {
        label: 'タグ',
        align: 'left',
        width: '10%',
    }]

    const [query, setQuery] = useState('')
    const [page, setPage] = useState(1)

    const regexp = useMemo(() => createSearchRegexp(query), [query])

    const filtered = contributions.filter(contribution => filterOSSContribution(regexp, contribution))
    const rows = filtered.length > 0 ? filtered.map(({ mergedAt, title, url, repository, kind }): TableRow => {
        return [{
            type: 'date',
            value: mergedAt,
        }, {
            type: 'string',
            value: title,
            link: {
                type: 'external',
                href: url,
            },
        }, {
            type: 'string',
            value: repository.name,
            link: {
                type: 'external',
                href: repository.url,
            },
        }, {
            type: 'tags',
            values: [{
                icon: '📝',
                value: getOSSContributionKindName(kind),
                color: 'primary',
            }],
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
