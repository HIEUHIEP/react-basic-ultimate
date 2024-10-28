import { Link } from 'react-router-dom';
import { Menu } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, LoginOutlined, WechatOutlined } from '@ant-design/icons';
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
        ...(!user.id ? [{
            label: <Link to={"/login"}>Login </Link>,
            key: 'login',
            icon: <LoginOutlined />,

        }] : [])
        ,
        ...(user.id ? [{
            label: `Hi ${user.fullName}`,
            key: 'setting',
            icon: <WechatOutlined />,
            children: [
                {
                    label: <Link to={"/logout"}>Logout </Link>,
                    key: 'logout',
                },
            ],
        }] : [])
        ,
    ];

    return (
        <Menu onClick={onClick} selectedKeys={[current]} mode="horizontal" items={items} style={{ fontSize: "20px" }} />
    );
}
export default Header;