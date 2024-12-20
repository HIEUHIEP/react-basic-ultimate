import { useContext } from "react";
import { AuthContext } from "../components/context/auth.context";
import { Link } from "react-router-dom";
import { Button, Result } from "antd";

const PrivateRoute = (props) => {
    const { user } = useContext(AuthContext);
    if (user && user.id) {
        return (
            <>
                {props.children}
            </>
        );
    }
    // return (
    //     <>
    //         <Navigate to="/login" replace />
    //     </>
    // );
    return (
        <Result
            status="403"
            title="Unauthorize"
            subTitle="You need login to access this page"
            extra={<Button type="primary"><Link to="/login">Login</Link></Button>}
        />
    )

}

export default PrivateRoute