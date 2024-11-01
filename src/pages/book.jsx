import BookTable from "../components/book/book.table";
import { useEffect, useState } from "react";
import { fetchAllBookAPI } from "../services/api.service";
import { Button } from "antd";
import BookNewUncontrol from "../components/book/book.new.uncontrol";
import BookUpdateUncontrol from "../components/book/book.update.uncontrol";

const BookPage = () => {

    const [current, setCurrent] = useState(1);
    const [pageSize, setPageSize] = useState(10);
    const [total, setTotal] = useState(0);
    const [dataBooks, setDataBooks] = useState([]);
    const [isModalAddBookOpen, setIsModalAddBookOpen] = useState(false);
    const [isModalUpdateBookOpen, setIsModalUpdateBookOpen] = useState(false);
    const [dataBookUpdate, setDataBookUpdate] = useState({});
    const [loadingTable, setLoadingTable] = useState(false);

    useEffect(() => {
        getDataBooks();
    }, [current, pageSize])

    const getDataBooks = async () => {
        setLoadingTable(true);
        const res = await fetchAllBookAPI(current, pageSize);
        if (res.data.result) {
            setCurrent(res.data.meta.current);
            setPageSize(res.data.meta.pageSize);
            setTotal(res.data.meta.total);
        }
        setDataBooks(res.data.result);
        setLoadingTable(false);
    }

    return (
        <div style={{ padding: "20px" }}>
            {/* <UserForm loadUser={loadUser} /> */}
            <div style={{ display: "flex", justifyContent: "space-between" }}>
                <h3>Table Books</h3>
                <Button
                    type="primary"
                    onClick={() => { setIsModalAddBookOpen(true) }}
                > Create book </Button>
            </div>
            <BookTable
                loadingTable={loadingTable}
                setDataBookUpdate={setDataBookUpdate}
                dataBooks={dataBooks}
                getDataBooks={getDataBooks}
                // loadUser={loadUser}
                current={current}
                setCurrent={setCurrent}
                pageSize={pageSize}
                setPageSize={setPageSize}
                total={total}

                setIsModalUpdateBookOpen={setIsModalUpdateBookOpen}
            />
            {/* <BookNew
                getDataBooks={getDataBooks}
                isModalAddBookOpen={isModalAddBookOpen}
                setIsModalAddBookOpen={setIsModalAddBookOpen}
            /> */}
            <BookNewUncontrol
                getDataBooks={getDataBooks}
                isModalAddBookOpen={isModalAddBookOpen}
                setIsModalAddBookOpen={setIsModalAddBookOpen}
            />
            {/* <BookUpdate
                dataBookUpdate={dataBookUpdate}
                dataBooks={dataBooks}
                getDataBooks={getDataBooks}
                isModalUpdateBookOpen={isModalUpdateBookOpen}
                setIsModalUpdateBookOpen={setIsModalUpdateBookOpen}
            /> */}
            <BookUpdateUncontrol
                dataBookUpdate={dataBookUpdate}
                dataBooks={dataBooks}
                getDataBooks={getDataBooks}
                isModalUpdateBookOpen={isModalUpdateBookOpen}
                setIsModalUpdateBookOpen={setIsModalUpdateBookOpen}
            />

        </div>
    )
}

export default BookPage;