import "./styles.scss";
import Flex from "antd/es/flex";
import Layout from "antd/es/layout";
import Typography from "antd/es/typography";
import { FC } from "react";

const BasicFooter: FC = () => {
  return (
    <Layout.Footer className="basic-footer">
      <Flex justify="center" gap={32}>
        <Typography.Text type="secondary">©{new Date().getFullYear()}, Atelier</Typography.Text>
        <Typography.Text type="secondary">User Agreement</Typography.Text>
        <Typography.Text type="secondary">Privacy Policy</Typography.Text>
      </Flex>
    </Layout.Footer>
  );
};

export default BasicFooter;
