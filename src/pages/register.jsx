import { Button, Col, Divider, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/es/form/Form";
import { registerUserAPI } from "../services/api.service";
import { Link, useNavigate } from "react-router-dom";

const RegisterPage = () => {
    const [form] = useForm();
    const navigate = useNavigate();
    const onFinish = async (values) => {
        const res = await registerUserAPI(
            values.fullName, values.email, values.password, values.phone
        );
        if (res.data) {
            notification.success({
                message: "Register User",
                description: "Register OK nhé "
            });
            navigate("/login");
        } else {
            notification.error({
                message: "Register User",
                description: JSON.stringify(res.message)
            });
        }
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
            style={{ margin: "30px" }}
        // onFinishFailed={onFinishFailed}
        >

            <h3 style={{ textAlign: "center" }}>Register account</h3>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Full name"
                        name="fullName"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your fullName!',
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Email"
                        name="email"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your email!',
                            },
                            {
                                type: "email",
                                message: "The input is not valid E-mail!",
                            },
                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Password"
                        name="password"
                        rules={[
                            {
                                required: true,
                                message: 'Please input your password!',
                            },
                            {
                                min: 6,
                                message: 'Min character is 6 !',
                            },
                        ]}
                    >
                        <Input.Password />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <Form.Item
                        label="Phone number"
                        name="phone"
                        rules={[
                            {
                                message: 'Please input only number!',
                                pattern: new RegExp(/^[0-9]+$/)
                            },

                        ]}
                    >
                        <Input />
                    </Form.Item>
                </Col>
            </Row>
            <Row justify={"center"}>
                <Col xs={24} md={8}>
                    <div>
                        <Button onClick={() => { form.submit() }} type="primary"> Register </Button>
                    </div>
                    <Divider />
                    <div>Exist account? <Link to={"/login"}>Login at here</Link></div>
                </Col>
            </Row>
        </Form >
    )
}

export default RegisterPage;