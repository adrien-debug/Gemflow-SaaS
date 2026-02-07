import useDebounce from "@shared/hooks/useDebounce.ts";
import { FC, UIEvent, useState } from "react";
import Select, { SelectProps } from "antd/es/select";
import useInfiniteSuppliers from "@entities/supplier/hooks/useInfiniteSuppliers.ts";

interface Props extends SelectProps {
  supplyTypeIds?: number[];
}

const SupplierSelect: FC<Props> = ({ onChange, supplyTypeIds = [], ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");

  const debouncedValue = useDebounce(searchString);

  const { data, fetchNextPage } = useInfiniteSuppliers(debouncedValue, supplyTypeIds);

  const options = data?.pages.flatMap((page) => page.content) || [];

  const handlePopupScroll = (e: UIEvent<HTMLDivElement>) => {
    const { currentTarget } = e;
    if (currentTarget.scrollTop + currentTarget.clientHeight >= currentTarget.scrollHeight) {
      void fetchNextPage();
    }
  };

  const handleChange = (id: number) => {
    onChange?.(id);
  };

  return (
    <Select
      {...rest}
      size="large"
      placeholder="Choose supplier"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      popupMatchSelectWidth={false}
      showSearch
      dropdownStyle={{
        width: 265,
      }}>
      {options.map((supplier) => (
        <Select.Option key={supplier.id} value={supplier.id}>
          {supplier.id} · {supplier.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default SupplierSelect;
