import { useParams } from "react-router";
import Flex from "antd/es/flex";
import UserHeader from "@features/users/user-header/ui/UserHeader";
import TimeTrackerForm from "@features/time-tracker/ui/TimeTrackerForm";

const TimeTracker = () => {
  const { id: orderId } = useParams();
  console.log(orderId);

  return (
    <Flex vertical style={{ minHeight: "100dvh" }}>
      <UserHeader />

      <Flex vertical style={{ paddingLeft: 24, paddingRight: 24 }} flex={1}>
        <TimeTrackerForm orderId={+orderId!} />
      </Flex>
    </Flex>
  );
};

export default TimeTracker;
