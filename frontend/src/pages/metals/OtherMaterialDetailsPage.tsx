import useOtherMaterial from "@entities/other-material/hooks/useOtherMaterial.ts";
import OtherMaterialTransactionsTable from "@features/other-materials/other-material-transactions-table/ui/OtherMaterialTransactionsTable";
import CommonLayout from "@shared/ui/layouts/CommonLayout";
import Loading from "@shared/ui/Loading";
import { useParams } from "react-router";
import { Dayjs } from "dayjs";
import { useState } from "react";
import OtherMaterialDetailsHeader from "@features/other-materials/other-material-details-header/ui/OtherMaterialDetailsHeader";

const OtherMaterialDetailsPage = () => {
  const { id } = useParams();
  const [balanceDate, setBalanceDate] = useState<Dayjs>();

  const { data, isPending } = useOtherMaterial(Number(id));

  if (isPending || !data) return <Loading />;

  return (
    <CommonLayout>
      <OtherMaterialDetailsHeader otherMaterial={data} onDateChange={setBalanceDate} />

      <OtherMaterialTransactionsTable balanceDate={balanceDate} />
    </CommonLayout>
  );
};

export default OtherMaterialDetailsPage;
