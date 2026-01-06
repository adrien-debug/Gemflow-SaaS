import Flex from "antd/es/flex";
import GemstonesHeader from "@features/gemstones/gemstones-header/ui/GemstonesHeader.tsx";
import GemstonesTable from "@features/gemstones/gemstone-table/ui/GemstonesTable";
import { useState } from "react";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto";

const GemstoneListPage = () => {
  const [paginationConfiguration, setPaginationConfiguration] = useState<SearchGemstoneDto>({
    page: 1,
    size: 10,
    searchCriteria: {},
  });

  const onSearch = (value: string) => {
    setPaginationConfiguration((prev) => ({
      ...prev,
      page: 1,
      searchCriteria: {
        ...prev.searchCriteria,
        searchInput: value,
      },
    }));
  };

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <GemstonesHeader onSearch={onSearch} />
      <GemstonesTable
        paginationConfiguration={paginationConfiguration}
        setPaginationConfiguration={setPaginationConfiguration}
      />
    </Flex>
  );
};

export default GemstoneListPage;
