import { FC, useEffect } from "react";
import CardWithHeader from "@shared/ui/CardWithHeader";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import DataDisplay from "@shared/ui/DataDisplay";
import { FormRule } from "@shared/utils/form-validators.ts";
import "./styles.scss";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Form from "antd/es/form";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import Select from "antd/es/select";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import { useWatch } from "antd/es/form/Form";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";

interface Props {
  alloyParameters?: AlloyParameters;
  casting?: CastingMetadata;
  editing?: boolean;
}

const MaterialAndCaratageCard: FC<Props> = ({ editing = true, alloyParameters, casting }) => {
  const form = useFormInstance<CastingFormSchema>();

  const materialId = useWatch("materialId", form);

  useEffect(() => {
    const touched = form.isFieldTouched("materialId");

    if (touched) {
      form.setFieldsValue({ purityId: undefined });
    }
  }, [form, materialId]);

  return (
    <CardWithHeader title="MATERIAL AND CARATAGE">
      <Row gutter={16} className="material-card">
        <Col span={9}>
          <Form.Item<CastingFormSchema>
            label="Material"
            name="materialId"
            rules={[FormRule.Required("Choose material")]}>
            {editing ? (
              <MetalSelect disabled={!!casting?.id} />
            ) : (
              <DataDisplay>{casting?.metal.name || "-"}</DataDisplay>
            )}
          </Form.Item>
        </Col>

        <Col span={9}>
          <Form.Item dependencies={["materialId"]} noStyle>
            {() => (
              <Form.Item<CastingFormSchema>
                label="Caratage"
                name="purityId"
                required={false}
                rules={[FormRule.Required("Please, choose caratage")]}>
                {editing ? (
                  <Select
                    placeholder="Choose caratage"
                    size="large"
                    fieldNames={{ value: "id", label: "metalPurity" }}
                    options={alloyParameters?.metalPurities || []}
                    disabled={!form.getFieldValue("materialId")}
                  />
                ) : (
                  <DataDisplay>{casting?.metalPurity.metalPurity || "-"}</DataDisplay>
                )}
              </Form.Item>
            )}
          </Form.Item>
        </Col>

        <Col span={6}>
          <DataDisplay label="Wax multiplier">{alloyParameters?.waxCastingValue ?? "-"}</DataDisplay>
        </Col>
      </Row>
    </CardWithHeader>
  );
};

export default MaterialAndCaratageCard;
