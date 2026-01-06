import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import Tag from "@shared/ui/tag/components/Tag";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Card from "antd/es/card";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import { FC } from "react";
import { Link, useNavigate } from "react-router";
import "features/alloys/alloy-card/ui/AlloyCard/styles.scss";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";

interface Props {
  alloy: Alloy;
}

const AlloyCard: FC<Props> = ({ alloy }) => {
  const navigate = useNavigate();
  const { id, name, remainingWeight, totalCost, metal } = alloy;

  return (
    <Card
      onClick={() => navigate(`/metals/alloys/${id}`)}
      className="alloy-card"
      title={
        <Flex gap={16} align="center">
          <span>{getShortString(name, 16)}</span>
          <Flex>
            <Tag tag={metal} />
          </Flex>
        </Flex>
      }
      extra={
        <Link to="/metals">
          <ArrowRightOutlined />
        </Link>
      }
      hoverable>
      <Row gutter={[16, 16]}>
        <Col span={12}>
          <Flex vertical>
            <Typography.Text className="content-title">Weight</Typography.Text>
            <span className="content-text">{remainingWeight} g</span>
          </Flex>
        </Col>
        <Col span={12}>
          <Flex vertical>
            <Typography.Text className="content-title">Total cost</Typography.Text>
            <span className="content-text">${moneyFormatter(totalCost, 2)}</span>
          </Flex>
        </Col>
      </Row>
    </Card>
  );
};

export default AlloyCard;
