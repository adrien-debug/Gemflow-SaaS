import "../../../styles.scss";
import { FC } from "react";
import { useNavigate, useSearchParams } from "react-router";
import Logo from "@shared/ui/icons/Logo";
import Flex from "antd/es/flex";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Button from "antd/es/button";

const RestoreLinkSent: FC = () => {
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const navigate = useNavigate();

  return (
    <Flex className="auth-form restore-link-sent" justify="center" align="center" vertical>
      <Card className="card" bordered={false}>
        <Flex justify="center" className="logo-container">
          <Logo />
        </Flex>
        <Typography.Title level={4} className="title">
          Check your mailbox
        </Typography.Title>

        <div className="text">
          <Typography.Text>Thanks! If</Typography.Text>
          <Typography.Text strong> {email} </Typography.Text>
          <Typography.Text>
            matches an email address we have on file, you’ll receive an email with further instructions for restoring
            your password.
          </Typography.Text>
        </div>

        <Flex justify="center">
          <Button id="restore-page-sign-in" block size="small" type="link" onClick={() => navigate("/login")}>
            Go to sign in
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default RestoreLinkSent;
