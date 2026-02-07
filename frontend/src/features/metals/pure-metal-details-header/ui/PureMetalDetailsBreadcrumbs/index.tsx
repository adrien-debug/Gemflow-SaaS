import { RightOutlined } from "@ant-design/icons";
import Breadcrumb from "antd/es/breadcrumb";
import { FC } from "react";
import { Link } from "react-router";

interface Props {
  title?: string;
}

const PureMetalDetailsBreadcrumbs: FC<Props> = ({ title }) => {
  return (
    <Breadcrumb
      separator={<RightOutlined />}
      items={[
        {
          title: <Link to="/metals">Metals</Link>,
          key: "metals",
        },
        {
          title: title,
          key: "pure-metal",
        },
      ]}
    />
  );
};

export default PureMetalDetailsBreadcrumbs;
