import api from "@shared/api";
import { DashboardStats } from "@entities/dashboard/models/dashboard-stats.model";

const DashboardApi = {
  getStats: async (): Promise<DashboardStats> => {
    return api.get<DashboardStats>("/api/v1/dashboard/stats");
  },
};

export default DashboardApi;
