import { getCurrentProtocol } from "@app/helpers/common/commonHelper";
import { UserService } from "@app/services/user.service";
import { Button, Card, Form, Input } from "antd";
import { useState } from "react";
interface RegisterFormValues {
  name: string;
  fullName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

type LayoutType = Parameters<typeof Form>[0]["layout"];

const SignUpPage: React.FC = () => {
  const [form] = Form.useForm<RegisterFormValues>();
  const [formLayout] = useState<LayoutType>("horizontal");

  const userService = new UserService();

  const onFinish = (formValues: RegisterFormValues) => {
    userService.register({
      data: formValues,
      successCallback: (res) => {
        window.location.href =
          getCurrentProtocol() + res.data.domain + "/signup";
      },
    });
  };

  return (
    <Card
      className="card-signup header-solid ant-card pt-0"
      title={<h5>Sign up to tenant</h5>}
    >
      <Form
        layout={formLayout}
        name="frmSignup"
        form={form}
        onFinish={onFinish}
        className="row-col"
        labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
        wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
      >
        <Form.Item
          label="Organization Name"
          name="name"
          rules={[
            { required: true, message: "Please enter organization name" },
          ]}
        >
          <Input placeholder="Organization Name" />
        </Form.Item>

        <Form.Item
          label="Name"
          name="fullName"
          rules={[{ required: true, message: "Please enter your name" }]}
        >
          <Input placeholder="Full Name" />
        </Form.Item>

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

        <Form.Item
          label="Confirm Password"
          name="confirmPassword"
          dependencies={["password"]}
          rules={[
            { required: true, message: "Please confirm your password" },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error("Passwords do not match. Please try again.")
                );
              },
            }),
          ]}
        >
          <Input type="password" placeholder="Confirm Password" />
        </Form.Item>

        <Form.Item wrapperCol={{ span: 24 }}>
          <Button style={{ width: "100%" }} type="primary" htmlType="submit">
            SIGN UP
          </Button>
        </Form.Item>
      </Form>
    </Card>
  );
};

export default SignUpPage;
