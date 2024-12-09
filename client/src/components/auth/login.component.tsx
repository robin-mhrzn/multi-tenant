import { UserService } from "@app/services/user.service";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppDispatch } from "../../hooks/reduxHooks";
import ForgotPasswordComponent from "./forgotPassword.component";

interface LoginFormValues {
  email: string;
  password: string;
}

type LayoutType = Parameters<typeof Form>[0]["layout"];

const LoginComponent: React.FC = () => {
  const [isLoginPage, setLoginPage] = useState<boolean>(true);
  const [form] = Form.useForm<LoginFormValues>();
  const [formLayout] = useState<LayoutType>("horizontal");
  const dispatch = useAppDispatch();
  const userService = new UserService();
  const navigation = useNavigate();
  const [submitting, setSubmitting] = useState<boolean>(false);
  const onFinish = (formValues: LoginFormValues) => {
    setSubmitting(true);
    dispatch(
      userService.login({
        data: formValues,
        callback: (res) => {
          setSubmitting(false);
          if (res?.success) {
            navigation("/dashboard");
          }
        },
      })
    );
  };

  return (
    <Card
      className="card-signup header-solid ant-card pt-0"
      title={<h5> {isLoginPage ? "Login to tenant" : "Forgot password"}</h5>}
    >
      {isLoginPage ? (
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
            <Button
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
              loading={submitting}
            >
              LOGIN
            </Button>
          </Form.Item>
          <p className="font-semibold text-muted text-center">
            Forgot Password? &nbsp;
            <Link
              onClick={() => setLoginPage(false)}
              className="font-bold text-dark"
              to={""}
            >
              Click here
            </Link>
          </p>
        </Form>
      ) : (
        <ForgotPasswordComponent
          handleLoginRedirect={function (redirectToLogin: boolean): void {
            setLoginPage(redirectToLogin);
          }}
        />
      )}
    </Card>
  );
};

export default LoginComponent;
