import { useEffect } from "react";
import Modal from "antd/es/modal";
import Form from "antd/es/form";
import Input from "antd/es/input";
import message from "antd/es/message";
import { CrmContact } from "@entities/crm-contact/models/crm-contact.model";
import { CrmContactDto } from "@entities/crm-contact/dto/crm-contact.dto";
import useCreateCrmContact from "@entities/crm-contact/hooks/useCreateCrmContact";
import useUpdateCrmContact from "@entities/crm-contact/hooks/useUpdateCrmContact";

interface ContactFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  contact?: CrmContact;
}

const ContactFormModal = ({ isOpen, onClose, contact }: ContactFormModalProps) => {
  const [form] = Form.useForm<CrmContactDto>();
  const createMutation = useCreateCrmContact();
  const updateMutation = useUpdateCrmContact();

  const isEditing = !!contact;

  useEffect(() => {
    if (isOpen && contact) {
      form.setFieldsValue({
        email: contact.email,
        firstName: contact.firstName,
        lastName: contact.lastName,
        phone: contact.phone,
        company: contact.company,
        notes: contact.notes,
        tags: contact.tags,
      });
    } else if (isOpen) {
      form.resetFields();
    }
  }, [isOpen, contact, form]);

  const handleSubmit = async () => {
    try {
      const values = await form.validateFields();
      if (isEditing) {
        await updateMutation.mutateAsync({ contactId: contact.id, dto: values });
        message.success("Contact updated successfully");
      } else {
        await createMutation.mutateAsync(values);
        message.success("Contact created successfully");
      }
      onClose();
    } catch (error) {
      console.error("Failed to save contact:", error);
    }
  };

  return (
    <Modal
      title={isEditing ? "Edit Contact" : "Add Contact"}
      open={isOpen}
      onCancel={onClose}
      onOk={handleSubmit}
      okText={isEditing ? "Update" : "Create"}
      confirmLoading={createMutation.isPending || updateMutation.isPending}
      destroyOnHidden
    >
      <Form form={form} layout="vertical">
        <Form.Item
          name="email"
          label="Email"
          rules={[
            { required: true, message: "Email is required" },
            { type: "email", message: "Please enter a valid email" },
          ]}
        >
          <Input placeholder="email@example.com" />
        </Form.Item>

        <Form.Item name="firstName" label="First Name">
          <Input placeholder="John" />
        </Form.Item>

        <Form.Item name="lastName" label="Last Name">
          <Input placeholder="Doe" />
        </Form.Item>

        <Form.Item name="phone" label="Phone">
          <Input placeholder="+1 234 567 890" />
        </Form.Item>

        <Form.Item name="company" label="Company">
          <Input placeholder="Company name" />
        </Form.Item>

        <Form.Item name="tags" label="Tags">
          <Input placeholder="vip, premium" />
        </Form.Item>

        <Form.Item name="notes" label="Notes">
          <Input.TextArea rows={3} placeholder="Additional notes..." />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ContactFormModal;

