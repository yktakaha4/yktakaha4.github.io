import dayjs from "dayjs";
import {FC} from "react";

export interface ArticleTableRow {
    title: string
    url: string
    likes: number
    publishedAt: Date
}

export interface ArticleTableProps {
    rows: Array<ArticleTableRow>
}

export const ArticleTable: FC<ArticleTableProps> = ({ rows }) => {
    return (
        <table>
            <thead>
            <tr>
                <th style={{ textAlign: 'center' }}>公開日</th>
                <th>記事名</th>
            </tr>
            </thead>
            <tbody>
            {
                rows.map(row => (
                    <tr>
                        <td>{dayjs(row.publishedAt).format('YYYY/M/D')}</td>
                        <td><a href={row.url} target="_blank" rel="noopener noreferrer">{row.title}</a></td>
                    </tr>
                ))
            }
            </tbody>
        </table>
    )
}
