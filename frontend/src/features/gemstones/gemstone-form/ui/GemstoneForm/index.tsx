import { FC, useEffect, useState } from "react";
import { FormInstance } from "antd/es/form";
import Form from "antd/es/form";
import { GemstoneFormSchema } from "@features/gemstones/gemstone-form/model/gemstone-form.model";
import { useGemstoneCalculations } from "@features/gemstones/gemstone-form/hooks/useGemstoneCalculations";
import GemstoneParametersForm from "@features/gemstones/gemstone-parameters-form/ui/GemstoneParametersForm";
import GemstonePriceDetailsForm from "@features/gemstones/gemstone-priсe-details-form/ui/GemstonePriceDetailsForm";
import Col from "antd/es/col";
import Row from "antd/es/row";
import { useGemstone } from "@entities/gemstone/hooks/useGemstone.ts";
import { useParams } from "react-router";
import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum";
import { convertGemstoneToForm } from "@features/gemstones/gemstone-form/utils/gemstone-to-form-converter.ts";

interface Props {
  onFinish?: (gemstone: GemstoneFormSchema) => void;
  form: FormInstance<GemstoneFormSchema>;
}

const GemstoneForm: FC<Props> = ({ form, onFinish }) => {
  const { id } = useParams();
  const { data: gemstone } = useGemstone(Number(id));

  const [initialMethod, setInitialMethod] = useState<GemstoneMethodType>(GemstoneMethodType.PRICE);

  useEffect(() => {
    if (gemstone) {
      const values = convertGemstoneToForm(gemstone);
      setInitialMethod(values.methodType);
      form.setFieldsValue(values);
    }
  }, [form, gemstone]);

  const { isPrice, isManual, handleMethodChange, handleValuesChange } = useGemstoneCalculations(form, initialMethod);

  return (
    <Form requiredMark={false} layout="vertical" form={form} onFinish={onFinish} onValuesChange={handleValuesChange}>
      <Row gutter={44}>
        <Col span={13}>
          <GemstoneParametersForm />
        </Col>
        <Col span={7}>
          <GemstonePriceDetailsForm isPrice={isPrice} isManual={isManual} handleMethodChange={handleMethodChange} />
        </Col>
      </Row>
    </Form>
  );
};

export default GemstoneForm;
