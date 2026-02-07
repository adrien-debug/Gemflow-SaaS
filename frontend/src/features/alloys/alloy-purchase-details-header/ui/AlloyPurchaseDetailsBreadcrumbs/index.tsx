import { RightOutlined } from "@ant-design/icons";
import Breadcrumb from "antd/es/breadcrumb/Breadcrumb";
import { Link } from "react-router";
import { FC } from "react";
import Skeleton from "antd/es/skeleton";
import { Alloy } from "@entities/alloy/models/alloy.model.ts";

interface Props {
  alloy?: Alloy;
  purchaseId?: number;
  loading: boolean;
}

const AlloyPurchaseDetailsBreadcrumbs: FC<Props> = ({ alloy, purchaseId, loading }) => (
  <Breadcrumb
    items={[
      {
        title: <Link to="/metals?tab=ALLOYS">Alloys</Link>,
        key: "metals",
      },
      {
        title: loading ? (
          <Skeleton.Input active size="small" />
        ) : (
          <Link to={`/metals/alloys/${alloy?.id}`}>{alloy?.name}</Link>
        ),
        key: "alloys",
      },
      {
        title: loading ? <Skeleton.Input active size="small" /> : `Purchase #${alloy?.id}-${purchaseId}`,
        key: "purchase",
      },
    ]}
    separator={<RightOutlined />}
  />
);

export default AlloyPurchaseDetailsBreadcrumbs;
