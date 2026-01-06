import { useDeleteOtherMaterial } from "@entities/other-material/hooks/useDeleteOtherMaterial.ts";
import { OtherMaterial } from "@entities/other-material/model/other-material.model";
import { TabKeys } from "@pages/metals/constants/tab-keys.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal";
import { FC } from "react";
import { useNavigate } from "react-router";

interface Props {
  otherMaterial: OtherMaterial;
}

const DeleteOtherMaterialButton: FC<Props> = ({ otherMaterial }) => {
  const mutation = useDeleteOtherMaterial();
  const { messageApi } = useMessage();
  const { modalApi } = useModal();
  const navigate = useNavigate();

  const handleDelete = () => {
    if (otherMaterial.id) {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete material ${otherMaterial.name}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          mutation.mutate(otherMaterial.id!, {
            onSuccess: () => {
              void messageApi.success(`Meterial ${otherMaterial.name} deleted successfully.`);
              navigate(`/metals?tab=${TabKeys.OTHER}`);
            },
            onError: () => {
              void messageApi.error(`Failed to delete material ${otherMaterial.name}.`);
            },
          });
        },
        title: `Delete material?`,
      });
    }
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

export default DeleteOtherMaterialButton;
