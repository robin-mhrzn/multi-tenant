import { Layout, Row, Col } from "antd";
import { getCurrentYear } from "@app/helpers/common/commonHelper";

const Footer = () => {
  const { Footer: AntFooter } = Layout;
  return (
    <AntFooter style={{ background: "#fafafa" }}>
      <Row className="tex">
        <Col xs={24} md={12} lg={12}>
          <div className="copyright">© Copyright {getCurrentYear()} </div>
        </Col>
      </Row>
    </AntFooter>
  );
};

export default Footer;
