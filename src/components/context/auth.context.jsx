import { createContext, useState } from 'react';

const AuthContext = createContext({
    email: "",
    phone: "",
    fullName: "",
    role: "",
    avatar: "",
    id: ""
});

const AuthWrapper = (props) => {
    const [user, setUser] = useState({
        email: "",
        phone: "",
        fullName: "",
        role: "",
        avatar: "",
        id: ""
    })
    return (
        <AuthContext.Provider value={{ user, setUser }}>
            {props.children}
            {/* props.children chính là <RouterProvider router={router} />  đc truyền từ mail.jsx*/}
        </AuthContext.Provider>
    )
}


export { AuthContext, AuthWrapper };