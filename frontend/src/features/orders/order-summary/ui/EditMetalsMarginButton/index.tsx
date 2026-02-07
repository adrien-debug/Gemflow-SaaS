import Button from "antd/es/button";
import { FC, useState } from "react";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import EditMarginModal from "@features/orders/order-summary/ui/EditMarginModal";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useUpdateMetalsProfit from "@entities/order/hooks/useUpdateMetalsProfit.ts";

interface Props {
  currentMargin: number;
  handleSaveProfit: (value: number) => void;
  orderId: number;
}

const EditMetalsMarginButton: FC<Props> = ({ currentMargin, handleSaveProfit, orderId }) => {
  const [openModal, setOpenModal] = useState(false);

  const { messageApi } = useMessage();

  const mutation = useUpdateMetalsProfit(orderId);

  const handleFinish = (value: { margin: number }) => {
    mutation.mutate(value.margin, {
      onSuccess: () => {
        handleSaveProfit(value.margin);
        void messageApi.success("Metals margin updated successfully");
      },
      onError: () => {
        void messageApi.error("Failed to update metals margin");
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
export default EditMetalsMarginButton;
