import { useForm } from "antd/es/form/Form";
import Flex from "antd/es/flex";
import CastingForm from "features/casting/casting-form/ui/CastingForm";
import ActionBar from "@shared/ui/ActionBar";
import CancelCreateCastingCylinderButton from "@features/casting/cancel-create-casting-cylinder-button/ui/CancelCreateCastingCylinderButton";
import CreateCastingCylinderButton from "@features/casting/create-casting-cylinder-button/ui/CreateCastingCylinderButton";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import CreateCastingConverter from "@features/casting/casting-form/utils/casting-form-to-dto.converter.ts";
import useCreateCasting from "@entities/casting/hooks/useCreateCasting.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { useNavigate } from "react-router";

const CreateCastingPage = () => {
  const [form] = useForm<CastingFormSchema>();
  const mutation = useCreateCasting();
  const { messageApi } = useMessage();
  const navigate = useNavigate();

  const handleFinish = async (values: CastingFormSchema) => {
    const dto = CreateCastingConverter.convert(values);

    mutation.mutate(dto, {
      onSuccess: ({ id }) => {
        void messageApi.success("Casting is created successfully!");
        navigate(`/casting/${id}`);
      },
      onError: (error) => {
        void messageApi.error(error.data?.friendlyMessage || "Failed to create casting");
        navigate("/casting");
      },
    });
  };

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <ActionBar title="Create casting cylinder">
        <Flex gap={16}>
          <CancelCreateCastingCylinderButton />

          <CreateCastingCylinderButton form={form} loading={mutation.isPending} />
        </Flex>
      </ActionBar>

      <CastingForm form={form} onFinish={handleFinish} showAfterCasting={false} />
    </Flex>
  );
};

export default CreateCastingPage;
