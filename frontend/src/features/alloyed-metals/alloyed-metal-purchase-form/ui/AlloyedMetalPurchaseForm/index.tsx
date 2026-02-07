import AlloySelect from "@entities/alloy/ui/AlloySelect";
import { AlloyedMetalPurchase } from "@entities/alloyed-metal/models/alloyed-metal-purchase.model.ts";
import AlloyedMetalSelect from "@entities/alloyed-metal/ui/AlloyedMetalSelect";
import AlloyedMetalPurchaseFormConverter from "@features/alloyed-metals/alloyed-metal-purchase-form/utils/alloyed-metal-purchase-form.converter.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Col from "antd/es/col";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";
import Row from "antd/es/row";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from "react";
import "./styles.scss";
import { AlloyedMetalPurchaseFormSchema } from "../../models/alloyed-metal-purchase-form.schema";

export interface AlloyedMetalPurchaseFormRef {
  submit: () => void;
}

interface Props {
  onFinish?: (values: AlloyedMetalPurchaseFormSchema) => void;
  purchase?: AlloyedMetalPurchase;
  alloyedMetalId?: number;
}

const AlloyedMetalPurchaseForm = (
  { onFinish, purchase, alloyedMetalId }: Props,
  ref: ForwardedRef<AlloyedMetalPurchaseFormRef>,
) => {
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  useEffect(() => {
    if (purchase) {
      const formValues = AlloyedMetalPurchaseFormConverter.convert(purchase);
      form.setFieldsValue(formValues);
    }
  }, [form, purchase]);

  return (
    <Form<AlloyedMetalPurchaseFormSchema>
      className="add-alloyed-metal-purchase-form"
      onFinish={onFinish}
      form={form}
      layout="vertical"
      requiredMark={false}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem name="alloyId" label="Alloy" rules={[FormRule.Required("Please, choose alloy")]}>
            <AlloySelect disabled={!!purchase?.alloy?.id} />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem
            name="alloyedMetalId"
            label="Alloyed metal"
            rules={[FormRule.Required("Please, choose alloyed metal")]}
            initialValue={alloyedMetalId}>
            <AlloyedMetalSelect disabled={!!purchase?.alloyedMetal?.id || !!alloyedMetalId} />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem
            name="batchWeight"
            label="Weight, g"
            rules={[FormRule.Required("Please, enter weight"), FormRule.PreciseWeight()]}>
            <InputNumber size="large" placeholder="Enter weight" />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem name="balanceDate" label="Balance date" rules={[FormRule.Required("Please, enter date")]}>
            <DatePicker size="large" />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem
            name="priceGram"
            label="Price per gram"
            rules={[FormRule.Required("Please, enter price"), FormRule.PreciseCurrency()]}>
            <InputNumber size="large" prefix="$" suffix="USD" placeholder="Enter purchase total" />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default forwardRef<AlloyedMetalPurchaseFormRef, Props>(AlloyedMetalPurchaseForm);
