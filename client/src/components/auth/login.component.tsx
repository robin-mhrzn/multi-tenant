import { UserService } from "@app/services/user.service";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";

interface LoginFormValues {
  email: string;
  password: string;
}

type LayoutType = Parameters<typeof Form>[0]["layout"];

const LoginComponent: React.FC = () => {
  const [form] = Form.useForm<LoginFormValues>();
  const [formLayout] = useState<LayoutType>("horizontal");
  const dispatch = useAppDispatch();
  const userService = new UserService();
  const navigation = useNavigate();
  const onFinish = (formValues: LoginFormValues) => {
    dispatch(
      userService.login({
        data: formValues,
        successCallback: () => {
          navigation("/dashboard");
        },
      })
    );
  };

  return (
    <Card
      className="card-signup header-solid ant-card pt-0"
      title={<h5>Login to tenant</h5>}
    >
      <Form
        layout={formLayout}
        name="frmLogin"
        form={form}
        onFinish={onFinish}
        className="row-col"
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
      >
        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Please enter your email" },
            { type: "email", message: "Please enter a valid email address" },
          ]}
        >
          <Input placeholder="Email" />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            { required: true, message: "Please enter a password" },
            { min: 6, message: "Password must be at least 6 characters" },
          ]}
        >
          <Input type="password" placeholder="Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            LOGIN
          </Button>
        </Form.Item>
        <p className="font-semibold text-muted text-center">
          Forgot Password? &nbsp;
          <Link to="/sign-in" className="font-bold text-dark">
            Click here
          </Link>
        </p>
      </Form>
    </Card>
  );
};

export default LoginComponent;
