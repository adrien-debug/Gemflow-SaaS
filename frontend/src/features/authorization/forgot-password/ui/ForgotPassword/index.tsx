import "../../../styles.scss";
import { FC, useState } from "react";
import Logo from "@shared/ui/icons/Logo";
import { useNavigate } from "react-router";
import AuthorizationApi from "@entities/authorization/api/authorization.api.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Flex from "antd/es/flex";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";

type FieldType = {
  email?: string;
};

const ForgotPassword: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { messageApi } = useMessage();

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      await AuthorizationApi.forgotPassword(values.email!);
      navigate(`/login/restore?email=${values.email}`);
    } catch {
      messageApi.error("Failed to restore password");
    } finally {
      setLoading(true);
    }
  };

  return (
    <Flex className="auth-form" justify="center" align="center" vertical>
      <Card className="card" bordered={false}>
        <Flex justify="center" className="logo-container">
          <Logo />
        </Flex>
        <Typography.Title level={4} className="title">
          Restore password
        </Typography.Title>

        <Form requiredMark="optional" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item<FieldType>
            label="Email"
            validateTrigger={"onBlur"}
            name="email"
            rules={[
              { type: "email", message: "Invalid email address" },
              { required: true, message: "Enter email address" },
            ]}>
            <Input id="forgot-page-email" placeholder="Enter email address" size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              id="forgot-page-restore-password"
              block
              type="primary"
              htmlType="submit"
              size="large"
              loading={loading}>
              Restore password
            </Button>
          </Form.Item>

          <Button id="forgot-page-sign-in" block size="small" type="link" onClick={() => navigate("/login")}>
            Go to sign in
          </Button>
        </Form>
      </Card>
    </Flex>
  );
};

export default ForgotPassword;
