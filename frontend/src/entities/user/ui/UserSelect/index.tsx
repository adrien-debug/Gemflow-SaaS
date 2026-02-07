import { FC, UIEvent, useState } from "react";
import useDebounce from "@shared/hooks/useDebounce.ts";
import Select, { SelectProps } from "antd/es/select";
import useInfiniteUsers from "@entities/user/hooks/useInfiniteUsers.ts";

interface Props extends SelectProps {}

const UserSelect: FC<Props> = ({ onChange, ...rest }: Props) => {
  const [searchString, handleSearch] = useState<string>("");

  const debouncedValue = useDebounce(searchString);

  const { data, fetchNextPage } = useInfiniteUsers({
    searchCriteria: {
      searchInput: debouncedValue,
      isActive: true,
    },
  });

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
      size="large"
      showSearch
      placeholder="Choose user"
      onPopupScroll={handlePopupScroll}
      filterOption={false}
      onSearch={handleSearch}
      onChange={handleChange}
      popupMatchSelectWidth={false}
      dropdownStyle={{
        width: 265,
      }}
      {...rest}>
      {options.map((user) => (
        <Select.Option key={user.id} value={user.id} data={user}>
          {user.id} · {user.fullName}
        </Select.Option>
      ))}
    </Select>
  );
};

export default UserSelect;
