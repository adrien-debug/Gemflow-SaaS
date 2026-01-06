import Button from "antd/es/button";
import CreateDiamondRecordModal from "@features/diamonds/create-diamond-record-modal/ui/CreateDiamondRecordModal";
import { useState } from "react";

const AddDiamondRecordButton = () => {
  const [modalOpen, setModalOpen] = useState(false);

  return (
    <>
      <Button size="large" type="primary" onClick={() => setModalOpen(true)}>
        Add record
      </Button>

      <CreateDiamondRecordModal open={modalOpen} onClose={() => setModalOpen(false)} />
    </>
  );
};

export default AddDiamondRecordButton;
