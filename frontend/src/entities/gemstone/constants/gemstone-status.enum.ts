export enum GemstoneStatus {
  AVAILABLE = "AVAILABLE",
  SOLD = "SOLD",
  RETURNED = "RETURNED",
  ASSIGNED = "ASSIGNED",
  MEMO_OUT = "MEMO_OUT",
}

export const gemstoneStatusNameMap: Record<GemstoneStatus, string> = {
  [GemstoneStatus.AVAILABLE]: "Available",
  [GemstoneStatus.SOLD]: "Sold",
  [GemstoneStatus.RETURNED]: "Returned",
  [GemstoneStatus.ASSIGNED]: "Assigned",
  [GemstoneStatus.MEMO_OUT]: "Memo out",
};
