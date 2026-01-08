import "../../../styles.scss";
import { FC, useEffect, useState } from "react";
import Logo from "@shared/ui/icons/Logo";
import { useNavigate, useParams } from "react-router";
import AuthorizationApi from "@entities/authorization/api/authorization.api.ts";
import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";
import { TokenType } from "@entities/authorization/constants/token-type.enum.ts";
import Flex from "antd/es/flex";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Button from "antd/es/button";
import { FormRule } from "@shared/utils/form-validators.ts";
import {
  getPasswordCreatedLink,
  getTitle,
} from "@features/authorization/create-new-password/utils/create-new-password.utils.ts";

type FieldType = {
  password?: string;
  confirmPassword?: string;
};

interface Props {
  type: CreatePasswordPageType;
}

const CreateNewPassword: FC<Props> = ({ type }) => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { token } = useParams();

  useEffect(() => {
    if (token) {
      AuthorizationApi.checkTokenExpiration(
        token,
        // TODO: change RESTORE_PASSWORD to create when done on BE
        type === CreatePasswordPageType.RESTORE ? TokenType.RESTORE_PASSWORD : TokenType.RESTORE_PASSWORD,
      )
        .then((expired) => {
          if (expired) {
            navigate("/login/expired");
          }
        })
        .catch(() => navigate("/login/expired"));
    }
  }, []);

  const onFinish = async (values: FieldType) => {
    setLoading(true);
    const { password } = values;
    const updated = await AuthorizationApi.updatePassword(token!, password!);
    if (updated) {
      navigate(getPasswordCreatedLink(type));
    } else {
      navigate("/login/expired");
    }
    setLoading(false);
  };

  return (
    <Flex className="auth-form" justify="center" align="center" vertical>
      <Card className="card" bordered={false}>
        <Flex justify="center" className="logo-container">
          <Logo />
        </Flex>
        <Typography.Title level={4} className="title">
          {getTitle(type)}
        </Typography.Title>

        <Form requiredMark="optional" layout="vertical" onFinish={onFinish}>
          <Form.Item<FieldType>
            label="Password"
            validateTrigger="onBlur"
            name="password"
            rules={[FormRule.MinLength(8, "Use 8 characters or more"), FormRule.Required("Please, enter password")]}>
            <Input.Password id="password" placeholder="Enter password" maxLength={256} size="large" />
          </Form.Item>

          <Form.Item<FieldType>
            label="Confirm password"
            name="confirmPassword"
            validateTrigger="onBlur"
            rules={[
              FormRule.Required("Please, confirm your password"),
              FormRule.MatchValue("password", "Password don't match"),
            ]}>
            <Input.Password id="confirm-password" placeholder="Re-enter password" maxLength={256} size="large" />
          </Form.Item>

          <Form.Item>
            <Button id="create-password" block type="primary" htmlType="submit" size="large" loading={loading}>
              Create password
            </Button>
          </Form.Item>

          <Button id="cancel-password" block size="small" type="link" onClick={() => navigate("/login")}>
            Go to sign in
          </Button>
        </Form>
      </Card>
    </Flex>
  );
};

export default CreateNewPassword;
