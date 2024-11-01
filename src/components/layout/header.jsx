import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Menu, message } from 'antd';
import { UserOutlined, HomeOutlined, BookOutlined, LoginOutlined, WechatOutlined } from '@ant-design/icons';
import { useContext, useEffect, useState } from 'react';
import { AuthContext } from '../context/auth.context';
import { logoutAPI } from '../../services/api.service';
// import './header.css'
const Header = () => {
    const [current, setCurrent] = useState('');
    const { user, setUser } = useContext(AuthContext);
    const navigate = useNavigate();
    const localtion = useLocation();
    const onClick = (e) => {
        // console.log('click ', e);
        setCurrent(e.key);
    };
    useEffect(() => {
        if (localtion && localtion.pathname) {
            const allRoutes = ["users", "books"]
            const currentRoute = allRoutes.find(item => `/${item}` === localtion.pathname)
            if (currentRoute) {
                setCurrent(currentRoute);
            } else {
                setCurrent("home");
            }
        }

    }, [localtion])
    const handleLogout = async () => {
        const res = await logoutAPI();
        if (res.data) {
            localStorage.removeItem("access_token");
            setUser({
                email: "",
                phone: "",
                fullName: "",
                role: "",
                avatar: "",
                id: ""
            })
            message.success("Logout done")
            // redirect to home.
            navigate("/");
        }
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
                    label: <span onClick={() => { handleLogout() }}>Logouttt</span>,
                    key: 'logout',
                },
            ],
        }] : [])
        ,
    ];

    return (
        <Menu
            onClick={onClick}
            selectedKeys={[current]}
            mode="horizontal"
            items={items}
            style={{ fontSize: "20px" }} />
    );
}
export default Header;