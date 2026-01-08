import PureMetalDetailsHeader from "@features/metals/pure-metal-details-header/ui/PureMetalDetailsHeader";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import { useParams } from "react-router";
import PureMetalSummary from "@features/metals/pure-metal-summary/ui/PureMetalSummary";
import PureMetalPurchasesTable from "@features/metals/pure-metal-purchases-table/ui/PureMetalPurchasesTable";
import { Dayjs } from "dayjs";
import { useState } from "react";

const PureMetalDetailsPage = () => {
  const { id } = useParams();
  const [filterDate, setFilterDate] = useState<Dayjs>();

  return (
    <CommonLayout>
      <PureMetalDetailsHeader pureMetalId={+id!} onDateChange={setFilterDate} />

      <PureMetalSummary pureMetalId={+id!} />

      <PureMetalPurchasesTable pureMetalId={+id!} filterDate={filterDate} />
    </CommonLayout>
  );
};

export default PureMetalDetailsPage;
