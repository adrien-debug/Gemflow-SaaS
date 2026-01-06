import "@features/authorization/styles.scss";
import { FC, useState } from "react";
import Logo from "@shared/ui/icons/Logo";
import { useNavigate, useSearchParams } from "react-router";
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
  password?: string;
};

const Login: FC = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { messageApi } = useMessage();
  const [params] = useSearchParams();

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    try {
      await AuthorizationApi.login({ login: values.email!, password: values.password! });
      const redirectTo = params.get("redirectTo");
      navigate(redirectTo ? redirectTo : "/");
    } catch {
      messageApi.error("Incorrect email or password");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Flex className="auth-form" justify="center" align="center" vertical>
      <Card className="card" bordered={false}>
        <Flex justify="center" className="logo-container">
          <Logo />
        </Flex>

        <Typography.Title level={4} className="title">
          Sign in to continue
        </Typography.Title>

        <Form requiredMark="optional" layout="vertical" onFinish={onFinish} autoComplete="on">
          <Form.Item<FieldType>
            label="Email"
            validateTrigger="onBlur"
            name="email"
            rules={[
              { type: "email", message: "Invalid email address" },
              { required: true, message: "Please, enter email address" },
            ]}>
            <Input id="login-page-email" placeholder="Enter email address" maxLength={256} size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Password"
            validateTrigger="onBlur"
            name="password"
            rules={[{ required: true, message: "Please, enter the password" }]}>
            <Input.Password id="login-page-password" placeholder="Enter password" maxLength={256} size="large" />
          </Form.Item>

          <Form.Item>
            <Button
              id="login-page-forgot-password"
              block
              size="small"
              type="link"
              onClick={() => navigate("/login/forgot")}>
              Forgot your password?
            </Button>
          </Form.Item>

          <Button id="login-page-sign-in" block type="primary" htmlType="submit" size="large" loading={loading}>
            Sign in
          </Button>
        </Form>
      </Card>
    </Flex>
  );
};

export default Login;
