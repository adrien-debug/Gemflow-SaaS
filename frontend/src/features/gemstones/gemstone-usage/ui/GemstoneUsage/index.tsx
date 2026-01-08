import { FC, useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import Flex from "antd/es/flex";
import GemstoneUsageStatistics from "@features/gemstones/gemstone-usage-statistics/ui/GemstoneUsageStatistics";
import GemstoneUsageTable from "@features/gemstones/gemstone-usage-table/ui/GemstoneUsageTable";
import AddGemstoneUsageModal from "@features/gemstones/add-gemstone-usage-modal/ui/AddGemstoneUsageModal";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const GemstoneUsage: FC<Props> = ({ orderId, disabled }) => {
  const [addGemstoneUsageModalOpen, setAddGemstoneUsageModalOpen] = useState(false);

  return (
    <>
      <EditFormController
        id="gemstone-usage-form-controller"
        title="Gemstones"
        description="Gemstones usage in order production"
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
          type: "primary",
          size: "large",
          children: "Add stone",
          icon: null,
        }}
        onEdit={() => setAddGemstoneUsageModalOpen(true)}
      />

      <Flex vertical gap={8}>
        <GemstoneUsageStatistics orderId={orderId} />

        <GemstoneUsageTable orderId={orderId} disabled={disabled} />
      </Flex>

      <AddGemstoneUsageModal
        open={addGemstoneUsageModalOpen}
        orderId={orderId}
        onCancel={() => setAddGemstoneUsageModalOpen(false)}
      />
    </>
  );
};

export default GemstoneUsage;
