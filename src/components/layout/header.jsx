import { Link, NavLink } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined } from '@ant-design/icons';
import { useState } from 'react';
// import './header.css'
const Header = () => {
    const [current, setCurrent] = useState('');
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
    ];

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: "20px" }} />
    );
}
export default Header;