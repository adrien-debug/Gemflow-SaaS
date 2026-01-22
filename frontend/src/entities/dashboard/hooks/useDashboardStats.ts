import { useQuery } from "@tanstack/react-query";
import DashboardApi from "@entities/dashboard/api/dashboard.api";
import { DASHBOARD_QUERY_KEYS } from "@entities/dashboard/constants/query-keys";

export const useDashboardStats = () => {
  return useQuery({
    queryKey: DASHBOARD_QUERY_KEYS.stats,
    queryFn: DashboardApi.getStats,
    refetchInterval: 60000, // Refresh every minute
    staleTime: 30000, // Consider data stale after 30 seconds
  });
};
