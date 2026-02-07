import TaskCard from "@entities/task/ui/TaskCard";
import { TaskStatus } from "@entities/task/constants/task-status.ts";
import PrintingFilter from "@features/3d-printing/3d-printing-filter/ui/PrintingFilter";
import Flex from "antd/es/flex";
import { useEffect, useState } from "react";
import { SearchOrderTasksCriteria } from "@entities/task/dto/search-tasks.dto.ts";
import { useInfiniteTasks } from "@entities/task/hooks/useInfiniteTasks.ts";
import InfiniteList from "@shared/ui/InfiniteList";
import "./styles.scss";
import { get3dPrintingTaskActions } from "@features/3d-printing/3d-printing-list/utils/task-actions.utils.tsx";
import {
  MOVE_TO_CASTING_QUERY_KEY,
  ON_MACHINE_QUERY_KEY,
  PART_BROKEN_QUERY_KEY,
} from "@entities/task/constants/query-keys.ts";

const MUTATION_KEYS = [MOVE_TO_CASTING_QUERY_KEY, PART_BROKEN_QUERY_KEY, ON_MACHINE_QUERY_KEY];

const PrintingList = () => {
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ReadyForPrototyping);
  const [searchParams, setSearchParams] = useState<SearchOrderTasksCriteria>({ statuses: [status] });

  const infiniteTasksQueryResult = useInfiniteTasks(searchParams);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      statuses: [status],
    }));
  }, [status]);

  return (
    <Flex vertical className="printing-list">
      <PrintingFilter onStatusChange={setStatus} />

      <Flex vertical className="scroll-container">
        <Flex wrap gap={12}>
          <InfiniteList
            queryResult={infiniteTasksQueryResult}
            mutationKeys={MUTATION_KEYS}
            status={status}
            renderItem={(task) => (
              <TaskCard key={task.id} task={task}>
                {get3dPrintingTaskActions(task)}
              </TaskCard>
            )}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PrintingList;
