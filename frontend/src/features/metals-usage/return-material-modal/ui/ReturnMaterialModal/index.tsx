import MaterialTypeSelect from "entities/material/ui/MaterialTypeSelect";
import Typography from "antd/es/typography";
import { brandingColorPalette } from "@shared/constants/branding.ts";
import Modal from "antd/es/modal/Modal";
import { FC, useEffect } from "react";
import { useForm, useWatch } from "antd/es/form/Form";
import Form from "antd/es/form";
import { FormRule } from "@shared/utils/form-validators.ts";
import InputNumber from "antd/es/input-number";
import UserSelect from "@entities/user/ui/UserSelect";
import useReturnMaterialToInventory from "@entities/metals-usage/hooks/useReturnMaterialToInventory.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { ReturnMaterialToInventoryDto } from "@entities/metals-usage/dto/return-material-to-inventory.dto.ts";
import AlloySelect from "@entities/alloy/ui/AlloySelect";
import OtherMaterialSelect from "@entities/other-material/ui/OtherMaterialSelect";
import Select from "antd/es/select";
import Flex from "antd/es/flex";
import { OrderMetalTotal } from "@entities/order/models/order-metal-total.model.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model.ts";
import AlloyedMetalSelect from "@entities/alloyed-metal/ui/AlloyedMetalSelect";
import { MaterialType } from "@entities/material/constants/material-type.enum.ts";
import { useAlloyedMetal } from "@entities/alloyed-metal/hooks/useAlloyedMetal.ts";
import useOtherMaterial from "@entities/other-material/hooks/useOtherMaterial.ts";

interface Props {
  orderId: number;
  metalTotals?: OrderMetalTotal[];
  open?: boolean;
  onClose?: () => void;
}

