import "./styles.scss";
import MetalTag from "@entities/metal/ui/MetalTag";
import { TaskStatus } from "@entities/task/constants/task-status.ts";
import Image from "@shared/ui/Image";
import InfoBadge from "@shared/ui/InfoBadge";
import Tag from "antd/es/tag";
import TaskCardTheme from "./theme.tsx";
import Card from "antd/es/card";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import { FC, PropsWithChildren } from "react";
import { Task } from "@entities/task/models/task.model.ts";
import { Link } from "react-router";
import { brandingTokens } from "@shared/constants/branding.ts";

interface Props extends PropsWithChildren {
  task: Task;
}

const TaskCard: FC<Props> = ({ task, children }) => {
  const showMetals = [
    TaskStatus.ReadyForPrototyping,
    TaskStatus.InPrototyping,
    TaskStatus.ReadyToCasting,
    TaskStatus.InCylinder,
  ].includes(task.status);

  const showCylinder = [TaskStatus.InCylinder].includes(task.status);

  return (
    <TaskCardTheme>
      <Card className="task-card" hoverable loading={!task}>
        <Flex className="task-card-container" align="stretch" gap={16}>
          <Flex className="task-card-image-container">
            <Image width={120} height={120} src={task.orderTaskImages} />
          </Flex>

          <Flex className="task-card-metadata" flex={1} vertical gap={12} justify="space-between">
            <Flex gap={7} align="center" justify="space-between">
              <Typography.Title level={5} ellipsis={{ rows: 2, expandable: false }}>
                <Link style={{ color: brandingTokens.textDefaultColor }} to={`/orders/${task.order?.id}`}>
                  {task.order?.name}
                </Link>
              </Typography.Title>

              <InfoBadge title={task?.order?.id as number} />
            </Flex>

            {showMetals && (
              <Flex wrap gap={4}>
                <Tag>x{task.stlCount}</Tag>
                {task.metals.map((metal) => (
                  <MetalTag key={metal.id}>{metal.name}</MetalTag>
                ))}

                {showCylinder && task?.cylinder?.name && <MetalTag>{task.cylinder.name}</MetalTag>}
              </Flex>
            )}

            <Flex justify="space-between" gap={12}>
              {children}
            </Flex>
          </Flex>
        </Flex>
      </Card>
    </TaskCardTheme>
  );
};

export default TaskCard;
