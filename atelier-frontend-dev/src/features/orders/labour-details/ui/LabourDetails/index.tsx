import EditFormController from "@shared/ui/EditFormController";
import LabourDetailsControl from "@features/orders/labour-details-control/ui/LabourDetailsControl";
import LabourSummary from "@features/orders/labour-summary/ui/LabourSummary";
import LabourDetailsTable from "@features/orders/labour-details-table/ui/LabourDetailsTable";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import { FC, useState } from "react";
import CreateLogWorkModal from "@features/orders/create-labour-log-work-modal/ui/CreateLogWorkModal";
import { UserRoleEnum } from "@entities/user-roles/constants/user-role.enum.ts";
import usePersonalDetails from "@entities/user/hooks/usePersonalDetails.ts";

interface Props {
  orderId: number;
  disabled?: boolean;
}

const LabourDetails: FC<Props> = ({ orderId, disabled }) => {
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const { data: currentUser } = usePersonalDetails();
  const isDisabled = currentUser?.role.code === UserRoleEnum.EMPLOYEE;

  return (
    <Flex vertical className="labour-details">
      <EditFormController
        id="labour-details-controller"
        title="Labour details"
        description="Production labour cost details"
        editButtonProps={{
          style: { display: disabled ? "none" : "flex" },
          children: "Log work",
          icon: null,
          disabled: isDisabled,
          id: "log-work",
          type: "primary",
          onClick: () => setModalOpen(true),
        }}
        additionalControls={<LabourDetailsControl orderId={orderId} />}
      />
      <CreateLogWorkModal open={modalOpen} onClose={() => setModalOpen(false)} orderId={orderId} />

      <Flex gap={100}>
        <Col flex="30%">
          <LabourSummary orderId={orderId} />
        </Col>
        <Col flex="auto">
          <LabourDetailsTable orderId={orderId} disabled={disabled} />
        </Col>
      </Flex>
    </Flex>
  );
};

export default LabourDetails;
