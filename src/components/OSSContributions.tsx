import {FC} from "react";
import {getOSSContributions, OSSContribution} from "@/services/ossContributions";
import dayjs from "dayjs";
import {TableHeaders, TableRow} from "@/components/ui/Table";
import {getOSSContributionKindName} from "@/constants";
import {SearchableTable} from "@/components/ui/SearchableTable";

export const OSSContributions: FC = () => {
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

    const items = getOSSContributions()

    const searchTexts = (item: OSSContribution) => {
        return [
            item.title,
            dayjs(item.mergedAt).format('YYYY/M/D'),
            getOSSContributionKindName(item.kind),
            ...item.repository.languages,
            item.repository.name
        ]
    }

    const row = (item: OSSContribution): TableRow => {
        return [{
            type: 'date',
            value: item.mergedAt,
        }, {
            type: 'string',
            value: item.title,
            link: {
                type: 'external',
                href: item.url,
            },
        }, {
            type: 'string',
            value: item.repository.name,
            link: {
                type: 'external',
                href: item.repository.url,
            },
        }, {
            type: 'tags',
            values: [{
                icon: '📝',
                value: getOSSContributionKindName(item.kind),
                color: 'primary',
            }],
        }]
    }

    return (<SearchableTable
        headers={headers}
        items={items}
        searchTexts={searchTexts}
        row={row}
    />)
}
