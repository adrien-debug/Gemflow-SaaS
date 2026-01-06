import ActionBar from "@shared/ui/ActionBar";
import AddDiamondRecordButton from "@features/diamonds/add-diamond-record-button/ui/AddDiamondRecordButton";
import DiamondsTotalValueLabel from "@features/diamonds/diamonds-total-value/ui/DiamondsTotalValueLabel";
import DiamondShapeSelector from "@entities/diamond/ui/DiamondShapeSelector";
import ConfigProvider, { ThemeConfig } from "antd/es/config-provider";
import { brandingTokens } from "@shared/constants/branding.ts";
import { Optional } from "@shared/types/optional.type.ts";
import { FC } from "react";

const selectTheme: ThemeConfig = {
  components: {
    Select: {
      borderRadius: brandingTokens.borderRadiusDefault,
      borderRadiusLG: brandingTokens.borderRadiusDefault,
    },
  },
};

interface Props {
  onShapeIdsChange?: (shapeId: Optional<number[]>) => void;
}

const DiamondsHeader: FC<Props> = ({ onShapeIdsChange }) => {
  const handleShapeChange = (shapeIds: number | number[]) => {
    if (!shapeIds) {
      onShapeIdsChange?.(undefined);
    } else {
      onShapeIdsChange?.(Array.isArray(shapeIds) ? shapeIds : [shapeIds]);
    }
  };

  return (
    <ActionBar title="Diamonds" badge={<DiamondsTotalValueLabel />}>
      <ConfigProvider theme={selectTheme}>
        <DiamondShapeSelector
          dropdownStyle={{
            borderRadius: 8,
          }}
          allowClear
          style={{ minWidth: 200 }}
          onChange={handleShapeChange}
          placeholder="Filter by shape"
        />
      </ConfigProvider>

      <AddDiamondRecordButton />
    </ActionBar>
  );
};

export default DiamondsHeader;
