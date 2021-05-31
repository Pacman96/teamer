import { useHistory } from "react-router"
import { IconButton } from "../../../drinkit-ui/clickers"
import { Page } from "../../../drinkit-ui/sections"
import { useAssets } from "../../../api/assets"
import { Table } from "../../../drinkit-ui/table"

const CollectionsList = () => {
    const { collections } = useAssets()
    const his = useHistory()
    const props = {
        page: {
            title: 'Collections',
            next: <IconButton icon='plus' onClick={() => his.push('/assets/collections/add')} />
        }
    }
    return (
        <Page {...props.page} >
            <Table
                centered
                records={collections.list}
                onRecordClick={record => his.push('/assets/collections/' + record.id)}
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
                        label: 'SubCollections',
                        accessor: 'children',
                        render: (record) => record.children.map(({ label }) => label).join(', ').toString(),
                    },
                ]}
            />        </Page>
    )
}

export default CollectionsList