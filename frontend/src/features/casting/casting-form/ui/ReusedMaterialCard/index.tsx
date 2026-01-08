import CardWithHeader from "@shared/ui/CardWithHeader";
import Col from "antd/es/col";
import Form from "antd/es/form";
import Row from "antd/es/row";
import { FC, useEffect } from "react";
import InputNumber from "antd/es/input-number";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import DataDisplay from "@shared/ui/DataDisplay";
import "./styles.scss";
import Flex from "antd/es/flex";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";
import Tooltip from "antd/es/tooltip";
import { InfoCircleOutlined } from "@ant-design/icons";
import AlloyedMetalSelect from "@entities/alloyed-metal/ui/AlloyedMetalSelect";
import { useWatch } from "antd/es/form/Form";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import useReusedMaterialRatio from "@features/casting/casting-form/hooks/useReusedMaterialRatio.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  editing?: boolean;
  casting?: CastingMetadata;
}

const REUSED_MATERIAL_RATIO_GAP = 80;

const ReusedMaterialCard: FC<Props> = ({ editing = true, casting }) => {
  const form = useFormInstance();

  const materialId = useWatch("materialId", form);
  const purityId = useWatch("purityId", form);

  useEffect(() => {
    const touched = form.isFieldsTouched(["materialId", "purityId"]);

    if (touched) {
      form.setFieldsValue({
        alloyedMetalId: undefined,
        alloyedMetalWeight: undefined,
      });
    }
  }, [form, materialId, purityId, editing]);

  const getMaterialId = () => {
    const { getFieldValue } = form;
    return getFieldValue("materialId") ? [getFieldValue("materialId")] : [];
  };

  const getPurityId = () => {
    const { getFieldValue } = form;
    return getFieldValue("purityId") ? [getFieldValue("purityId")] : [];
  };

  const { reusedMaterialRatio } = useReusedMaterialRatio(form);

  return (
    <CardWithHeader
      title="REUSED MATERIAL"
      topRightContent={
        <Flex gap={12}>
          <TagPercentageGrowth
            showPlus={false}
            percentage={reusedMaterialRatio}
            color={reusedMaterialRatio <= REUSED_MATERIAL_RATIO_GAP ? "green" : "red"}
          />
          <Tooltip title="New vs reused material ratio, recommended to keep it above 20%" placement="top">
            {<InfoCircleOutlined style={{ opacity: 0.5 }} />}
          </Tooltip>
        </Flex>
      }>
      <Row gutter={16} className="reused-material-card">
        <Col span={12}>
          <Form.Item dependencies={["materialId", "purityId"]} noStyle>
            {({ getFieldValue }) => (
              <Form.Item<CastingFormSchema> label="Alloyed metal" name="alloyedMetalId">
                {editing ? (
                  <AlloyedMetalSelect
                    disabled={!getFieldValue("materialId") || !getFieldValue("purityId")}
                    searchConfig={{
                      searchCriteria: { metalIds: getMaterialId(), metalPurityIds: getPurityId() },
                    }}
                  />
                ) : (
                  <DataDisplay>{casting?.alloyedMetal?.name || "-"}</DataDisplay>
                )}
              </Form.Item>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item dependencies={["alloyedMetalId"]} noStyle>
            {() => (
              <Form.Item<CastingFormSchema> label="Alloyed metal weight, g" name="alloyedMetalWeight" required={false}>
                {editing ? (
                  <InputNumber
                    size="large"
                    disabled={!form.getFieldValue("alloyedMetalId")}
                    placeholder="Enter weight"
                    style={{ width: "100%" }}
                    min={0}
                    precision={2}
                  />
                ) : (
                  <DataDisplay>{moneyFormatter(casting?.alloyedMetalWeight)}</DataDisplay>
                )}
              </Form.Item>
            )}
          </Form.Item>
        </Col>
      </Row>
    </CardWithHeader>
  );
};

export default ReusedMaterialCard;
