import { createContext, FC, PropsWithChildren } from "react";
import useLabourCost from "@entities/labour-setting/hooks/useLabourCost.ts";

export const LabourContext = createContext({} as ReturnType<typeof useLabourCost>);

export const LabourProvider: FC<PropsWithChildren> = ({ children }) => {
  const { labour, saveHourlyRate, saveSettingCost } = useLabourCost();

  return (
    <LabourContext.Provider value={{ labour, saveHourlyRate, saveSettingCost }}>{children}</LabourContext.Provider>
  );
};
