import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";

export interface DiamondRecordsTableActions {
  onEditDiamondRecord?: (record: DiamondRecord) => void;
  onDeductDiamondsFromRecord?: (record: DiamondRecord) => void;
  onDeleteDiamondRecord?: (record: DiamondRecord) => void;
  onAddDiamondsToRecord?: (record: DiamondRecord) => void;
  onShowBalanceHistoryForRecord?: (record: DiamondRecord) => void;
}
