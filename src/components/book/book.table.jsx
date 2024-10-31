import { DeleteTwoTone, EditTwoTone } from "@ant-design/icons";
import { notification, Popconfirm, Table } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";
import BookDetail from "./book.detail";
import { deleteBookAPI } from "../../services/api.service";

const BookTable = (props) => {
    const { current, setCurrent, pageSize, setPageSize, total, dataBooks, getDataBooks, setIsModalUpdateBookOpen, setDataBookUpdate } = props;

    const [isOpenDetailBook, setIsOpenDetailBook] = useState(false);
    const [dataBook, setDataBook] = useState(null);
    const onChange = (pagination, filters, sorter, extra) => {
        console.log({ pagination, filters, sorter, extra })
        if (+pagination.current !== +current) {
            setCurrent(+pagination.current);
        }
        if (+pagination.pageSize !== +pageSize) {
            setPageSize(+pagination.pageSize);
        }
    };

    const columns = [
        {
            title: 'STT',
            render: (text, record, index) => ((index + 1) + (current - 1) * pageSize)
        },
        {
            title: 'Id',
            dataIndex: '_id',
            render: (_, record) => <Link
                onClick={() => {
                    setIsOpenDetailBook(true);
                    setDataBook(record);
                }}>{record._id}</Link>,
        },
        {
            title: 'Tiêu đề',
            dataIndex: 'mainText',
        },
        {
            title: 'Giá tiền',
            dataIndex: 'price',
            render: (text) => text.toFixed(0).replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1,') + " đ"
        },
        {
            title: 'Số lượng',
            dataIndex: 'quantity',
        },
        {
            title: 'Tác giả',
            dataIndex: 'author',
        },
        {
            title: 'Action',
            // key: 'action',
            render: (text, record, index) => (
                <div style={{ display: "flex", gap: "20px" }}>
                    <EditTwoTone
                        style={{ cursor: "pointer", fontSize: "20px" }}
                        onClick={() => {
                            setIsModalUpdateBookOpen(true);
                            setDataBookUpdate(record);
                            //             // setIsModalUpdateOpen(true);
                            //             // setDataUpdate(record);
                        }}
                    />
                    < Popconfirm
                        placement="left"
                        title="Delete the book"
                        description="Are you sure to delete this book?"
                        onConfirm={() => { handleDeleteBtn(record._id) }}
                        // onCancel={cancel}
                        okText="Yes"
                        cancelText="No"
                    >
                        <DeleteTwoTone style={{ cursor: "pointer", fontSize: "20px" }} />
                    </Popconfirm>
                </div >

            ),
        },
    ];

    const handleDeleteBtn = async (id) => {
        const res = await deleteBookAPI(id);
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
        await getDataBooks();
    };
    return (
        <>
            <div>

            </div>
            <Table
                dataSource={dataBooks}
                columns={columns}
                rowKey={"_id"}
                pagination={
                    {
                        current: current,
                        // defaultCurrent: 6,
                        pageSize: pageSize,
                        showSizeChanger: true, // show pulldown select number record on 1page.
                        total: total,
                        pageSizeOptions: [5, 10, 20, 30],
                        // defaultPageSize: 0,
                        showTotal: (total, range) => { return (<div> {range[0]}-{range[1]} / {total} rows</div>) },
                    }

                }
                onChange={onChange}
            />
            <BookDetail
                isOpenDetailBook={isOpenDetailBook}
                setIsOpenDetailBook={setIsOpenDetailBook}
                dataBook={dataBook}
            />
        </>


    )
}

export default BookTable;