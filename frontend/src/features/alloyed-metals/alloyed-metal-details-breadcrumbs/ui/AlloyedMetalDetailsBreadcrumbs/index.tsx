import { RightOutlined } from "@ant-design/icons";
import { useAlloyedMetal } from "@entities/alloyed-metal/hooks/useAlloyedMetal.ts";
import Breadcrumb from "antd/es/breadcrumb";
import { Link, useParams } from "react-router";
import { getShortString } from "@shared/utils/get-short-string.ts";

const AlloyedMetalsDetailsBreadcrumbs = () => {
  const { id } = useParams();
  const { data: alloy, isLoading } = useAlloyedMetal(Number(id));

  if (isLoading || !alloy) return null;

  return (
    <Breadcrumb
      items={[
        {
          title: <Link to="/metals?tab=ALLOYED_METALS">Alloyed Metals</Link>,
          key: "metals",
        },
        {
          title: getShortString(alloy?.name, 36),
          key: "alloy",
        },
      ]}
      separator={<RightOutlined />}
    />
  );
};

export default AlloyedMetalsDetailsBreadcrumbs;
