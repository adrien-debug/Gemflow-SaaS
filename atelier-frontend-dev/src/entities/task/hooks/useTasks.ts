import TasksApi from "@entities/task/api/tasks.api.ts";
import { SearchOrderTasksDto } from "@entities/task/dto/search-tasks.dto.ts";
import usePageableRequest from "@shared/hooks/usePageableRequest.ts";

const useTasks = (request: SearchOrderTasksDto) => {
  return usePageableRequest({
    key: "TASKS_QUERY_KEY",
    fetcher: TasksApi.search,
    requestBody: request,
  });
};

export default useTasks;
