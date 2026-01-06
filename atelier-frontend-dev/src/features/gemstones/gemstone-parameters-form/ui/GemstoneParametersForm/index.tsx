import ImageUpload from "@shared/ui/form/ImageUpload";
import { FormRule } from "@shared/utils/form-validators";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import Input from "antd/es/input";
import Typography from "antd/es/typography";
import SupplierSelect from "@entities/supplier/ui/SupplierSelect";
import LocationSelector from "@entities/location/ui/LocationSelector";
import InputNumber from "antd/es/input-number";
import { brandingTokens } from "@shared/constants/branding";
import Col from "antd/es/col";
import Row from "antd/es/row";
import { SupplyType } from "@entities/supplier/constants/supply-type.enum.ts";

const GemstoneParametersForm = () => {
  return (
    <Flex vertical>
      <Typography.Title
        level={4}
        style={{ marginTop: 0, marginBottom: 16, fontWeight: 400, fontSize: 20, color: brandingTokens.textColorGray }}>
        Parameters
      </Typography.Title>
      <Flex gap={24} style={{ width: "100%" }}>
        <Flex vertical gap={4}>
          <Typography.Text style={{ fontWeight: 400, fontSize: 14, color: brandingTokens.textColorGray }}>
            Gem image
          </Typography.Text>
          <Form.Item name="gemstoneImages">
            <ImageUpload />
          </Form.Item>
        </Flex>
        <Flex vertical style={{ flex: 1, minWidth: 0 }}>
          <Form.Item
            name="name"
            label="Name"
            rules={[FormRule.Required("Please, enter gem name")]}
            style={{ marginBottom: 20 }}>
            <Input maxLength={256} size="large" placeholder="Enter gem name" />
          </Form.Item>
          <Form.Item
            name="description"
            label="Description"
            rules={[FormRule.Required("Please, enter gem description")]}
            style={{ marginBottom: 20 }}>
            <Input.TextArea
              maxLength={1500}
              size="large"
              placeholder="Enter gem description"
              style={{
                height: 90,
                resize: "none",
                verticalAlign: "top",
              }}
              autoSize={false}
            />
          </Form.Item>
          <Row gutter={16}>
            <Col span={12}>
              <Form.Item name="supplierId" label="Supplier" rules={[FormRule.Required("Please, select supplier")]}>
                <SupplierSelect supplyTypeIds={[SupplyType.GEMSTONES]} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="locationId" label="Location" rules={[FormRule.Required("Please, select location")]}>
                <LocationSelector />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item name="numberOfGems" label="Number of gems" rules={[FormRule.Required("Please, enter amount")]}>
                <InputNumber maxLength={9} size="large" placeholder="Enter amount" style={{ width: "100%" }} min={1} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                name="totalWeight"
                label="Total weight, Ct"
                rules={[FormRule.Required("Please, enter weight"), FormRule.Carat(), FormRule.Min(0.0001)]}>
                <InputNumber size="large" placeholder="Enter weight" style={{ width: "100%" }} />
              </Form.Item>
            </Col>
          </Row>
          <Form.Item name="certificate" label="Certificate" rules={[FormRule.Required("Please, enter certificate")]}>
            <Input maxLength={64} size="large" placeholder="Enter certificate" />
          </Form.Item>
          <Form.Item name="comment" label="Comment" style={{ marginBottom: 20 }}>
            <Input.TextArea
              maxLength={1500}
              size="large"
              placeholder="Add comment"
              style={{
                height: 90,
                resize: "none",
                verticalAlign: "top",
              }}
              autoSize={false}
            />
          </Form.Item>
        </Flex>
      </Flex>
    </Flex>
  );
};

export default GemstoneParametersForm;
