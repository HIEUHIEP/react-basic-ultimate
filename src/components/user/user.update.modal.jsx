import { Input, Modal, notification } from "antd";
import { useEffect, useState } from "react";
import { updateUserAPI } from "../../services/api.service";


const UserUpdateModal = (props) => {
    const [fullName, setFullName] = useState("");
    const [id, setId] = useState("");
    const [phone, setPhone] = useState("");
    const { isModalUpdateOpen, setIsModalUpdateOpen, dataUpdate, setDataUpdate, loadUser } = props;

    useEffect(() => {
        if (dataUpdate) {
            setFullName(dataUpdate.fullName);
            setId(dataUpdate._id);
            setPhone(dataUpdate.phone);
        }
    }, [dataUpdate]);

    const handleSubmitBtn = async () => {
        const res = await updateUserAPI(id, fullName, phone);
        // debugger
        if (res.data.modifiedCount === 1) {
            notification.success({
                message: "OK",
                description: "Update OK nhé "
            });
            resetAndCloseModal();
            await loadUser();
        } else {
            notification.error({
                message: "NG",
                description: "Update NG rồi"
            });
        }

    };
    const resetAndCloseModal = () => {
        setFullName("");
        setId("");
        setPhone("");
        setIsModalUpdateOpen(false);
        setDataUpdate(null);
    };
    return (
        <Modal
            title="Update User"
            open={isModalUpdateOpen}
            onOk={() => handleSubmitBtn()}
            onCancel={() => { resetAndCloseModal() }}
            maskClosable={false}
            okText={"Update"}
        >
            <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                <div>
                    <span>Id</span>
                    <Input
                        value={id}
                        disabled
                    />
                </div>
                <div>
                    <span>Full name</span>
                    <Input
                        value={fullName}
                        onChange={(event) => setFullName(event.target.value)}
                    />
                </div>
                <div>
                    <span>Phoen number</span>
                    <Input
                        value={phone}
                        onChange={(event) => setPhone(event.target.value)} />
                </div>
            </div>
        </Modal>
    );
}

export default UserUpdateModal;