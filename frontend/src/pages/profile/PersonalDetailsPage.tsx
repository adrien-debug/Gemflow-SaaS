import useUpdateCurrent from "@entities/user/hooks/useUpdateCurrent.ts";
import UserFormConverter from "@pages/profile/utils/user-form.converter.ts";
import EditFormController from "@shared/ui/EditFormController";
import { useEffect, useState } from "react";
import usePersonalDetails from "@entities/user/hooks/usePersonalDetails.ts";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import PersonalDetailsForm from "@features/profile/profile-personal-details-form/ui/PersonalDetailsForm";
import Spin from "antd/es/spin";
import { useMessage } from "@shared/hooks/useMessage.ts";
import UserConverter from "@pages/profile/utils/user.converter.ts";
import { UserFormModel } from "@entities/user/models/user-form.model.ts";

const PersonalDetailsPage = () => {
  const [editing, setEditing] = useState<boolean>(false);
  const [isImageLoading, setIsImageLoading] = useState(false);
  const { mutate: updateCurrent, isPending } = useUpdateCurrent();
  const { data: personalDetails, isLoading } = usePersonalDetails();
  const [form] = Form.useForm();
  const { messageApi } = useMessage();

  const handleSubmit = async (values: UserFormModel) => {
    const userDto = UserFormConverter.convert(values);

    updateCurrent(userDto, {
      onSuccess: () => {
        messageApi.success("Personal details successfully saved");
      },
      onError: () => {
        messageApi.error("Failed to save personal details");
      },
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  const setFormValues = async () => {
    if (personalDetails) {
      form.setFieldsValue(UserConverter.convert(personalDetails));
    }
  };

  const onCancel = async () => {
    void setFormValues();
    setEditing(false);
  };

  useEffect(() => {
    void setFormValues();
  }, [personalDetails]);

  return (
    <Flex vertical>
      <EditFormController
        title="Personal Details"
        editing={editing}
        description="Update your personal details"
        onEdit={() => setEditing(true)}
        onCancel={onCancel}
        onSave={form.submit}
        borderBottom={false}
        loading={isPending || isImageLoading}
        id="personal-details"
      />
      <Flex className="form-container">
        {isLoading ? (
          <Flex flex={1} justify="center" align="center">
            <Spin />
          </Flex>
        ) : (
          personalDetails && (
            <PersonalDetailsForm
              onStartImageLoading={() => setIsImageLoading(true)}
              onFinishImageLoading={() => setIsImageLoading(false)}
              form={form}
              editing={editing}
              personalDetails={personalDetails}
              onSubmit={handleSubmit}
            />
          )
        )}
      </Flex>
    </Flex>
  );
};

export default PersonalDetailsPage;
