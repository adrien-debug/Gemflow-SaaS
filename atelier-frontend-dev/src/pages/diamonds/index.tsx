import Flex from "antd/es/flex";
import DiamondsHeader from "@features/diamonds/diamonds-header/ui/DiamondsHeader";
import DiamondRecordsTable from "@features/diamonds/diamond-record-table/ui/DiamondRecordsTable.tsx";
import { Optional } from "@shared/types/optional.type.ts";
import { useState } from "react";

const Diamonds = () => {
  const [shapeIds, setShapeIds] = useState<Optional<number[]>>([]);

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <DiamondsHeader onShapeIdsChange={(shapeIds) => setShapeIds(shapeIds)} />

      <DiamondRecordsTable shapeIds={shapeIds} />
    </Flex>
  );
};

export default Diamonds;
