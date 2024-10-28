import './components/todo/todo.css';

import Header from './components/layout/header';
import Footer from './components/layout/footer';
import { Outlet } from 'react-router-dom';
import { useContext, useEffect } from 'react';
import { getAccountAPI } from './services/api.service';
import { AuthContext } from './components/context/auth.context';
import { Spin } from 'antd';
import { LoadingOutlined } from '@ant-design/icons';

const App = () => {
  const { setUser, isAppLoading, setIsAppLoading } = useContext(AuthContext);
  const fetchUserInfor = async () => {
    const res = await getAccountAPI();
    await delay(2000);
    if (res.data) {
      setUser(res.data.user)
    }

    setIsAppLoading(false);
  }

  useEffect(() => {
    fetchUserInfor()
  }, [])

  const delay = (milSeconds) => {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve()
      }, milSeconds)
    })
  }
  return (
    <>
      {isAppLoading ?
        <div style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)"
        }}>
          <LoadingOutlined style={{ fontSize: '160px', color: '#08c' }} />
        </div>
        :
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      }


    </>

  )
}

export default App
