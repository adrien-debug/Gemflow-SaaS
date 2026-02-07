import ActionBar from "@shared/ui/ActionBar";
import Button from "antd/es/button";
import { useNavigate } from "react-router";
import DebouncedInput from "@shared/ui/DebouncedInput";
import { SearchOutlined } from "@ant-design/icons";
import { FC } from "react";

interface Props {
  onSearch: (value: string) => void;
}

const GemstonesHeader: FC<Props> = ({ onSearch }) => {
  const navigate = useNavigate();
  return (
    <ActionBar title="Gemstones">
      <DebouncedInput
        radius={40}
        placeholder="Search"
        size="large"
        addonAfter={<SearchOutlined />}
        onValueChange={onSearch}
      />
      <Button size="large" type="primary" onClick={() => navigate("/gemstones/create")}>
        Add gemstone
      </Button>
    </ActionBar>
  );
};

export default GemstonesHeader;
