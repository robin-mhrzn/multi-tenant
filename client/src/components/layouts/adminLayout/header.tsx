import { useState, useEffect } from "react";
import { Row, Col, Breadcrumb, Dropdown, List, Menu } from "antd";

import { NavLink, Link, useNavigate } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@app/hooks/reduxHooks";
import { isJsonString } from "@app/helpers/common/commonHelper";
import { useDispatch } from "react-redux";
import { logout } from "@app/store/slices/profile.slice";

interface HeaderProps {
  placement: "left" | "right" | "top" | "bottom";
  name: string;
  subName: string;
  onPress: () => void;
  handleSidenavColor: (color: string) => void;
  handleSidenavType: (type: string) => void;
  handleFixedNavbar: (fixed: boolean) => void;
}

const profile = [
  <svg
    width="20"
    height="20"
    viewBox="0 0 20 20"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    key={0}
  >
    <path
      fillRule="evenodd"
      clipRule="evenodd"
      d="M18 10C18 14.4183 14.4183 18 10 18C5.58172 18 2 14.4183 2 10C2 5.58172 5.58172 2 10 2C14.4183 2 18 5.58172 18 10ZM12 7C12 8.10457 11.1046 9 10 9C8.89543 9 8 8.10457 8 7C8 5.89543 8.89543 5 10 5C11.1046 5 12 5.89543 12 7ZM9.99993 11C7.98239 11 6.24394 12.195 5.45374 13.9157C6.55403 15.192 8.18265 16 9.99998 16C11.8173 16 13.4459 15.1921 14.5462 13.9158C13.756 12.195 12.0175 11 9.99993 11Z"
      fill="#111827"
    ></path>
  </svg>,
];

const Header: React.FC<HeaderProps> = ({ name, subName }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let userData = useAppSelector((state) => state.profile.userData);
  if (isJsonString(userData)) {
    userData = JSON.parse(userData);
  }
  useEffect(() => {
    if (!(userData && userData.name)) {
      navigate("/auth");
    }
  }, [userData, navigate]);
  useEffect(() => window.scrollTo(0, 0));
  const handleMenuClick = (e: any) => {
    if (e.key == "Logout") {
      handleLogOut();
    }
  };
  const handleLogOut = () => {
    dispatch(logout());
    userData = null;
  };
  const menu = (
    <Menu onClick={handleMenuClick}>
      <Menu.Item key="Profile">Profile</Menu.Item>
      <Menu.Item key="Logout">Sign Out</Menu.Item>
    </Menu>
  );
  return (
    <>
      <Row gutter={[24, 0]}>
        <Col span={24} md={6}>
          <Breadcrumb>
            <Breadcrumb.Item>
              <NavLink to="/">Pages</NavLink>
            </Breadcrumb.Item>
            <Breadcrumb.Item>{name.replace("/", "")}</Breadcrumb.Item>
          </Breadcrumb>
          <div className="ant-page-header-heading">
            <span
              className="ant-page-header-heading-title"
              style={{ textTransform: "capitalize" }}
            >
              {subName.replace("/", "")}
            </span>
          </div>
        </Col>
        <Col span={24} md={18} className="header-control">
          <Dropdown overlay={menu}>
            <a
              className="ant-dropdown-link"
              onClick={(e) => e.preventDefault()}
            >
              {profile}
              <span>{userData.name}</span>
            </a>
          </Dropdown>
        </Col>
      </Row>
    </>
  );
};

export default Header;
