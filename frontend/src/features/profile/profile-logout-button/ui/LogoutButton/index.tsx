import Button from "antd/es/button";
import { useNavigate } from "react-router";
import AuthorizationApi from "@entities/authorization/api/authorization.api.ts";
import { getLoginWithRedirectBackUrl } from "@shared/utils/url-helper.ts";

const LogoutButton = () => {
  const navigate = useNavigate();

  const logout = () => {
    AuthorizationApi.logout();
    navigate(getLoginWithRedirectBackUrl());
  };

  return (
    <Button id="logout" className="logout-button" size="large" onClick={logout}>
      Logout
    </Button>
  );
};

export default LogoutButton;
