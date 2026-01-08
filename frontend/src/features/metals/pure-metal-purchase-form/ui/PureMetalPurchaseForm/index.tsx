import SupplierSelect from "@entities/supplier/ui/SupplierSelect";
import { MetalPurchaseSchema } from "@features/metals/pure-metal-purchase-form/models/metal-purchase.schema.ts";
import FileList from "@shared/ui/form/FileList";
import { FormRule } from "@shared/utils/form-validators.ts";
import Col from "antd/es/col";
import DatePicker from "antd/es/date-picker";
import Form from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";
import InputNumber from "antd/es/input-number";
import Row from "antd/es/row";
import "./styles.scss";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle } from "react";
import PureMetalSelect from "@entities/metal/ui/PureMetalSelect";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import PureMetalPurchaseFormConverter from "@features/metals/pure-metal-purchase-form/utils/pure-metal-purchase-form.converter.ts";
import { SupplyType } from "@entities/supplier/constants/supply-type.enum.ts";

export interface PureMetalPurchaseFormRef {
  submit: () => void;
}

interface Props {
  onFinish?: (values: MetalPurchaseSchema) => void;
  onStartFileLoad?: () => void;
  onFinishFileLoad?: () => void;
  pureMetalSummary?: PureMetalSummary;
  purchase?: PureMetalPurchase;
}

const PureMetalPurchaseForm = (
  { onStartFileLoad, onFinishFileLoad, onFinish, pureMetalSummary, purchase }: Props,
  ref: ForwardedRef<PureMetalPurchaseFormRef>,
) => {
  const [form] = useForm();

  useEffect(() => {
    if (purchase) {
      const formValues = PureMetalPurchaseFormConverter.convert(purchase);
      form.setFieldsValue(formValues);
    }
  }, [form, purchase]);

  useEffect(() => {
    if (pureMetalSummary) {
      form.setFieldsValue({
        metalId: pureMetalSummary.priceMetalName?.id,
      });
    }
  }, [pureMetalSummary, form]);

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  return (
    <Form<MetalPurchaseSchema>
      className="add-metal-purchase-form"
      onFinish={onFinish}
      form={form}
      layout="vertical"
      requiredMark={false}>
      <Row gutter={24}>
        <Col span={12}>
          <FormItem<MetalPurchaseSchema> name="metalId" label="Metal">
            <PureMetalSelect disabled={!!pureMetalSummary || !!purchase} />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem<MetalPurchaseSchema>
            name="supplierId"
            label="Supplier"
            rules={[FormRule.Required("Please, choose supplier")]}>
            <SupplierSelect supplyTypeIds={[SupplyType.METALS]} />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem<MetalPurchaseSchema>
            name="weight"
            label="Weight, g"
            rules={[FormRule.Required("Please, enter weight"), FormRule.PreciseWeight()]}>
            <InputNumber min={0.01} size="large" placeholder="Enter weight" />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem<MetalPurchaseSchema> name="barNumber" label="Bar number">
            <Input size="large" maxLength={128} placeholder="Enter bar number" />
          </FormItem>
        </Col>

        <Col span={8}>
          <FormItem<MetalPurchaseSchema> name="coc" label="COC">
            <Input size="large" placeholder="Enter coc" maxLength={128} />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem<MetalPurchaseSchema>
            name="balanceDate"
            label="Balance date"
            rules={[FormRule.Required("Please, enter date")]}>
            <DatePicker size="large" />
          </FormItem>
        </Col>

        <Col span={12}>
          <FormItem<MetalPurchaseSchema>
            name="pricePerGram"
            label="Price per gram"
            rules={[FormRule.Required("Please, enter price"), FormRule.PreciseCurrency()]}>
            <InputNumber min={0.001} size="large" prefix="$" suffix="USD" placeholder="Enter price per gram" />
          </FormItem>
        </Col>

        <Col span={24}>
          <FormItem<MetalPurchaseSchema> name="invoiceFiles" label="Invoice file">
            <FileList
              filesMaxCount={1}
              onStartFileLoad={onStartFileLoad}
              onEndFileLoad={onFinishFileLoad}
              createFileIdsFieldName="createInvoiceFileIds"
              deleteFileIdsFieldName="deletedInvoiceFileIds"
            />
          </FormItem>
        </Col>
      </Row>
    </Form>
  );
};

export default forwardRef<PureMetalPurchaseFormRef, Props>(PureMetalPurchaseForm);
