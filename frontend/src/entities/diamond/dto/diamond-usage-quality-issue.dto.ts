import { DiamondUsageDto } from "@entities/diamond/dto/diamond-usage.dto.ts";

export interface DiamondUsageQualityIssueDto extends Omit<DiamondUsageDto, "date" | "employeeId"> {}
