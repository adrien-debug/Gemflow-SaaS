import TaskCard from "@entities/task/ui/TaskCard";
import Flex from "antd/es/flex";
import { useState } from "react";
import { SearchOrderTasksCriteria } from "@entities/task/dto/search-tasks.dto.ts";
import { useInfiniteTasks } from "@entities/task/hooks/useInfiniteTasks.ts";
import InfiniteList from "@shared/ui/InfiniteList";
import "./styles.scss";

import PreCastingFilter from "@features/pre-casting/pre-casting-filter/ui/PreCastingFilter";
import { getPreCastingTaskActions } from "@features/pre-casting/pre-casting-list/utils/task-actions.utils.tsx";
import {
  COMPLETE_CASTING_QUERY_KEY,
  PART_BROKEN_QUERY_KEY,
  START_CASTING_QUERY_KEY,
} from "@entities/task/constants/query-keys.ts";
import { TaskStatus } from "@entities/task/constants/task-status.ts";

const MUTATION_KEYS = [COMPLETE_CASTING_QUERY_KEY, START_CASTING_QUERY_KEY, PART_BROKEN_QUERY_KEY];

const PreCastingList = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchOrderTasksCriteria>({
    statuses: [TaskStatus.ReadyToCasting],
  });
  const infiniteTasksQueryResult = useInfiniteTasks(searchCriteria);

  return (
    <Flex vertical className="casting-list">
      <PreCastingFilter onChange={(criteria) => setSearchCriteria(criteria)} />

      <Flex vertical className="scroll-container">
        <Flex wrap gap={12}>
          <InfiniteList
            queryResult={infiniteTasksQueryResult}
            mutationKeys={MUTATION_KEYS}
            status={searchCriteria.statuses?.[0]}
            renderItem={(task) => (
              <TaskCard key={task.id} task={task}>
                {getPreCastingTaskActions(task)}
              </TaskCard>
            )}
          />
        </Flex>
      </Flex>
    </Flex>
  );
};

export default PreCastingList;
