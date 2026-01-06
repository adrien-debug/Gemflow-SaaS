import { FC, useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import CastingForm from "@features/casting/casting-form/ui/CastingForm";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import Loading from "@shared/ui/Loading";
import CastingFormToDtoConverter from "@features/casting/casting-form/utils/casting-form-to-dto.converter.ts";
import useUpdateCasting from "@entities/casting/hooks/useUpdateCasting.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";

interface Props {
  casting: CastingMetadata;
  isEditBlocked?: boolean;
}

const CastingView: FC<Props> = ({ isEditBlocked, casting }) => {
  const [editing, setEditing] = useState(false);
  const [form] = useForm<CastingFormSchema>();
  const { messageApi } = useMessage();

  const updateMutation = useUpdateCasting(casting?.id);

  const handleCancel = () => {
    setEditing(false);
    form.resetFields();
  };

  const handleFinish = async (values: CastingFormSchema) => {
    updateMutation.mutate(CastingFormToDtoConverter.convert(values), {
      onSuccess: () => {
        void messageApi.success("Casting is updated successfully");
      },
      onError: () => {
        void messageApi.error("Failed to update casting");
        form.resetFields();
      },
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  if (!casting) {
    return <Loading />;
  }

  return (
    <>
      <EditFormController
        id="casting-summary-controller"
        title="Casting summary"
        description={`Created on ${dayjs(casting?.createdAt).format(DateFormat.LiteralMontDayYear)} by ${casting?.createdBy?.fullName}`} //change author
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={form.submit}
        onCancel={handleCancel}
        loading={updateMutation.isPending}
        isEditBlocked={isEditBlocked}
      />

      <CastingForm casting={casting} form={form} onFinish={handleFinish} editing={editing} showCylinder={false} />
    </>
  );
};

export default CastingView;
