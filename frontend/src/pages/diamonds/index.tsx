import Flex from "antd/es/flex";
import DiamondsHeader from "@features/diamonds/diamonds-header/ui/DiamondsHeader";
import DiamondRecordsTable from "@features/diamonds/diamond-record-table/ui/DiamondRecordsTable.tsx";
import PageHero from "@shared/ui/PageHero";
import { Optional } from "@shared/types/optional.type.ts";
import { useState } from "react";
import { StarOutlined } from "@ant-design/icons";

const Diamonds = () => {
  const [shapeIds, setShapeIds] = useState<Optional<number[]>>([]);

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <PageHero
        icon={<StarOutlined />}
        badge="Inventory"
        title="Diamonds"
        subtitle="Browse, filter and manage your full diamond inventory by shape, carat and quality"
      />
      <DiamondsHeader onShapeIdsChange={(shapeIds) => setShapeIds(shapeIds)} />

      <DiamondRecordsTable shapeIds={shapeIds} />
    </Flex>
  );
};

export default Diamonds;
