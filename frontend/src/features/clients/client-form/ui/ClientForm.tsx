import Form, { FormInstance } from "antd/es/form";
import Input from "antd/es/input";
import { FormRule } from "@shared/utils/form-validators.ts";
import Flex from "antd/es/flex";
import { ClientDto } from "@entities/client/dto/client.dto";
import { FC } from "react";
import CountriesSelector from "@entities/country/ui/CountriesSelector";
import CurrenciesSelector from "@entities/currency/ui/CurrenciesSelector";

interface Props {
  onFinish: (client: ClientDto) => void;
  form: FormInstance<ClientDto>;
}

const ClientForm: FC<Props> = ({ onFinish, form }) => {
  return (
    <Form form={form} requiredMark={false} layout="vertical" onFinish={onFinish}>
      <Flex vertical>
        <Flex gap={24}>
          <Form.Item
            name="name"
            label="Name"
            rules={[FormRule.Required("Please, enter name / company name")]}
            style={{ flex: 1 }}>
            <Input maxLength={256} size="large" placeholder="Enter name / company name" />
          </Form.Item>
          <Form.Item
            name="email"
            label="Email"
            rules={[
              { type: "email", message: "Invalid email address" },
              { required: true, message: "Please, enter email address" },
            ]}
            style={{ flex: 1 }}>
            <Input size="large" placeholder="Enter email" />
          </Form.Item>
        </Flex>
        <Form.Item name="address" label="Address line" rules={[FormRule.Required("Please, enter address")]}>
          <Input size="large" placeholder="Enter address" />
        </Form.Item>
        <Flex gap={24}>
          <Form.Item name="city" label="City" rules={[FormRule.Required("Please, enter city")]} style={{ flex: 1 }}>
            <Input size="large" placeholder="Enter city" />
          </Form.Item>
          <Form.Item name="postalCode" label="Postal code" rules={[FormRule.Required("Please, enter postal code")]}>
            <Input size="large" placeholder="Enter postal code" />
          </Form.Item>
          <Form.Item
            name="countryId"
            label="Choose country"
            rules={[FormRule.Required("Please, select country")]}
            style={{ flex: 1 }}>
            <CountriesSelector />
          </Form.Item>
        </Flex>
        <Flex gap={24}>
          <Form.Item name="vatNumber" label="VAT" rules={[FormRule.Required("Please, enter VAT")]} style={{ flex: 1 }}>
            <Input size="large" placeholder="Enter VAT" maxLength={16} />
          </Form.Item>
          <Form.Item
            name="currencyId"
            label="Currency"
            rules={[FormRule.Required("Please, select currency")]}
            style={{ flex: 1 }}>
            <CurrenciesSelector />
          </Form.Item>
        </Flex>
      </Flex>
    </Form>
  );
};

export default ClientForm;
