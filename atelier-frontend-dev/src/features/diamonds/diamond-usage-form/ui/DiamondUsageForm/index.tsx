import Form from "antd/es/form";
import { useForm, useWatch } from "antd/es/form/Form";
import { DiamondUsageFormSchema } from "@features/diamonds/diamond-usage-form/models/diamond-usage-form.model.ts";
import Row from "antd/es/row";
import SupplierSelect from "@entities/supplier/ui/SupplierSelect";
import Col from "antd/es/col";
import DiamondShapeSelector from "@entities/diamond/ui/DiamondShapeSelector";
import DiamondRecordSelect from "@entities/diamond/ui/DiamondRecordSelect";
import { ForwardedRef, forwardRef, useEffect, useImperativeHandle, useState } from "react";
import InputNumber from "antd/es/input-number";
import { FormRule } from "@shared/utils/form-validators.ts";
import DataDisplay from "@shared/ui/DataDisplay";
import UserSelect from "@entities/user/ui/UserSelect";
import DatePicker from "antd/es/date-picker";
import { DateFormat } from "@shared/constants/date-format.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import DiamondUsageFormConverter from "@features/diamonds/diamond-usage-form/utils/diamond-usage-form.converter.ts";
import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";
import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";
import DiamondUsageFormReverse from "@features/diamonds/diamond-usage-form/utils/diamons-usage-form-reverse.converter.ts";
import { SupplyType } from "@entities/supplier/constants/supply-type.enum.ts";

export interface DiamondUsageFormRef {
  submit: () => void;
  reset: () => void;
}

interface Props {
  onFinish?: (dto: Omit<DiamondUsageDto, "orderId">) => void;
  showStoneSetter?: boolean;
  showDate?: boolean;
  diamondUsageMetadata?: DiamondUsageMetadata;
  disableFields?: ("supplierId" | "diamondRecordId" | "shapeId")[]; //temporary
}

