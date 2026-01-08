import Form, { FormInstance } from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import UserSelect from "@entities/user/ui/UserSelect";
import { TaskTypeSelect } from "@entities/task/ui/TaskTypeSelect";
import InputNumber from "antd/es/input-number";
import DatePicker from "antd/es/date-picker";
import { DateFormat } from "@shared/constants/date-format.ts";
import { LogWorkFormSchema } from "@features/orders/labour-log-work-form/models/log-work-form.model.ts";
import { FC, useEffect } from "react";
import dayjs from "dayjs";
import { LabourListItem } from "@entities/order/models/labour-list-item.model.ts";
import { convertLabourLogWorkToFormModel } from "@features/orders/labour-log-work-form/utils/labour-log-work-form-converter.ts";
import Row from "antd/es/row";
import Col from "antd/es/col";

interface Props {
  form: FormInstance<LogWorkFormSchema>;
  onFinish: (values: LogWorkFormSchema) => void;
  labour?: LabourListItem;
}

const LabourLogWorkForm: FC<Props> = ({ form, onFinish, labour }) => {
  useEffect(() => {
    if (labour) {
      form.setFieldsValue(convertLabourLogWorkToFormModel(labour));
    }
  }, [labour]);

  return (
    <Form form={form} layout="vertical" requiredMark={false} onFinish={onFinish}>
      <Form.Item
        validateTrigger="onBlur"
        name="employeeId"
        label="Employee"
        rules={[FormRule.Required("Please, select employee")]}>
        <UserSelect placeholder="Choose employee" />
      </Form.Item>
      <Form.Item
        validateTrigger="onBlur"
        name="taskType"
        label="Task type"
        rules={[FormRule.Required("Please, select task type")]}>
        <TaskTypeSelect />
      </Form.Item>
      <Row gutter={16}>
        <Col span={12}>
          <Form.Item
            validateTrigger="onBlur"
            name="spentMinutes"
            label="Time spent, min"
            rules={[FormRule.Required("Please, enter time spent")]}>
            <InputNumber
              id="labour-time-spent"
              style={{ width: "100%" }}
              max={9999}
              min={0}
              step={1}
              precision={0}
              placeholder="Enter time, min"
              size="large"
            />
          </Form.Item>
        </Col>

        <Col span={12}>
          <Form.Item validateTrigger="onBlur" name="spentSeconds" label="Time spent, sec">
            <InputNumber
              id="labour-time-spent"
              style={{ width: "100%" }}
              max={60}
              min={0}
              step={1}
              precision={0}
              placeholder="Enter time, sec"
              size="large"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item initialValue={dayjs()} label="Date" name="date">
        <DatePicker
          id="labour-date"
          style={{ width: "100%" }}
          format={DateFormat.LiteralMontDayYear}
          placeholder="Choose date"
          size="large"
          allowClear={false}
        />
      </Form.Item>
    </Form>
  );
};

export default LabourLogWorkForm;
