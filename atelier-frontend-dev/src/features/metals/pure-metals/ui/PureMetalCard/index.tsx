import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import { DateFormat } from "@shared/constants/date-format.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Card from "antd/es/card";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import dayjs from "dayjs";
import { FC } from "react";
import { useNavigate } from "react-router";
import "./styles.scss";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";
import { PureMetalSummary } from "@entities/metal/models/pure-metals-summary.model.ts";

interface Props {
  pureMetalSummary: PureMetalSummary;
}

const PureMetalCard: FC<Props> = ({ pureMetalSummary }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/metals/pure-metals/${pureMetalSummary.priceMetalName?.id}`)}
      className="metal-card"
      title={pureMetalSummary.priceMetalName?.name}
      extra={<ArrowRightOutlined />}
      hoverable>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Flex vertical>
            <Typography.Text className="content-title">Remaining weight</Typography.Text>
            <span className="content-text">{pureMetalSummary.remainingWeight} g</span>
          </Flex>
        </Col>

        <Col span={12}>
          <Flex vertical>
            <Typography.Text className="content-title">Total cost</Typography.Text>
            <span className="content-text">${moneyFormatter(pureMetalSummary.totalCost, 2)}</span>
          </Flex>
        </Col>

        <Col span={16}>
          <Flex vertical>
            <Typography.Text className="content-title">
              Market value ({dayjs().format(DateFormat.LiteralMontDayYear)})
            </Typography.Text>
            <span className="content-text-primary">${moneyFormatter(pureMetalSummary.currentTotalCost, 2)}</span>
          </Flex>
        </Col>

        <Col span={8}>
          <Flex style={{ height: "100%" }} justify="end" align="end">
            <TagPercentageGrowth percentage={pureMetalSummary.currentCostPercentageDifference} />
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default PureMetalCard;
