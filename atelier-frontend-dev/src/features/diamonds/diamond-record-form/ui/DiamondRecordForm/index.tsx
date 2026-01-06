import Form, { FormInstance } from "antd/es/form";
import Col from "antd/es/col";
import DiamondShapeSelector from "@entities/diamond/ui/DiamondShapeSelector";
import InputNumber from "antd/es/input-number";
import Input from "antd/es/input";
import Row from "antd/es/row";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { FC, useEffect } from "react";
import { DiamondRecordFormFields } from "@features/diamonds/diamond-record-form/models/diamond-record-form-fields.model.ts";
import {
  convertDiamondRecordToDto,
  convertDiamondRecordToFormModel,
} from "@features/diamonds/diamond-record-form/utils/diamonds-record-form-converter.ts";
import DiamondQualitySelector from "@entities/diamond/ui/DiamondQualitySelector";
import { DiamondRecordDto } from "@entities/diamond/dto/diamond-record.dto.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import SupplierSelect from "@entities/supplier/ui/SupplierSelect";
import { SupplyType } from "@entities/supplier/constants/supply-type.enum.ts";

interface Props {
  record?: DiamondRecord;
  form: FormInstance<DiamondRecordFormFields>;
  onSubmit?: (values: DiamondRecordDto) => void;
}

const DiamondRecordForm: FC<Props> = ({ record, form, onSubmit }) => {
  useEffect(() => {
    if (record) {
      form.setFieldsValue(convertDiamondRecordToFormModel(record));
    }
  }, [record]);

  const handleFinish = (values: DiamondRecordFormFields) => {
    onSubmit?.(convertDiamondRecordToDto(values));
  };

  return (
    <Form form={form} layout="vertical" onFinish={handleFinish} requiredMark={false}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<DiamondRecordFormFields>
            name="diamondShapeId"
            label="Shape"
            rules={[FormRule.Required("Please, select shape")]}>
            <DiamondShapeSelector />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<DiamondRecordFormFields>
            name="parcelName"
            label="Parcel name"
            rules={[FormRule.Required("Please, enter parcel name")]}>
            <Input maxLength={100} size="large" placeholder="Enter parcel name" />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<DiamondRecordFormFields>
            name="sizeFrom"
            label="Size from"
            rules={[FormRule.Required("Please, enter size"), FormRule.JewelSize()]}>
            <InputNumber
              min={0.01}
              style={{ width: "100%" }}
              size="large"
              placeholder="Enter size from"
              precision={2}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<DiamondRecordFormFields>
            name="sizeTo"
            label="Size to"
            rules={[FormRule.Required("Please, enter size"), FormRule.JewelSize()]}>
            <InputNumber min={0.01} style={{ width: "100%" }} size="large" placeholder="Enter size to" precision={2} />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item<DiamondRecordFormFields>
            name="qualityType"
            label="Quality"
            rules={[FormRule.Required("Please, select quality")]}>
            <DiamondQualitySelector />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item<DiamondRecordFormFields>
            name="stoneCarat"
            label="Ct stone"
            rules={[FormRule.Required("Please, enter stone ct"), FormRule.Carat()]}>
            <InputNumber min={0.0001} style={{ width: "100%" }} size="large" placeholder="Enter ct" />
          </Form.Item>
        </Col>

        <Col span={8}>
          <Form.Item<DiamondRecordFormFields>
            name="quantity"
            label="Quantity"
            required={!record}
            rules={[FormRule.Required("Please, enter quantity")]}>
            <InputNumber
              disabled={!!record}
              min={0}
              style={{ width: "100%" }}
              size="large"
              placeholder="Enter quantity"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<DiamondRecordFormFields>
            name="supplierId"
            label="Supplier"
            rules={[FormRule.Required("Please, select supplier")]}>
            <SupplierSelect supplyTypeIds={[SupplyType.GEMSTONES]} />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<DiamondRecordFormFields>
            name="stonePrice"
            label="Price per stone"
            rules={[FormRule.Required("Please, enter stone price"), FormRule.PreciseCurrency()]}>
            <InputNumber
              style={{ width: "100%" }}
              min={0.001}
              size="large"
              prefix="$"
              suffix="USD"
              placeholder="Enter price per stone"
            />
          </Form.Item>
        </Col>
      </Row>
    </Form>
  );
};

export default DiamondRecordForm;
