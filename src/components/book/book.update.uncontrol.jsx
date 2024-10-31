import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFileAPI, updateBookAPI } from "../../services/api.service";
import { useForm } from "antd/es/form/Form";

const BookUpdateUncontrol = (props) => {
    const [form] = useForm();
    const { isModalUpdateBookOpen, setIsModalUpdateBookOpen, getDataBooks, dataBookUpdate } = props;

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        if (dataBookUpdate) {
            // console.log(dataBookUpdate)
            form.setFieldsValue({
                _id: dataBookUpdate._id,
                mainText: dataBookUpdate.mainText,
                author: dataBookUpdate.author,
                price: dataBookUpdate.price,
                quantity: dataBookUpdate.quantity,
                category: dataBookUpdate.category
            })

            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
        }
    }, [dataBookUpdate]);

    const handleOnChangeFile = (event) => {
        if (!event.target.files || event.target.files.length === 0) {
            setPreview(null);
            setSelectedFile(null);
            return;
        }
        // I've kept this example simple by using the first image instead of multiple
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file)
            setPreview(URL.createObjectURL(file))
        }

    };
    const onCancelHandle = () => {
        // setThumbnail("");
        setPreview(null);
        setSelectedFile(null);

        setIsModalUpdateBookOpen(false);
    }

    const onFinish = async (values) => {
        //call API upload image.


        if (!selectedFile && !preview) {
            notification.error({
                message: "NG",
                description: "Please upload file image"
            });
            return;
        }

        let newThembnail = "";
        if (!selectedFile && preview) {
            newThembnail = dataBookUpdate.thumbnail;
        } else if (selectedFile) {
            const res = await handleUploadFileAPI(selectedFile, "book");
            newThembnail = res.data.fileUploaded;
        }
        //Get file name.

        const resUpdateImg = await updateBookAPI(values._id, values.mainText, values.author, values.price, values.quantity, values.category, newThembnail);
        // console.log(resUpdateAvatar)

        if (resUpdateImg.data) {
            await getDataBooks();
            onCancelHandle();
            notification.success({
                message: "OK",
                description: "Create book OK nhé "
            });
        } else {
            notification.error({
                message: "NG",
                description: JSON.stringify(resUpdateImg.message)
            });
        }
    }


    return (
        <>
            <Modal
                title="Update Book Uncontroll"
                open={isModalUpdateBookOpen}
                onOk={() => { form.submit() }}
                onCancel={() => onCancelHandle()}
                okText={"Update"}>
                <Form
                    layout="vertical"
                    form={form}
                    onFinish={onFinish}
                    labelCol={{
                        span: 4,
                    }}
                    wrapperCol={{
                        span: 24,
                    }}
                    style={{
                        maxWidth: "100%",
                    }}
                    initialValues={{
                        remember: true,
                    }}
                    // onFinish={onFinish}
                    // onFinishFailed={onFinishFailed}
                    autoComplete="off"
                >
                    <Form.Item
                        label="id"
                        name="_id"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                    >
                        <Input disabled />
                    </Form.Item>
                    <Form.Item
                        label="mainText"
                        name="mainText"
                        style={{
                            display: "flex",
                            flexDirection: "column",
                        }}
                        rules={[
                            {
                                required: true,
                                message: 'Please input your mainText!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="author"
                        name="author"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your author!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>

                    <Form.Item
                        label="price"
                        name="price"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your price!',
                            },
                        ]}
                    >
                        <InputNumber style={{ width: "100%" }}
                            addonAfter={' đ'} />
                    </Form.Item>

                    <Form.Item
                        label="quantity"
                        name="quantity"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your quantity!',
                            },
                        ]}
                    >
                        <InputNumber style={{
                            width: "100%",
                        }} />
                    </Form.Item>

                    <Form.Item
                        label="category"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your category!',
                            },
                        ]}
                    >
                        <Select
                            showSearch
                            style={{
                                width: "100%",
                            }}
                            placeholder="Search to Select"
                            optionFilterProp="label"
                            filterSort={(optionA, optionB) =>
                                (optionA?.label ?? '').toLowerCase().localeCompare((optionB?.label ?? '').toLowerCase())
                            }
                            // labeledvalue={category}
                            // value={category}
                            // onChange={(value) => setCategory(value)}
                            // onSelect={(value) => setCategory(value)}
                            options={[
                                {
                                    value: 'Business', label: 'Business',
                                },
                                {
                                    value: 'Music', label: 'Music',
                                },
                                {
                                    value: 'History', label: 'History',
                                },
                                {
                                    value: 'Arts', label: 'Arts',
                                },
                            ]}
                        />
                    </Form.Item>

                    <div>
                        <div>
                            <span>thumbnail</span>
                            <div>
                                <label htmlFor='btnUploadImg' style={{
                                    marginTop: "10px",
                                    display: "block",
                                    width: "fit-content",
                                    padding: "5px 10px",
                                    background: "orange",
                                    borderRadius: "5px",
                                    cursor: "pointer"
                                }}>Upload</label>
                                <input type='file' id='btnUploadImg' style={{ display: "none" }} hidden onChange={(event) => handleOnChangeFile(event)} onClick={(event) => { event.target.value = null }} />
                            </div>
                            <div style={{
                                marginTop: "10px",
                                marginBottom: "10px",
                                height: "100px",
                                width: "150px",
                                border: "1px solid #ccc"
                            }}>
                                <img style={{ height: "100%", width: "100%", objectFit: "contain" }} src={preview}></img>
                            </div>
                        </div>
                    </div>
                </Form >
            </Modal >
        </>
    );
}

export default BookUpdateUncontrol;