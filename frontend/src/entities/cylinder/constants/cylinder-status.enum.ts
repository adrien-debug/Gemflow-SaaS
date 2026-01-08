export enum CylinderStatus {
  AVAILABLE = "AVAILABLE",
  OPEN = "OPEN",
  CLOSED = "CLOSED",
  FINISHED = "FINISHED",
}

export const cylinderStatusNameMap: Record<CylinderStatus, string> = {
  [CylinderStatus.AVAILABLE]: "Available",
  [CylinderStatus.OPEN]: "Open",
  [CylinderStatus.CLOSED]: "Closed",
  [CylinderStatus.FINISHED]: "Finished",
};
