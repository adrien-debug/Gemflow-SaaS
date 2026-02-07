import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import HallmarkLogoSelect from "@entities/hallmark-logo/ui/HallmarkLogoSelect";
import MetalSelect from "@entities/metal/ui/MetalSelect";
import { FormRule } from "@shared/utils/form-validators.ts";
import Button from "antd/es/button";
import Col from "antd/es/col";
import Flex from "antd/es/flex";
import Form from "antd/es/form";
import FormItem from "antd/es/form/FormItem";
import useFormInstance from "antd/es/form/hooks/useFormInstance";
import Row from "antd/es/row";
import Typography from "antd/es/typography";

export const MetalSelectItem = () => {
  const form = useFormInstance();

  const handleDelete = (name: number) => {
    const material = form.getFieldValue(["materials", "requestDtoList", name]);
    const deletedIds = form.getFieldValue(["materials", "deletedIds"]) || [];
    if (material?.id) {
      form.setFieldValue(["materials", "deletedIds"], [...deletedIds, material.id]);
    }
  };

  return (
    <>
      <Form.List initialValue={[{}]} name={["materials", "requestDtoList"]}>
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, ...restField }, i) => (
              <div key={key}>
                <Flex justify="space-between">
                  <Typography.Text className="material-title">Material {i + 1}</Typography.Text>
                  {i > 0 && (
                    <DeleteOutlined
                      size={12}
                      onClick={() => {
                        handleDelete(name);
                        remove(name);
                      }}
                    />
                  )}
                </Flex>

                <FormItem name={[name, "id"]} style={{ display: "none" }}>
                  <div />
                </FormItem>

                <Row gutter={16}>
                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Metal type"
                      name={[name, "materialMetalId"]}
                      rules={[FormRule.Required("Choose metal type")]}>
                      <MetalSelect />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item
                      {...restField}
                      label="Claw type"
                      name={[name, "clawMetalId"]}
                      rules={[FormRule.Required("Choose claw type")]}>
                      <MetalSelect />
                    </Form.Item>
                  </Col>

                  <Col span={8}>
                    <Form.Item {...restField} label="Halmark logo" name={[name, "hallmarkLogoId"]}>
                      <HallmarkLogoSelect />
                    </Form.Item>
                  </Col>
                </Row>
              </div>
            ))}
            <Form.Item>
              <Button
                size="large"
                style={{ borderRadius: 8 }}
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}>
                Add new metal
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>

      <FormItem name={["materials", "deletedIds"]} style={{ display: "none" }}>
        <div />
      </FormItem>
    </>
  );
};