const DiamondUsageForm = (
  { onFinish, diamondUsageMetadata, showStoneSetter = true, showDate = true, disableFields }: Props,
  ref: ForwardedRef<DiamondUsageFormRef>,
) => {
  const [form] = useForm<DiamondUsageFormSchema>();
  const [selectedDiamondRecord, setSelectedDiamondRecord] = useState<DiamondRecord>();

  const quantity = useWatch("quantity", form);

  useEffect(() => {
    if (diamondUsageMetadata) {
      const initialValues = DiamondUsageFormReverse.convert(diamondUsageMetadata);
      form.setFieldsValue(initialValues);
      setSelectedDiamondRecord(diamondUsageMetadata.diamond);
    }
  }, [diamondUsageMetadata]);

  useImperativeHandle(ref, () => ({
    submit: () => {
      form.submit();
    },
    reset: () => {
      setSelectedDiamondRecord(undefined);
      form.resetFields();
    },
  }));

  useEffect(() => {
    if (!diamondUsageMetadata && form.getFieldValue("quantity")) {
      form.resetFields(["quantity"]);
    }
  }, [form, selectedDiamondRecord, diamondUsageMetadata]);

  const resetDiamondRecord = () => {
    form.resetFields(["diamondRecordId"]);
    setSelectedDiamondRecord(undefined);
  };

  const handleFinish = (values: DiamondUsageFormSchema) => {
    onFinish?.(DiamondUsageFormConverter.convert(values));
  };

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={handleFinish}>
      <Row gutter={24}>
        <Col span={12}>
          <Form.Item<DiamondUsageFormSchema>
            name="supplierId"
            label="Supplier"
            rules={[FormRule.Required("Please, choose supplier")]}>
            <SupplierSelect
              supplyTypeIds={[SupplyType.GEMSTONES]}
              onChange={resetDiamondRecord}
              disabled={disableFields?.includes("supplierId")}
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item dependencies={["supplierId"]} noStyle>
            {() => (
              <Form.Item<DiamondUsageFormSchema>
                name="shapeId"
                label="Shape"
                rules={[FormRule.Required("Please, choose shape")]}>
                <DiamondShapeSelector
                  disabled={!form.getFieldValue("supplierId") || disableFields?.includes("shapeId")}
                  onChange={resetDiamondRecord}
                />
              </Form.Item>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item dependencies={["supplierId", "shapeId"]} noStyle>
            {() => (
              <Form.Item<DiamondUsageFormSchema>
                name="diamondRecordId"
                label="Size"
                rules={[FormRule.Required("Please, choose size")]}>
                <DiamondRecordSelect
                  placeholder="Choose size"
                  fieldNames={{ label: "sizeName", value: "id" }}
                  searchConfig={{
                    searchCriteria: {
                      diamondShapeIds: form.getFieldValue("shapeId") ? [form.getFieldValue("shapeId")] : undefined,
                      supplierIds: form.getFieldValue("supplierId") ? [form.getFieldValue("supplierId")] : undefined,
                    },
                  }}
                  disabled={!form.getFieldValue("shapeId") || disableFields?.includes("diamondRecordId")}
                  onChange={(_, option) => {
                    setSelectedDiamondRecord(option as DiamondRecord);
                  }}
                />
              </Form.Item>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<DiamondUsageFormSchema> dependencies={["diamondRecordId"]} noStyle>
            {() => (
              <Form.Item<DiamondUsageFormSchema>
                name="quantity"
                label="Quantity"
                rules={[
                  FormRule.Required(),
                  FormRule.Min(1),
                  () => ({
                    validator(_, value) {
                      const maxQty = selectedDiamondRecord?.quantity ?? 0;
                      if (value <= maxQty) {
                        return Promise.resolve();
                      }

                      if (!diamondUsageMetadata) {
                        return Promise.reject(`${maxQty} items of this size left`);
                      }

                      const totalAvailable = (diamondUsageMetadata.quantity as number) + maxQty;
                      if (value > totalAvailable) {
                        return Promise.reject(`Max quantity available is ${totalAvailable}`);
                      }

                      return Promise.resolve();
                    },
                  }),
                ]}>
                <InputNumber
                  maxLength={5}
                  min={0}
                  size="large"
                  style={{ width: "100%" }}
                  placeholder="Enter quantity"
                />
              </Form.Item>
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<DiamondUsageFormSchema> dependencies={["diamondRecordId"]}>
            {() => <DataDisplay label="Stone weight, ct">{selectedDiamondRecord?.stoneCarat}</DataDisplay>}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<DiamondUsageFormSchema> dependencies={["diamondRecordId"]}>
            {() => <DataDisplay label="Stone price">{selectedDiamondRecord?.stonePrice}</DataDisplay>}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<DiamondUsageFormSchema> dependencies={["diamondRecordId"]}>
            {() => {
              const weight = selectedDiamondRecord?.stoneCarat || 0;
              return (
                <DataDisplay label="Total weight, ct">{parseFloat((weight * quantity).toFixed(5)) || "-"}</DataDisplay>
              );
            }}
          </Form.Item>
        </Col>

        <Col span={6}>
          <Form.Item<DiamondUsageFormSchema>
            dependencies={["diamondRecordId"]}
            rules={[FormRule.Required("Please, enter quantity")]}>
            {() => {
              const price = selectedDiamondRecord?.stonePrice || 0;
              return <DataDisplay label="Total cost">{parseFloat((price * quantity).toFixed(3)) || "-"}</DataDisplay>;
            }}
          </Form.Item>
        </Col>

        {showStoneSetter && (
          <Col span={12}>
            <Form.Item<DiamondUsageFormSchema>
              name="employeeId"
              label="Stone setter"
              rules={[FormRule.Required("Please, choose stone setter")]}>
              <UserSelect placeholder="Choose employee" />
            </Form.Item>
          </Col>
        )}

        {showDate && (
          <Col span={12}>
            <Form.Item<DiamondUsageFormSchema>
              name="date"
              label="Date"
              rules={[FormRule.Required("Please, choose date")]}>
              <DatePicker
                placeholder="Choose date"
                size="large"
                style={{ width: "100%" }}
                format={DateFormat.LiteralMontDayYear}
              />
            </Form.Item>
          </Col>
        )}
      </Row>
    </Form>
  );
};

export default forwardRef<DiamondUsageFormRef, Props>(DiamondUsageForm);
