// import axios from "axios";
import axios from "./axios.customize";

const createUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    return axios.post(URL_BACKEND, data);
}

const updateUserAPI = (_id, fullName, phone) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone
    };
    return axios.put(URL_BACKEND, data);
}

const deleteUserAPI = (_id) => {
    const URL_BACKEND = `/api/v1/user/${_id}`;
    return axios.delete(URL_BACKEND);
}

const handleUploadFileAPI = (file, folder) => {
    const URL_BACKEND = '/api/v1/file/upload';
    const formData = new FormData();
    formData.append('fileImg', file)
    const config = {
        headers: {
            'upload-type': folder,
            'content-type': 'multipart/form-data'
        }
    }
    return axios.post(URL_BACKEND, formData, config)
}

const updateUserAvatarAPI = (_id, fullName, phone, avatar) => {
    const URL_BACKEND = "/api/v1/user";
    const data = {
        _id: _id,
        fullName: fullName,
        phone: phone,
        avatar: avatar
    };
    return axios.put(URL_BACKEND, data);
}

const createBookAPI = (mainText, author, price, quantity, category, thumbnail) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
        thumbnail: thumbnail
    };
    return axios.post(URL_BACKEND, data);
}

const updateBookAPI = (_id, mainText, author, price, quantity, category, thumbnail) => {
    const URL_BACKEND = "/api/v1/book";
    const data = {
        _id: _id,
        mainText: mainText,
        author: author,
        price: price,
        quantity: quantity,
        category: category,
        thumbnail: thumbnail
    };
    return axios.put(URL_BACKEND, data);
}

const deleteBookAPI = (id) => {
    const URL_BACKEND = `/api/v1/book/${id}`;
    return axios.delete(URL_BACKEND);
}

const registerUserAPI = (fullName, email, password, phone) => {
    const URL_BACKEND = "/api/v1/user/register";
    const data = {
        fullName: fullName,
        email: email,
        password: password,
        phone: phone
    };
    return axios.post(URL_BACKEND, data);
}

const loginAPI = (email, password) => {
    const URL_BACKEND = "/api/v1/auth/login";
    const data = {
        username: email,
        password: password,
        delay: 2000
    };
    return axios.post(URL_BACKEND, data);
}

const getAccountAPI = () => {
    const URL_BACKEND = "/api/v1/auth/account";
    return axios.get(URL_BACKEND);
}

const logoutAPI = () => {
    const URL_BACKEND = "/api/v1/auth/logout";
    return axios.post(URL_BACKEND);
}

const fetchAllUserAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/user?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

const fetchAllBookAPI = (current, pageSize) => {
    const URL_BACKEND = `/api/v1/book?current=${current}&pageSize=${pageSize}`;
    return axios.get(URL_BACKEND);
}

export {
    createUserAPI, updateUserAPI, fetchAllUserAPI, deleteUserAPI, handleUploadFileAPI, updateUserAvatarAPI, registerUserAPI, loginAPI, getAccountAPI, logoutAPI,
    fetchAllBookAPI, createBookAPI, updateBookAPI, deleteBookAPI

}