import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import { Nullable } from "@shared/types/nullable.type.ts";

interface Props {
  casting: Nullable<CastingMetadata>;
}

export const mapCastingToTableData = ({ casting }: Props) => {
  if (!casting) return [];

  return [
    {
      id: 1,
      materialType: "Pure metal",
      materialName: casting.priceMetalName.name,
      weight: casting.pureMetalWeight,
      totalCost: casting.pureMetalCost,
    },
    {
      id: 2,
      materialType: "Alloy",
      materialName: casting.alloy.name,
      weight: casting.alloyWeight,
      totalCost: casting.alloyCost,
    },
    {
      id: 3,
      materialType: "Alloyed metal",
      materialName: casting.alloyedMetal.name,
      weight: casting.alloyedMetalWeight,
      totalCost: casting.alloyedMetalCost,
    },
  ];
};
