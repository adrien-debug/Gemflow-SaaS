import { useInfiniteGemstones } from "@entities/gemstone/hooks/useInfiniteGemstones.ts";
import useDebounce from "@shared/hooks/useDebounce.ts";
import TagRender from "@shared/ui/select/components/TagRender.tsx";
import { FC, UIEvent, useState } from "react";
import Select, { SelectProps, DefaultOptionType } from "antd/es/select";
import { Gemstone } from "@entities/gemstone/models/gemstone.model.ts";
import { SearchGemstoneDto } from "@entities/gemstone/dto/search-gemstone.dto";

interface Props extends SelectProps {
  searchConfig?: Pick<SearchGemstoneDto, "searchCriteria">;
}

const GemstoneSelect: FC<Props> = ({ onChange, searchConfig, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");

  const debouncedValue = useDebounce(searchString);

  const { data, fetchNextPage } = useInfiniteGemstones({
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

  const handleChange = (id: number, option: DefaultOptionType) => {
    onChange?.(id, option?.data as Gemstone);
  };

  if (!data) return <Select size="large" placeholder={rest.placeholder || "Choose gemstones"} loading disabled />;

  return (
    <Select
      size="large"
      showSearch
      mode="multiple"
      tagRender={TagRender}
      placeholder="Choose gemstones"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={(id, option) => handleChange(id, option as never)}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}
      {...rest}>
      {options.map((gemstone) => (
        <Select.Option key={gemstone.id} value={gemstone.id} data={gemstone}>
          {gemstone.id} · {gemstone.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default GemstoneSelect;
