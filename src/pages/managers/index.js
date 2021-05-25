import { useHistory } from "react-router"
import { IconButton } from "../../drinkit-ui/clickers"
import { Page } from "../../drinkit-ui/sections"
import { Table } from "../../drinkit-ui/table"
import { useStaff } from "../../api/staff"
import { Avatar } from "../../drinkit-ui/imgs"

const ManagersList = () => {
    const { managers } = useStaff()
    const his = useHistory()
    const props = {
        page: {
            title: 'Managers',
            next: <IconButton icon='plus' onClick={() => his.push('/staff/managers/add')} />
        }
    }
    return (
        <Page {...props.page}>
            <Table
                centered
                records={managers.list}
                onRecordClick={record => his.push('/assets/attributes/' + record.attributeID)}
                columns={[
                    {
                        label: '',
                        accessor: 'avatar',
                        render: (record) => <Avatar src={record.avatar} />,
                        width: 100
                    },
                    {
                        label: 'Username',
                        accessor: 'username',
                        render: 'accessor',
                    },
                    {
                        label: 'userID',
                        accessor: 'managerID',
                        render: 'accessor',
                    }
                ]}
            />
        </Page>
    )
}

export default ManagersList