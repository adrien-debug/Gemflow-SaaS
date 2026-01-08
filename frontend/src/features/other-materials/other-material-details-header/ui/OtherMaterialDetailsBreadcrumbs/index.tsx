import { RightOutlined } from "@ant-design/icons";
import Breadcrumb from "antd/es/breadcrumb";
import { FC } from "react";
import { Link } from "react-router";

interface Props {
  title?: string;
}

const OtherMaterialDetailsBreadcrumbs: FC<Props> = ({ title }) => {
  return (
    <Breadcrumb
      separator={<RightOutlined />}
      items={[
        {
          title: <Link to="/metals?tab=OTHER">Other</Link>,
          key: "metals",
        },
        {
          title: title,
          key: "material",
        },
      ]}
    />
  );
};

export default OtherMaterialDetailsBreadcrumbs;
