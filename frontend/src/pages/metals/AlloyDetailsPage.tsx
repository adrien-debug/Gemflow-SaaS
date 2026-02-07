import { useAlloy } from "@entities/alloy/hooks/useAlloy.ts";
import AlloyActionsDropdown from "@features/alloys/alloy-actions/ui/AlloyActionsDropdown";
import AddAlloyPurchaseButton from "@features/alloys/add-alloy-purchase-button/ui/AddAlloyPurchaseButton";
import AlloyDetailsBreadcrumbs from "@features/alloys/alloy-details-breadcrumbs/ui/AlloyDetailsBreadcrumbs";
import AlloyPurchasesTable from "@features/alloys/alloy-purchases-table/ui/AlloyPurchasesTable";
import { brandingTokens } from "@shared/constants/branding.ts";
import ActionBar from "@shared/ui/ActionBar";
import LabelValueCard from "@shared/ui/LabelValueCard";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import Loading from "@shared/ui/Loading";
import Tag from "@shared/ui/tag/components/Tag";
import { moneyFormatter } from "@shared/utils/formatter";
import DatePicker from "antd/es/date-picker";
import Flex from "antd/es/flex";
import { Dayjs } from "dayjs";
import { useState } from "react";
import { useParams } from "react-router";

const AlloyDetailsPage = () => {
  const { id } = useParams();
  const [balanceDate, setBalanceDate] = useState<Dayjs>();
  const { data: alloy, isLoading } = useAlloy(Number(id));

  if (isLoading || !alloy) return <Loading />;

  return (
    <CommonLayout>
      <div>
        <AlloyDetailsBreadcrumbs />
        <ActionBar title={alloy.name} badge={<Tag tag={alloy.metal}></Tag>}>
          <Flex gap={16}>
            <DatePicker
              size="large"
              onChange={setBalanceDate}
              placeholder="Filter by date"
              style={{ borderRadius: brandingTokens.borderRadiusDefault }}
            />
            <AddAlloyPurchaseButton />
            <AlloyActionsDropdown alloy={alloy} />
          </Flex>
        </ActionBar>
      </div>

      <Flex gap={8} vertical>
        <Flex gap={8}>
          <LabelValueCard label="Remaining weight">{moneyFormatter(alloy.remainingWeight)} g</LabelValueCard>

          <LabelValueCard label="Remaining cost value">${moneyFormatter(alloy.totalCost, 2)}</LabelValueCard>
        </Flex>

        <AlloyPurchasesTable balanceDate={balanceDate} />
      </Flex>
    </CommonLayout>
  );
};

export default AlloyDetailsPage;
