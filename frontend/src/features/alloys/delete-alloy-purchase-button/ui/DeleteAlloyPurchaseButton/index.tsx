import { useDeleteAlloyPurchase } from "@entities/alloy/hooks/useDeleteAlloyPurchase.ts";
import { AlloyPurchase } from "@entities/alloy/models/alloy-purchase.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal";
import { FC } from "react";

interface Props {
  purchase: AlloyPurchase;
}

const DeleteAlloyPurchaseButton: FC<Props> = ({ purchase }) => {
  const mutation = useDeleteAlloyPurchase();
  const { messageApi } = useMessage();
  const { modalApi } = useModal();

  const handleDelete = () => {
    modalApi.confirm({
      cancelText: "No",
      centered: true,
      content: `Are you sure you want to delete purchase?`,
      icon: null,
      okButtonProps: { variant: "solid", danger: true },
      okText: "Yes",
      onOk() {
        mutation.mutate(purchase.id, {
          onSuccess: () => {
            void messageApi.success("Purchase deleted successfully.");
          },
          onError: () => {
            void messageApi.error("Failed to delete purchase.");
          },
        });
      },
      title: "Delete purchase?",
    });
  };

  return (
    <a
      target="_blank"
      rel="noopener noreferrer"
      role="button"
      style={{ width: "100%", height: "100%" }}
      onClick={handleDelete}>
      Delete
    </a>
  );
};

export default DeleteAlloyPurchaseButton;
