import CardWithHeader from "@shared/ui/CardWithHeader";
import Col from "antd/es/col";
import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import InputNumber from "antd/es/input-number";
import Row from "antd/es/row";
import { FC, useEffect, useState } from "react";
import Button from "antd/es/button";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import PureMetalSelect from "@entities/metal/ui/PureMetalSelect";
import DataDisplay from "@shared/ui/DataDisplay";
import "./styles.scss";
import EditPureMetalWeightModal from "@features/casting/edit-pure-metal-weight-modal/ui/EditPureMetalWeightModal";
import EditAlloyMetalWeightModal from "@features/casting/edit-alloy-metal-weight-modal/ui/EditAlloyMetalWeightModal";
import Flex from "antd/es/flex";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";
import Tooltip from "antd/es/tooltip";
import { InfoCircleOutlined } from "@ant-design/icons";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import AlloySelect from "@entities/alloy/ui/AlloySelect";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import useMetalPurityRatio from "@features/casting/casting-form/hooks/useMetalPurityRatio.ts";
import { useWatch } from "antd/es/form/Form";
import useWaxWeights from "@features/casting/casting-form/hooks/useWaxWeights.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  editing?: boolean;
  alloyParameters?: AlloyParameters;
  casting?: CastingMetadata;
}

const MetalAndAlloyCard: FC<Props> = ({ editing = true, alloyParameters, casting }) => {
  const form = useFormInstance<CastingFormSchema>();
  const { messageApi } = useMessage();

  const [isEditPureMetalModalOpen, setIsEditPureMetalModalOpen] = useState(false);
  const [isAlloyPureMetalModalOpen, setIsAlloyPureMetalModalOpen] = useState(false);

  const { metalPurity, isGoodPurity } = useMetalPurityRatio(form, alloyParameters);
  const { preliminaryCastWeight } = useWaxWeights(form, alloyParameters);

  const pureMetalId = useWatch("pureMetalId", form);
  const alloyId = useWatch("alloyId", form);

  useEffect(() => {
    const touched = form.isFieldTouched("pureMetalId");

    if (touched) {
      form.setFieldsValue({
        pureMetalWeight: undefined,
      });
    }
  }, [form, pureMetalId]);

  useEffect(() => {
    const touched = form.isFieldTouched("alloyId");

    if (touched) {
      form.setFieldsValue({
        alloyWeight: undefined,
      });
    }
  }, [form, alloyId]);

  useEffect(() => {
    const touched = form.isFieldTouched("materialId");

    if (touched) {
      if (alloyParameters) {
        form.setFieldsValue({
          pureMetalId: alloyParameters.priceMetalName?.id as number,
          alloyId: undefined,
          alloyWeight: undefined,
        });
      } else {
        form.setFieldsValue({
          pureMetalId: undefined,
          pureMetalWeight: undefined,
          alloyId: undefined,
          alloyWeight: undefined,
        });
      }
    }
  }, [form, alloyParameters]);

  const getMaterialIds = () => {
    const { getFieldValue } = form;
    return getFieldValue("materialId") ? [getFieldValue("materialId")] : [];
  };

  const handleEditPureMetalModalClose = () => setIsEditPureMetalModalOpen(false);
  const handleEditAlloyModalClose = () => setIsAlloyPureMetalModalOpen(false);

  const onClose = () => {
    if (isEditPureMetalModalOpen) {
      setIsEditPureMetalModalOpen(false);
    } else if (isAlloyPureMetalModalOpen) {
      setIsAlloyPureMetalModalOpen(false);
    }
  };

  const handleSave = (weight: number) => {
    if (isEditPureMetalModalOpen) {
      form.setFieldsValue({ pureMetalWeight: weight });
    } else if (isAlloyPureMetalModalOpen) {
      form.setFieldsValue({ alloyWeight: weight });
    }
    onClose();
  };

  const setDefaults = () => {
    const alloyedMetalWeight = form.getFieldValue("alloyedMetalWeight");
    const purityId = form.getFieldValue("purityId");
    const alloyId = form.getFieldValue("alloyId");
    const metalPurity = alloyParameters?.metalPurities?.find((purity) => purity.id === purityId);
    if (preliminaryCastWeight && alloyedMetalWeight >= 0 && metalPurity && alloyId) {
      const pureMetalWeight = parseFloat(
        ((preliminaryCastWeight - alloyedMetalWeight) * (metalPurity.metalPurity / 1000)).toFixed(2),
      );
      const alloyWeight = parseFloat(
        ((preliminaryCastWeight - alloyedMetalWeight) * (1 - metalPurity.metalPurity / 1000)).toFixed(2),
      );
      form.setFieldsValue({
        pureMetalWeight: pureMetalWeight > 0 ? pureMetalWeight : 0,
        alloyWeight: alloyWeight > 0 ? alloyWeight : 0,
      });
    } else {
      void messageApi.warning(
        "Preliminary cast weight, alloyed metal weight, caratage and alloy must be defined to set defaults",
      );
    }
  };

  return (
    <>
      <CardWithHeader
        title={
          <Flex align="center" gap={16}>
            <span>METAL AND ALLOY</span>
            {editing && <Button onClick={setDefaults}>Set defaults</Button>}
          </Flex>
        }
        topRightContent={
          <Flex gap={12}>
            <TagPercentageGrowth showPlus={false} percentage={metalPurity} color={isGoodPurity ? "green" : "red"} />
            <Tooltip title="Material ration recommended to keep it above caratage" placement="top">
              {<InfoCircleOutlined style={{ opacity: 0.5 }} />}
            </Tooltip>
          </Flex>
        }>
        <Row gutter={16} className="metal-alloy-card">
          <Col span={10}>
            <Form.Item<CastingFormSchema> label="Pure metal" name="pureMetalId" required={false}>
              {editing ? (
                <PureMetalSelect disabled />
              ) : (
                <DataDisplay>{casting?.priceMetalName.name ?? "-"}</DataDisplay>
              )}
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item<CastingFormSchema> label="Pure metal weight, g" name="pureMetalWeight" required={false}>
              {editing ? (
                <InputNumber disabled style={{ width: "100%" }} size="large" placeholder="Enter weight" />
              ) : (
                <DataDisplay>{moneyFormatter(casting?.pureMetalWeight)}</DataDisplay>
              )}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item shouldUpdate={(prev, current) => prev.pureMetalId !== current.pureMetalId} noStyle>
              {() =>
                editing && (
                  <Button
                    className="button-margin"
                    size="large"
                    onClick={() => setIsEditPureMetalModalOpen(true)}
                    disabled={!form.getFieldValue("pureMetalId")}>
                    Edit
                  </Button>
                )
              }
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item dependencies={["materialId"]} noStyle>
              {({ getFieldValue }) => (
                <Form.Item<CastingFormSchema>
                  label="Alloy"
                  name="alloyId"
                  required={false}
                  rules={[FormRule.Required("Please, choose alloy")]}>
                  {editing ? (
                    <AlloySelect
                      disabled={!getFieldValue("materialId")}
                      searchConfig={{
                        searchCriteria: { metalIds: getMaterialIds() },
                      }}
                    />
                  ) : (
                    <DataDisplay>{casting?.alloy.name ?? "-"}</DataDisplay>
                  )}
                </Form.Item>
              )}
            </Form.Item>
          </Col>

          <Col span={10}>
            <Form.Item dependencies={["alloyId"]} noStyle>
              {() => (
                <Form.Item<CastingFormSchema> label="Alloy weight, g" name="alloyWeight" required={false}>
                  {editing ? (
                    <InputNumber disabled style={{ width: "100%" }} size="large" placeholder="Enter weight" />
                  ) : (
                    <DataDisplay>{moneyFormatter(casting?.alloyWeight)}</DataDisplay>
                  )}
                </Form.Item>
              )}
            </Form.Item>
          </Col>

          <Col span={4}>
            <Form.Item dependencies={["alloyId"]} noStyle>
              {() =>
                editing && (
                  <Button
                    className="button-margin"
                    size="large"
                    onClick={() => setIsAlloyPureMetalModalOpen(true)}
                    disabled={!form.getFieldValue("alloyId")}>
                    Edit
                  </Button>
                )
              }
            </Form.Item>
          </Col>
        </Row>
      </CardWithHeader>

      <EditPureMetalWeightModal
        open={isEditPureMetalModalOpen}
        onClose={handleEditPureMetalModalClose}
        onSave={handleSave}
        initialValue={form.getFieldValue("pureMetalWeight")}
      />

      <EditAlloyMetalWeightModal
        open={isAlloyPureMetalModalOpen}
        onClose={handleEditAlloyModalClose}
        onSave={handleSave}
        initialValue={form.getFieldValue("alloyWeight")}
      />
    </>
  );
};

export default MetalAndAlloyCard;
