import Flex from "antd/es/flex";
import CastingTable from "@features/casting/casting-table/ui/CastingTable";
import Button from "antd/es/button";
import ActionBar from "@shared/ui/ActionBar";
import { useNavigate } from "react-router";

const CastingListPage = () => {
  const navigate = useNavigate();

  return (
    <Flex vertical style={{ paddingLeft: 24, paddingRight: 24, paddingBottom: 24 }}>
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
