import Button from "antd/es/button";
import { FormInstance } from "antd/es/form";
import { FC } from "react";

interface Props {
  form: FormInstance;
  loading: boolean;
}

const CreateCastingCylinderButton: FC<Props> = ({ form, loading }) => {
  const handleFinish = () => {
    form.submit();
  };

  return (
    <Button size="large" type="primary" onClick={handleFinish} loading={loading}>
      Create
    </Button>
  );
};

export default CreateCastingCylinderButton;
