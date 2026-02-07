import "../../../styles.scss";
import { FC } from "react";
import { useNavigate } from "react-router";
import Logo from "@shared/ui/icons/Logo";
import Flex from "antd/es/flex";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Button from "antd/es/button";

const LinkExpired: FC = () => {
  const navigate = useNavigate();

  return (
    <Flex className="auth-form" justify="center" align="center" vertical>
      <Card className="card" bordered={false}>
        <Flex justify="center" className="logo-container">
          <Logo />
        </Flex>
        <Typography.Title level={4} className="title">
          Link expired
        </Typography.Title>

        <div className="text">
          <Typography.Text>
            Sorry, this link expired. You can request a new one from Restore Password page
          </Typography.Text>
        </div>

        <Flex justify="center">
          <Button
            id="expired-page-restore-password"
            block
            size="small"
            type="link"
            onClick={() => navigate("/login/forgot")}>
            Go to Restore Password
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default LinkExpired;
