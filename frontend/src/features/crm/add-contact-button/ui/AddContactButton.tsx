import { useState } from "react";
import Button from "antd/es/button";
import { PlusOutlined } from "@ant-design/icons";
import ContactFormModal from "@features/crm/contact-form/ui/ContactFormModal";

const AddContactButton = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <Button type="primary" icon={<PlusOutlined />} onClick={() => setIsOpen(true)}>
        Add Contact
      </Button>
      <ContactFormModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
};

export default AddContactButton;

