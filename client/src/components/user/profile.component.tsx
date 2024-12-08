import { isJsonString } from "@app/helpers/common/commonHelper";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { UserService } from "@app/services/user.service";
import { storeUserData } from "@app/store/slices/profile.slice";
import { Button, Form, Input } from "antd";
import { useDispatch } from "react-redux";

interface ProfileModel {
  name: string;
  email: string;
}

const ProfileComponent = () => {
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const userService = new UserService();
  let userData = useAppSelector((state) => state.profile.userData);
  if (isJsonString(userData)) {
    userData = JSON.parse(userData);
  }
  const onFinish = (model: ProfileModel) => {
    userService.saveProfile({
      data: { name: model.name },
      successCallback: () => {
        userData.name = model.name;
        dispatch(storeUserData(userData));
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
        <Button style={{ width: "100%" }} type="primary" htmlType="submit">
          Save
        </Button>
      </Form.Item>
    </Form>
  );
};

export default ProfileComponent;
