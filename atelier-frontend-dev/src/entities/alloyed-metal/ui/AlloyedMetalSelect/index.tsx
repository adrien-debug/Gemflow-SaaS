import { SearchAlloyedMetalsDto } from "@entities/alloyed-metal/dto/search-alloyed-metals.dto.ts";
import { useInfiniteAlloyedMetals } from "@entities/alloyed-metal/hooks/useInfiniteAlloyedMetals.ts";
import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import useDebounce from "@shared/hooks/useDebounce.ts";
import TagRender from "@shared/ui/select/components/TagRender.tsx";
import { FC, UIEvent, useState } from "react";
import Select, { SelectProps, DefaultOptionType } from "antd/es/select";

interface Props extends SelectProps {
  searchConfig?: Pick<SearchAlloyedMetalsDto, "searchCriteria">;
}

const AlloyedMetalSelect: FC<Props> = ({ onChange, searchConfig, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");
  const debouncedValue = useDebounce(searchString);
  const { data, fetchNextPage } = useInfiniteAlloyedMetals({
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
    onChange?.(id, option?.data as AlloyedMetal);
  };

  if (!data) return <Select size="large" placeholder={rest.placeholder || "Choose alloys"} loading disabled />;

  return (
    <Select
      size="large"
      showSearch
      tagRender={TagRender}
      placeholder="Choose alloyed metal"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={(id, option) => handleChange(id, option as never)}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}
      {...rest}>
      {options.map((alloyedMetal) => (
        <Select.Option key={alloyedMetal.id} value={alloyedMetal.id} data={alloyedMetal}>
          {alloyedMetal.id} · {alloyedMetal.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default AlloyedMetalSelect;
