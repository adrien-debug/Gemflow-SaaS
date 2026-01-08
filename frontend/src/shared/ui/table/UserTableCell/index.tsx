import "./styles.scss";
import { User } from "@entities/user/models/user.model.ts";
import { FC } from "react";
import Flex from "antd/es/flex";
import Avatar from "@shared/ui/Avatar";
import Typography from "antd/es/typography";

interface Props {
  user: User;
  description?: string;
}

const UserTableCell: FC<Props> = ({ user, description }) => {
  return (
    <Flex className="user-table-cell" gap={8} align="center">
      <Avatar user={user} />
      <Flex vertical>
        <Typography.Text className="user-name">{user.fullName}</Typography.Text>
        {description && (
          <Typography.Text className="user-description" type="secondary" style={{ fontSize: 12 }}>
            {description}
          </Typography.Text>
        )}
      </Flex>
    </Flex>
  );
};

export default UserTableCell;
