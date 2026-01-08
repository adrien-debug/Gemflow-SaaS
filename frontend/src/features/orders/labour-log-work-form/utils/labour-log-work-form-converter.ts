import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";
import dayjs from "dayjs";
import { LogWorkFormSchema } from "@features/orders/labour-log-work-form/models/log-work-form.model.ts";
import { getMinutesAndSecondsFromTotalSeconds } from "@shared/utils/time-converter.ts";

export const convertLabourLogWorkToFormModel = (labour: LabourListItem): LogWorkFormSchema => {
  const { minutes, seconds } = getMinutesAndSecondsFromTotalSeconds(labour.spentSeconds);

  return {
    employeeId: labour.employee.id,
    taskType: labour.taskType,
    spentSeconds: seconds,
    spentMinutes: minutes,
    date: dayjs(labour.date),
  };
};
