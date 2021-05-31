import { useHistory } from "react-router"
import { IconButton } from "../../drinkit-ui/clickers"
import { Page } from "../../drinkit-ui/sections"
import { Table } from "../../drinkit-ui/table"
import { Avatar } from "../../drinkit-ui/imgs"
import { useEffect } from "react"
import { useProducts } from "../../api/products"

const List = () => {
    const { list, loading } = useProducts()
    const his = useHistory()
    const props = {
        page: {
            loading: loading,
            title: 'Products',
            next: <IconButton icon='plus' onClick={() => his.push('/shop/products/add')} />
        }
    }
    useEffect(() => {
    }, [list])
    return (
        <Page {...props.page} >
            <Table
                centered
                records={list}
                onRecordClick={record => his.push('/shop/products/' + record.productID)}
                columns={[
                    {
                        label: '',
                        accessor: 'images',
                        render: (record) => record.images.map((image, key) => <Avatar key={key} src={image} />)
                    },
                    {
                        label: 'Name',
                        accessor: 'label',
                        render: 'accessor',
                    },
                    {
                        label: 'Price',
                        accessor: 'price',
                        render: 'accessor',
                    },
                    {
                        label: 'Qu',
                        accessor: 'quantity',
                        render: 'accessor',
                    },
                ]}
            />
        </Page>
    )
}

export default List