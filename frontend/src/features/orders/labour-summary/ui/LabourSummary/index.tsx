import "./styles.scss";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Spin from "antd/es/spin";
import Flex from "antd/es/flex";
import Empty from "antd/es/empty";
import Typography from "antd/es/typography";
import DataDisplay from "@shared/ui/DataDisplay";
import { useLaboursSummary } from "@entities/order/hooks/useLaboursSummary.ts";
import { TaskTypeNameMap } from "@entities/task/constants/task-type.enum.ts";
import { TaskTypeSummaries } from "@entities/task/models/task-type-summaries.model.ts";
import { FC, Fragment, useMemo } from "react";
import { moneyFormatter } from "@shared/utils/formatter.ts";
import { getMinutesAndSecondsFromTotalSeconds } from "@shared/utils/time-converter.ts";

interface Props {
  orderId: number;
}

const LabourSummary: FC<Props> = ({ orderId }) => {
  const { data, isPending } = useLaboursSummary(orderId);

  const { minutes, seconds } = useMemo(() => {
    if (data) {
      return getMinutesAndSecondsFromTotalSeconds(data?.totalSpentSeconds);
    }
    return { minutes: 0, seconds: 0 };
  }, [data]);

  return (
    <div className="labour-summary-container">
      <Typography.Title className="title" level={4}>
        Summary
      </Typography.Title>

      <Row gutter={16} className="table-head">
        <Col span={8} />
        <Col span={8} className="centralize-item">
          Time
        </Col>
        <Col span={8} className="centralize-item">
          Cost
        </Col>
      </Row>

      {isPending ? (
        <Flex className="" justify="center" align="center">
          <Spin />
        </Flex>
      ) : (
        <>
          {data?.taskTypeSummaries.length ? (
            <>
              <Row gutter={[16, 16]}>
                {data?.taskTypeSummaries.map((task: TaskTypeSummaries) => {
                  const taskTime = getMinutesAndSecondsFromTotalSeconds(task?.totalSpentSeconds);
                  return (
                    <Fragment key={task.taskType}>
                      <Col span={8} className="centralize-label">
                        {TaskTypeNameMap[task.taskType]}
                      </Col>
                      <Col span={8} className="centralize-item">
                        <DataDisplay>
                          {taskTime.minutes}’ {taskTime.seconds}’’
                        </DataDisplay>
                      </Col>
                      <Col span={8} className="centralize-item">
                        <DataDisplay>${moneyFormatter(task.totalCost, 2)}</DataDisplay>
                      </Col>
                    </Fragment>
                  );
                })}
              </Row>

              <Row gutter={16}>
                <Col span={8} className="centralize-label">
                  <Typography.Title level={5}>Total</Typography.Title>
                </Col>
                <Col span={8} className="centralize-item">
                  <Typography.Title level={4}>
                    {minutes}’ {seconds}’’
                  </Typography.Title>
                </Col>
                <Col span={8} className="centralize-item">
                  <Typography.Title level={4}>${moneyFormatter(data?.totalCost)}</Typography.Title>
                </Col>
              </Row>
            </>
          ) : (
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          )}
        </>
      )}
    </div>
  );
};

export default LabourSummary;
