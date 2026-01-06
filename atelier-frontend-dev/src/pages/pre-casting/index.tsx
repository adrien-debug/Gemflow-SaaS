import ActionBar from "@shared/ui/ActionBar";
import Flex from "antd/es/flex";
import PreCastingList from "@features/pre-casting/pre-casting-list/ui/PreCastingList";
import "./styles.scss";

const PreCasting = () => {
  return (
    <Flex vertical className="pre-casting">
      <ActionBar title="Pre casting" />

      <PreCastingList />
    </Flex>
  );
};

export default PreCasting;
