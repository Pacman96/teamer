import { useHistory } from "react-router"
import { Chip, IconButton } from "../../../drinkit-ui/clickers"
import { Page } from "../../../drinkit-ui/sections"
import { useAssets } from "../../../api/assets"
import { Table } from "../../../drinkit-ui/table"

const AttributesList = () => {
    const { attributes } = useAssets()
    const his = useHistory()
    const props = {
        page: {
            title: 'Attributes',
            next: <IconButton icon='plus' onClick={() => his.push('/assets/attributes/add')} />
        }
    }
    return (
        <Page {...props.page} >
            <Table
                centered
                records={attributes.list}
                onRecordClick={record => his.push('/assets/attributes/' + record.id)}
                columns={[
                    {
                        label: 'ID',
                        accessor: 'id',
                        render: 'accessor',
                    },
                    {
                        label: 'Label',
                        accessor: 'label',
                        render: 'accessor',
                    },
                    {
                        label: 'Variations',
                        accessor: 'children',
                        render: (record) => record.children.map((variation, index) => <Chip key={index} text={variation.label} block/>),
                    },
                ]}
            />
        </Page>
    )
}

export default AttributesList