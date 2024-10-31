import { Form, Input, InputNumber, Modal, notification, Select } from "antd";
import { useState } from "react";
import { createBookAPI, handleUploadFileAPI } from "../../services/api.service";
import { useForm } from "antd/es/form/Form";

const BookNewUncontrol = (props) => {
    const [form] = useForm();
    const { isModalAddBookOpen, setIsModalAddBookOpen, getDataBooks } = props;
    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);

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
        setPreview(null);
        setSelectedFile(null);
        setIsModalAddBookOpen(false);
        form.resetFields();
    }

    const onFinish = async (values) => {
        //call API upload image.
        if (!selectedFile) {
            notification.error({
                message: "NG",
                description: "Please select image "
            });
        } else {
            const res = await handleUploadFileAPI(selectedFile, "book")
            //Get file name.
            if (res.data) {
                const thumbnail = res.data.fileUploaded;
                const resUpdateAvatar = await createBookAPI(values.mainText, values.author, values.price, values.quantity, values.category, thumbnail);

                if (resUpdateAvatar.data) {
                    onCancelHandle();
                    await getDataBooks();
                    notification.success({
                        message: "OK",
                        description: "Create book OK nhé "
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
        }
    }
    return (
        <>
            <Modal
                title="Create Book Uncontroll"
                open={isModalAddBookOpen}
                onOk={() => { form.submit() }}
                onCancel={() => onCancelHandle()}
                okText={"Create"}>
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
                                    {/* <Button type="primary" onClick={() => { handleUpdateUserAvatar() }}>Save</Button> */}
                                </>
                            }
                        </div>
                    </div>








                </Form >
            </Modal >

        </>
    );
}

export default BookNewUncontrol;