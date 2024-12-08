import ChangePasswordComponent from "@app/components/user/changePassword.component";
import ProfileComponent from "@app/components/user/profile.component";
import { Card, Col, Row } from "antd";

const ProfilePage = () => {
  return (
    <>
      <Row justify="space-between" gutter={[24, 0]}>
        <Col span={24} md={12} className="col-info">
          <Card title="Profile">
            <ProfileComponent></ProfileComponent>
          </Card>
        </Col>
        <Col span={24} md={12} className="col-info">
          <Card title="Change Password">
            <ChangePasswordComponent />
          </Card>
        </Col>
      </Row>
    </>
  );
};
export default ProfilePage;
