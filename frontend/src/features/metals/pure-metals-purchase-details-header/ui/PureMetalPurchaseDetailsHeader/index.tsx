import ViewPurchaseInvoiceButton from "@features/metals/purchase-view-invoice-button/ui/ViewPurchaseInvoiceButton";
import PureMetalsPurchaseDetailsBreadcrumbs from "@features/metals/pure-metals-purchase-details-header/ui/PureMetalsPurchaseDetailsBreadcrumbs";
import ActionBar from "@shared/ui/ActionBar";
import Button from "antd/es/button";
import EllipsisOutlined from "@ant-design/icons/lib/icons/EllipsisOutlined";
import Dropdown from "antd/es/dropdown";
import useDeletePureMetalPurchase from "@entities/metal/hooks/useDeletePureMetalPurchase.ts";
import useModal from "@shared/hooks/useModal.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { useNavigate } from "react-router";
import { FC } from "react";
import { PureMetalPurchase } from "@entities/metal/models/pure-metal-purchase.model.ts";
import { DateFormat } from "@shared/constants/date-format.ts";
import dayjs from "dayjs";

interface Props {
  purchase?: PureMetalPurchase;
  loading: boolean;
}

const PureMetalPurchaseDetailsHeader: FC<Props> = ({ purchase, loading }) => {
  const navigate = useNavigate();

  const deleteMutation = useDeletePureMetalPurchase();

  const { modalApi } = useModal();

  const { messageApi } = useMessage();

  const handleDelete = () => {
    if (purchase?.id) {
      modalApi.confirm({
        cancelText: "No",
        centered: true,
        content: `Are you sure you want to delete purchase with ID ${purchase?.id}?`,
        icon: null,
        okButtonProps: { variant: "solid", danger: true },
        okText: "Yes",
        onOk() {
          deleteMutation.mutate(purchase?.id, {
            onSuccess: () => {
              void messageApi.success(`Purchase with ID ${purchase?.id} was successfully deleted`);
              navigate(`/metals/pure-metals/${purchase?.priceMetalName?.id}`);
            },
            onError: (e) => {
              void messageApi.error(e.data?.friendlyMessage);
            },
          });
        },
        title: "Delete purchase?",
      });
    }
  };

  return (
    <div>
      <PureMetalsPurchaseDetailsBreadcrumbs
        metal={purchase?.priceMetalName}
        purchaseId={purchase?.id}
        loading={loading}
      />
      <ActionBar
        title={!loading ? `Purchase #${purchase?.id}` : undefined}
        description={
          !loading
            ? `${purchase?.supplier?.name} • ${dayjs(purchase?.balanceDate).format(DateFormat.DayMonthYear)}`
            : undefined
        }
        isAsyncDescription>
        {purchase?.invoice && <ViewPurchaseInvoiceButton invoice={purchase?.invoice} />}
        <Dropdown
          menu={{
            items: [
              {
                key: "delete",
                label: "Delete purchase",
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
      </ActionBar>
    </div>
  );
};

export default PureMetalPurchaseDetailsHeader;
