import {render} from "@testing-library/react";
import {
    CellValue, CellValueOptions, DateCellValue,
    NumberCellValue,
    StringCellValue,
    Table, TableHeader,
    TableHeaders,
    TableRows
} from "@/components/ui/Table";

describe('decorate', () => {
    test.each<[string | null, CellValueOptions, string, string]>([
        ['', { link: { href: '' }}, '#', 'http://localhost/'],
        ['text', { link: { href: '#anchor' }}, 'text', 'http://localhost/#anchor'],
        ['text', { link: { type: 'external', href: 'https://example.com/path?q=v#anchor' }}, 'text', 'https://example.com/path?q=v#anchor'],
    ])(`リンクが描画される #%#`, (value, options, text, href) => {
        const {container} = render(<Table headers={[{}]} rows={[[{value, ...options}]]}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(text)
        const a = container.getElementsByTagName('a')
        expect(a.length).toBe(1)
        expect(a[0].href).toBe(href)
    })
})

describe('Table', () => {
    test.each<[TableHeader, string]>([
        [{}, ''],
        [{label: 'Head'}, 'Head'],
    ])('ヘッダーが描画される #%#', (header, expected) => {
        const {container} = render(<Table headers={[header]} rows={[[{ value: '' }]]}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(expected)
    })

    test.each<[StringCellValue | CellValue, string]>([
        [{value: null}, ''],
        [{value: undefined}, ''],
        [{value: ''}, ''],
        [{value: 'abc'}, 'abc'],
        [{value: 'def', type: 'string'}, 'def'],
    ])('文字列が描画される #%#', (cell, expected) => {
        const {container} = render(<Table headers={[{}]} rows={[[cell]]}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(expected)
    })

    test.each<[NumberCellValue, string]>([
        [{type: 'number', value: null}, ''],
        [{type: 'number', value: undefined}, ''],
        [{type: 'number', value: 0}, '0'],
        [{type: 'number', value: 0.0}, '0'],
        [{type: 'number', value: 1234}, '1,234'],
        [{type: 'number', value: 0.987654321}, '0.988'],
        [{type: 'number', value: 0.987, format: new Intl.NumberFormat('ja-JP',  { style: 'percent' })}, '99%'],
    ])('数値が描画される #%#', (cell, expected) => {
        const {container} = render(<Table headers={[{}]} rows={[[cell]]}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(expected)
    })

    test.each<[DateCellValue, string]>([
        [{type: 'date', value: null}, ''],
        [{type: 'date', value: undefined}, ''],
        [{type: 'date', value: new Date('2021-01-02')}, '2021/1/2'],
        [{type: 'date', value: new Date('2112-09-03'), format: 'YYYY/M/D'}, '2112/9/3'],
        [{type: 'date', value: new Date('2112-09-03'), format: 'YYYY/M'}, '2112/9'],
    ])('日付が描画される #%#', (cell, expected) => {
        const {container} = render(<Table headers={[{}]} rows={[[cell]]}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(expected)
    })

    it('テーブルが描画される', () => {
        const headers: TableHeaders = [
            {label: 'Head1'},
            {label: 'Head2'},
        ]
        const rows: TableRows = [
            [{value: 'Row1Cell1'}, {value: 'Row1Cell2', type: 'string', link: { href: 'https://example.com/', type: 'external' }}],
            [{value: 54345, type: 'number'}, {value: new Date('2112-9-3'), type: 'date'}],
        ]
        const {container} = render(<Table headers={headers} rows={rows}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(
            'Head1Head2Row1Cell1Row1Cell254,3452112/9/3',
        )

        const a = container.getElementsByTagName('a')
        expect(a.length).toBe(1)
        expect(a[0].href).toBe('https://example.com/')
        expect(a[0].target).toBe('_blank')
        expect(a[0].rel).toBe('noopener noreferrer')
    })

    it('行が空の場合でもテーブルが描画される', () => {
        const headers: TableHeaders = [
            {label: 'Head1'},
            {label: 'Head2'},
        ]
        const {container} = render(<Table headers={headers} rows={[]}/>)
        const table = container.getElementsByTagName('table')
        expect(table.length).toBe(1)
        expect(table[0].textContent).toBe(
            'Head1Head2No data',
        )
    })

    describe('バリデーションエラー', () => {
        beforeEach(() => {
            jest.spyOn(console, 'error').mockImplementation()
        })

        afterEach(() => {
            jest.restoreAllMocks()
        })

        test('ヘッダと行の長さが一致しない', () => {
            const headers: TableHeaders = [{label: 'a'}, {label: 'b'}]
            const rows: TableRows = [[{value: 'a'}]]
            expect(() => {
                render(<Table headers={headers} rows={rows}/>)
            }).toThrow(
                new Error('The number of cells in the row does not match the number of headers')
            )
        })
    })
})
