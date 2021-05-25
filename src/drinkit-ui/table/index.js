import { Block } from "../base"

export const Table = ({
    columns = [],
    records = [],
    onRecordClick,
    theme,
    centered
}) => {
    const view = (col, record) => {
        if (col.render === 'accessor') return record[col.accessor]
        return col.render(record)
    }
    const onRowClick = (record) => {
        onRecordClick && onRecordClick(record)
    }
    return (
        <Block htmlTag='table' curve='curved' theme='primary' >

            <thead>
                <tr >
                    {columns.map((col, key) => <th key={key} style={{ width: col.width }}>{col.label}</th>)}
                </tr>
            </thead>

            <tbody>
                {records.length > 0 ?
                    records.map((record, key) =>
                        <tr key={key} onClick={() => onRowClick(record)}>
                            {columns.map((col, key) => <td style={{ width: col.width }} key={key} style={{ textAlign: centered && 'center' }} >
                                {view(col, record)}
                            </td>
                            )}
                        </tr>
                    ) : null}
            </tbody>
            <tfoot>
                <tr></tr>
            </tfoot>

        </Block>
    )
}
