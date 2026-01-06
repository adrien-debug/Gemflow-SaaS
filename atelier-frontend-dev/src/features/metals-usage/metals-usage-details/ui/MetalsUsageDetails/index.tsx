import EditFormController from "@shared/ui/EditFormController";
import Flex from "antd/es/flex";
import { FC, useState } from "react";
import Button from "antd/es/button";
import MetalsDetailsStatistics from "@features/metals-usage/metals-details-statistic/ui/MetalsDetailsStatistics";
import MetalsDetailsCastingTable from "@features/metals-usage/metals-details-casting-table/ui/MetalsDetailsCastingTable";
import AddMaterialUsageModal from "@features/metals-usage/add-material-usage-modal/ui/AddMaterialUsageModal";
import ReturnMaterialModal from "@features/metals-usage/return-material-modal/ui/ReturnMaterialModal";
import MetalsDetailsProductionTable from "@features/metals-usage/metals-details-production-table/ui/MetalsDetailsProductionTable";
import useOrderMetalTotals from "@entities/order/hooks/useOrderMetalTotals.ts";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const MetalsDetails: FC<Props> = ({ orderId, disabled }) => {
  const [addMaterialModalOpen, setAddMaterialModalOpen] = useState<boolean>(false);
  const [returnMaterialModalOpen, setReturnMaterialModalOpen] = useState<boolean>(false);
  const { data: metalTotals, isPending: isMetalTotalsPending } = useOrderMetalTotals(orderId);

  return (
    <>
      <EditFormController
        id="metals-controller"
        title="Metals"
        description="Metals usage in order production"
        additionalControls={
          !disabled && (
            <>
              <Button size="large" onClick={() => setReturnMaterialModalOpen(true)}>
                Return
              </Button>
            </>
          )
        }
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
          type: "primary",
          size: "large",
          children: "Add usage",
          icon: null,
        }}
        onEdit={() => setAddMaterialModalOpen(true)}
      />

      <AddMaterialUsageModal
        open={addMaterialModalOpen}
        onClose={() => setAddMaterialModalOpen(false)}
        orderId={orderId}
      />

      <ReturnMaterialModal
        open={returnMaterialModalOpen}
        onClose={() => setReturnMaterialModalOpen(false)}
        orderId={orderId}
        metalTotals={metalTotals}
      />

      <Flex vertical gap={8}>
        <MetalsDetailsStatistics orderId={orderId} metalTotals={metalTotals} isLoading={isMetalTotalsPending} />

        <MetalsDetailsCastingTable orderId={orderId} disabled={disabled} />

        <MetalsDetailsProductionTable orderId={orderId} />
      </Flex>
    </>
  );
};

export default MetalsDetails;
