import { FC } from "react";
import Typography from "antd/es/typography";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import useDiamondsTotalValue from "@entities/diamond/hooks/useDiamondsTotalValue.ts";
import Skeleton from "antd/es/skeleton";

const DiamondsTotalValueLabel: FC = () => {
  const { data, isPending } = useDiamondsTotalValue();

  return (
    <Typography.Text style={{ color: brandingColorPalette.brand7, fontWeight: 400, fontSize: 16 }}>
      Total value:
      <Typography.Text strong style={{ color: brandingColorPalette.brand7, fontSize: 16 }}>
        {isPending ? (
          <Skeleton.Input active={true} size="small" style={{ marginLeft: 8 }} />
        ) : (
          ` $${moneyFormatter(data?.totalCost, 2)}`
        )}
      </Typography.Text>
    </Typography.Text>
  );
};

export default DiamondsTotalValueLabel;
