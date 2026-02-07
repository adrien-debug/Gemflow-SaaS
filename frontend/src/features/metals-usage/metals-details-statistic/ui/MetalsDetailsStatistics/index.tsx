import { DiamondUsageStatus } from "@entities/diamond/constants/diamond-usage-status.enum.ts";
import useDiamondUsageStatistics from "@entities/diamond/hooks/useDiamondUsageStatistics.ts";
import useGemstoneUsageStatistics from "@entities/gemstone/hooks/useGemstoneUsageStatistics.ts";
import { OrderMetalTotal } from "@entities/order/models/order-metal-total.model.ts";
import { getWeightLossDescription } from "@features/metals-usage/metals-details-statistic/utils/get-weight-out-loss-string.ts";
import Loading from "@shared/ui/Loading";
import { FC, useEffect, useState } from "react";
import Flex from "antd/es/flex";
import LabelValueCard from "@shared/ui/LabelValueCard";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Tag from "@shared/ui/tag/components/Tag";
import "./styles.scss";
import { RightOutlined } from "@ant-design/icons";
import { brandingTokens } from "@shared/constants/branding.ts";
import AddWeightOutModal from "@features/metals-usage/add-weight-out-modal/ui/AddWeightOutModal";

interface Props {
  orderId: number;
  metalTotals?: OrderMetalTotal[];
  isLoading: boolean;
}

const MetalsDetailsStatistics: FC<Props> = ({ orderId, metalTotals, isLoading }) => {
  const { data: gemstoneTotals, isPending: isGemstoneTotalsPending } = useGemstoneUsageStatistics({
    orderIds: [orderId],
  });
  const { data: diamondTotals, isPending: isDiamondTotalsPending } = useDiamondUsageStatistics({
    orderIds: [orderId],
    statuses: [DiamondUsageStatus.GOOD_QUALITY],
  });

  const [addModalOpen, setAddModalOpen] = useState(false);
  const [activeMetalTotal, setActiveMetalTotal] = useState<OrderMetalTotal | null>(null);

  useEffect(() => {
    if (activeMetalTotal) setAddModalOpen(true);
  }, [activeMetalTotal]);

  if (isLoading || isGemstoneTotalsPending || isDiamondTotalsPending) {
    return <Loading />;
  }

  return (
    <>
      {metalTotals?.map((metalTotal) => (
        <div key={metalTotal.id}>
          <Flex gap={8} className="label-value-card-wrapper">
            <LabelValueCard label="Weight in, g" badge={<Tag tag={metalTotal.metal} />}>
              {metalTotal.weightIn}
            </LabelValueCard>

            <div className="label-value-card-separator" />

            <LabelValueCard
              label="Weight out, g"
              description={
                metalTotal.weightOut ? getWeightLossDescription(metalTotal.weightOut, metalTotal.weightIn) : ""
              }>
              <div
                className={`label-value-card-weight-add-cursor ${!metalTotal.weightOut ? "label-value-card-weight-content" : ""}`}
                onClick={() => setActiveMetalTotal(metalTotal)}>
                <span style={{ paddingBottom: 4 }}>{metalTotal.weightOut ?? "Enter"}</span>

                <RightOutlined style={{ width: 12, marginLeft: 8, color: brandingTokens.textColorGray }} />
              </div>
            </LabelValueCard>

            <div className="label-value-card-separator" />

            <LabelValueCard label="Total cost" description={`$${moneyFormatter(metalTotal.priceGram, 2)}/g`}>
              ${moneyFormatter(metalTotal.totalCost, 2)}
            </LabelValueCard>
          </Flex>
        </div>
      ))}

      {activeMetalTotal && (
        <AddWeightOutModal
          totalWeight={activeMetalTotal.weightIn}
          diamondsWeight={diamondTotals?.totalWeight}
          gemsWeight={gemstoneTotals?.totalWeight}
          metalTotalId={activeMetalTotal?.id}
          inputWeight={activeMetalTotal?.weightOut}
          open={addModalOpen}
          onClose={() => {
            setActiveMetalTotal(null);
            setAddModalOpen(false);
          }}
          metal={activeMetalTotal?.metal}
        />
      )}
    </>
  );
};

export default MetalsDetailsStatistics;
