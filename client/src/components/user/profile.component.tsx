import { isJsonString } from "@app/helpers/common/commonHelper";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { UserService } from "@app/services/user.service";
import { storeUserData } from "@app/store/slices/profile.slice";
import { Button, Form, Input } from "antd";
import { parse } from "path";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";

interface ProfileModel {
  name: string;
  email: string;
}

const ProfileComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const [isSubmitting, setIsSubmitting] = useState<boolean>(false);
  const userService = new UserService();

  const [userData, setUserData] = useState<any>({});
  const userInfo = useAppSelector((state) => state.profile.userData);
  useEffect(() => {
    let parsedData = userInfo;
    if (typeof userInfo === "string") {
      parsedData = JSON.parse(userInfo);
    }
    setUserData(parsedData);
    form.setFieldsValue({ email: parsedData.email, name: parsedData.name });
  }, [userInfo]);
  const onFinish = (model: ProfileModel) => {
    setIsSubmitting(true);
    userService.saveProfile({
      data: { name: model.name },
      callback: (res) => {
        if (res?.success) {
          const data = { ...userData, name: model.name };
          setUserData(data);
          dispatch(storeUserData(data));
        }
        setIsSubmitting(false);
      },
    });
  };

  return (
    <Form
      form={form}
      initialValues={{ name: userData.name, email: userData.email }}
      name="frmProfile"
      onFinish={onFinish}
      className="row-col"
      labelCol={{ xs: { span: 24 }, sm: { span: 8 } }}
      wrapperCol={{ xs: { span: 24 }, sm: { span: 16 } }}
    >
      <Form.Item
        label="Name"
        name="name"
        rules={[{ required: true, message: "Please enter name" }]}
      >
        <Input placeholder="Name" />
      </Form.Item>
      <Form.Item
        label="Email"
        name="email"
        rules={[{ required: true, message: "Please enter email" }]}
      >
        <Input placeholder="Email" disabled />
      </Form.Item>
      <Form.Item wrapperCol={{ span: 24 }}>
        <Button
          style={{ width: "100%" }}
          type="primary"
          htmlType="submit"
          loading={isSubmitting}
        >
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileComponent;
