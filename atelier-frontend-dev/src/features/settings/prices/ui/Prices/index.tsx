import "./styles.scss";
import EditFormController from "@shared/ui/EditFormController";
import { useEffect, useState } from "react";
import NarrowFormSpaced from "@shared/ui/NarrowFormSpaced";
import { PriceSettings } from "@entities/metal/models/price-settings.model.ts";
import type { Dayjs } from "dayjs";
import dayjs from "dayjs";
import { DateFormat } from "@shared/constants/date-format.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { FormRule } from "@shared/utils/form-validators.ts";
import EmptyState from "@shared/ui/EmptyState";
import Form from "antd/es/form";
import DatePicker, { DatePickerProps } from "antd/es/date-picker";
import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Skeleton from "antd/es/skeleton";
import InputNumber from "antd/es/input-number";
import usePricesSettings from "@features/settings/prices/hooks/usePricesSettings.ts";

const Prices = () => {
  const [editing, setEditing] = useState(false);

  const [form] = Form.useForm<PriceSettings>();

  const [currentDate, setCurrentDate] = useState<Dayjs>(dayjs());

  const {
    query: { data: prices, isPending },
    mutation,
  } = usePricesSettings(currentDate);

  const { messageApi } = useMessage();

  useEffect(() => {
    form.setFieldsValue({
      ...prices,
    });
  }, [form, prices]);

  const onSubmit = async (values: Omit<PriceSettings, "id" | "updateDate">) => {
    const preparedValues = {
      ...values,
      id: prices!.id,
      updateDate: currentDate.format(DateFormat.YearMonthDay),
    } satisfies PriceSettings;
    mutation.mutate(preparedValues, {
      onSuccess: () => {
        messageApi.success("Prices saved successfully");
      },
      onError: () => {
        messageApi.error("Failed to save prices");
        form.setFieldsValue({
          ...prices,
        });
      },
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  const onCancel = () => {
    form.resetFields();
    form.setFieldsValue({
      ...prices,
    });
    setEditing(false);
  };

  const onDateChange: DatePickerProps["onChange"] = (date) => {
    setCurrentDate(date);
  };

  return (
    <div className={`widget-prices ${editing ? "editing" : ""}`}>
      <EditFormController
        title="Prices"
        description="Update prices for metals and conversion rates"
        editing={editing}
        onEdit={() => setEditing(true)}
        onCancel={() => onCancel()}
        onSave={() => form.submit()}
        loading={mutation.isPending}
        additionalControls={
          <DatePicker
            id="price-widget-date-picker"
            disabled={editing}
            size="large"
            value={currentDate}
            allowClear={false}
            onChange={onDateChange}
          />
        }
        id="prices"
      />

      <Form requiredMark={false} onFinish={onSubmit} layout="horizontal" form={form} disabled={!editing} colon={false}>
        <Flex gap={60} className="forms-container">
          <NarrowFormSpaced>
            <Typography.Title level={5}>Metals</Typography.Title>
            {isPending ? (
              <Skeleton />
            ) : prices?.priceMetals.length || editing ? (
              <Form.List name="priceMetals">
                {(fields) => (
                  <>
                    {fields.map(({ key, name, ...rest }) => (
                      <Flex key={key} align="baseline" gap="small">
                        <div className="field-metal">
                          <Typography.Text>
                            {form.getFieldValue(["priceMetals", name, "priceMetalName", "name"])}
                          </Typography.Text>
                        </div>

                        <Form.Item
                          className="field-price"
                          {...rest}
                          name={[name, "rate"]}
                          rules={[FormRule.Currency(), FormRule.Required()]}>
                          <InputNumber id={`rate-${key}`} prefix="$" suffix="USD" precision={2} />
                        </Form.Item>
                      </Flex>
                    ))}
                  </>
                )}
              </Form.List>
            ) : (
              <EmptyState title="metals" description="To manage prices, add price labels above" />
            )}
          </NarrowFormSpaced>

          <Flex vertical gap={16}>
            <NarrowFormSpaced>
              <Typography.Title level={5}>Conversion rates to USD</Typography.Title>

              {isPending ? (
                <Skeleton />
              ) : (
                <>
                  <Form.Item<PriceSettings>
                    name="dirhamConversionRate"
                    label="UAE Dirham"
                    rules={[FormRule.Currency(), FormRule.Required()]}>
                    <InputNumber id="dirham-rate" prefix="&#1583;&#46;&#1573;" suffix="AED" precision={3} />
                  </Form.Item>
                  <Form.Item<PriceSettings>
                    name="euroConversionRate"
                    label="Euro"
                    rules={[FormRule.Currency(), FormRule.Required()]}>
                    <InputNumber id="euro-rate" prefix="€" suffix="EUR" precision={3} />
                  </Form.Item>
                  <Form.Item<PriceSettings>
                    name="poundConversionRate"
                    label="British Pound"
                    rules={[FormRule.Currency(), FormRule.Required()]}>
                    <InputNumber id="pound-rate" prefix="£" suffix="GBP" precision={3} />
                  </Form.Item>
                </>
              )}
            </NarrowFormSpaced>
          </Flex>
        </Flex>
      </Form>
    </div>
  );
};

export default Prices;
