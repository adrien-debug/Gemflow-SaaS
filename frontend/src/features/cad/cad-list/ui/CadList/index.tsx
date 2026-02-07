import TaskCard from "@entities/task/ui/TaskCard";
import { TaskStatus } from "@entities/task/constants/task-status.ts";
import Flex from "antd/es/flex";
import { useEffect, useState } from "react";
import CadFilter from "@features/cad/cad-filter/ui/CadFilter";
import { SearchOrderTasksCriteria } from "@entities/task/dto/search-tasks.dto.ts";
import { getCadTaskActions } from "@features/cad/cad-list/utils/task-actions.utils.tsx";
import { useInfiniteTasks } from "@entities/task/hooks/useInfiniteTasks.ts";
import InfiniteList from "@shared/ui/InfiniteList";
import "./styles.scss";
import {
  COMPLETE_CAD_QUERY_KEY,
  RESTART_CAD_QUERY_KEY,
  SEND_CAD_TO_REVIEW_QUERY_KEY,
  START_CAD_QUERY_KEY,
} from "@entities/task/constants/query-keys.ts";

const MUTATION_KEYS = [
  START_CAD_QUERY_KEY,
  SEND_CAD_TO_REVIEW_QUERY_KEY,
  RESTART_CAD_QUERY_KEY,
  COMPLETE_CAD_QUERY_KEY,
];

const CadList = () => {
  const [status, setStatus] = useState<TaskStatus>(TaskStatus.ReadyForCad);
  const [searchParams, setSearchParams] = useState<SearchOrderTasksCriteria>({ statuses: [status] });

  const infiniteTasksQueryResult = useInfiniteTasks(searchParams);

  useEffect(() => {
    setSearchParams((prev) => ({
      ...prev,
      statuses: [status],
    }));
  }, [status]);

  return (
    <Flex vertical className="cad-list">
      <CadFilter onStatusChange={setStatus} />

      <Flex vertical className="scroll-container">
        <Flex wrap gap={12}>
          <InfiniteList
            queryResult={infiniteTasksQueryResult}
            mutationKeys={MUTATION_KEYS}
            status={status}
            renderItem={(task) => (
              <TaskCard key={task.id} task={task}>
                {getCadTaskActions(task)}
              </TaskCard>
            )}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default CadList;
