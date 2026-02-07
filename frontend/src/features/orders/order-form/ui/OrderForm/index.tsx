import { JewelCategory } from "@entities/jewel-category/constants/jewel-category.ts";
import { Order } from "@entities/order/models/order.model.ts";
import { AcceptanceDatePickerItem } from "@features/orders/order-form/ui/OrderForm/fields/AcceptanceDatePickerItem.tsx";
import { CategorySelectItem } from "@features/orders/order-form/ui/OrderForm/fields/CategorySelectItem.tsx";
import { ClientSelectItem } from "@features/orders/order-form/ui/OrderForm/fields/ClientSelectItem.tsx";
import { CollectionSelectItem } from "@features/orders/order-form/ui/OrderForm/fields/CollectionSelectItem.tsx";
import { DescriptionInputItem } from "@features/orders/order-form/ui/OrderForm/fields/DescriptionInputItem.tsx";
import { DueDatePickerItem } from "@features/orders/order-form/ui/OrderForm/fields/DueDatePickerItem.tsx";
import { FinalProductImagePickerItem } from "@features/orders/order-form/ui/OrderForm/fields/FinalProductImagePickerItem.tsx";
import FingerSizeInputItem from "@features/orders/order-form/ui/OrderForm/fields/FingerSizeInputItem.tsx";
import GemstonesSelectItem from "@features/orders/order-form/ui/OrderForm/fields/GemstonesSelectItem.tsx";
import LengthInputItem from "@features/orders/order-form/ui/OrderForm/fields/LengthInputItem.tsx";
import { MetalSelectItem } from "@features/orders/order-form/ui/OrderForm/fields/MetalSelectItem.tsx";
import { OrderNameInputItem } from "@features/orders/order-form/ui/OrderForm/fields/OrderNameInputItem.tsx";
import { PrioritySelectItem } from "@features/orders/order-form/ui/OrderForm/fields/PrioritySelectItem.tsx";
import { SegmentSelectItem } from "@features/orders/order-form/ui/OrderForm/fields/SegmentSelectItem.tsx";
import SettingTypeSelectItem from "@features/orders/order-form/ui/OrderForm/fields/SettingTypeSelectItem.tsx";
import SizeSystemSelectItem from "@features/orders/order-form/ui/OrderForm/fields/SizeSystemSelectItem.tsx";
import StoneInPacketCheckItem from "@features/orders/order-form/ui/OrderForm/fields/StoneInPacketCheckItem.tsx";
import OrderConverter from "@features/orders/view-order/utils/order-converter.ts";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import { useForm, useWatch } from "antd/es/form/Form";
import Row from "antd/es/row";
import Typography from "antd/es/typography";
import "./styles.scss";
import { GemstoneStatus } from "@entities/gemstone/constants/gemstone-status.enum";
import { ForwardedRef, forwardRef, ReactNode, useEffect, useImperativeHandle } from "react";

export interface OrderFormRef {
  submit: () => void;
}

interface Props<T> {
  order?: Order;
  onFinish?: (values: T) => void;
  variant?: "create" | "edit";
  id?: number;
  onStartImageLoading?: () => void;
  onFinishImageLoading?: () => void;
}

const OrderForm = <T,>(
  { onFinish, variant = "create", id, onFinishImageLoading, onStartImageLoading, order }: Props<T>,
  ref: ForwardedRef<OrderFormRef>,
) => {
  const [form] = useForm();
  const itemCategoryId = useWatch("itemCategoryId", form);
  const isEdit = variant === "edit";

  useEffect(() => {
    if (order) {
      const initialValues = OrderConverter.convert(order);
      form.setFieldsValue(initialValues);
    }
  }, [form, order]);

  useImperativeHandle(ref, () => ({
    submit: form.submit,
  }));

  return (
    <Form<T> className="create-order-form" form={form} requiredMark={false} layout="vertical" onFinish={onFinish}>
      <Row gutter={32}>
        <Col span={12}>
          <Typography.Title level={4}>Client and order details</Typography.Title>
          <section>
            <ClientSelectItem />
            <OrderNameInputItem />

            <Row gutter={16}>
              <Col span={8}>
                <CategorySelectItem />
              </Col>
              <Col span={8}>
                <CollectionSelectItem />
              </Col>
              <Col span={8}>
                <SegmentSelectItem />
              </Col>
            </Row>

            <Row gutter={16}>
              <Col span={isEdit ? 8 : 12}>
                <PrioritySelectItem />
              </Col>
              <Col span={isEdit ? 8 : 12}>
                <DueDatePickerItem />
              </Col>
              {isEdit && (
                <Col span={8}>
                  <AcceptanceDatePickerItem />
                </Col>
              )}
            </Row>
          </section>

          <Typography.Title level={4}>Description</Typography.Title>
          <section>
            <Flex gap={16}>
              <FinalProductImagePickerItem
                onStartLoading={onStartImageLoading}
                onFinishLoading={onFinishImageLoading}
              />
              <DescriptionInputItem />
            </Flex>
          </section>
        </Col>

        <Col span={12}>
          <Typography.Title level={4}>Materials and mounting</Typography.Title>
          <section>
            <MetalSelectItem />
          </section>

          <Typography.Title level={4}>Dimensions</Typography.Title>
          <section>
            <Row gutter={16}>
              {itemCategoryId === JewelCategory.Ring ? (
                <>
                  <Col span={12}>
                    <SizeSystemSelectItem />
                  </Col>
                  <Col span={12}>
                    <FingerSizeInputItem />
                  </Col>
                </>
              ) : (
                <Col span={24}>
                  <LengthInputItem />
                </Col>
              )}
            </Row>
          </section>

          <Flex justify="space-between" align="center">
            <Typography.Title level={4}>Stone and setting</Typography.Title>
            <StoneInPacketCheckItem />
          </Flex>
          <section>
            <GemstonesSelectItem
              searchConfig={{
                searchCriteria: {
                  statuses: [GemstoneStatus.AVAILABLE],
                  alwaysIncludeUsedInOrder: true,
                  orderIds: id ? [id] : undefined,
                },
              }}
            />
            <SettingTypeSelectItem />
          </section>
        </Col>
      </Row>
    </Form>
  );
};

export default forwardRef(OrderForm) as <T>(props: Props<T> & { ref?: ForwardedRef<OrderFormRef> }) => ReactNode;
