import { useAlloyedMetal } from "@entities/alloyed-metal/hooks/useAlloyedMetal.ts";
import AddAlloyedMetalPurchaseButton from "@features/alloyed-metals/add-alloyed-metal-purchase-button/ui/AddAlloyedMetalPurchaseButton";
import AlloyActionsDropdown from "@features/alloyed-metals/alloyed-metal-actions/ui/AlloyedMetalActionsDropdown";
import AlloyedMetalsDetailsBreadcrumbs from "@features/alloyed-metals/alloyed-metal-details-breadcrumbs/ui/AlloyedMetalDetailsBreadcrumbs";
import AlloyedMetalPurchasesTable from "@features/alloyed-metals/alloyed-metal-purchases-table/ui/AlloyedMetalPurchasesTable";
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

const AlloyedMetalDetailsPage = () => {
  const { id } = useParams();
  const [balanceDate, setBalanceDate] = useState<Dayjs>();
  const { data, isPending } = useAlloyedMetal(Number(id));

  if (isPending || !data) return <Loading />;

  return (
    <CommonLayout>
      <div>
        <AlloyedMetalsDetailsBreadcrumbs />
        <ActionBar
          title={data.name}
          badge={
            <Flex>
              <Tag tag={data.metal}></Tag>
              <Tag tag={{ ...data.metalPurity, name: data.metalPurity.metalPurity }}></Tag>
            </Flex>
          }>
          <Flex gap={16}>
            <DatePicker
              size="large"
              onChange={setBalanceDate}
              placeholder="Filter by date"
              style={{ borderRadius: brandingTokens.borderRadiusDefault }}
            />

            <AddAlloyedMetalPurchaseButton />

            <AlloyActionsDropdown alloyedMetal={data} />
          </Flex>
        </ActionBar>
      </div>

      <Flex gap={8} className="pure-metal-info">
        <LabelValueCard loading={isPending} label="Remaining weight">
          {moneyFormatter(data?.remainingWeight)} g
        </LabelValueCard>

        <LabelValueCard loading={isPending} label="Total cost">
          ${moneyFormatter(data?.totalCost, 2)}
        </LabelValueCard>
      </Flex>

      <AlloyedMetalPurchasesTable balanceDate={balanceDate} />
    </CommonLayout>
  );
};

export default AlloyedMetalDetailsPage;
