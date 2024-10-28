import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, SettingOutlined } from '@ant-design/icons';
import { useContext, useState } from 'react';
import { AuthContext } from '../context/auth.context';
// import './header.css'
const Header = () => {
    const [current, setCurrent] = useState('');
    const { user } = useContext(AuthContext);


    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };
    const items = [
        {
            label: <Link to={"/"}>Home </Link>,
            key: 'home',
            icon: <HomeOutlined spin={true} style={{ fontSize: "20px" }} />,
        },
        {
            label: <Link to={"/users"}>Users </Link>,
            key: 'users',
            icon: <UserOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: <Link to={"/books"}>Books </Link>,
            key: 'books',
            icon: <BookOutlined style={{ fontSize: "20px" }} />,
        },
        {
            label: 'Setting',
            key: 'setting',
            icon: <SettingOutlined />,
            children: [
                {
                    label: <Link to={"/login"}>Login </Link>,
                    key: 'login',
                },
                {
                    label: <Link to={"/register"}>Register </Link>,
                    key: 'register',
                },
            ],
        },
    ];

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: "20px" }} />
    );
}
export default Header;