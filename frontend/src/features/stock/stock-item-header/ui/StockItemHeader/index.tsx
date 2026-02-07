import { RightOutlined } from "@ant-design/icons";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import ActionBar from "@shared/ui/ActionBar";
import InfoBadge from "@shared/ui/InfoBadge";
import { getShortString } from "@shared/utils/get-short-string.ts";
import { useParams } from "react-router";
import "./styles.scss";
import StockItemStatusSelect from "@entities/stock/ui/StockItemStatusSelect";
import { StockItemMetadata } from "@entities/stock/models/stock-item-metadata.model.ts";
import { FC } from "react";
import { useStockItem } from "@entities/stock/hooks/useStockItem.ts";
import Breadcrumb from "antd/es/breadcrumb";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";

interface Props {
  stockMetadata?: StockItemMetadata;
}

const StockItemHeader: FC<Props> = ({ stockMetadata }) => {
  const { id } = useParams();
  const { data: stockItem } = useStockItem(Number(id));

  return (
    <div className="stock-item-header">
      <Breadcrumb
        className="breadcrumb"
        items={[
          {
            title: "Stock",
            href: `/stock?tab=${stockItem?.stock.status}`,
            separator: "",
          },
          {
            title: getShortString(stockItem?.name, 32),
          },
        ]}
        separator={<RightOutlined />}
      />

      <ActionBar
        title={getShortString(stockItem?.name, 32)}
        badge={
          <Flex gap={14} align="center">
            {stockItem?.id && <InfoBadge title={stockItem.id} />}
            <Typography className="finished">Production finished</Typography>
          </Flex>
        }>
        <Flex gap={12} justify="space-between">
          {stockItem && (
            <>
              <StockItemStatusSelect stockItem={stockItem} />

              <Dropdown
                menu={{
                  items: [
                    {
                      key: "delete",
                      label: "Delete order",
                      onClick: () => console.log("deleted from stock"),
                    },
                  ],
                }}
                placement="bottomLeft"
                arrow>
                {!stockMetadata && (
                  <Button shape="circle" size="large">
                    <EllipsisOutlined />
                  </Button>
                )}
              </Dropdown>
            </>
          )}
        </Flex>
      </ActionBar>
    </div>
  );
};

export default StockItemHeader;
