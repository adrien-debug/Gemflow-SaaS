import SubHeader from "@shared/ui/SubHeader";
import Row from "antd/es/row";
import Flex from "antd/es/flex";
import Col from "antd/es/col";
import NoData from "@shared/ui/NoData";
import InfiniteList from "@shared/ui/InfiniteList";
import AddOtherMaterialButton from "@features/other-materials/add-other-material-button/ui/AddOtherMaterialButton";
import OtherMaterialCard from "@features/other-materials/other-material-card/ui/OtherMaterialCard";
import "./styles.scss";
import useInfiniteOtherMaterials from "@entities/other-material/hooks/useInfiniteOtherMaterials.ts";

const OtherMaterials = () => {
  const otherMaterialsQueryResult = useInfiniteOtherMaterials();

  return (
    <Flex vertical className="other-materials">
      <Flex align="center" justify="space-between">
        <SubHeader title="Other materials" description="Other materials used for jewelry production" />

        <AddOtherMaterialButton />
      </Flex>

      <Flex vertical className="scroll-container">
        <Row gutter={[8, 8]} style={{ margin: 0 }}>
          <InfiniteList
            queryResult={otherMaterialsQueryResult}
            renderItem={(item) => (
              <Col span={8} key={item.id}>
                <OtherMaterialCard otherMaterial={item} />
              </Col>
            )}
            empty={<NoData description={"No materials found"} />}
          />
        </Row>
      </Flex>
    </Flex>
  );
};

export default OtherMaterials;
