import "../../../styles.scss";
import { FC } from "react";
import { useNavigate } from "react-router";
import Logo from "@shared/ui/icons/Logo";
import { CreatePasswordPageType } from "@entities/authorization/constants/create-password-page-type.enum.ts";
import {
  createPasswordTypeToDescription,
  createPasswordTypeToTitle,
} from "@features/authorization/password-created/constants/password-created.constants.ts";
import Flex from "antd/es/flex";
import Card from "antd/es/card";
import Typography from "antd/es/typography";
import Button from "antd/es/button";

interface Props {
  type: CreatePasswordPageType;
}

const PasswordCreated: FC<Props> = ({ type }) => {
  const navigate = useNavigate();

  return (
    <Flex className="auth-form" justify="center" align="center" vertical>
      <Card className="card" bordered={false}>
        <Flex justify="center" className="logo-container">
          <Logo />
        </Flex>
        <Typography.Title level={4} className="title">
          {createPasswordTypeToTitle[type]}
        </Typography.Title>

        <div className="text">
          <Typography.Text>{createPasswordTypeToDescription[type]}</Typography.Text>
        </div>

        <Flex justify="center">
          <Button id="proceed-sign-in" block size="large" type="primary" onClick={() => navigate("/login")}>
            Proceed to sign in
          </Button>
        </Flex>
      </Card>
    </Flex>
  );
};

export default PasswordCreated;
