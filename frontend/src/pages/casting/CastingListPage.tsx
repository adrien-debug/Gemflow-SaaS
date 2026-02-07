import Flex from "antd/es/flex";
import CastingTable from "@features/casting/casting-table/ui/CastingTable";
import Button from "antd/es/button";
import ActionBar from "@shared/ui/ActionBar";
import PageHero from "@shared/ui/PageHero";
import { useNavigate } from "react-router";
import { FireOutlined } from "@ant-design/icons";

const CastingListPage = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
      <PageHero
        icon={<FireOutlined />}
        badge="Production"
        title="Casting"
        subtitle="Manage casting cylinders, track batches and monitor the casting workflow"
      />
      <ActionBar title="Casting">
        <Button size="large" type="primary" onClick={() => navigate("/casting/create")}>
          Create cylinder
        </Button>
      </ActionBar>

      <CastingTable />
    </Flex>
  );
};

export default CastingListPage;
