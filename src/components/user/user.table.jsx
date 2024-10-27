import { DeleteOutlined, EditOutlined } from '@ant-design/icons';
import { notification, Popconfirm, Table } from 'antd';
import UserUpdateModal from './user.update.modal';
import { useState } from 'react';
import UserViewModal from './user.view.modal';
import { Link } from 'react-router-dom';
import { deleteUserAPI } from '../../services/api.service';

const UserTable = (props) => {
    const { dataUser, loadUser, current, setCurrent, pageSize, setPageSize, total } = props;
    const [isModalUpdateOpen, setIsModalUpdateOpen] = useState(false);
    const [isModalViewOpen, setIsModalViewOpen] = useState(false);
    const [dataUpdate, setDataUpdate] = useState({});
    const [dataView, setDataView] = useState({});
    const handleDeleteBtn = async (id) => {
        const res = await deleteUserAPI(id);
        if (res.data) {
            notification.success({
                message: "OK",
                description: " Delete OK"
            })
        } else {
            notification.error({
                message: "NG",
                description: JSON.stringify(res.message)
            })
        }
        await loadUser();
    };
    const columns = [
        {
            title: 'STT',
            render: (_, record, index) => {
                return (
                    <>{(index + 1) + (current - 1) * pageSize}</>
                )
            },
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => <Link onClick={() => { setIsModalViewOpen(true); setDataView(record) }}>{record._id}</Link>,
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
                    <Popconfirm
                        placement="left"
                        title="Delete the user"
                        description="Are you sure to delete this user?"
                        onConfirm={() => { handleDeleteBtn(record._id) }}
                        // onCancel={ }
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteOutlined danger style={{ cursor: "pointer", color: "red", fontSize: "20px" }} />
                    </Popconfirm>

                </div>
            ),
        },
    ];

    const onChange = (pagination, filters, sorter, extra) => {
        console.log({ pagination, filters, sorter, extra })
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    return (
        <>
            <UserUpdateModal
                isModalUpdateOpen={isModalUpdateOpen}
                setIsModalUpdateOpen={() => setIsModalUpdateOpen()}
                dataUpdate={dataUpdate}
                setDataUpdate={() => setDataUpdate()}
                loadUser={loadUser}
            />
            <UserViewModal
                isModalViewOpen={isModalViewOpen}
                setIsModalViewOpen={() => setIsModalViewOpen()}
                dataView={dataView}
                setDataView={() => setDataView()}
                loadUser={() => { loadUser() }}
            />
            <Table
                columns={columns}
                dataSource={dataUser}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        pageSize: pageSize,
                        showSizeChanger: true, // show pulldown select number record on 1page.
                        total: total,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} / {total} rows</div>) },
                    }

                }
                onChange={onChange}
            />
        </>
    )
}

export default UserTable;