import Form, { FormInstance } from "antd/es/form";
import Input from "antd/es/input";
import { FormRule } from "@shared/utils/form-validators.ts";
import Flex from "antd/es/flex";
import { FC } from "react";
import CountriesSelector from "@entities/country/ui/CountriesSelector";
import CurrenciesSelector from "@entities/currency/ui/CurrenciesSelector";
import { SupplierDto } from "@entities/supplier/dto/supplier.dto";
import SupplyTypesSelector from "@entities/supply-types/ui/SupplyTypesSelector";
import InputNumber from "antd/es/input-number";
import Row from "antd/es/row";
import Col from "antd/es/col";

interface Props {
  onFinish: (supplier: SupplierDto) => void;
  form: FormInstance<SupplierDto>;
}

const SupplierForm: FC<Props> = ({ onFinish, form }) => {
  return (
    <Form form={form} onFinish={onFinish} requiredMark={false} layout="vertical">
      <Flex gap={24}>
        <Form.Item
          name="name"
          label="Name"
          rules={[FormRule.Required("Please, enter name / company name")]}
          style={{ flex: 1 }}>
          <Input maxLength={256} size="large" placeholder="Enter name / company name" />
        </Form.Item>
        <Form.Item
          name="supplyTypeId"
          label="Type of supply"
          rules={[FormRule.Required("Please, select type")]}
          style={{ flex: 1 }}>
          <SupplyTypesSelector />
        </Form.Item>
      </Flex>
      <Form.Item
        name="email"
        label="Email"
        rules={[
          { type: "email", message: "Invalid email address" },
          { required: true, message: "Please, enter email address" },
        ]}>
        <Input size="large" placeholder="Enter email" />
      </Form.Item>
      <Form.Item name="address" label="Address line" rules={[FormRule.Required("Please, enter address")]}>
        <Input size="large" placeholder="Enter address" />
      </Form.Item>
      <Row gutter={24}>
        <Col span={8}>
          <Form.Item name="city" label="City" rules={[FormRule.Required("Please, enter city")]}>
            <Input size="large" placeholder="Enter city" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="postalCode" label="Postal code" rules={[FormRule.Required("Please, enter postal code")]}>
            <Input size="large" placeholder="Enter postal code" />
          </Form.Item>
        </Col>
        <Col span={8}>
          <Form.Item name="countryId" label="Choose country" rules={[FormRule.Required("Please, select country")]}>
            <CountriesSelector />
          </Form.Item>
        </Col>
      </Row>
      <Flex gap={24}>
        <Form.Item name="vatNumber" label="VAT" rules={[FormRule.Required("Please, enter VAT")]} style={{ flex: 1 }}>
          <Input size="large" placeholder="Enter VAT" maxLength={16} />
        </Form.Item>
        <Form.Item name="markup" label="Cost markup" rules={[FormRule.Markup()]} style={{ flex: 1 }}>
          <InputNumber prefix="%" size="large" placeholder="Enter markup" min={0} style={{ width: "100%" }} />
        </Form.Item>
        <Form.Item
          name="currencyId"
          label="Currency"
          rules={[FormRule.Required("Please, select currency")]}
          style={{ flex: 1 }}>
          <CurrenciesSelector />
        </Form.Item>
      </Flex>
    </Form>
  );
};

export default SupplierForm;
