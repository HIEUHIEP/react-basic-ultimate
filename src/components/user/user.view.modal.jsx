import { Button, Drawer, notification } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFileAPI, updateUserAvatarAPI } from "../../services/api.service";


const UserViewModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataView, setDataView, loadUser } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

    // create a preview as a side effect, whenever selected file is changed
    useEffect(() => {
        if (!selectedFile) {
            return;
        }

        const objectUrl = URL.createObjectURL(selectedFile)
        setPreview(objectUrl)

        // free memory when ever this component is unmounted
        return () => URL.revokeObjectURL(objectUrl)
    }, [selectedFile])

    const resetAndCloseModal = () => {
        setIsModalViewOpen(false);
        setDataView(null);
        setSelectedFile(null);
    };
    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            return;
        }

        // I've kept this example simple by using the first image instead of multiple
        setSelectedFile(event.target.files[0])
    };
    const handleUpdateUserAvatar = async () => {
        const res = await handleUploadFileAPI(selectedFile, "avatar")
        // console.log(res);
        if (res.data) {
            const newAvatar = res.data.fileUploaded;
            const resUpdateAvatar = await updateUserAvatarAPI(dataView._id, dataView.fullName, dataView.phone, newAvatar);
            // console.log(resUpdateAvatar)

            if (resUpdateAvatar.data) {
                resetAndCloseModal();
                await loadUser();
                notification.success({
                    message: "OK",
                    description: "Update OK nhé "
                });
            } else {
                notification.error({
                    message: "NG",
                    description: JSON.stringify(resUpdateAvatar.message)
                });
            }
        } else {
            notification.error({
                message: "NG",
                description: JSON.stringify(res.message)
            });
        }


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
                    <div style={{
                        marginTop: "10px",
                        height: "100px",
                        width: "150px",
                        border: "1px solid #ccc"
                    }}>
                        <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={`${import.meta.env.VITE_BACKEND_URL}/images/avatar/${dataView.avatar}`}></img>
                    </div>
                    <div>
                        <label htmlFor='btnUpload' style={{
                            marginTop: "10px",
                            display: "block",
                            width: "fit-content",
                            padding: "5px 10px",
                            background: "orange",
                            borderRadius: "5px",
                            cursor: "pointer"
                        }}>Upload Avatar</label>
                        <input type='file' id='btnUpload' hidden onChange={(event) => handleOnChangeFile(event)} />
                    </div>
                    {selectedFile &&
                        <>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                height: "100px",
                                width: "150px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview}></img>
                            </div>
                            <Button type="primary" onClick={() => { handleUpdateUserAvatar() }}>Save</Button>
                        </>
                    }
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