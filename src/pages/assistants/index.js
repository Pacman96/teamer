import { useHistory } from "react-router"
import { Button } from "../../drinkit-ui/cta"
import { Page } from "../../drinkit-ui/sections"
import { Table } from "../../drinkit-ui/table"
import { useStaff } from "../../api/staff"
import { Avatar } from "../../drinkit-ui/imgs"

const List = () => {
    const { assistants } = useStaff()
    const his = useHistory()

    return (
        <Page
            title='Staff : assistants'
            next={
                <Button
                    fill
                    beforeProps={{
                        className: 'fas fa-plus',
                        style: { marginRight: 10, fontSize: 12 }
                    }}
                    children='Add new assistant'
                    onClick={() => his.push('/staff/assistants/add')}
                />
            }
        >
            <Table
                centered
                records={assistants.list}
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
                        accessor: 'assistantID',
                        render: 'accessor',
                    }
                ]}
            />
        </Page>
    )
}

export default List