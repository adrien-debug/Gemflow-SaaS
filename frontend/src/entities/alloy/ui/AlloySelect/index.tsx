import { SearchAlloysDto } from "@entities/alloy/dto/search-alloys.dto.ts";
import { useInfiniteAlloys } from "@entities/alloy/hooks/useInfiniteAlloys.ts";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import useDebounce from "@shared/hooks/useDebounce.ts";
import TagRender from "@shared/ui/select/components/TagRender.tsx";
import { FC, UIEvent, useState } from "react";
import Select, { SelectProps, DefaultOptionType } from "antd/es/select";

interface Props extends SelectProps {
  searchConfig?: Pick<SearchAlloysDto, "searchCriteria">;
}

const AlloySelect: FC<Props> = ({ onChange, searchConfig, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");
  const debouncedValue = useDebounce(searchString);
  const { data, fetchNextPage } = useInfiniteAlloys({
    ...searchConfig?.searchCriteria,
    searchInput: debouncedValue,
  });

  const options = data?.pages.flatMap((page) => page.content) || [];

  const handlePopupScroll = (e: UIEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
      void fetchNextPage();
    }
  };

  const handleChange = (id: number, option: DefaultOptionType) => {
    onChange?.(id, option?.data as Alloy);
  };

  if (!data) return <Select size="large" placeholder={rest.placeholder || "Choose alloys"} loading disabled />;

  return (
    <Select
      size="large"
      showSearch
      tagRender={TagRender}
      placeholder="Choose alloy"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={(id, option) => handleChange(id, option as never)}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}
      {...rest}>
      {options.map((alloy) => (
        <Select.Option key={alloy.id} value={alloy.id} data={alloy}>
          {alloy.id} · {alloy.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default AlloySelect;
