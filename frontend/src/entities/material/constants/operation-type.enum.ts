export const enum OperationType {
  USAGE = "USAGE",
  RETURN = "RETURN",
}

export const operationTypeNameMap: Record<OperationType, string> = {
  [OperationType.USAGE]: "Usage",
  [OperationType.RETURN]: "Return",
};
