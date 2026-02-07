import { FC, useState } from "react";
import Flex from "antd/es/flex";
import Image from "@shared/ui/Image";
import InfoBadge from "@shared/ui/InfoBadge";
import DataDisplay from "@shared/ui/DataDisplay";
import "./styles.scss";
import CastingOrderActionDropdown from "@features/casting/casting-order-actions-dropdown/ui/CastingOrderActionsDropdown";
import Typography from "antd/es/typography";
import Card from "antd/es/card";
import { CastingTask } from "@entities/casting/models/casting-task.model.ts";
import { moneyFormatter } from "@shared/utils/formatter.ts";

interface Props {
  task: CastingTask;
  disabled?: boolean;
  castingId?: number;
}

const CastingCard: FC<Props> = ({ task, disabled, castingId }) => {
  const [updatedPartsWeight, setUpdatedPartsWeight] = useState(task?.weight);

  return (
    <Card className="casting-card">
      <Flex gap={16} align="center">
        <Image width={72} height={72} src={task?.orderTaskImages} />

        <Flex className="card-metadata" flex={1} vertical justify="space-between" gap={8}>
          <Flex justify="space-between" align="center" gap={7}>
            <Typography.Title level={5} className="card-title">
              {task?.order?.name}
            </Typography.Title>

            <Flex gap={4} align="flex-start">
              <InfoBadge title={task?.order?.id as number} />

              <CastingOrderActionDropdown
                taskId={task?.id}
                castingId={castingId as number}
                onSave={setUpdatedPartsWeight}
                initialValue={task?.weight}
                disabled={disabled}
              />
            </Flex>
          </Flex>

          <Flex gap={8} justify="space-between">
            <DataDisplay>x{task?.stlCount}</DataDisplay>

            <DataDisplay label="Parts weight, g:" horizontal>
              {moneyFormatter(updatedPartsWeight)}
            </DataDisplay>
          </Flex>
        </Flex>
      </Flex>
    </Card>
  );
};

export default CastingCard;
