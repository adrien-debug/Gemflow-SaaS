import ActionBar from "@shared/ui/ActionBar";
import PageHero from "@shared/ui/PageHero";
import Flex from "antd/es/flex";
import PreCastingList from "@features/pre-casting/pre-casting-list/ui/PreCastingList";
import { ExperimentOutlined } from "@ant-design/icons";
import "./styles.scss";

const PreCasting = () => {
  return (
    <Flex vertical className="pre-casting">
      <PageHero
        icon={<ExperimentOutlined />}
        badge="Pre-Production"
        title="Pre Casting"
        subtitle="Prepare and review items before the casting process begins"
      />
      <ActionBar title="Pre casting" />

      <PreCastingList />
    </Flex>
  );
};

export default PreCasting;
