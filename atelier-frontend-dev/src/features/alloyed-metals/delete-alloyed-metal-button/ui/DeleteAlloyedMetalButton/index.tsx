import { useDeleteAlloyedMetal } from "@entities/alloyed-metal/hooks/useDeleteAlloyedMetal.ts";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal";
import { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  alloyedMetal: AlloyedMetal;
}

const DeleteAlloyedMetalButton: FC<Props> = ({ alloyedMetal }) => {
  const mutation = useDeleteAlloyedMetal();
  const { messageApi } = useMessage();
  const { modalApi } = useModal();
  const navigate = useNavigate();

  const handleDelete = () => {
    modalApi.confirm({
      cancelText: "No",
      centered: true,
      content: `Are you sure you want to delete alloyed metal ${alloyedMetal.name}?`,
      icon: null,
      okButtonProps: { variant: "solid", danger: true },
      okText: "Yes",
      onOk() {
        mutation.mutate(alloyedMetal.id, {
          onSuccess: () => {
            void messageApi.success(`Alloyed metal ${alloyedMetal.name} deleted successfully.`);
            navigate("/metals?tab=ALLOYED_METALS");
          },
          onError: () => {
            void messageApi.error(`Failed to delete alloyed metal ${alloyedMetal.name}.`);
          },
        });
      },
      title: `Delete alloyed metal?`,
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

export default DeleteAlloyedMetalButton;
