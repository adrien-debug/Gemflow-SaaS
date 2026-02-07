import { RightOutlined } from "@ant-design/icons";
import { useAlloy } from "@entities/alloy/hooks/useAlloy.ts";
import Breadcrumb from "antd/es/breadcrumb";
import { Link, useParams } from "react-router";
import { getShortString } from "@shared/utils/get-short-string.ts";

const AlloyDetailsBreadcrumbs = () => {
  const { id } = useParams();
  const { data: alloy, isLoading } = useAlloy(Number(id));

  if (isLoading || !alloy) return null;

  return (
    <Breadcrumb
      items={[
        {
          title: <Link to="/metals?tab=ALLOYS">Alloys</Link>,
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

export default AlloyDetailsBreadcrumbs;
