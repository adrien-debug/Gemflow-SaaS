import { SearchAlloyedMetalsDto } from "@entities/alloyed-metal/dto/search-alloyed-metals.dto.ts";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import CreateAlloyedMetalButton from "@features/alloyed-metals/create-alloyed-metal-button/ui/CreateAlloyedMetalButton";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import SubHeader from "@shared/ui/SubHeader";
import Row from "antd/es/row";
import "features/alloyed-metals/alloyed-metals/ui/AlloyedMetals/styles.scss";
import { useState } from "react";
import Col from "antd/es/col";
import AlloyedMetalCard from "@features/alloyed-metals/alloyed-metal-card/ui/AlloyedMetalCard";
import { useInfiniteAlloyedMetals } from "@entities/alloyed-metal/hooks/useInfiniteAlloyedMetals.ts";
import InfiniteList from "@shared/ui/InfiniteList";
import NoData from "@shared/ui/NoData";
import useAlloyedMetalTotal from "@entities/alloyed-metal/hooks/useAlloyedMetalsTotal.ts";

const AlloyedMetals = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchAlloyedMetalsDto["searchCriteria"]>({});

  const infiniteAlloyedMetalsQueryResult = useInfiniteAlloyedMetals({ searchCriteria });

  const { data } = useAlloyedMetalTotal({ searchCriteria });

  return (
    <div className="alloyed-metals">
      <SubHeader title="Alloyed metals" description="List of alloyed metals used in production">
        <Flex gap={16} align="center">
          <Flex vertical align="flex-end">
            <Typography.Text className="alloyed-metals-total-value">
              Total cost:
              <span> ${moneyFormatter(data?.totalCost, 2)}</span>
            </Typography.Text>
          </Flex>

          <MetalSelect
            allowClear
            onChange={(metalId) => setSearchCriteria({ metalIds: [metalId] })}
            onClear={() => queueMicrotask(() => setSearchCriteria({}))}
          />

          <CreateAlloyedMetalButton />
        </Flex>
      </SubHeader>

      <Flex vertical className="scroll-container">
        <Row gutter={[8, 8]} style={{ width: "100%", margin: 0 }}>
          <InfiniteList
            queryResult={infiniteAlloyedMetalsQueryResult}
            renderItem={(alloyedMetal) => (
              <Col span={8} key={alloyedMetal.id}>
                <AlloyedMetalCard alloyedMetal={alloyedMetal} />
              </Col>
            )}
            empty={<NoData description={"No alloyed metals found"} />}
          />
        </Row>
      </Flex>
    </div>
  );
};

export default AlloyedMetals;
