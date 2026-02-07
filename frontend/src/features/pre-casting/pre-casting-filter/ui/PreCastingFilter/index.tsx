import CylinderSelect from "@entities/cylinder/ui/CylinderSelect";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import { TaskStatus } from "@entities/task/constants/task-status.ts";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import { useForm, useWatch } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Segmented from "antd/es/segmented";
import { FC, useEffect } from "react";
import "./styles.scss";
import { PreCastingFilterSchema } from "@features/pre-casting/pre-casting-filter/models/pre-casting-filter.schema.ts";

interface Props {
  onChange: (values: PreCastingFilterSchema) => void;
}

const PreCastingFilter: FC<Props> = ({ onChange }) => {
  const [form] = useForm();
  const status = useWatch("statuses", form);

  const handleChange = () => {
    const values = form.getFieldsValue();
    onChange({
      statuses: values.statuses ? [values.statuses] : undefined,
      metalIds: values.metalIds ? [values.metalIds] : undefined,
      cylinderIds: values.cylinderIds ? [values.cylinderIds] : undefined,
    });
  };

  useEffect(() => {
    handleChange();
  }, []);

  return (
    <section className="casting-filter">
      <Form form={form} requiredMark={false} onFieldsChange={handleChange}>
        <Flex justify="space-between" gap={16}>
          <FormItem name="statuses" initialValue={TaskStatus.ReadyToCasting}>
            <Segmented
              size="large"
              shape="round"
              options={[
                { label: "Ready to Casting", value: TaskStatus.ReadyToCasting },
                {
                  label: "In Cylinder",
                  value: TaskStatus.InCylinder,
                },
              ]}
            />
          </FormItem>

          <Flex gap={12}>
            <FormItem name="metalIds">
              <MetalSelect style={{ minWidth: 200 }} allowClear />
            </FormItem>

            {status === TaskStatus.InCylinder && (
              <FormItem name="cylinderIds">
                <CylinderSelect style={{ minWidth: 200 }} allowClear />
              </FormItem>
            )}
          </Flex>
        </Flex>
      </Form>
    </section>
  );
};

export default PreCastingFilter;
