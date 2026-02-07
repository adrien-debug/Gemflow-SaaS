import api from "@shared/api";
import { TimeEntry } from "@entities/time-tracker/model/time-entry.model.ts";

const TimeTrackerApi = {
  startWork: (timeEntry: Omit<TimeEntry, "totalSeconds">): Promise<void> => {
    return api.post("/api/v1/order-labour-trackers/start", timeEntry);
  },

  stopWork: (): Promise<void> => {
    return api.post("/api/v1/order-labour-trackers/stop");
  },

  getTrackerStatus: (): Promise<TimeEntry> => {
    return api.get("/api/v1/order-labour-trackers/active");
  },

  getTrackersByOrderId: (orderId: number): Promise<TimeEntry[]> => {
    return api.get(`/api/v1/order-labour-trackers?orderId=${orderId}`);
  },
};

export default TimeTrackerApi;
