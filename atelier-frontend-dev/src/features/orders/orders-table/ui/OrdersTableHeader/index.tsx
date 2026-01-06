import ActionBar from "@shared/ui/ActionBar";
import DebouncedInput from "@shared/ui/DebouncedInput";
import { SearchOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { useNavigate } from "react-router";
import { FC } from "react";

interface Props {
  onSearch: (value: string) => void;
}

const OrdersTableHeader: FC<Props> = ({ onSearch }) => {
  const navigate = useNavigate();

  return (
    <ActionBar title="Orders">
      <DebouncedInput
        radius={40}
        placeholder="Search"
        size="large"
        addonAfter={<SearchOutlined />}
        onValueChange={onSearch}
      />
      <Button size="large" type="primary" onClick={() => navigate("/orders/create")}>
        Create order
      </Button>
    </ActionBar>
  );
};

export default OrdersTableHeader;
