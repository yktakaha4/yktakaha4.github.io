import {FC} from "react";
import {TableHeaders, TableRow, TagsCellTag} from "@/components/ui/Table";
import {getTechArticlePublisherName} from "@/constants";
import dayjs from "dayjs";
import {getTechArticles, TechArticle} from "@/services/techArticles";
import {SearchableTable} from "@/components/ui/SearchableTable";

export const TechArticles: FC = () => {
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

    const items = getTechArticles()

    const searchTexts = (item: TechArticle) => {
        return [
            item.title,
            ...item.tags,
            getTechArticlePublisherName(item.publisher),
            dayjs(item.publishedAt).format('YYYY/M/D'),
        ]
    }

    const row = (item: TechArticle): TableRow => {
        const tagValues: Array<TagsCellTag> = [{
            icon: '📰',
            value: getTechArticlePublisherName(item.publisher),
            color: 'primary',
        }]

        if (item.likes != null) {
            tagValues.push({
                icon: '♥',
                value: item.likes.toLocaleString(),
                color: 'danger',
            })
        }

        return [{
            type: 'date',
            value: item.publishedAt,
            format: 'YYYY/M/D',
        }, {
            type: 'string',
            value: item.title,
            link: {
                type: 'external',
                href: item.url,
            },
        }, {
            type: 'tags',
            values: tagValues,
        }]
    }

    return (<SearchableTable
        headers={headers}
        items={items}
        searchTexts={searchTexts}
        row={row}
    />)
}
