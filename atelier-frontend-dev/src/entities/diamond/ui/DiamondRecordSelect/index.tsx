import { FC, UIEvent, useState } from "react";
import useDebounce from "@shared/hooks/useDebounce.ts";
import Select, { SelectProps } from "antd/es/select";
import useInfiniteDiamondRecords from "@entities/diamond/hooks/useInfiniteDiamondRecords.ts";
import { DiamondRecord } from "@entities/diamond/models/diamond-record.model.ts";
import { SearchDiamondRecordDto } from "@entities/diamond/dto/search-diamond-record.dto.ts";

interface Props extends SelectProps {
  searchConfig?: Pick<SearchDiamondRecordDto, "searchCriteria">;
}

const DiamondRecordSelect: FC<Props> = ({ onChange, searchConfig, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");

  const debouncedValue = useDebounce(searchString);

  const { data, fetchNextPage } = useInfiniteDiamondRecords({
    searchCriteria: {
      ...searchConfig?.searchCriteria,
      searchInput: debouncedValue,
    },
  });

  const options = data?.pages.flatMap((page) => page.content) || [];

  const handlePopupScroll = (e: UIEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
      void fetchNextPage();
    }
  };

  const handleChange = (id: number, option: DiamondRecord) => {
    onChange?.(id, option);
  };

  return (
    <Select
      size="large"
      showSearch
      placeholder="Choose diamond record"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={(id, option) => handleChange(id, option as DiamondRecord)}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}
      options={options}
      fieldNames={{ label: "parcelName", value: "id" }}
      {...rest}
    />
  );
};

export default DiamondRecordSelect;
