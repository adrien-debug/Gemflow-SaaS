export enum CastingStatus {
  Finished = "FINISHED",
  Open = "OPEN",
  Rejected = "REJECTED",
}

export const castingStatusNameMap: Record<CastingStatus, string> = {
  [CastingStatus.Finished]: "Finished",
  [CastingStatus.Open]: "Open",
  [CastingStatus.Rejected]: "Rejected",
};
