import { Drawer } from "antd";

const BookDetail = (props) => {
    const { isOpenDetailBook, setIsOpenDetailBook, dataBook } = props;

    const handleClose = () => {
        setIsOpenDetailBook(false);
        // clear data book
    }

    return (
        <>

            <Drawer title="Detail Book" onClose={() => handleClose()} open={isOpenDetailBook}>
                {dataBook ?
                    <>
                        <p>Id: {dataBook._id}</p>
                        <br />
                        <p>mainText: {dataBook.mainText}</p>
                        <br />
                        <p>author: {dataBook.author}</p>
                        <br />
                        <p>price: {dataBook.price}</p>
                        <br />
                        <p>sold: {dataBook.sold}</p>
                        <br />
                        <p>quantity: {dataBook.quantity}</p>
                        <br />
                        <p>category: {dataBook.category}</p>
                        <br />
                        <p>Image: </p>
                        <div style={{
                            marginTop: "10px",
                            height: "100px",
                            width: "150px",
                            border: "1px solid #ccc"
                        }}>
                            <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBook.thumbnail}`}></img>
                        </div>
                    </>
                    :
                    <p>không có data</p>
                }


            </Drawer >

        </>
    );
}

export default BookDetail;