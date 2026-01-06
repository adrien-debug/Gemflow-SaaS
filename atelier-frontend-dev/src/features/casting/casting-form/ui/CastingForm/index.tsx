import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import FormItem from "antd/es/form/FormItem";
import { FormRule } from "@shared/utils/form-validators.ts";
import CylinderSelect from "@entities/cylinder/ui/CylinderSelect";
import DataDisplay from "@shared/ui/DataDisplay";
import MaterialAndCaratageCard from "@features/casting/casting-form/ui/MaterialAndCaratageCard";
import ReusedMaterialCard from "@features/casting/casting-form/ui/ReusedMaterialCard";
import WaxTreeWeightCard from "@features/casting/casting-form/ui/WaxTreeWeightCard";
import MetalAndAlloyCard from "@features/casting/casting-form/ui/MetalAndAlloyCard";
import Form, { FormInstance } from "antd/es/form";
import { FC, useState } from "react";
import { useWatch } from "antd/es/form/Form";
import useAlloyParametersByMaterialId from "@entities/metal/hooks/useAlloyParametersByMaterialId.ts";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import {
  calculatePartsWeight,
  calculateTotalWeight,
  calculateWeightLoss,
} from "@features/casting/casting-form/utils/casting.util.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import CastingMetadataToFormConverter from "@features/casting/casting-form/utils/casting-metadata-to-form.converter.ts";
import CastingCard from "@features/casting/casting-card/ui/CastingCard";
import InputNumber from "antd/es/input-number";
import { CastingStatus } from "@entities/casting/constants/casting-status.enum.ts";

interface Props {
  casting?: CastingMetadata;
  editing?: boolean;
  form: FormInstance<CastingFormSchema>;
  onFinish: (values: CastingFormSchema) => void;
  showCylinder?: boolean;
  showAfterCasting?: boolean;
}

const CastingForm: FC<Props> = ({
  form,
  onFinish,
  editing = true,
  casting,
  showCylinder = true,
  showAfterCasting = true,
}) => {
  const [selectedCylinder, setSelectedCylinder] = useState<Cylinder>();
  const materialId = useWatch("materialId", form);

  const { data } = useAlloyParametersByMaterialId(materialId);

  const onCylinderSelect = (option: Cylinder) => {
    setSelectedCylinder(option);
  };

  return (
    <Form
      layout="vertical"
      initialValues={casting ? CastingMetadataToFormConverter.convert(casting) : undefined}
      requiredMark={false}
      form={form}
      onFinish={onFinish}>
      <Row gutter={24}>
        {showCylinder && (
          <Col span={12}>
            <Typography.Title level={4} style={{ opacity: 0.5, fontWeight: 400, marginTop: 0 }}>
              Cylinder
            </Typography.Title>

            <FormItem<CastingFormSchema>
              name="cylinderId"
              label="Choose cylinder"
              style={{ width: 280 }}
              rules={[
                FormRule.Required("Choose cylinder"),
                () => ({
                  validator: () => {
                    if (!selectedCylinder?.open) {
                      return Promise.resolve();
                    }
                    return Promise.reject("Selected cylinder is already in use");
                  },
                }),
              ]}>
              <CylinderSelect onChange={(_, option) => onCylinderSelect(option as Cylinder)} disabled={!!casting?.id} />
            </FormItem>
          </Col>
        )}

        <Col span={showCylinder ? 12 : 8}>
          <Typography.Title level={4} style={{ opacity: 0.5, fontWeight: 400, marginTop: 0 }}>
            Pre-casting
          </Typography.Title>

          <Form.Item
            label="Total weight, g"
            shouldUpdate={(prev, curr) =>
              prev.alloyWeight !== curr.alloyWeight ||
              prev.pureMetalWeight !== curr.pureMetalWeight ||
              prev.alloyedMetalWeight !== curr.alloyedMetalWeight
            }>
            {({ getFieldsValue }) => {
              const totalWeight = calculateTotalWeight(getFieldsValue());

              return <DataDisplay>{moneyFormatter(totalWeight)}</DataDisplay>;
            }}
          </Form.Item>
        </Col>

        {showAfterCasting && (
          <Col span={16}>
            <Typography.Title level={4} style={{ opacity: 0.5, fontWeight: 400, marginTop: 0 }}>
              After casting
            </Typography.Title>

            <Row gutter={16}>
              <Col span={8}>
                <Form.Item label="Parts weight, g">
                  <DataDisplay>{casting && moneyFormatter(calculatePartsWeight(casting))}</DataDisplay>
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item<CastingFormSchema> label="Weight to reuse, g" name="reuseWeight">
                  {editing ? (
                    <InputNumber
                      size="large"
                      placeholder="Enter weight"
                      style={{ width: "100%" }}
                      min={0}
                      precision={2}
                    />
                  ) : (
                    <DataDisplay>{moneyFormatter(form.getFieldValue("reuseWeight"))}</DataDisplay>
                  )}
                </Form.Item>
              </Col>

              <Col span={8}>
                <Form.Item
                  label="Casting loss, g"
                  shouldUpdate={(prev, current) => prev.reuseWeight !== current.reuseWeight}>
                  {({ getFieldsValue }) => (
                    <DataDisplay>
                      {casting && moneyFormatter(calculateWeightLoss(getFieldsValue(), casting))}
                    </DataDisplay>
                  )}
                </Form.Item>
              </Col>
            </Row>
          </Col>
        )}
      </Row>

      {!!casting?.orderTasks?.length && (
        <Row gutter={[16, 16]} style={{ marginBottom: "24px" }}>
          {casting.orderTasks.map((task) => (
            <Col span={8} key={task.id}>
              <CastingCard task={task} disabled={casting?.status === CastingStatus.Finished} castingId={casting?.id} />
            </Col>
          ))}
        </Row>
      )}

      <Row gutter={[24, 24]} style={{ marginTop: 18 }}>
        <Col span={12}>
          <MaterialAndCaratageCard alloyParameters={data} editing={editing} casting={casting} />
        </Col>

        <Col span={12}>
          <ReusedMaterialCard editing={editing} casting={casting} />
        </Col>

        <Col span={12}>
          <WaxTreeWeightCard alloyParameters={data} editing={editing} casting={casting} />
        </Col>

        <Col span={12}>
          <MetalAndAlloyCard alloyParameters={data} editing={editing} casting={casting} />
        </Col>
      </Row>
    </Form>
  );
};

export default CastingForm;
