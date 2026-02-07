import { ReactNode } from "react";

export interface SummaryCardItem {
  key: string;
  label: ReactNode;
  children: ReactNode;
}
