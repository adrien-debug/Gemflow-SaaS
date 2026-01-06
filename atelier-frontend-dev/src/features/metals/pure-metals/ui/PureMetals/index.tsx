import "./styles.scss";
import PureMetalCard from "@features/metals/pure-metals/ui/PureMetalCard";
import Typography from "antd/es/typography";
import SubHeader from "@shared/ui/SubHeader";
import Col from "antd/es/col";
import Row from "antd/es/row";
import usePureMetalsSummary from "@entities/metal/hooks/usePureMetalsSummary.ts";
import Loading from "@shared/ui/Loading";
import { useMemo } from "react";
import {
  getPureMetalsCurrentTotalCost,
  getPureMetalsTotalCost,
  getPureMetalsTotalGrowth,
} from "@features/metals/pure-metals/utils/get-pure-metals-total-price.util.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Flex from "antd/es/flex";
import TagPercentageGrowth from "@shared/ui/TagPercentageGrowth";

const PureMetals = () => {
  const { data, isPending } = usePureMetalsSummary();

  const currentTotalCost = useMemo(() => moneyFormatter(getPureMetalsCurrentTotalCost(data), 2), [data]);
  const totalCost = useMemo(() => moneyFormatter(getPureMetalsTotalCost(data), 2), [data]);
  const percentage = useMemo(() => getPureMetalsTotalGrowth(data), [data]);

  if (isPending || !data) {
    return <Loading />;
  }

  return (
    <Flex vertical>
      <SubHeader title="Pure metals" description="List of pure metals, used in production">
        <Flex vertical align="flex-end">
          <Flex align="center" gap={8}>
            <Typography.Text className="metal-total-value">
              Market value:{" "}
              <Typography.Text strong className="metal-total-value">
                ${currentTotalCost}
              </Typography.Text>
            </Typography.Text>

            <TagPercentageGrowth percentage={percentage} />
          </Flex>

          <Typography.Text type="secondary">
            Total cost:{" "}
            <Typography.Text strong type="secondary">
              ${totalCost}
            </Typography.Text>
          </Typography.Text>
        </Flex>
      </SubHeader>

      <Flex vertical className="scroll-container">
        <Row gutter={[8, 8]} style={{ margin: 0 }}>
          {data?.map((item) => (
            <Col span={8} key={item.id}>
              <PureMetalCard pureMetalSummary={item} />
            </Col>
          ))}
        </Row>
      </Flex>
    </Flex>
  );
};

export default PureMetals;
