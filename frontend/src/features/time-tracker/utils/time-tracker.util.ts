import { TimeEntry } from "@entities/time-tracker/model/time-entry.model.ts";
import { Optional } from "@shared/types/optional.type.ts";
import { Nullable } from "@shared/types/nullable.type.ts";
import { TaskType } from "@entities/task/constants/task-type.enum.ts";

export const isActiveForCurrentOrder = (activeTrackerStatus: Nullable<Optional<TimeEntry>>, currentOrderId: number) => {
  return activeTrackerStatus?.orderId === currentOrderId;
};

export const isTimerExist = (activeTrackerStatus?: Nullable<TimeEntry>) => {
  return !!activeTrackerStatus;
};

export const getElapsedSecondsForCurrentWorkType = (taskType: TaskType, trackers: TimeEntry[] = []) => {
  if (!taskType) return 0;
  return trackers.find((tracker) => tracker.taskType === taskType)?.totalSeconds || 0;
};
