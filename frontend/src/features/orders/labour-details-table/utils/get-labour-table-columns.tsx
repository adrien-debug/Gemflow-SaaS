import { ColumnsType } from "antd/es/table";
import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";
import Flex from "antd/es/flex";
import Avatar from "@shared/ui/Avatar";
import Tag from "@shared/ui/tag/components/Tag";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import { EllipsisOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import { LabourListActions } from "@features/orders/labour-details-table/interfaces/labours-table-actions.interface.ts";
import { TaskTypeNameMap } from "@entities/task/constants/task-type.enum.ts";
import { User } from "@entities/user/models/user.model.ts";
import { getMinutesAndSecondsFromTotalSeconds } from "@shared/utils/time-converter.ts";

export const getLabourTableColumns = (
  { onRowDelete, onEditLabour }: LabourListActions,
  disabled?: boolean,
): ColumnsType<LabourListItem> => {
  return [
    {
      title: "Date",
      dataIndex: "date",
      render: (_, { date }) => dayjs(date).format(DateFormat.LiteralMontDayYear),
    },
    {
      title: "Employee",
      dataIndex: "employee",
      render: (_, { employee }) => (
        <Flex align="center">
          <Avatar user={employee as User} />
          <p style={{ marginLeft: "8px" }}>{employee.fullName}</p>
        </Flex>
      ),
    },
    {
      title: "Work type",
      dataIndex: "workType",
      render: (_, { taskType }) => <Tag tag={{ id: null, name: TaskTypeNameMap[taskType] }} />,
    },
    {
      title: "Time spent",
      dataIndex: "timeSpent",
      render: (_, { spentSeconds }) => {
        const { minutes, seconds } = getMinutesAndSecondsFromTotalSeconds(spentSeconds);
        return (
          <>
            {minutes}′ {seconds}′′
          </>
        );
      },
    },
    {
      title: "Actions",
      align: "center",
      dataIndex: "actions",
      render: (_, labour) => (
        <Dropdown
          menu={{
            items: [
              {
                key: "ORDER_LABOURS_LIST_ITEM_EDIT",
                label: "Edit",
                onClick: () => onEditLabour?.(labour),
              },
              {
                key: "ORDER_LABOURS_LIST_ITEM_DELETE",
                label: "Delete",
                onClick: () => onRowDelete?.(labour),
              },
            ],
          }}
          placement="bottomRight"
          trigger={["click"]}>
          <Button icon={<EllipsisOutlined />} shape="circle" disabled={disabled} />
        </Dropdown>
      ),
    },
  ];
};
