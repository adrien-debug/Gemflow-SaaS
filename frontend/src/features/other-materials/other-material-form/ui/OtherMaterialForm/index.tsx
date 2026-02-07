import { OtherMaterial } from "@entities/other-material/model/other-material.model";
import { OtherMaterialFormSchema } from "@features/other-materials/other-material-form/models/other-material-form.schema.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import Form, { FormProps } from "antd/es/form";
import { useForm } from "antd/es/form/Form";
import FormItem from "antd/es/form/FormItem";
import Input from "antd/es/input";
import { ForwardedRef, forwardRef, useImperativeHandle } from "react";

export interface OtherMaterialFormRef {
  submit: () => void;
}

interface Props extends FormProps {
  otherMaterial?: OtherMaterial;
}

const OtherMaterialForm = ({ otherMaterial, ...rest }: Props, ref: ForwardedRef<OtherMaterialFormRef>) => {
  const [form] = useForm<OtherMaterialFormSchema>();

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  return (
    <Form<OtherMaterialFormSchema> form={form} layout="vertical" requiredMark={false} {...rest}>
      <FormItem
        name="name"
        label="Name"
        rules={[FormRule.Required("Please, enter material name")]}
        initialValue={otherMaterial?.name}>
        <Input maxLength={256} size="large" placeholder="Enter material name" />
      </FormItem>
    </Form>
  );
};

export default forwardRef<OtherMaterialFormRef, Props>(OtherMaterialForm);
