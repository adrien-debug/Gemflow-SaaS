import { RightOutlined } from "@ant-design/icons";
import Breadcrumb from "antd/es/breadcrumb";
import Skeleton from "antd/es/skeleton";
import { FC } from "react";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { Link } from "react-router";

interface Props {
  metal?: BaseItem;
  purchaseId?: number;
  loading: boolean;
}

const PureMetalsPurchaseDetailsBreadcrumbs: FC<Props> = ({ metal, purchaseId, loading }) => {
  return (
    <Breadcrumb
      items={[
        {
          title: <Link to="/metals">Metals</Link>,
          key: "metals",
        },
        {
          title: loading ? (
            <Skeleton.Input active size="small" />
          ) : (
            <Link to={`/metals/pure-metals/${metal?.id}`}>{metal?.name}</Link>
          ),
          key: "pure-metal",
        },
        {
          title: loading ? <Skeleton.Input active size="small" /> : (`Purchase #${purchaseId}` as string),
          key: "purchase",
        },
      ]}
      separator={<RightOutlined />}
    />
  );
};

export default PureMetalsPurchaseDetailsBreadcrumbs;
