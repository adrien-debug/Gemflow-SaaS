import { useQuery } from "@tanstack/react-query";
import DashboardApi from "@entities/dashboard/api/dashboard.api";
import { DASHBOARD_QUERY_KEYS } from "@entities/dashboard/constants/query-keys";
import { isDevMode, mockDevDashboardStats } from "@shared/config/dev-mode.config";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.stats,
    queryFn: isDevMode
      ? () => Promise.resolve(mockDevDashboardStats)
      : DashboardApi.getStats,
    refetchInterval: isDevMode ? false : 60000,
    staleTime: isDevMode ? Infinity : 30000,
  });
};
