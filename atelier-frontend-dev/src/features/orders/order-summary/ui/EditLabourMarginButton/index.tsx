import Button from "antd/es/button";
import { FC, useState } from "react";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import EditMarginModal from "@features/orders/order-summary/ui/EditMarginModal";
import useUpdateLabourProfit from "@entities/order/hooks/useUpdateLabourProfit.ts";

interface Props {
  currentMargin: number;
  onSave: (value: number) => void;
  orderId: number;
}

const EditLabourMarginButton: FC<Props> = ({ currentMargin, onSave, orderId }) => {
  const [openModal, setOpenModal] = useState(false);

  const { messageApi } = useMessage();

  const mutation = useUpdateLabourProfit(orderId);

  const handleFinish = (value: { margin: number }) => {
    mutation.mutate(value.margin, {
      onSuccess: () => {
        onSave(value.margin);
        void messageApi.success("Labor margin updated successfully");
      },
      onError: () => {
        void messageApi.error("Failed to update labour margin");
      },
      onSettled: () => {
        setOpenModal(false);
      },
    });
  };

  return (
    <>
      <Button type="link" style={{ color: brandingColorPalette.brand7 }} onClick={() => setOpenModal(true)}>
        Edit
      </Button>

      <EditMarginModal
        open={openModal}
        setIsModalOpen={setOpenModal}
        currentMargin={currentMargin}
        handleFinish={handleFinish}
        loading={mutation.isPending}
      />
    </>
  );
};
export default EditLabourMarginButton;
