import "./styles.scss";
import Form, { FormInstance } from "antd/es/form";
import Flex from "antd/es/flex";
import { FC } from "react";
import { User } from "@entities/user/models/user.model.ts";
import { UserFormModel } from "@entities/user/models/user-form.model.ts";
import { FirstNameInputItem } from "@features/profile/profile-personal-details-form/ui/PersonalDetailsForm/fields/FirstNameInputItem.tsx";
import { LastNameInputItem } from "@features/profile/profile-personal-details-form/ui/PersonalDetailsForm/fields/LastNameInputItem.tsx";
import { EmailInputItem } from "@features/profile/profile-personal-details-form/ui/PersonalDetailsForm/fields/EmailInputItem.tsx";
import { AvatarImageItem } from "@features/profile/profile-personal-details-form/ui/PersonalDetailsForm/fields/AvatarImageItem.tsx";

interface Props {
  form: FormInstance;
  editing: boolean;
  personalDetails: User;
  onSubmit: (values: UserFormModel) => void;
  onStartImageLoading?: () => void;
  onFinishImageLoading?: () => void;
}

const PersonalDetailsForm: FC<Props> = ({
  form,
  editing,
  personalDetails,
  onSubmit,
  onFinishImageLoading,
  onStartImageLoading,
}) => {
  return (
    <Form
      onFinish={onSubmit}
      layout="vertical"
      form={form}
      requiredMark={false}
      disabled={!editing}
      className="personal-details-form">
      <Flex gap={24}>
        <AvatarImageItem
          editing={editing}
          personalDetails={personalDetails}
          onStartLoading={onStartImageLoading}
          onFinishLoading={onFinishImageLoading}
        />
        <Flex vertical className="inputs-container">
          <Flex gap={24}>
            <FirstNameInputItem />
            <LastNameInputItem />
          </Flex>
          <EmailInputItem />
        </Flex>
      </Flex>
    </Form>
  );
};

export default PersonalDetailsForm;
