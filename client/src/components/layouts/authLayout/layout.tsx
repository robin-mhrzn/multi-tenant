import { getCurrentYear, isJsonString } from "@app/helpers/common/commonHelper";
import { useAppSelector } from "@app/hooks/reduxHooks";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;
import React, { useEffect } from "react";
import { Outlet, useNavigate } from "react-router-dom";
const AuthLayout: React.FC = () => {
  const navigate = useNavigate();
  let userData = useAppSelector((state) => state.profile.userData);
  if (isJsonString(userData)) {
    userData = JSON.parse(userData);
  }
  useEffect(() => {
    if (userData && userData.name) {
      navigate("/dashboard");
    }
  }, [userData, navigate]);
  return (
    <>
      <div className="layout-default ant-layout layout-sign-up">
        <Header>
          <div className="header-col header-brand">
            <h5>Logo</h5>
          </div>
        </Header>
        <Content className="p-0">
          <div className="sign-up-header">
            <Outlet></Outlet>
          </div>
        </Content>
        <Footer>
          <p className="copyright">Copyright © {getCurrentYear()}</p>
        </Footer>
      </div>
    </>
  );
};

export default AuthLayout;
