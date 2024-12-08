import { getCurrentYear } from "@app/helpers/common/commonHelper";
import { Layout } from "antd";

const { Header, Footer, Content } = Layout;
import React from "react";
import { Outlet } from "react-router-dom";
const AuthLayout: React.FC = () => {
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
