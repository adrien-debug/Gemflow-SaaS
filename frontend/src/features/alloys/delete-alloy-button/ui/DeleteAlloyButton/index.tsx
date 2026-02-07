import { useDeleteAlloy } from "@entities/alloy/hooks/useDeleteAlloy.ts";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal";
import { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  alloy: Alloy;
}

const DeleteAlloyButton: FC<Props> = ({ alloy }) => {
  const mutation = useDeleteAlloy();
  const { messageApi } = useMessage();
  const { modalApi } = useModal();
  const navigate = useNavigate();

  const handleDelete = () => {
    modalApi.confirm({
      cancelText: "No",
      centered: true,
      content: `Are you sure you want to delete alloy ${alloy.name}?`,
      icon: null,
      okButtonProps: { variant: "solid", danger: true },
      okText: "Yes",
      onOk() {
        mutation.mutate(alloy.id, {
          onSuccess: () => {
            void messageApi.success(`Alloy ${alloy.name} deleted successfully.`);
            navigate("/metals");
          },
          onError: () => {
            void messageApi.error(`Failed to delete alloy ${alloy.name}.`);
          },
        });
      },
      title: `Delete alloy?`,
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

export default DeleteAlloyButton;
