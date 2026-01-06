import Modal from "antd/es/modal/Modal";
import { FC, useEffect } from "react";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import { useForm } from "antd/es/form/Form";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { Supplier } from "@entities/supplier/model/supplier.model";
import useUpdatSupplier from "@entities/supplier/hooks/useUpdateSupplier";
import { SupplierDto } from "@entities/supplier/dto/supplier.dto";
import SupplierForm from "@features/suppliers/supplier-form/ui/SupplierForm";

interface Props {
  open: boolean;
  supplier?: Supplier;
  setIsModalOpen: (value: boolean) => void;
}

const EditSupplierModal: FC<Props> = ({ open, supplier, setIsModalOpen }) => {
  const [form] = useForm();

  const updateSupplierMutation = useUpdatSupplier();

  const { messageApi } = useMessage();

  useEffect(() => {
    if (supplier) {
      form.setFieldsValue({
        name: supplier.name,
        email: supplier.email,
        address: supplier.address,
        city: supplier.city,
        postalCode: supplier.postalCode,
        vatNumber: supplier.vatNumber,
        supplyTypeId: supplier.supplyType.id,
        countryId: supplier.country.id,
        currencyId: supplier.currency.id,
        markup: supplier.markup,
      });
    }
  }, [supplier, form]);

  const handleFinish = (values: SupplierDto) => {
    if (supplier) {
      updateSupplierMutation.mutate(
        { id: supplier.id, dto: values },
        {
          onSuccess: ({ name }) => {
            messageApi.success(`${name} was updated successfully`);
          },
          onError: () => {
            messageApi.error("Failed to update supplier");
          },
          onSettled: () => {
            setIsModalOpen(false);
          },
        },
      );
    }
  };

  const onClose = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      confirmLoading={updateSupplierMutation.isPending}
      cancelButtonProps={{
        disabled: updateSupplierMutation.isPending,
      }}
      onOk={form.submit}
      onCancel={onClose}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Update Supplier
        </Typography.Title>
      }
      okText={"Update"}
      centered
      width={680}>
      <SupplierForm onFinish={handleFinish} form={form} />
    </Modal>
  );
};

export default EditSupplierModal;
