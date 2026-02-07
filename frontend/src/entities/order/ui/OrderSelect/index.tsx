import { FC, UIEvent, useState } from "react";
import useDebounce from "@shared/hooks/useDebounce.ts";
import Select, { SelectProps } from "antd/es/select";
import useInfiniteOrders from "@entities/order/hooks/useInfiniteOrders.ts";

interface Props extends SelectProps {}

const OrderSelect: FC<Props> = ({ onChange, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");

  const debouncedValue = useDebounce(searchString);

  const { data, fetchNextPage } = useInfiniteOrders(debouncedValue);

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
      showSearch
      placeholder="Choose order"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}>
      {options.map((order) => (
        <Select.Option key={order.id} value={order.id}>
          {order.id} · {order.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default OrderSelect;
