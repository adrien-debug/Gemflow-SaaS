import useCreateGemstone from "@entities/gemstone/hooks/useCreateGemstone";
import AddGemstoneHeader from "@features/gemstones/add-gemstone-header/ui/AddGemstoneHeader";
import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";
import GemstoneForm from "@features/gemstones/gemstone-form/ui/GemstoneForm";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Flex from "antd/es/flex";
import { useForm } from "antd/es/form/Form";
import { useState } from "react";
import { useNavigate } from "react-router";

const CreateGemstonePage = () => {
  const [loading, setLoading] = useState(false);
  const [form] = useForm();
  const { messageApi } = useMessage();
  const navigate = useNavigate();

  const mutation = useCreateGemstone();

  const handleFinish = async (values: GemstoneFormSchema) => {
    setLoading(true);
    mutation.mutate(values, {
      onSuccess: ({ id }) => {
        void messageApi.success("Gemstone was created successfully");
        navigate(`/gemstones/${id}`);
      },
      onError: () => {
        void messageApi.error("Failed to create gemstone");
      },
      onSettled: () => {
        setLoading(false);
        form.resetFields();
      },
    });
  };

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <AddGemstoneHeader form={form} loading={loading} />
      <GemstoneForm form={form} onFinish={handleFinish} />
    </Flex>
  );
};

export default CreateGemstonePage;
