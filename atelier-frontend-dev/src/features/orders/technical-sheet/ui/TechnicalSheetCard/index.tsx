import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import InfoBadge from "@shared/ui/InfoBadge";
import Tag from "antd/es/tag";
import Card from "antd/es/card";
import { FC, ReactNode } from "react";

interface Props {
  orderId: number;
  pageNumber: number;
  title: string;
  children: ReactNode;
}

const TechnicalSheetCard: FC<Props> = ({ orderId, pageNumber, title, children }) => {
  return (
    <Card
      className="technical-sheet-card"
      title={
        <Flex align="center" justify="space-between" style={{ marginTop: 24, marginBottom: 12 }}>
          <Flex align="center" gap={10}>
            <Typography.Title level={4} style={{ margin: 0 }}>
              {title}
            </Typography.Title>

            <InfoBadge title={orderId} />
          </Flex>

          <Tag className="page-number">Page {pageNumber}</Tag>
        </Flex>
      }
      styles={{
        header: { borderBottom: "none" },
      }}>
      {children}
    </Card>
  );
};

export default TechnicalSheetCard;
