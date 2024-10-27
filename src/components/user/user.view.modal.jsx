import { Drawer, Input, Modal } from "antd";
import { useEffect, useState } from "react";


const UserViewModal = (props) => {
    const { isModalViewOpen, setIsModalViewOpen, dataView, setDataView } = props;


    const resetAndCloseModal = () => {
        setIsModalViewOpen(false);
        setDataView(null);
    };
    return (
        <Drawer title="Detail User" onClose={() => { resetAndCloseModal() }} open={isModalViewOpen}>
            {dataView ?
                <>
                    <p>Id: {dataView._id}</p>
                    <p>fullName: {dataView.fullName}</p>
                    <p>email: {dataView.email}</p>
                    <p>phone: {dataView.phone}</p>
                    <p>role: {dataView.role}</p>
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