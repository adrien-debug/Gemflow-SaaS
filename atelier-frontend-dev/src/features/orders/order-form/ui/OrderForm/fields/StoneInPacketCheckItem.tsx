import Checkbox from "antd/es/checkbox";
import FormItem from "antd/es/form/FormItem";

const StoneInPacketCheckItem = () => {
  return (
    <FormItem style={{ margin: 0 }} name="stoneInPacket" valuePropName="checked">
      <Checkbox>Stone in packet</Checkbox>
    </FormItem>
  );
};

export default StoneInPacketCheckItem;
