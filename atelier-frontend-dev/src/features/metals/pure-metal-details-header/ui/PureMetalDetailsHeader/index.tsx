import AddPureMetalPurchaseButton from "@features/metals/add-pure-metal-purchase-button/ui/AddPureMetalPurchaseButton";
import PureMetalDetailsBreadcrumbs from "@features/metals/pure-metal-details-header/ui/PureMetalDetailsBreadcrumbs";
import ActionBar from "@shared/ui/ActionBar";
import DatePicker from "antd/es/date-picker";
import Flex from "antd/es/flex";
import "./styles.scss";
import usePureMetalSummary from "@entities/metal/hooks/usePureMetalSummary.ts";
import { FC } from "react";
import { Dayjs } from "dayjs";
import { brandingTokens } from "@shared/constants/branding.ts";

interface Props {
  pureMetalId: number;
  onDateChange?: (date: Dayjs) => void;
}

const PureMetalDetailsHeader: FC<Props> = ({ pureMetalId, onDateChange }) => {
  const { data } = usePureMetalSummary(pureMetalId);

  return (
    <div className="metal-purchases-header">
      <PureMetalDetailsBreadcrumbs title={data?.priceMetalName?.name} />

      <ActionBar title={data?.priceMetalName?.name}>
        <Flex gap={16}>
          <DatePicker
            size="large"
            placeholder="Filter by date"
            onChange={onDateChange}
            style={{ borderRadius: brandingTokens.borderRadiusDefault }}
          />

          <AddPureMetalPurchaseButton pureMetalSummary={data} />
        </Flex>
      </ActionBar>
    </div>
  );
};

export default PureMetalDetailsHeader;
