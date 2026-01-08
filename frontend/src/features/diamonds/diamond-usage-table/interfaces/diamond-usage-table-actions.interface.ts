import { DiamondUsageMetadata } from "@entities/diamond/models/diamond-usage-metadata.model.ts";

export interface DiamondUsageTableActions {
  onDelete?: (record: DiamondUsageMetadata) => void;
  onEdit?: (record: DiamondUsageMetadata) => void;
}
