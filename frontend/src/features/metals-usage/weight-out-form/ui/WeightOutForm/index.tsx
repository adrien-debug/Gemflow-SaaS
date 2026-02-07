import { WeightOutFormSchema } from "@features/metals-usage/weight-out-form/models/weight-out-form.model.ts";
import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import { useForm } from "antd/es/form/Form";
import InputNumber from "antd/es/input-number";
import Row from "antd/es/row";
import Col from "antd/es/col";
import DataDisplay from "@shared/ui/DataDisplay";
import Checkbox from "antd/es/checkbox";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export interface WeightOutFormRef {
  submit: () => void;
}

interface Props {
  handleFinish: (values: WeightOutFormSchema) => void;
  gemsWeight?: number;
  diamondsWeight?: number;
  inputWeight?: number;
  totalWeight: number;
}

const WeightOutForm = (
  { handleFinish, gemsWeight, diamondsWeight, inputWeight, totalWeight }: Props,
  ref: ForwardedRef<WeightOutFormRef>,
) => {
  const [form] = useForm();

  const handleValuesChange = (changedValues: Partial<WeightOutFormSchema>, values: WeightOutFormSchema) => {
    if (("inputWeight" in changedValues || "toDeduct" in changedValues) && typeof values.inputWeight === "number") {
      const weight = values.toDeduct
        ? values.inputWeight - (gemsWeight || 0) - (diamondsWeight || 0)
        : values.inputWeight;
      form.setFieldValue("totalWeight", parseFloat(weight.toFixed(2)));
    } else {
      form.setFieldValue("totalWeight", null);
    }
  };

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  return (
    <Form
      form={form}
      requiredMark={false}
      layout="vertical"
      onFinish={handleFinish}
      onValuesChange={handleValuesChange}>
      <Form.Item dependencies={["inputWeight", "toDeduct"]} noStyle>
        {({ getFieldValue }) => (
          <Form.Item
            name="inputWeight"
            label="Weight input, g"
            initialValue={inputWeight}
            rules={[
              FormRule.Required("Please, enter weight"),
              FormRule.Min(
                Number((getFieldValue("toDeduct") ? (gemsWeight || 0) + (diamondsWeight || 0) : 0).toFixed(2)),
              ),
              FormRule.Max(Number((totalWeight + (gemsWeight || 0) + (diamondsWeight || 0)).toFixed(2))),
            ]}>
            <InputNumber min={0.01} size="large" placeholder="Enter weight" style={{ width: "100%" }} />
          </Form.Item>
        )}
      </Form.Item>

      <Row>
        <Col span={12}>
          <Form.Item>
            <DataDisplay label="Gems weight, g">{gemsWeight}</DataDisplay>
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item>
            <DataDisplay label="Diamonds weight, g">{diamondsWeight}</DataDisplay>
          </Form.Item>
        </Col>
      </Row>

      <Form.Item name="toDeduct" valuePropName="checked">
        <Checkbox>Deduct Gems and Diamonds weight</Checkbox>
      </Form.Item>

      <Form.Item dependencies={["inputWeight", "toDeduct"]} noStyle>
        {({ getFieldValue }) => (
          <Form.Item name="totalWeight" initialValue={inputWeight}>
            <DataDisplay label="Total weight, g">{getFieldValue("totalWeight")}</DataDisplay>
          </Form.Item>
        )}
      </Form.Item>
    </Form>
  );
};

export default forwardRef<WeightOutFormRef, Props>(WeightOutForm);
