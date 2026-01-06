import ActionBar from "@shared/ui/ActionBar";
import DebouncedInput from "@shared/ui/DebouncedInput";
import { SearchOutlined } from "@ant-design/icons";
import { FC } from "react";

interface Props {
  onSearch: (value: string) => void;
}

const StockHeader: FC<Props> = ({ onSearch }) => {
  return (
    <ActionBar title="Stock">
      <DebouncedInput
        radius={40}
        placeholder="Search"
        size="large"
        addonAfter={<SearchOutlined />}
        onValueChange={onSearch}
      />
    </ActionBar>
  );
};

export default StockHeader;
