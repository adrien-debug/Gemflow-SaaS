import "./styles.scss";
import { FC, useContext, useEffect, useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import NarrowFormSpaced from "@shared/ui/NarrowFormSpaced";
import { LabourContext } from "@features/settings/labour/context/LabourContext.tsx";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { LabourSetting } from "@entities/labour-setting/models/labour-setting.model.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";

type FormValues = Omit<LabourSetting, "hourlyRate">;

const SettingCost: FC = () => {
  const [editing, setEditing] = useState(false);

  const { labour, saveSettingCost } = useContext(LabourContext);

  const [form] = Form.useForm<FormValues>();

  const { messageApi } = useMessage();

  const [saving, setSaving] = useState<boolean>(false);

  useEffect(() => {
    form.setFieldsValue({ ...labour });
  }, [form, labour]);

  const onSubmit = async (values: FormValues) => {
    try {
      setSaving(true);
      await saveSettingCost({ ...labour, ...values } as LabourSetting);
      messageApi.success("Setting cost saved successfully");
      setEditing(false);
    } catch {
      messageApi.success("Failed to save setting cost");
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
    <div className="widget-setting-cost">
      <EditFormController
        title="Setting cost"
        description="Specify cost of stone installation depending on setting type (per one stone)"
        editing={editing}
        onEdit={() => setEditing(true)}
        onCancel={() => onCancel()}
        onSave={() => form.submit()}
        loading={saving}
        id="setting-cost"
      />

      <NarrowFormSpaced>
        <Form
          requiredMark={false}
          onFinish={onSubmit}
          className="setting-cost-form"
          colon={false}
          disabled={!editing}
          form={form}>
          <Form.Item<FormValues>
            name="cutDownPaveCost"
            label="Cut-down pavé"
            rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="pave-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>

          <Form.Item<FormValues> name="clawCost" label="Claw" rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="claw-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>

          <Form.Item<FormValues> name="centerCost" label="Center" rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="center-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>

          <Form.Item<FormValues>
            name="shoulderCost"
            label="Shoulder"
            rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="shoulder-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>

          <Form.Item<FormValues> name="ruboverCost" label="Rubover" rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="rubover-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>

          <Form.Item<FormValues> name="channelCost" label="Channel" rules={[FormRule.Required(), FormRule.Currency()]}>
            <InputNumber id="channel-cost" prefix="$" suffix="USD" precision={2} />
          </Form.Item>
        </Form>
      </NarrowFormSpaced>
    </div>
  );
};

export default SettingCost;
