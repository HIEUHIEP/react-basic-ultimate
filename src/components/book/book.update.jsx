import { Input, InputNumber, Modal, notification, Select } from "antd";
import { useEffect, useState } from "react";
import { handleUploadFileAPI, updateBookAPI } from "../../services/api.service";

const BookUpdate = (props) => {
    const { isModalUpdateBookOpen, setIsModalUpdateBookOpen, getDataBooks, dataBookUpdate } = props;
    const [id, setId] = useState("");
    const [mainText, setMainText] = useState("");
    const [author, setAuthor] = useState("");
    const [price, setPrice] = useState("");
    const [quantity, setQuantity] = useState("");
    const [category, setCategory] = useState("");

    const [selectedFile, setSelectedFile] = useState(null);
    const [preview, setPreview] = useState(null);
    useEffect(() => {
        if (dataBookUpdate) {
            setId(dataBookUpdate._id);
            setMainText(dataBookUpdate.mainText);
            setAuthor(dataBookUpdate.author);
            setPrice(dataBookUpdate.price);
            setQuantity(dataBookUpdate.quantity);
            setCategory(dataBookUpdate.category);
            // setThumbnail(dataBookUpdate.thumbnail);
            setPreview(`${import.meta.env.VITE_BACKEND_URL}/images/book/${dataBookUpdate.thumbnail}`);
            // console.log(dataBookUpdate)
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
        //clear
        setMainText("");
        setAuthor("");
        setPrice("");
        setQuantity("");
        setCategory("");
        // setThumbnail("");
        setPreview(null);
        setSelectedFile(null);

        setIsModalUpdateBookOpen(false);
    }

    const onOkHandle = async () => {
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

        const resUpdateImg = await updateBookAPI(id, mainText, author, price, quantity, category, newThembnail);
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
                title="Update book"
                open={isModalUpdateBookOpen}
                onOk={() => { onOkHandle() }}
                onCancel={() => onCancelHandle()}
                okText={"Update"}>

                <div style={{ display: "flex", gap: "15px", flexDirection: "column" }}>
                    <div>
                        <span>Id</span>
                        <Input
                            value={id} disabled
                        />
                    </div>
                    <div>
                        <span>Title</span>
                        <Input
                            value={mainText}
                            onChange={(event) => setMainText(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Author</span>
                        <Input
                            value={author}
                            onChange={(event) => setAuthor(event.target.value)}
                        />
                    </div>
                    <div>
                        <span>Pice</span>
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            value={price}
                            min={1}
                            max={1000000}
                            defaultValue={price}
                            onChange={(value) => setPrice(value)} />
                    </div>
                    <div>
                        <span>Quantity</span>
                        <InputNumber
                            style={{
                                width: "100%",
                            }}
                            value={quantity}
                            min={1}
                            max={1000000}
                            // defaultValue={0}
                            onChange={(value) => setQuantity(value)} />
                    </div>
                    <div>
                        <span>Category</span>
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
                            value={category}
                            onChange={(value) => setCategory(value)}
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
                    </div>
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
                            <input type='file' id='btnUploadImg' hidden onChange={(event) => handleOnChangeFile(event)} onClick={(event) => { event.target.value = null }} />
                        </div>
                        {selectedFile ?
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
                            :
                            <>
                                <img style={{ height: "100px", width: "150px", objectFit: "contain" }} src={preview}></img>
                            </>
                        }
                    </div>
                </div>
            </Modal >
        </>
    );
}

export default BookUpdate;