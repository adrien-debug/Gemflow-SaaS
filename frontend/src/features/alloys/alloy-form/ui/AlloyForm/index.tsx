import { Alloy } from "@entities/alloy/models/alloy.model.ts";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import { AlloyFormSchema } from "../../model/alloy-form.schema";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form, { FormProps } from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export interface AlloyFormRef {
  submit: () => void;
}

interface Props extends FormProps {
  alloy?: Alloy;
}

const AlloyForm = ({ alloy, ...rest }: Props, ref: ForwardedRef<AlloyFormRef>) => {
  const [form] = useForm<AlloyFormSchema>();

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  return (
    <Form<AlloyFormSchema> form={form} layout="vertical" requiredMark={false} {...rest}>
      <FormItem
        name="metalId"
        label="Metal"
        initialValue={alloy?.metal.id}
        rules={[FormRule.Required("Please, select metal")]}>
        <MetalSelect disabled={!!alloy?.metal.id} />
      </FormItem>

      <FormItem
        name="name"
        label="Name"
        initialValue={alloy?.name}
        rules={[FormRule.Required("Please, enter alloy name")]}>
        <Input size="large" maxLength={256} placeholder="Enter alloy name" />
      </FormItem>
    </Form>
  );
};

export default forwardRef<AlloyFormRef, Props>(AlloyForm);