const ReturnMaterialModal: FC<Props> = ({ orderId, metalTotals, open, onClose }) => {
  const [form] = useForm();
  const { messageApi } = useMessage();

  const mutation = useReturnMaterialToInventory(orderId);

  const handleCancel = () => {
    onClose?.();
    form.resetFields();
  };
  const currentOrderMaterial = useWatch("metalId", form);
  const currentMaterialId = useWatch("materialId", form);
  const currentMaterialType = useWatch("materialType", form);

  const isAlloyed = currentMaterialType === MaterialType.ALLOYED_METAL;

  const { data: currentAlloyedMetal } = useAlloyedMetal(
    currentMaterialType === MaterialType.ALLOYED_METAL ? currentMaterialId : undefined,
  );
  const { data: currentOtherMaterial } = useOtherMaterial(
    currentMaterialType === MaterialType.OTHER ? currentMaterialId : undefined,
  );

  const material = isAlloyed ? currentAlloyedMetal : currentOtherMaterial;

  const handleFinish = (values: ReturnMaterialToInventoryDto) => {
    mutation.mutate(values, {
      onSuccess: () => {
        void messageApi.success("Material was returned successfully to the inventory");
      },
      onError: () => {
        void messageApi.error("Failed to return material to the inventory");
      },
      onSettled: () => {
        handleCancel();
      },
    });
  };

  const getMetalPurityOptions = (metalId?: number) => {
    if (!metalId) return [];

    const metalTotal = metalTotals?.find(({ metal }) => metal.id === metalId);

    if (!metalTotal || !metalTotal.metalPurity) {
      return [];
    }

    const purity: MetalPurity = metalTotal.metalPurity;

    return [
      {
        label: purity.metalPurity,
        value: purity.id,
      },
    ];
  };

  useEffect(() => {
    form.resetFields(["materialId", "alloyId", "weight"]);
  }, [currentMaterialType]);

  useEffect(() => {
    form.resetFields(["materialId", "metalPurityId", "materialType", "alloyId", "weight"]);
  }, [currentOrderMaterial]);

  return (
    <Modal
      width={412}
      open={open}
      title={
        <Typography.Title level={3} style={{ marginTop: 0, marginBottom: 24, color: brandingColorPalette.brand6 }}>
          Return material to inventory
        </Typography.Title>
      }
      onOk={form.submit}
      confirmLoading={mutation.isPending}
      cancelButtonProps={{
        disabled: mutation.isPending,
        id: "close-return-material-modal",
      }}
      onCancel={handleCancel}
      okText="Confirm"
      destroyOnClose>
      <Form form={form} requiredMark={false} layout="vertical" onFinish={handleFinish}>
        <Flex gap={8} justify="space-between">
          <Form.Item
            style={{ width: "100%" }}
            name="metalId"
            label="Order material"
            rules={[FormRule.Required("Please, choose material type")]}>
            <Select placeholder="Choose material" size="large">
              {metalTotals?.map(({ metal }) => (
                <Select.Option key={metal.id} value={metal.id} data={metal}>
                  {metal.id} · {metal.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          <Form.Item dependencies={["metalId"]} noStyle>
            {({ getFieldValue }) => {
              const metalId = getFieldValue("metalId");

              const options = getMetalPurityOptions(metalId);
              return (
                <Form.Item
                  dependencies={["metalId"]}
                  style={{ width: "100%" }}
                  name="metalPurityId"
                  label="Metal purity"
                  rules={[FormRule.Required("Please, choose material")]}>
                  <Select placeholder="Choose purity" size="large" options={options} disabled={!metalId} />
                </Form.Item>
              );
            }}
          </Form.Item>
        </Flex>

        <Form.Item dependencies={["metalPurityId"]}>
          {({ getFieldValue }) => (
            <Form.Item
              name="materialType"
              label="Material type"
              rules={[FormRule.Required("Please, choose material type")]}
              style={{ margin: 0 }}>
              <MaterialTypeSelect disabled={!getFieldValue("metalPurityId")} />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item dependencies={["materialType", "metalId", "metalPurityId"]} noStyle>
          {({ getFieldValue }) => {
            const metalId = getFieldValue("metalId");
            const metalPurityId = getFieldValue("metalPurityId");

            return (
              <>
                <Form.Item
                  name="materialId"
                  label="Material"
                  rules={[FormRule.Required("Please, choose material")]}
                  help={
                    (currentAlloyedMetal || currentOtherMaterial) &&
                    `The remaining weight is ${isAlloyed ? currentAlloyedMetal?.remainingWeight : currentOtherMaterial?.remainingWeight}g`
                  }>
                  {isAlloyed ? (
                    <AlloyedMetalSelect
                      searchConfig={{
                        searchCriteria: { metalIds: [metalId], metalPurityIds: [metalPurityId] },
                      }}
                      disabled={!currentMaterialType}
                    />
                  ) : (
                    <OtherMaterialSelect disabled={!currentMaterialType} />
                  )}
                </Form.Item>

                <Form.Item name="alloyId" label="Alloy" rules={[FormRule.Required("Please, choose alloy", isAlloyed)]}>
                  <AlloySelect
                    searchConfig={{
                      searchCriteria: { metalIds: [metalId] },
                    }}
                    allowClear
                    placeholder="Choose alloy"
                    disabled={!(isAlloyed && currentMaterialId)}
                  />
                </Form.Item>
              </>
            );
          }}
        </Form.Item>

        <Form.Item dependencies={["materialId"]} noStyle>
          {() => (
            <Form.Item
              name="weight"
              label="Weight, g"
              rules={[
                FormRule.Required(),
                FormRule.PreciseWeight(),
                FormRule.MaxRemainingWeight(material?.remainingWeight ?? null),
              ]}>
              <InputNumber
                min={0.01}
                size="large"
                placeholder="Enter weight"
                style={{ width: "100%" }}
                disabled={!material}
              />
            </Form.Item>
          )}
        </Form.Item>

        <Form.Item
          validateTrigger="onBlur"
          name="employeeId"
          label="Employee"
          rules={[FormRule.Required("Please, select employee")]}>
          <UserSelect placeholder="Choose employee" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ReturnMaterialModal;
