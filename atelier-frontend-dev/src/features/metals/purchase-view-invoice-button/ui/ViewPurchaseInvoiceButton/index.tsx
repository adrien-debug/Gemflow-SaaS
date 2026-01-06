import { FileOutlined } from "@ant-design/icons";
import Button from "antd/es/button";
import { FC } from "react";
import { FileMetadata } from "@shared/types/file-metadata.model.ts";

interface Props {
  invoice?: FileMetadata;
}

const ViewPurchaseInvoiceButton: FC<Props> = ({ invoice }) => {
  const handleClick = () => {
    window.open(invoice?.downloadUrl, "_blank");
  };

  return (
    <Button type="default" size="large" icon={<FileOutlined />} onClick={handleClick}>
      View invoice
    </Button>
  );
};

export default ViewPurchaseInvoiceButton;
