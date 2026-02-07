import { CastingStatus, castingStatusNameMap } from "@entities/casting/constants/casting-status.enum.ts";

export const generateCastingStatuses = () => {
  return Object.values(CastingStatus).map((status) => ({
    id: status,
    name: castingStatusNameMap[status],
  }));
};
