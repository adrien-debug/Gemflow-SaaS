import { AlloyedMetal } from "@entities/alloyed-metal/models/alloyed-metal.model.ts";
import MetalPuritySelect from "@entities/metal-purity/ui/MetalPuritySelect";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import { AlloyedMetalFormSchema } from "@features/alloyed-metals/alloyed-metal-form/model/alloyed-metal-form.schema.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form, { FormProps } from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export interface AlloyedMetalFormRef {
  submit: () => void;
}

interface Props extends FormProps {
  alloyedMetal?: AlloyedMetal;
}

const AlloyedMetalForm = ({ alloyedMetal, ...rest }: Props, ref: ForwardedRef<AlloyedMetalFormRef>) => {
  const [form] = useForm<AlloyedMetalFormSchema>();

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  const handleValuesChange = (changedValues: Partial<AlloyedMetalFormSchema>) => {
    if ("metalId" in changedValues) form.resetFields(["metalPurityId"]);
  };

  return (
    <Form<AlloyedMetalFormSchema>
      form={form}
      layout="vertical"
      requiredMark={false}
      onValuesChange={handleValuesChange}
      {...rest}>
      <FormItem
        name="metalId"
        label="Metal"
        initialValue={alloyedMetal?.metal.id}
        rules={[FormRule.Required("Please, select metal")]}>
        <MetalSelect disabled={!!alloyedMetal?.metal.id} />
      </FormItem>

      <FormItem dependencies={["metalId"]} noStyle>
        {() => (
          <FormItem
            preserve={false}
            name="metalPurityId"
            label="Metal purity"
            initialValue={alloyedMetal?.metalPurity.metalPurity}
            rules={[FormRule.Required("Please, select metal purity")]}>
            <MetalPuritySelect
              metalId={alloyedMetal?.metal.id || form.getFieldValue("metalId")}
              disabled={!!alloyedMetal?.metalPurity.metalPurity && form.getFieldValue("metalId")}
            />
          </FormItem>
        )}
      </FormItem>

      <FormItem
        name="name"
        label="Name"
        initialValue={alloyedMetal?.name}
        rules={[FormRule.Required("Please, enter alloyed metal name")]}>
        <Input size="large" maxLength={256} placeholder="Enter alloyed metal name" />
      </FormItem>
    </Form>
  );
};

export default forwardRef<AlloyedMetalFormRef, Props>(AlloyedMetalForm);
