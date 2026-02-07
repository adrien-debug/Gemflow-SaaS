import ArrowRightOutlined from "@ant-design/icons/lib/icons/ArrowRightOutlined";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Card from "antd/es/card";
import Flex from "antd/es/flex";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import { FC } from "react";
import { Link, useNavigate } from "react-router";
import "./styles.scss";
import { OtherMaterial } from "@entities/other-material/model/other-material.model";

interface Props {
  otherMaterial: OtherMaterial;
}

const OtherMaterialCard: FC<Props> = ({ otherMaterial }) => {
  const navigate = useNavigate();

  return (
    <Card
      onClick={() => navigate(`/metals/other/${otherMaterial?.id}`)}
      className="other-material-card"
      title={
        <Flex align="center">
          <span>{getShortString(otherMaterial?.name, 16)}</span>
        </Flex>
      }
      extra={
        <Link to="/metals">
          <ArrowRightOutlined />
        </Link>
      }
      hoverable>
      <Row>
        <Flex vertical>
          <Typography.Text className="content-title">Weight</Typography.Text>
          <span className="content-text">{otherMaterial?.remainingWeight} g</span>
        </Flex>
      </Row>
    </Card>
  );
};

export default OtherMaterialCard;
