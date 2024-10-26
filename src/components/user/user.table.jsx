import { Table } from 'antd';

const UserTable = (props) => {
    const columns = [
        {
            title: 'Id',
            dataIndex: '_id',
        },
        {
            title: 'Full Name',
            dataIndex: 'fullName',
        },
        {
            title: 'Email',
            dataIndex: 'email',
        },
        {
            title: 'Phone',
            dataIndex: 'phone',
        },
    ];
    return (
        <Table
            columns={columns}
            dataSource={props.dataUser}
            rowKey={"_id"}
        />
    )
}

export default UserTable;