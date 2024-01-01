
import React, { FC } from 'react';
import dayjs from "dayjs";

type Optional<T> = T | null | undefined

export type CellValueOptions = {
    link?: {
        type?: 'external' | 'internal',
        href: string
    }
}

export type CellValue = {
    type?: undefined,
    value: Optional<string>,
}

export type StringCellValue = {
    type: 'string',
    value: Optional<string>,
}

export type NumberCellValue = {
    type: 'number',
    value: Optional<number>,
    format?: Intl.NumberFormat,
}

export type DateCellValue = {
    type: 'date',
    value: Optional<Date>,
    format?: 'YYYY/M/D' | 'YYYY/M',
}

export type TableCell = (CellValue | StringCellValue | NumberCellValue | DateCellValue) & CellValueOptions

export interface TableHeader {
    label?: string
    align?: 'left' | 'center' | 'right'
}

export type TableRow = Array<TableCell>
export type TableHeaders = Array<TableHeader>
export type TableRows = Array<TableRow>

export interface TableProps {
    headers: TableHeaders
    rows: TableRows
}

export const decorate = (value: Optional<string>, options: CellValueOptions) => {
    if (options.link) {
        const text = value || '#'
        const { href, type } = options.link
        if (type === 'external') {
            return <a href={href} target="_blank" rel="noopener noreferrer">{text}</a>
        }
        return <a href={href}>{text}</a>
    } else {
        return value
    }
}

export const Table: FC<TableProps> = ({ headers, rows }) => {
    for (const row of rows) {
        if (row.length !== headers.length) {
            throw new Error('The number of cells in the row does not match the number of headers')
        }
    }

    return (
        <table>
            <thead>
                <tr>
                    {headers.map((header, i) => (
                        <th key={i} style={{ textAlign: header.align }}>{header.label ?? ''}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {rows.map((row, i) => (
                    <tr key={i}>
                        {row.map((cell, j) => {
                            if (cell.type === 'number') {
                                const numberFormat = cell.format ?? new Intl.NumberFormat()
                                if (cell.value != null) {
                                    const value = decorate(
                                        numberFormat.format(cell.value),
                                        cell,
                                    )
                                    return <td key={j}>{value}</td>
                                }
                            } else if (cell.type === 'date') {
                                if (cell.value) {
                                    const format = cell.format ?? 'YYYY/M/D'
                                    const value = decorate(
                                        dayjs(cell.value).format(format),
                                        cell,
                                    )
                                    return <td key={j}>{value}</td>
                                }
                            } else {
                                const value = decorate(cell.value, cell)
                                return <td key={j}>{value}</td>
                            }
                            return <td key={j}></td>
                        })}
                    </tr>
                ))}
            </tbody>
        </table>
    )
}
