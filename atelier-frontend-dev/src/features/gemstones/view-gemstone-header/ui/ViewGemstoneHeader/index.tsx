import { RightOutlined } from "@ant-design/icons";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum.ts";
import useDeleteGemstone from "@entities/gemstone/hooks/useDeleteGemstone.ts";
import { useGemstone } from "@entities/gemstone/hooks/useGemstone.ts";
import useUpdateGemstonePaymentStatus from "@entities/gemstone/hooks/useUpdateGemstonePaymentStatus.ts";
import useUpdateGemstoneStatus from "@entities/gemstone/hooks/useUpdateGemstoneStatus.ts";
import GemstonePaymentStatusSelect from "@entities/gemstone/ui/GemstonePaymentStatusSelect";
import GemstoneStatusSelect from "@entities/gemstone/ui/GemstoneStatusSelect";
import { useMessage } from "@shared/hooks/useMessage.ts";
import useModal from "@shared/hooks/useModal.ts";
import ActionBar from "@shared/ui/ActionBar";
import InfoBadge from "@shared/ui/InfoBadge";
import { getShortString } from "@shared/utils/get-short-string.ts";
import Breadcrumb from "antd/es/breadcrumb";
import Button from "antd/es/button";
import Dropdown from "antd/es/dropdown";
import Flex from "antd/es/flex";
import { useNavigate, useParams } from "react-router";

const breadcrumbs = [
  {
    title: "Gems",
    href: "/gemstones",
    separator: "",
  },
];

const ViewGemstoneHeader = () => {
  const { id } = useParams();
  const { isLoading, data: gemstone } = useGemstone(Number(id));
  const { mutate: deleteGemstone } = useDeleteGemstone();
  const { isPending: isStatusPending, mutate: updateGemstoneStatus } = useUpdateGemstoneStatus();
  const { isPending: isPaymentStatusPending, mutate: updateGemstonePaymentStatus } = useUpdateGemstonePaymentStatus();
  const { messageApi } = useMessage();
  const navigate = useNavigate();
  const { modalApi } = useModal();

  const handleDelete = () => {
    if (gemstone?.id) {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete the "${gemstone.name}" gemstone?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteGemstone(gemstone.id, {
            onSuccess: () => {
              void messageApi.success("Gemstone successfully deleted");
            },
            onError: () => {
              void messageApi.error("Something went wrong");
            },
            onSettled: () => {
              navigate("/gemstones");
            },
          });
        },
        title: "Delete gemstone?",
      });
    }
  };

  const handleUpdateGemstoneStatus = (status: GemstoneStatus) => {
    if (gemstone) {
      updateGemstoneStatus(
        { id: gemstone.id, status },
        {
          onError: (e) => {
            void messageApi.error(e.data?.friendlyMessage);
          },
        },
      );
    }
  };

  return (
    <div className="gemstone-header">
      <Breadcrumb
        className="breadcrumb"
        items={[
          ...breadcrumbs,
          {
            title: getShortString(gemstone?.name, 32),
          },
        ]}
        separator={<RightOutlined />}
      />
      <ActionBar
        title={gemstone?.name}
        badge={
          <Flex gap={14} align="center">
            {gemstone?.id && <InfoBadge title={gemstone.id} />}
          </Flex>
        }>
        <Flex gap={12} justify="space-between" align="end">
          {gemstone && (
            <>
              <GemstoneStatusSelect
                value={gemstone.status}
                loading={isLoading || isStatusPending}
                disabled={isStatusPending || !!gemstone?.order}
                onChange={handleUpdateGemstoneStatus}
              />
              <GemstonePaymentStatusSelect
                value={gemstone.paymentStatus?.id}
                loading={isLoading || isPaymentStatusPending}
                disabled={isPaymentStatusPending}
                onChange={(paymentStatusId: number) =>
                  updateGemstonePaymentStatus({ id: gemstone.id, paymentStatusId })
                }
              />
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "delete",
                      label: "Delete gemstone",
                      onClick: handleDelete,
                    },
                  ],
                }}
                placement="bottomLeft"
                arrow>
                <Button shape="circle" size="large">
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </>
          )}
        </Flex>
      </ActionBar>
    </div>
  );
};

export default ViewGemstoneHeader;
