import Form from "antd/es/form";
import ImageUpload, { ImageUploadProps } from "@shared/ui/form/ImageUpload";
import Avatar from "@shared/ui/Avatar";
import { FC } from "react";
import { User } from "@entities/user/models/user.model.ts";

interface Props extends ImageUploadProps {
  editing: boolean;
  personalDetails: User;
}

export const AvatarImageItem: FC<Props> = ({ editing, personalDetails, ...rest }) => {
  return (
    <Form.Item name="photos" className="photos-container">
      {editing ? (
        <ImageUpload imageSize={120} showDescription={false} circled {...rest} />
      ) : (
        <Avatar user={personalDetails} fontSize={52} height={120} width={120} />
      )}
    </Form.Item>
  );
};
