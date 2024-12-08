import { useState, useEffect } from "react";
import { Outlet, useLocation } from "react-router-dom";
import { Layout, Drawer, Affix, Card } from "antd";
import Header from "./header";
import Sidebar from "./sidebar";
import Footer from "./footer";
import { getBreadcrumbName } from "@app/helpers/common/commonHelper";

const { Header: AntHeader, Content, Sider } = Layout;

const AdminLayout = () => {
  const [visible, setVisible] = useState(false);
  const [placement, setPlacement] = useState<"left" | "right">("right");
  const [sidenavType, setSidenavType] = useState<string>("white");
  const [fixed, setFixed] = useState<boolean>(true);

  const openDrawer = () => setVisible(!visible);
  const handleSidenavType = (type: string) => setSidenavType(type);
  const handleSidenavColor = (color: string) => setSidenavType(color);
  const handleFixedNavbar = (type: boolean) => setFixed(type);

  let { pathname } = useLocation();
  pathname = getBreadcrumbName(pathname);

  useEffect(() => {
    if (pathname === "rtl") {
      setPlacement("left");
    } else {
      setPlacement("right");
    }
  }, [pathname]);

  return (
    <Layout
      className={`layout-dashboard ${
        pathname === "profile" ? "layout-profile" : ""
      } ${pathname === "rtl" ? "layout-dashboard-rtl" : ""}`}
    >
      <Drawer
        title={false}
        placement={placement === "right" ? "left" : "right"}
        closable={false}
        onClose={() => setVisible(false)}
        visible={visible}
        key={placement === "right" ? "left" : "right"}
        width={250}
        className={`drawer-sidebar ${
          pathname === "rtl" ? "drawer-sidebar-rtl" : ""
        } `}
      >
        <Layout
          className={`layout-dashboard ${
            pathname === "rtl" ? "layout-dashboard-rtl" : ""
          }`}
        >
          <Sider
            trigger={null}
            width={250}
            theme="light"
            className={`sider-primary ant-layout-sider-primary ${
              sidenavType === "#fff" ? "active-route" : ""
            }`}
            style={{ background: sidenavType }}
          >
            <Sidebar />
          </Sider>
        </Layout>
      </Drawer>
      <Sider
        breakpoint="lg"
        collapsedWidth="0"
        onCollapse={(collapsed, type) => {
          console.log(collapsed, type);
        }}
        trigger={null}
        width={250}
        theme="light"
        className={`sider-primary ant-layout-sider-primary ${
          sidenavType === "#fff" ? "active-route" : ""
        }`}
        style={{ background: sidenavType }}
      >
        <Sidebar />
      </Sider>
      <Layout>
        {fixed ? (
          <Affix>
            <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
              <Header
                onPress={openDrawer}
                name={pathname}
                subName={pathname}
                handleSidenavColor={handleSidenavColor}
                handleSidenavType={handleSidenavType}
                handleFixedNavbar={handleFixedNavbar}
                placement={"left"}
              />
            </AntHeader>
          </Affix>
        ) : (
          <AntHeader className={`${fixed ? "ant-header-fixed" : ""}`}>
            <Header
              onPress={openDrawer}
              name={pathname}
              subName={pathname}
              handleSidenavColor={handleSidenavColor}
              handleSidenavType={handleSidenavType}
              handleFixedNavbar={handleFixedNavbar}
              placement={"bottom"}
            />
          </AntHeader>
        )}
        <Content className="content-ant">
          <Card>
            <Outlet></Outlet>
          </Card>
        </Content>
        <Footer />
      </Layout>
    </Layout>
  );
};

export default AdminLayout;
