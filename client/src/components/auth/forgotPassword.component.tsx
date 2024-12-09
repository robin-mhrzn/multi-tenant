import { UserService } from "@app/services/user.service";
import { Button, Form, Input } from "antd";
import { useState } from "react";
import { Link } from "react-router-dom";

interface ForgotPasswordModel {
  email: string;
  code: string;
  password: string;
  validateEmail: boolean;
  validateOTP: boolean;
}
interface ForgotPasswordProps {
  handleLoginRedirect: (redirectToLogin: boolean) => void;
}
const ForgotPasswordComponent: React.FC<ForgotPasswordProps> = (props) => {
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const [forgotModelState, setForgotModelState] = useState<ForgotPasswordModel>(
    {
      email: "",
      code: "",
      validateEmail: false,
      validateOTP: false,
      password: "",
    }
  );
  const userService = new UserService();

  const handleForgotPassword = (formValues: ForgotPasswordModel) => {
    setIsSubmitting(true);
    userService.generateResetCode({
      data: { email: formValues.email },
      callback: (res) => {
        setIsSubmitting(false);
        if (res.success) {
          setForgotModelState({
            ...forgotModelState,
            validateEmail: true,
            email: formValues.email,
          });
        }
      },
    });
  };

  const handleValidOTP = (values: ForgotPasswordModel) => {
    setIsSubmitting(true);
    userService.validateResetCode({
      data: values,
      callback: (res) => {
        if (res?.success) {
          setForgotModelState({
            ...forgotModelState,
            validateOTP: true,
          });
        }
        setIsSubmitting(false);
      },
    });
  };

  const resetPasswordContent = () => {
    return (
      <>
        <Form
          name="frmForgotPwd"
          onFinish={handleForgotPassword}
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
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              style={{ width: "100%" }}
              loading={isSubmitting}
              type="primary"
              htmlType="submit"
            >
              Reset Password
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
  const handleResetPassword = (values: ForgotPasswordModel) => {
    setIsSubmitting(true);
    userService.resetPassword({
      data: {
        email: values.email,
        code: values.code,
        password: values.password,
      },
      callback: (res) => {
        if (res?.success) {
          props.handleLoginRedirect(true);
        }
        setIsSubmitting(false);
      },
    });
  };
  const validateOTPContent = () => {
    return (
      <>
        <p style={{ color: "#000" }}>
          Please enter reset code that you have received on your email
        </p>
        <Form
          name="frmForgotPwd"
          onFinish={
            forgotModelState.validateOTP ? handleResetPassword : handleValidOTP
          }
          initialValues={{ email: forgotModelState.email }}
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
            <Input placeholder="Email" disabled />
          </Form.Item>
          <Form.Item
            label="Reset Code"
            name="code"
            rules={[{ required: true, message: "Please enter code" }]}
          >
            <Input placeholder="Code" disabled={forgotModelState.validateOTP} />
          </Form.Item>
          {forgotModelState.validateOTP && (
            <>
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
                        new Error("Password do not match. Please try again.")
                      );
                    },
                  }),
                ]}
              >
                <Input type="password" placeholder="Confirm Password" />
              </Form.Item>
            </>
          )}
          <Form.Item wrapperCol={{ span: 24 }}>
            <Button
              loading={isSubmitting}
              style={{ width: "100%" }}
              type="primary"
              htmlType="submit"
            >
              {forgotModelState.validateOTP
                ? "Reset Password"
                : "Validate Code"}
            </Button>
          </Form.Item>
        </Form>
      </>
    );
  };
  return (
    <>
      {forgotModelState.validateEmail
        ? validateOTPContent()
        : resetPasswordContent()}
      <p className="font-semibold text-muted text-center">
        <Link
          to={""}
          onClick={() => props.handleLoginRedirect(true)}
          className="font-bold text-dark"
        >
          Back to Login
        </Link>
      </p>
    </>
  );
};

export default ForgotPasswordComponent;
