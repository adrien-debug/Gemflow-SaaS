import { FC, useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import Button from "antd/es/button";
import AddDiamondUsageModal from "@features/diamonds/add-diamond-usage-modal/ui/AddDiamondUsageModal";
import DiamondUsageStatistics from "@features/diamonds/diamond-usage-statistics/ui/DiamondUsageStatistics";
import DiamondUsageTable from "@features/diamonds/diamond-usage-table/ui/DiamondUsageTable";
import Flex from "antd/es/flex";
import AddDiamondUsageBrokenModal from "@features/diamonds/add-diamond-usage-broken-modal/ui/AddDiamondUsageBrokenModal";
import AddDiamondUsageQualityIssueModal from "@features/diamonds/add-diamond-usage-quality-issue-modal/ui/AddDiamondUsageQualityIssueModal";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const DiamondsUsage: FC<Props> = ({ orderId, disabled }) => {
  const [addDiamondUsageModalOpen, setAddDiamondUsageModalOpen] = useState(false);
  const [addBrokenDiamondModalOpen, setAddBrokenDiamondModalOpen] = useState(false);
  const [addQualityIssueDiamondModalOpen, setAddQualityIssueDiamondModalOpen] = useState(false);

  return (
    <>
      <EditFormController
        id="diamond-usage-form-controller"
        title="Diamonds"
        description="Diamond usage in order production"
        additionalControls={
          !disabled && (
            <>
              <Button size="large" onClick={() => setAddBrokenDiamondModalOpen(true)}>
                Broken
              </Button>
              <Button size="large" onClick={() => setAddQualityIssueDiamondModalOpen(true)}>
                Quality issue
              </Button>
            </>
          )
        }
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
          type: "primary",
          size: "large",
          children: "Add record",
          icon: null,
        }}
        onEdit={() => setAddDiamondUsageModalOpen(true)}
      />
      <Flex vertical gap={8}>
        <DiamondUsageStatistics orderId={orderId} />

        <DiamondUsageTable orderId={orderId} disabled={disabled} />
      </Flex>

      <AddDiamondUsageModal
        orderId={orderId}
        open={addDiamondUsageModalOpen}
        onCancel={() => setAddDiamondUsageModalOpen(false)}
      />

      <AddDiamondUsageBrokenModal
        open={addBrokenDiamondModalOpen}
        orderId={orderId}
        onCancel={() => setAddBrokenDiamondModalOpen(false)}
      />

      <AddDiamondUsageQualityIssueModal
        open={addQualityIssueDiamondModalOpen}
        orderId={orderId}
        onCancel={() => setAddQualityIssueDiamondModalOpen(false)}
      />
    </>
  );
};

export default DiamondsUsage;
