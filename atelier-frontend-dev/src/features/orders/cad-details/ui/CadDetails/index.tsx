import "./styles.scss";
import EditFormController from "@shared/ui/EditFormController";
import useCadDetails from "@entities/order/hooks/useCadDetails.ts";
import { FC, useEffect, useState } from "react";
import CadDetailsForm from "@features/orders/cad-details/ui/CadDetailsForm";
import { useForm } from "antd/es/form/Form";
import { CadDetailsFormFields } from "@features/orders/cad-details/models/cad-details-form.model.ts";
import useUpdateCadDetails from "@entities/order/hooks/useUpdateCadDetails.ts";
import { convertCadDetailsFormFieldsToCadDto } from "@features/orders/cad-details/utils/cad-details.converter.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Spin from "antd/es/spin";
import Flex from "antd/es/flex";
import CopyCadDetailsButton from "@features/orders/copy-cad-details-button/ui/CopyCadDetailsButton";

interface Props {
  orderId: number;
  isEditBlocked?: boolean;
  disabled?: boolean;
}

const CadDetails: FC<Props> = ({ orderId, isEditBlocked, disabled }) => {
  const [editing, setEditing] = useState(false);
  const [loading, setLoading] = useState(false);
  const [fileUploading, setFileUploading] = useState(false);
  const [imageLoading, setImageLoading] = useState(false);
  const [form] = useForm<CadDetailsFormFields>();
  const { messageApi } = useMessage();

  const { data, isPending } = useCadDetails(orderId);
  const mutation = useUpdateCadDetails();

  const remapFormFields = () => {
    if (data) {
      form.setFieldsValue(data);
    }
  };

  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
    remapFormFields();
  };

  useEffect(() => {
    remapFormFields();
  }, [data]);

  const handleFinish = async (values: CadDetailsFormFields) => {
    setLoading(true);
    const dto = convertCadDetailsFormFieldsToCadDto(values);
    mutation.mutate(
      { id: orderId, dto },
      {
        onSuccess: () => {
          messageApi.success("CAD details are updated successfully");
        },
        onError: () => {
          messageApi.error("Failed to update CAD details");
          remapFormFields();
        },
        onSettled: () => {
          setLoading(false);
          setEditing(false);
        },
      },
    );
  };

  if (isPending) {
    return (
      <Flex className="cad-details-spinner-container" justify="center" align="center">
        <Spin />
      </Flex>
    );
  }

  return (
    <>
      <EditFormController
        id="cad-details-controller"
        title="CAD details"
        description="Cad details"
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={form.submit}
        onCancel={handleCancel}
        loading={loading || fileUploading || imageLoading}
        additionalControls={
          !editing && !disabled && <CopyCadDetailsButton toOrderId={orderId} isEditBlocked={isEditBlocked} />
        }
        isEditBlocked={isEditBlocked}
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
        }}
      />

      <CadDetailsForm
        onStartImageLoad={() => setImageLoading(true)}
        onEndImageLoad={() => setImageLoading(false)}
        onStartFileLoad={() => setFileUploading(true)}
        onEndFileLoad={() => setFileUploading(false)}
        editing={editing}
        form={form}
        cadDetails={data}
        onFinish={handleFinish}
      />
    </>
  );
};

export default CadDetails;
