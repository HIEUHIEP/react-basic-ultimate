import { Button, Form, Input } from "antd";
import { useForm } from "antd/es/form/Form";

const RegisterPage = () => {
    const [form] = useForm();

    const onFinish = (values) => {
        console.log('>> ', values)
    }
    return (
        <Form
            form={form}
            layout="vertical"
            onFinish={onFinish}
        // onFinishFailed={onFinishFailed}
        >


            <div style={{
                margin: "15px"
            }}>
                <Form.Item
                    label="Full name"
                    name="fullName"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your username!',
                //     },
                // ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Email"
                    name="email"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your username!',
                //     },
                // ]}
                >
                    <Input />
                </Form.Item>
                <Form.Item
                    label="Password"
                    name="password"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your username!',
                //     },
                // ]}
                >
                    <Input.Password />
                </Form.Item>
                <Form.Item
                    label="Phone number"
                    name="phone"
                // rules={[
                //     {
                //         required: true,
                //         message: 'Please input your username!',
                //     },
                // ]}
                >
                    <Input />
                </Form.Item>
                <div>
                    <Button onClick={() => { form.submit() }} type="primary"> Register </Button>
                </div>
            </div>
        </Form>
    )
}

export default RegisterPage;