import { UserService } from "@app/services/user.service";
import { Button, Form, Input } from "antd";

interface ChangePasswordModel {
  oldPassword: string;
  password: string;
}

const ChangePasswordComponent = () => {
  const [form] = Form.useForm();
  const userService = new UserService();

  const onFinish = (model: ChangePasswordModel) => {
    console.log("Submitting form data:", model);
    userService.changePassword({
      data: { password: model.password, oldPassword: model.oldPassword },
      successCallback: () => {
        debugger;
        form.setFieldsValue({
          oldPassword: "",
          password: "",
          confirmPassword: "",
        });
      },
    });
  };

  return (
    <Form
      form={form}
      name="frmChangePwd"
      onFinish={onFinish}
      className="row-col"
      labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <Form.Item
        label="Old Password"
        name="oldPassword"
        rules={[
          { required: true, message: "Please enter old password" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password placeholder="Old Password" />
      </Form.Item>
      <Form.Item
        label="Password"
        name="password"
        rules={[
          { required: true, message: "Please enter a password" },
          { min: 6, message: "Password must be at least 6 characters" },
        ]}
      >
        <Input.Password placeholder="Password" />
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
        <Input.Password placeholder="Confirm Password" />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ChangePasswordComponent;
