import Form, { FormInstance } from "antd/es/form";
import Input from "antd/es/input";
import { FormRule } from "@shared/utils/form-validators.ts";
import Flex from "antd/es/flex";
import { FC } from "react";
import { CreateUserDto } from "@entities/user/dto/create-user.dto";
import { User } from "@entities/user/models/user.model";
import UserRolesSelector from "@entities/user-roles/ui/UserRolesSelector";

interface Props {
  onFinish: (user: CreateUserDto) => void;
  form: FormInstance<CreateUserDto>;
  user?: User;
}

const UserForm: FC<Props> = ({ onFinish, form, user }) => {
  return (
    <Form form={form} onFinish={onFinish} requiredMark={false} layout="vertical">
      <Flex gap={24}>
        <Form.Item
          validateTrigger="onBlur"
          name="firstName"
          label="First name"
          rules={[
            FormRule.Required("Please, enter first name"),
            FormRule.MinLength(3, "First name be greater than 3 characters"),
            FormRule.MaxLength(64, "First name cannot be greater than 64 characters"),
          ]}>
          <Input id="administration-page-first-name" size="large" placeholder="Enter first name" />
        </Form.Item>

        <Form.Item
          validateTrigger="onBlur"
          name="lastName"
          label="Last name"
          rules={[
            FormRule.Required("Please, enter last name"),
            FormRule.MinLength(3, "Last name be greater than 3 characters"),
            FormRule.MaxLength(64, "Last name cannot be greater than 64 characters"),
          ]}>
          <Input id="administration-page-last-name" size="large" placeholder="Enter last name" />
        </Form.Item>
      </Flex>

      <Form.Item
        validateTrigger="onBlur"
        name="email"
        label="Email"
        rules={[
          { type: "email", message: "Invalid email address" },
          { required: true, message: "Please, enter email address" },
        ]}>
        <Input id="administration-page-email" size="large" placeholder="Enter email" disabled={!!user} />
      </Form.Item>
      <Form.Item validateTrigger="onBlur" name="roleId" label="Role" rules={[FormRule.Required("Please, select role")]}>
        <UserRolesSelector />
      </Form.Item>
    </Form>
  );
};

export default UserForm;
