import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import AlloySelect from "@entities/alloy/ui/AlloySelect";
import SupplierSelect from "@entities/supplier/ui/SupplierSelect";
import AlloyPurchaseFormConverter from "@features/alloys/alloy-purchase-form/utils/alloy-purchase-form.converter.ts";
import FileList from "@shared/ui/form/FileList";
import { FormRule } from "@shared/utils/form-validators.ts";
import Col from "antd/es/col";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import InputNumber from "antd/es/input-number";
import Row from "antd/es/row";
import "./styles.scss";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from "react";
import { AlloyPurchaseFormSchema } from "@features/alloys/alloy-purchase-form/models/alloy-purchase-form.schema.ts";
import { SupplyType } from "@entities/supplier/constants/supply-type.enum.ts";

export interface AlloyPurchaseFormRef {
  submit: () => void;
}

interface Props {
  onFinish?: (values: AlloyPurchaseFormSchema) => void;
  onStartFileLoad?: () => void;
  onFinishFileLoad?: () => void;
  alloyId?: number;
  purchase?: AlloyPurchase;
}

const AlloyPurchaseForm = (
  { onStartFileLoad, onFinishFileLoad, onFinish, alloyId, purchase }: Props,
  ref: ForwardedRef<AlloyPurchaseFormRef>,
) => {
  const [form] = useForm();

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  useEffect(() => {
    if (purchase) {
      const formValues = AlloyPurchaseFormConverter.convert(purchase);
      form.setFieldsValue(formValues);
    }
  }, [form, purchase]);

  return (
    <Form<AlloyPurchaseFormSchema>
      className="add-alloy-purchase-form"
      onFinish={onFinish}
      form={form}
      layout="vertical"
      requiredMark={false}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem name="alloyId" label="Alloy" initialValue={alloyId}>
            <AlloySelect disabled />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem name="supplierId" label="Supplier" rules={[FormRule.Required("Please, choose supplier")]}>
            <SupplierSelect supplyTypeIds={[SupplyType.METALS]} />
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

        <Col span={24}>
          <FormItem name="invoiceFiles" label="Invoice file">
            <FileList
              filesMaxCount={1}
              onStartFileLoad={onStartFileLoad}
              onEndFileLoad={onFinishFileLoad}
              createFileIdsFieldName="createInvoiceIds"
              deleteFileIdsFieldName="deleteInvoiceIds"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default forwardRef<AlloyPurchaseFormRef, Props>(AlloyPurchaseForm);
