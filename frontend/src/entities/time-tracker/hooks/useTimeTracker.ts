import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import TimeTrackerApi from "@entities/time-tracker/api/time-tracker.api.ts";
import { ALL_TRACKERS_QUERY_KEY, TIME_TRACKER_STATUS_QUERY_KEY } from "@entities/time-tracker/constants/query-keys.ts";
import { TaskType } from "@entities/task/constants/task-type.enum.ts";

const useTimeTracker = (orderId: number) => {
  const queryClient = useQueryClient();

  const activeTrackerStatus = useQuery({
    queryFn: () => TimeTrackerApi.getTrackerStatus().catch(() => null),
    queryKey: [TIME_TRACKER_STATUS_QUERY_KEY, orderId],
    retry: false,
  });

  const allTrackers = useQuery({
    queryFn: () => TimeTrackerApi.getTrackersByOrderId(orderId),
    queryKey: [ALL_TRACKERS_QUERY_KEY, orderId],
    retry: false,
  });

  const startWorkMutation = useMutation({
    mutationFn: (taskType: TaskType) => TimeTrackerApi.startWork({ taskType, orderId }),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [TIME_TRACKER_STATUS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALL_TRACKERS_QUERY_KEY] });
    },
  });

  const stopWorkMutation = useMutation({
    mutationFn: () => TimeTrackerApi.stopWork(),
    onSuccess: () => {
      void queryClient.invalidateQueries({ queryKey: [TIME_TRACKER_STATUS_QUERY_KEY] });
      void queryClient.invalidateQueries({ queryKey: [ALL_TRACKERS_QUERY_KEY] });
    },
  });

  return { activeTrackerStatus, allTrackers, startWorkMutation, stopWorkMutation };
};

export default useTimeTracker;
