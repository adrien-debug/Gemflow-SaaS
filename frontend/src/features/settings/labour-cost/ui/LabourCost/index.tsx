import "./styles.scss";
import { FC, useContext, useEffect, useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import NarrowFormSpaced from "@shared/ui/NarrowFormSpaced";
import { LabourContext } from "@features/settings/labour/context/LabourContext.tsx";
import { LabourSetting } from "@entities/labour-setting/models/labour-setting.model.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";

type FormValues = Pick<LabourSetting, "hourlyRate">;

const LabourCost: FC = () => {
  const [editing, setEditing] = useState(false);

  const { labour, saveHourlyRate } = useContext(LabourContext);

  const [form] = Form.useForm<FormValues>();

  const { messageApi } = useMessage();

  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({ ...labour });
  }, [form, labour]);

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);
      await saveHourlyRate({ ...labour, ...values } as LabourSetting);
      messageApi.success("Hourly rate saved successfully");
      setEditing(false);
    } catch {
      messageApi.success("Failed to save hourly rate");
      onCancel();
    } finally {
      setSaving(false);
    }
  };

  const onCancel = () => {
    form.setFieldsValue({ ...labour });
    setEditing(false);
  };

  return (
    <div className="widget-labour-cost">
      <EditFormController
        title="Labour cost"
        description="Set hourly rate which will be used to caluclate labour cost in production"
        editing={editing}
        onEdit={() => setEditing(true)}
        onCancel={() => onCancel()}
        onSave={() => form.submit()}
        loading={saving}
        id="labour-cost"
      />

      <NarrowFormSpaced>
        <Form
          requiredMark={false}
          onFinish={onSubmit}
          className="labour-cost-form"
          colon={false}
          disabled={!editing}
          form={form}>
          <Form.Item<FormValues>
            name="hourlyRate"
            label="Hourly rate"
            rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="labour-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>
        </Form>
      </NarrowFormSpaced>
    </div>
  );
};

export default LabourCost;
