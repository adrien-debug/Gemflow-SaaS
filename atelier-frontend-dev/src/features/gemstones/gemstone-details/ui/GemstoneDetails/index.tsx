import { useGemstone } from "@entities/gemstone/hooks/useGemstone.ts";
import useUpdateGemstone from "@entities/gemstone/hooks/useUpdateGemstone";
import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";
import GemstoneForm from "@features/gemstones/gemstone-form/ui/GemstoneForm";
import ViewGemstone from "@features/gemstones/view-gemstone/ui/ViewGemstone";
import { DateFormat } from "@shared/constants/date-format.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import EditFormController from "@shared/ui/EditFormController";
import Loading from "@shared/ui/Loading";
import { useForm } from "antd/es/form/Form";
import dayjs from "dayjs";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";

const GemstoneDetails = () => {
  const { id } = useParams();
  const { isPending, data: gemstone } = useGemstone(Number(id));
  const [isEditing, setIsEditing] = useState(false);
  const [form] = useForm();
  const [isUpdating, setIsUpdating] = useState(false);
  const { messageApi } = useMessage();
  const navigate = useNavigate();

  const updateGemstoneMutation = useUpdateGemstone(Number(id));

  const handleFinish = async (values: GemstoneFormSchema) => {
    setIsUpdating(true);
    updateGemstoneMutation.mutate(values, {
      onSuccess: ({ name }) => {
        messageApi.success(`Gemstone ${name} updated successfully.`);
        navigate(`/gemstones/${id}`);
      },
      onError: () => {
        messageApi.error("Something went wrong!");
      },
      onSettled: () => {
        setIsEditing(false);
        setIsUpdating(false);
      },
    });
  };

  if (!gemstone || isPending) return <Loading />;

  return (
    <>
      <EditFormController
        editing={isEditing}
        loading={isUpdating}
        onEdit={() => setIsEditing(true)}
        onCancel={() => setIsEditing(false)}
        onSave={form.submit}
        id="edit-order"
        title="Gem details"
        description={`Created on ${dayjs(gemstone?.createdAt).format(DateFormat.LiteralMontDayYear)} by ${gemstone.createdBy?.fullName}`}
      />

      {isEditing ? <GemstoneForm form={form} onFinish={handleFinish} /> : <ViewGemstone gemstone={gemstone} />}
    </>
  );
};

export default GemstoneDetails;
