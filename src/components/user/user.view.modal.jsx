import { Drawer } from "antd";


const UserViewModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataView, setDataView } = props;


    const resetAndCloseModal = () => {
        setIsModalViewOpen(false);
        setDataView(null);
    };
    return (
        <Drawer
            title="Detail User"
            width={"40vw"}
            onClose={() => { resetAndCloseModal() }}
            open={isModalViewOpen}
        >
            {dataView ?
                <>
                    <p>Id: {dataView._id}</p>
                    <br />
                    <p>fullName: {dataView.fullName}</p>
                    <br />
                    <p>email: {dataView.email}</p>
                    <br />
                    <p>phone: {dataView.phone}</p>
                    <br />
                    <p>role: {dataView.role}</p>
                    <br />
                    <p>Avatar: </p>
                    <div>
                        <img height={150} width={150} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataView.avatar}`}></img>
                    </div>
                    <div>
                        <label htmlFor='btnUpload' style={{
                            display: "block",
                            width: "fit-content",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload Avatar</label>
                        <input type='file' id='btnUpload' hidden />
                    </div>
                    {/* <Button htmlFor="btnUpload" type="primary"> Upload avatar</Button> */}
                </>
                :
                <>
                    <p>Không có dữ liệu</p>
                </>
            }
        </Drawer>
    );
}

export default UserViewModal;