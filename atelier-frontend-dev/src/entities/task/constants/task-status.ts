export enum TaskStatus {
  ReadyForCad = "READY_FOR_CAD",
  InCad = "IN_CAD",
  CadReview = "CAD_REVIEW",
  ReadyForPrototyping = "READY_FOR_PROTOTYPING",
  InPrototyping = "IN_PROTOTYPING",
  ReadyToCasting = "READY_FOR_CASTING",
  InCylinder = "IN_CASTING",
}

// Return button names according to status
export const TaskButtonStatus = {
  [TaskStatus.ReadyForCad]: "Ready for CAD",
  [TaskStatus.InCad]: "In CAD",
  [TaskStatus.CadReview]: "CAD review",
  [TaskStatus.ReadyForPrototyping]: "Ready for prototyping",
  [TaskStatus.InPrototyping]: "In prototyping",
};
