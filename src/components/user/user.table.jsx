import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { Table } from 'antd';
import UserUpdateModal from './user.update.modal';
import { useState } from 'react';

const UserTable = (props) => {
    const { dataUser, loadUser } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
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
        {
            title: 'Action',
            key: 'action',
            render: (_, record) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditOutlined
                        style={{ cursor: "pointer", color: "orange", fontSize: "20px" }}
                        onClick={() => {
                            setIsModalUpdateOpen(true);
                            setDataUpdate(record);
                        }}
                    />
                    <DeleteOutlined style={{ cursor: "pointer", color: "red", fontSize: "20px" }} />
                </div>
            ),
        },
    ];



    return (
        <>
            <UserUpdateModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={() => setIsModalUpdateOpen()}
                dataUpdate={dataUpdate}
                setDataUpdate={() => setDataUpdate()}
                loadUser={loadUser}
            />
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
            />
        </>
    )
}

export default UserTable;