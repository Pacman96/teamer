import { useHistory } from "react-router"
import { Button } from "../../drinkit-ui/cta"
import { Page } from "../../drinkit-ui/sections"
import { Table } from "../../drinkit-ui/table"
import { useStaff } from "../../api/staff"
import { Avatar } from "../../drinkit-ui/imgs"

const List = () => {
    const { suppliers } = useStaff()
    const his = useHistory()

    return (
        <Page
            title='Staff : suppliers'
            next={
                <Button
                    fill
                    beforeProps={{
                        className: 'fas fa-plus',
                        style: { marginRight: 10, fontSize: 12 }
                    }}
                    children='Add new supplier'
                    onClick={() => his.push('/staff/suppliers/add')}
                />
            }
        >
            <Table
                centered
                records={suppliers.list}
                onRecordClick={record => his.push('/assets/attributes/' + record.attributeID)}
                columns={[
                    {
                        label: '',
                        accessor: 'avatar',
                        render: (record) => <Avatar src={record.avatar}/> ,
                        width: 100
                    },
                    {
                        label: 'Username',
                        accessor: 'username',
                        render: 'accessor',
                    },
                    {
                        label: 'userID',
                        accessor: 'supplierID',
                        render: 'accessor',
                    }
                ]}
            />
        </Page>
    )
}

export default List