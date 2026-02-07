import { SearchAlloysDto } from "@entities/alloy/dto/search-alloys.dto.ts";
import AlloyCard from "@features/alloys/alloy-card/ui/AlloyCard";
import CreateAlloyButton from "@features/alloys/create-alloy-button/ui/CreateAlloyButton";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import SubHeader from "@shared/ui/SubHeader";
import Col from "antd/es/col";
import Row from "antd/es/row";
import "@features/alloys/alloys/ui/Alloys/styles.scss";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import { useState } from "react";
import InfiniteList from "@shared/ui/InfiniteList";
import NoData from "@shared/ui/NoData";
import { useInfiniteAlloys } from "@entities/alloy/hooks/useInfiniteAlloys.ts";

const Alloys = () => {
  const [searchCriteria, setSearchCriteria] = useState<SearchAlloysDto["searchCriteria"]>({});

  const infiniteAlloysQueryResult = useInfiniteAlloys(searchCriteria);

  const alloys = infiniteAlloysQueryResult.data?.pages.flatMap((page) => page.content) ?? [];

  return (
    <Flex vertical className="alloys">
      <SubHeader title="Alloys" description="List of alloys used in production">
        <Flex gap={16} align="center">
          <Typography.Text className="alloy-total-value">
            Total value:
            <span>
              {" "}
              $
              {moneyFormatter(
                alloys.reduce((acc, alloy) => acc + alloy.totalCost, 0),
                2,
              )}
            </span>
          </Typography.Text>

          <MetalSelect
            allowClear
            onChange={(metalId) => setSearchCriteria({ metalIds: [metalId] })}
            onClear={() => queueMicrotask(() => setSearchCriteria({}))}
          />
          <CreateAlloyButton />
        </Flex>
      </SubHeader>

      <Flex vertical className="scroll-container">
        <Row gutter={[8, 8]} style={{ margin: 0 }}>
          <InfiniteList
            queryResult={infiniteAlloysQueryResult}
            renderItem={(alloy) => (
              <Col span={8} key={alloy.id}>
                <AlloyCard alloy={alloy} />
              </Col>
            )}
            empty={<NoData description={"No alloys found"} />}
          />
        </Row>
      </Flex>
    </Flex>
  );
};

export default Alloys;
