import Tabs from "antd/es/tabs";
import CastingView from "@features/casting/casting-view/ui/CastingView";
import CostsDetailsTable from "@features/casting/costs-details-table/ui/CostsDetailsTable/CostsDetailsTable.tsx";
import { useNavigate, useParams } from "react-router";
import { TabKeys } from "@pages/casting/constants/tab-keys.ts";
import useActiveTab from "@shared/hooks/useActiveTab.ts";
import { Breadcrumb } from "antd";
import { RightOutlined } from "@ant-design/icons";
import ActionBar from "@shared/ui/ActionBar";
import Flex from "antd/es/flex";
import InfoBadge from "@shared/ui/InfoBadge";
import useCasting from "@entities/casting/hooks/useCasting.ts";
import { CastingMetadata } from "@entities/casting/models/casting.model.ts";
import FinishCastingButton from "@features/casting/finish-casting-button/ui/FinishCastingButton";
import { CastingStatus } from "@entities/casting/constants/casting-status.enum.ts";
import Dropdown from "antd/es/dropdown";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import useDeleteCasting from "@entities/casting/hooks/useDeleteCasting.ts";
import useModal from "@shared/hooks/useModal.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { useFilterMenuByRoles } from "@entities/user-roles/hooks/useFilterMenuByRoles.ts";
import { RolesMap } from "@pages/casting/constants/roles-map.ts";
import Skeleton from "antd/es/skeleton";

const breadcrumbs = [
  {
    title: "Casting",
    href: "/casting",
    separator: "",
  },
];

export const CastingDetailsPage = () => {
  const { id } = useParams();
  const { data: casting, isPending } = useCasting(+id!);

  const navigate = useNavigate();

  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const { activeTab, setActiveTab } = useActiveTab(TabKeys.SUMMARY);

  const deleteMutation = useDeleteCasting();

  const handleDelete = () => {
    if (casting?.id) {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete casting ID: ${casting.id}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(casting.id, {
            onSuccess: () => {
              void messageApi.success("Casting was successfully deleted");
              navigate("/casting");
            },
            onError: () => {
              void messageApi.error("Failed to delete casting");
            },
          });
        },
        title: "Delete casting?",
      });
    }
  };

  const filteredMenuItems = useFilterMenuByRoles({
    menuItems: [
      {
        key: TabKeys.SUMMARY,
        label: "Summary",
        children: (
          <CastingView
            casting={casting as CastingMetadata}
            isEditBlocked={casting?.status === CastingStatus.Finished}
          />
        ),
      },
      {
        key: TabKeys.COSTS,
        label: "Costs",
        children: <CostsDetailsTable casting={casting as CastingMetadata} />,
      },
    ],
    rolesMap: RolesMap,
  });

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <div>
        <Breadcrumb
          className="breadcrumb"
          items={[
            ...breadcrumbs,
            {
              title: isPending ? <Skeleton.Input active={true} size="small" /> : `Casting #${casting?.id}`,
            },
          ]}
          separator={<RightOutlined />}
        />

        <ActionBar
          title={`Casting #${id}`}
          badge={
            casting && (
              <Flex gap={14} align="center">
                <InfoBadge title={casting.cylinder.name} />
                <InfoBadge title={casting?.metal.name} />
              </Flex>
            )
          }>
          {casting?.status !== CastingStatus.Finished && (
            <>
              <FinishCastingButton
                metal={casting?.metal}
                metalPurity={casting?.metalPurity}
                castingId={casting?.id}
                reuseWeight={casting?.reuseWeight}
              />
              <Dropdown
                menu={{
                  items: [
                    {
                      key: "CASTING_DELETE",
                      label: "Delete",
                      onClick: handleDelete,
                    },
                  ],
                }}
                placement="bottomLeft">
                <Button shape="circle" size="large">
                  <EllipsisOutlined />
                </Button>
              </Dropdown>
            </>
          )}
        </ActionBar>
      </div>

      <Tabs activeKey={activeTab} onChange={setActiveTab} items={filteredMenuItems} />
    </Flex>
  );
};
