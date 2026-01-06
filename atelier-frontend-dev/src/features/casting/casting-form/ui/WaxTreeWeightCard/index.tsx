import CardWithHeader from "@shared/ui/CardWithHeader";
import Col from "antd/es/col";
import Form from "antd/es/form";
import Row from "antd/es/row";
import { FC } from "react";
import DataDisplay from "@shared/ui/DataDisplay";
import InputNumber from "antd/es/input-number";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import "./styles.scss";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import { CastingFormSchema } from "@features/casting/casting-form/models/casting-form.model.ts";
import useWaxWeights from "@features/casting/casting-form/hooks/useWaxWeights.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";

interface Props {
  editing?: boolean;
  alloyParameters?: AlloyParameters;
  casting?: CastingMetadata;
}

const WaxTreeWeightCard: FC<Props> = ({ editing = true, alloyParameters, casting }) => {
  const form = useFormInstance<CastingFormSchema>();

  const { waxWeight, preliminaryCastWeight } = useWaxWeights(form, alloyParameters);

  return (
    <CardWithHeader title="WAX TREE WEIGHT">
      <Row gutter={16} className="wax-tree-weight-card">
        <Col span={12}>
          <Form.Item<CastingFormSchema> label="Support weight, g" name="supportWeight" required={false}>
            {editing ? (
              <InputNumber size="large" placeholder="Enter weight" style={{ width: "100%" }} min={0} precision={2} />
            ) : (
              <DataDisplay>{moneyFormatter(casting?.supportWeight)}</DataDisplay>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item<CastingFormSchema> label="Support + wax tree weight, g" name="waxTreeWeight" required={false}>
            {editing ? (
              <InputNumber size="large" placeholder="Enter weight" style={{ width: "100%" }} min={0} precision={2} />
            ) : (
              <DataDisplay>{moneyFormatter(casting?.supportWithWaxTreeWeight)}</DataDisplay>
            )}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item dependencies={["supportWeight", "waxTreeWeight"]}>
            {() => <DataDisplay label="Wax weight, g">{moneyFormatter(waxWeight)}</DataDisplay>}
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item dependencies={["supportWeight", "waxTreeWeight"]}>
            {() => (
              <DataDisplay label="Preliminary cast weight, g">{moneyFormatter(preliminaryCastWeight)}</DataDisplay>
            )}
          </Form.Item>
        </Col>
      </Row>
    </CardWithHeader>
  );
};

export default WaxTreeWeightCard;
