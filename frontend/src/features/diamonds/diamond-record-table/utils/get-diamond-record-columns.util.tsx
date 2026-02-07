import { ColumnsType } from "antd/es/table";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { DiamondRecordsTableActions } from "@features/diamonds/diamond-record-table/interfaces/diamond-records-table-actions.interface.ts";
import Tag from "@shared/ui/tag/components/Tag";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { getShortString } from "@shared/utils/get-short-string.ts";

export const getDiamondRecordColumns = (actions: DiamondRecordsTableActions): ColumnsType<DiamondRecord> => {
  return [
    {
      dataIndex: "id",
      title: "ID",
    },
    {
      dataIndex: "diamondShape",
      title: "Shape",
      render: (_, { diamondShape }) => <Tag tag={{ id: null, name: diamondShape?.name }} />,
    },
    {
      dataIndex: "parcelName",
      title: "Parcel name",
      width: 200,
    },
    {
      dataIndex: "supplier",
      title: "Supplier",
      width: 320,
      render: (_, { supplier }) => supplier.name,
    },
    {
      dataIndex: "sizeName",
      title: "Size",
      render: (_, { sizeName }) => <Tag tag={{ id: null, name: sizeName }} />,
    },
    {
      dataIndex: "qualityType",
      title: "Quality",
      render: (_, { qualityType }) => <Tag tag={{ id: null, name: qualityType }} />,
    },
    {
      dataIndex: "stoneCarat",
      title: "Ct Stone",
    },
    {
      dataIndex: "stonePrice",
      title: "Price per stone",
      render: (_, { stonePrice }) => `$${moneyFormatter(stonePrice)}`,
    },
    {
      dataIndex: "quantity",
      title: "Stones left",
      render: (_, { quantity }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7 }}>{quantity}</Typography.Text>
      ),
    },
    {
      dataIndex: "caratLeft",
      title: "Ct left",
      render: (_, { caratLeft }) => (
        <Typography.Text style={{ fontWeight: 600, color: brandingColorPalette.brand7 }}>{caratLeft}</Typography.Text>
      ),
    },
    {
      dataIndex: "totalPrice",
      title: "Price total",
      render: (_, { totalPrice }) => (
        <Typography.Text
          style={{
            fontWeight: 600,
            color: brandingColorPalette.brand7,
            whiteSpace: "nowrap",
          }}>
          {getShortString(`$${moneyFormatter(totalPrice)}`, 12)}
        </Typography.Text>
      ),
    },
    {
      dataIndex: "actions",
      title: "Actions",
      align: "center",
      render: (_, record) => (
        <Dropdown
          placement="bottomRight"
          trigger={["click"]}
          menu={{
            items: [
              {
                key: "DIAMOND_RECORD_LIST_ITEM_EDIT",
                label: "Edit",
                onClick: () => actions.onEditDiamondRecord?.(record),
              },
              {
                key: "DIAMOND_RECORD_LIST_ITEM_ADD_DIAMONDS",
                label: "Add diamonds",
                onClick: () => actions.onAddDiamondsToRecord?.(record),
              },
              {
                key: "DIAMOND_RECORD_LIST_ITEM_DEDUCT_DIAMONDS",
                label: "Deduct diamonds",
                onClick: () => actions.onDeductDiamondsFromRecord?.(record),
              },
              {
                key: "DIAMOND_RECORD_LIST_ITEM_HISTORY",
                label: "Show balance history",
                onClick: () => actions.onShowBalanceHistoryForRecord?.(record),
                disabled: true,
              },
              {
                key: "DIAMOND_RECORD_LIST_ITEM_DELETE",
                label: "Delete",
                onClick: () => actions.onDeleteDiamondRecord?.(record),
              },
            ],
          }}>
          <Button icon={<EllipsisOutlined />} shape="circle"></Button>
        </Dropdown>
      ),
    },
  ];
};
