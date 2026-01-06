import { FC } from "react";
import Image from "@shared/ui/Image";
import AntdAvatar from "antd/es/avatar";
import { brandingColorPalette, brandingTokens } from "@shared/constants/branding.ts";
import { User } from "@entities/user/models/user.model.ts";

interface Props {
  user: User;
  width?: number;
  height?: number;
  fontSize?: number;
  preview?: boolean;
}

const Avatar: FC<Props> = ({ user, width = 32, height = 32, fontSize = 12, preview = true }) => {
  if (!user.photos?.length) {
    return (
      <AntdAvatar
        className="avatar"
        style={{
          backgroundColor: brandingColorPalette.brand4,
          color: brandingTokens.textDefaultColor,
          fontSize,
          width,
          height,
        }}>
        {user?.firstName?.[0]?.toUpperCase()}
        {user?.lastName?.[0]?.toUpperCase()}
      </AntdAvatar>
    );
  }
  return (
    <Image preview={preview} className="avatar" width={width} height={height} boxRadius="100%" src={user.photos} />
  );
};

export default Avatar;
