import Flex from "antd/es/flex";
import Typography from "antd/es/typography";
import Form from "antd/es/form";
import InputNumber from "antd/es/input-number";
import Segmented from "antd/es/segmented";
import "./styles.scss";
import Checkbox from "antd/es/checkbox/Checkbox";
import { FC } from "react";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import { GemstoneMethodType } from "@entities/gemstone/constants/gemstone-method-type.enum.ts";
import { FormRule } from "@shared/utils/form-validators";
import { brandingTokens } from "@shared/constants/branding";

interface Props {
  isPrice: boolean;
  isManual: boolean;
  handleMethodChange: (value: GemstoneMethodType) => void;
}

const GemstonePriceDetailsForm: FC<Props> = ({ isPrice, isManual, handleMethodChange }) => {
  const form = useFormInstance();
  const stonePrice = Form.useWatch("stonePrice", form);
  const isStonePriceValid = stonePrice && stonePrice > 0;
  return (
    <Flex vertical className="price-details-filters">
      <Typography.Title
        level={4}
        style={{ marginTop: 0, marginBottom: 16, fontWeight: 400, fontSize: 20, color: brandingTokens.textColorGray }}>
        Price details
      </Typography.Title>
      <Flex align="baseline" justify="space-between">
        <Typography.Text>Method</Typography.Text>
        <Form.Item name="methodType" style={{ marginBottom: 16 }}>
          <Segmented
            shape="round"
            size="large"
            options={[
              {
                label: "Price",
                value: GemstoneMethodType.PRICE,
              },
              {
                label: "Weight",
                value: GemstoneMethodType.WEIGHT,
              },
              {
                label: "Manual",
                value: GemstoneMethodType.MANUAL,
              },
            ]}
            onChange={(value) => {
              handleMethodChange(value);
            }}
          />
        </Form.Item>
      </Flex>
      {!isPrice && (
        <Flex align="baseline" justify="space-between" className="inner-price">
          <Typography.Text style={{ whiteSpace: "nowrap" }}>Price per Carat</Typography.Text>
          <Form.Item name="pricePerCarat" style={{ marginBottom: 16 }} rules={[FormRule.PreciseCurrency()]}>
            <InputNumber size="large" style={{ width: 130 }} prefix="$" />
          </Form.Item>
        </Flex>
      )}

      <Flex align="baseline" justify="space-between" className="inner-price">
        <Typography.Text style={{ whiteSpace: "nowrap" }}>Stone(s) price</Typography.Text>
        <Form.Item
          name="stonePrice"
          style={{ marginBottom: 16 }}
          rules={[FormRule.Required("Please, enter price"), FormRule.PreciseCurrency()]}>
          <InputNumber
            size="large"
            style={{ width: 130 }}
            prefix="$"
            disabled={!isPrice && !isManual}
            placeholder={!isPrice && !isManual ? "-" : ""}
          />
        </Form.Item>
      </Flex>

      <Flex justify="space-between" align="center">
        <Form.Item name="customsDutyPriceActive" valuePropName="checked" style={{ marginBottom: 16 }}>
          <Checkbox disabled={!isStonePriceValid}>Customs Duty (5%)</Checkbox>
        </Form.Item>
        <Form.Item name="customsDutyPrice" style={{ marginBottom: 16 }}>
          <InputNumber
            size="large"
            prefix="$"
            style={{ width: 130 }}
            disabled
            value={form.getFieldValue("customsDutyPrice")}
            placeholder="-"
          />
        </Form.Item>
      </Flex>

      <Flex justify="space-between" align="center">
        <Form.Item name="vatPriceActive" valuePropName="checked" style={{ marginBottom: 16 }}>
          <Checkbox disabled={!isStonePriceValid}>VAT (5%)</Checkbox>
        </Form.Item>
        <Form.Item name="vatPrice">
          <InputNumber
            size="large"
            prefix="$"
            style={{ width: 130 }}
            disabled
            value={form.getFieldValue("vatPrice")}
            placeholder="-"
          />
        </Form.Item>
      </Flex>

      <Flex justify="space-between" align="center">
        <Form.Item name="tenPercentsPriceActive" valuePropName="checked" style={{ marginBottom: 16 }}>
          <Checkbox disabled={!isStonePriceValid}>10%</Checkbox>
        </Form.Item>
        <Form.Item name="tenPercentsPrice">
          <InputNumber
            size="large"
            prefix="$"
            style={{ width: 130 }}
            disabled
            value={form.getFieldValue("tenPercentsPrice")}
            placeholder="-"
          />
        </Form.Item>
      </Flex>

      <Flex align="baseline" justify="space-between" className="inner-price">
        <Typography.Text style={{ whiteSpace: "nowrap" }}>Certificate cost</Typography.Text>
        <Form.Item
          name="certificateCost"
          style={{ marginBottom: 16, paddingTop: 32 }}
          rules={[FormRule.PreciseCurrency()]}>
          <InputNumber size="large" style={{ width: 130 }} prefix="$" />
        </Form.Item>
      </Flex>
      <Flex align="baseline" justify="space-between" className="inner-price">
        <Typography.Text style={{ whiteSpace: "nowrap" }}>Shipment</Typography.Text>
        <Form.Item name="shipment" style={{ marginBottom: 16 }} rules={[FormRule.PreciseCurrency()]}>
          <InputNumber size="large" style={{ width: 130 }} prefix="$" />
        </Form.Item>
      </Flex>
      <Flex align="baseline" justify="space-between">
        <Typography.Text>Total cost</Typography.Text>
        <Form.Item name="totalCost" style={{ paddingTop: 32 }}>
          <InputNumber size="large" style={{ width: 130 }} prefix="$" disabled />
        </Form.Item>
      </Flex>
    </Flex>
  );
};

export default GemstonePriceDetailsForm;
