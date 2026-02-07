import Collapse from "antd/es/collapse";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import { brandingTokens } from "@shared/constants/branding.ts";
import { FC } from "react";
import Flex from "antd/es/flex";
import { SummaryCardItem } from "@features/orders/order-summary/models/summary-card-item.model.ts";

interface Props {
  card: SummaryCardItem;
}

const SummaryCard: FC<Props> = ({ card }) => {
  return (
    <Flex key={card.key} style={{ width: "100%" }}>
      <Collapse
        className="summary-card"
        expandIcon={({ isActive }) => (
          <div className="expanded-card-icon">
            <PlusOutlined
              className="plus-card-icon"
              style={{
                opacity: isActive ? 0 : 1,
                transform: isActive ? "rotate(90deg)" : "rotate(0deg)",
              }}
            />

            <MinusOutlined
              className="minus-card-icon"
              style={{
                opacity: isActive ? 1 : 0,
                transform: isActive ? "rotate(0deg)" : "rotate(-90deg)",
              }}
            />
          </div>
        )}
        style={{ background: brandingTokens.colorBgContainer }}
        items={[card]}
      />
    </Flex>
  );
};

export default SummaryCard;
