import { useInfiniteClients } from "@entities/client/hooks/useInfiniteClients.ts";
import useDebounce from "@shared/hooks/useDebounce.ts";
import { FC, UIEvent, useState } from "react";
import Select, { SelectProps } from "antd/es/select";

interface Props extends SelectProps {}

const ClientSelect: FC<Props> = ({ onChange, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");

  const debouncedValue = useDebounce(searchString);

  const { data, fetchNextPage } = useInfiniteClients(debouncedValue);

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

  if (!data) return <Select size="large" placeholder="Choose client" loading disabled />;

  return (
    <Select
      {...rest}
      size="large"
      showSearch
      placeholder="Choose client"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      popupMatchSelectWidth={false}
      optionLabelProp="children"
      dropdownStyle={{
        width: 265,
      }}>
      {options.map((client) => (
        <Select.Option key={client.id} value={client.id}>
          {client.id} · {client.name}
        </Select.Option>
      ))}
    </Select>
  );
};

export default ClientSelect;
