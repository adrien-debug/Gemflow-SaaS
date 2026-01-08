import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";
import Button from "antd/es/button";
import { FormInstance } from "antd/es/form";
import { FC } from "react";

interface Props {
  form: FormInstance<GemstoneFormSchema>;
  loading: boolean;
}

const AddGemstoneButton: FC<Props> = ({ form, loading }) => {
  const handleFinish = () => {
    form.submit();
  };
  return (
    <Button size="large" type="primary" onClick={handleFinish} loading={loading}>
      Add
    </Button>
  );
};

export default AddGemstoneButton;
