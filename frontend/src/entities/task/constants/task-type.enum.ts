export enum TaskType {
  Cad = "CAD",
  Mounting = "MOUNTING",
  Setting = "SETTING",
  Polishing = "POLISHING",
}

export const TaskTypeNameMap: Record<TaskType, string> = {
  [TaskType.Cad]: "CAD",
  [TaskType.Mounting]: "Mounting",
  [TaskType.Setting]: "Setting",
  [TaskType.Polishing]: "Polishing",
};
