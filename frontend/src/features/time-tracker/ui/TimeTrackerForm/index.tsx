import "./styles.scss";
import Form from "antd/es/form";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import OrderCardSimple from "@features/orders/order-card-simple/ui/OrderCardSimple";
import { TaskTypeSelect } from "@entities/task/ui/TaskTypeSelect";
import { FC, useEffect } from "react";
import { useForm } from "antd/es/form/Form";
import Flex from "antd/es/flex";
import Button from "antd/es/button";
import PlayCircleFilled from "@ant-design/icons/lib/icons/PlayCircleFilled";
import { TimeTrackerFormSchema } from "@features/time-tracker/models/time-tracker-form-schema.model.ts";
import useTimeTracker from "@entities/time-tracker/hooks/useTimeTracker.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Stopwatch from "@shared/ui/Stopwatch";
import { PauseCircleFilled, WarningFilled } from "@ant-design/icons";
import Loading from "@shared/ui/Loading";
import {
  getElapsedSecondsForCurrentWorkType,
  isActiveForCurrentOrder,
  isTimerExist,
} from "@features/time-tracker/utils/time-tracker.util.ts";
import Alert from "antd/es/alert/Alert";
import { useNavigate } from "react-router";

interface Props {
  orderId: number;
}

const TimeTrackerForm: FC<Props> = ({ orderId }) => {
  const [form] = useForm<TimeTrackerFormSchema>();
  const {
    activeTrackerStatus: { data: trackerStatus, isPending: trackerStatusPending },
    allTrackers,
    startWorkMutation,
    stopWorkMutation,
  } = useTimeTracker(orderId);
  const navigate = useNavigate();

  const handleStartWorkClick = () => {
    form.validateFields().then(() => {
      startWorkMutation.mutate(form.getFieldValue("taskType"));
    });
  };

  const handleStopWorkClick = () => {
    stopWorkMutation.mutate();
  };

  const handleSeeActiveOrder = () => {
    navigate(`/orders/${trackerStatus?.orderId}/time-tracker`);
  };

  useEffect(() => {
    if (isActiveForCurrentOrder(trackerStatus, orderId)) {
      form.setFieldValue("taskType", trackerStatus?.taskType);
    }
  }, [trackerStatus, form, orderId]);

  if (trackerStatusPending) {
    return (
      <Flex vertical justify="center" align="center" flex={1}>
        <Loading />
      </Flex>
    );
  }

  return (
    <Form layout="vertical" form={form} requiredMark={false} className="time-tracker-form">
      <Typography.Title level={2} style={{ color: brandingColorPalette.brand6 }} className="title">
        Time tracking
      </Typography.Title>

      <OrderCardSimple orderId={+orderId!} />

      <Flex vertical justify="space-between" flex={1}>
        <Form.Item<TimeTrackerFormSchema>
          label="Work type"
          className="field-work-type"
          name="taskType"
          rules={[FormRule.Required("Please, choose work type")]}>
          <TaskTypeSelect size="large" placeholder="Choose work type" disabled={isTimerExist(trackerStatus)} />
        </Form.Item>

        <Form.Item<TimeTrackerFormSchema> noStyle dependencies={["taskType"]}>
          {({ getFieldValue }) => {
            return !isActiveForCurrentOrder(trackerStatus, orderId) && isTimerExist(trackerStatus) ? (
              <Alert
                message={
                  <Typography.Text>
                    You already have an active tracking session for another order.{" "}
                    <Typography.Link underline onClick={handleSeeActiveOrder}>
                      See order
                    </Typography.Link>
                  </Typography.Text>
                }
                type="error"
                icon={<WarningFilled />}
                showIcon
              />
            ) : (
              <Stopwatch
                totalSeconds={getElapsedSecondsForCurrentWorkType(getFieldValue("taskType"), allTrackers.data)}
                autoStart={isTimerExist(trackerStatus)}
              />
            );
          }}
        </Form.Item>

        {isActiveForCurrentOrder(trackerStatus, orderId) ? (
          <Button
            size="large"
            icon={<PauseCircleFilled />}
            type="primary"
            className="action-button"
            loading={stopWorkMutation.isPending}
            onClick={handleStopWorkClick}>
            Stop work
          </Button>
        ) : (
          <Button
            size="large"
            icon={<PlayCircleFilled />}
            type="primary"
            className="action-button"
            disabled={isTimerExist(trackerStatus)}
            loading={startWorkMutation.isPending}
            onClick={handleStartWorkClick}>
            Start work
          </Button>
        )}
      </Flex>
    </Form>
  );
};

export default TimeTrackerForm;
