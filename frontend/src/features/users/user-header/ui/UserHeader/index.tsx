import "./styles.scss";
import SimpleHeader from "@shared/ui/SimpleHeader";
import Typography from "antd/es/typography";
import usePersonalDetails from "@entities/user/hooks/usePersonalDetails.ts";
import Avatar from "@shared/ui/Avatar";
import Flex from "antd/es/flex";
import Dropdown from "antd/es/dropdown";
import { MenuItem } from "@shared/ui/layouts/DashboardLayout/models/menu-item.model.ts";
import Button from "antd/es/button";
import ConfigProvider from "antd/es/config-provider";
import { useNavigate } from "react-router";
import AuthorizationApi from "@entities/authorization/api/authorization.api.ts";
import { getLoginWithRedirectBackUrl } from "@shared/utils/url-helper.ts";

const UserHeader = () => {
  const { data } = usePersonalDetails();

  const navigate = useNavigate();

  const handleLogout = () => {
    AuthorizationApi.logout();
    navigate(getLoginWithRedirectBackUrl());
  };

  const menuItems: MenuItem[] = [
    {
      key: "parts-broken",
      label: "Logout",
      onClick: handleLogout,
    },
  ];

  return (
    <SimpleHeader>
      <Flex align="center" gap={8} className="user-header">
        <Typography.Text>{data?.fullName}</Typography.Text>

        <ConfigProvider wave={{ disabled: true }}>
          <Dropdown menu={{ items: menuItems }} trigger={["click"]} placement="bottomRight">
            <Button size="large" shape="circle" className="avatar-button">
              <Avatar width={36} height={36} user={data!} preview={false} />
            </Button>
          </Dropdown>
        </ConfigProvider>
      </Flex>
    </SimpleHeader>
  );
};

export default UserHeader;
