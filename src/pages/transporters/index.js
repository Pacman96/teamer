import { useHistory } from "react-router"
import { Button } from "../../drinkit-ui/cta"
import { Page } from "../../drinkit-ui/sections"
import { Table } from "../../drinkit-ui/table"
import { useStaff } from "../../api/staff"
import { Avatar } from "../../drinkit-ui/imgs"

const List = () => {
    const { transporters } = useStaff()
    const his = useHistory()

    return (
        <Page
            title='Staff : transporters'
            next={
                <Button
                    fill
                    beforeProps={{
                        className: 'fas fa-plus',
                        style: { marginRight: 10, fontSize: 12 }
                    }}
                    children='Add new transporter'
                    onClick={() => his.push('/staff/transporters/add')}
                />
            }
        >
            <Table
                centered
                records={transporters.list}
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
                        accessor: 'transporterID',
                        render: 'accessor',
                    }
                ]}
            />
        </Page>
    )
}

export default List