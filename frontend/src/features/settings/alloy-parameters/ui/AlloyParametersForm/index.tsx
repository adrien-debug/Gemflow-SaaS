import "./index.scss";
import TagRender from "@shared/ui/select/components/TagRender.tsx";
import { FC, useEffect } from "react";
import { UpdateAlloysDto } from "@entities/metal/dto/update-alloys.dto.ts";
import {
  convertAlloyParametersToUpdateDto,
  generateEmptyAlloyParametersItem,
} from "@entities/metal/utils/alloy.converter.ts";
import TagList from "@shared/ui/tag/components/TagList";
import { FormRule } from "@shared/utils/form-validators.ts";
import { AlloyParameters } from "@entities/metal/models/alloy-parameters.model.ts";
import Form, { FormInstance } from "antd/es/form";
import Row from "antd/es/row";
import Col from "antd/es/col";
import Typography from "antd/es/typography";
import Input from "antd/es/input";
import Select from "antd/es/select";
import InputNumber from "antd/es/input-number";
import Button from "antd/es/button";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { MetalPurity } from "@entities/metal-purity/models/metal-purity.model";
import { TagItem } from "@shared/ui/tag/components/Tag";

interface Props {
  editing: boolean;
  form: FormInstance<{ items: UpdateAlloysDto[] }>;
  onRowDelete: (id: number) => void;
  alloys?: AlloyParameters[];
  metals: BaseItem[];
  metalLabels: BaseItem[];
}

const AlloyParametersForm: FC<Props> = ({ alloys, metals, metalLabels, editing, form, onRowDelete }) => {
  useEffect(() => {
    form.setFieldsValue({
      items: alloys?.map(convertAlloyParametersToUpdateDto),
    });
  }, [alloys, form]);

  const filterOptions = (options: BaseItem[], currentOptions: number[]): BaseItem[] => {
    const watchedItems = form.getFieldValue("items") || [];
    const selectedIds = watchedItems.map((item: UpdateAlloysDto) => item?.metalIds || []).flat();
    return options.filter((o) => !selectedIds.includes(o.id as number) || currentOptions?.includes?.(o.id as number));
  };

  const getTags = (name: number) => {
    const metalIds = form.getFieldValue(["items", name, "metalIds"]) || [];
    return metalIds
      .map((id: number) => metals.find((m) => m.id === id))
      .filter((metal: BaseItem | undefined) => !!metal);
  };

  const getMetalPurities = (name: number) => {
    const metalPurities = form?.getFieldValue?.(["items", name, "metalPurities"]) || [];
    return metalPurities?.requestDtoList?.map((el: MetalPurity) => ({
      id: el?.id,
      name: el?.metalPurity,
    }));
  };

  const onMetalPuritiesTagsChange = async (tags: TagItem[], deletedIds: number[], name: number) => {
    const transformedArray = tags.map(({ id, name }) => ({ id, metalPurity: Number(name) }));
    form.setFieldValue(["items", name, "metalPurities"], {
      requestDtoList: transformedArray,
      deletedIds: deletedIds || [],
    });
  };

  return (
    <Form form={form} className="alloy-parameters-form">
      <Form.List name="items">
        {(fields, operation) => (
          <>
            <Row gutter={8} className="table-header">
              <Col span={3}>
                <Typography.Text type="secondary" className="table-header-name">
                  Metal type name
                </Typography.Text>
              </Col>
              <Col span={3} offset={1}>
                <Typography.Text type="secondary" className="table-header-name">
                  Price
                </Typography.Text>
              </Col>
              <Col span={3}>
                <Typography.Text type="secondary" className="table-header-name">
                  Wax multiplier
                </Typography.Text>
              </Col>
              <Col span={6}>
                <Typography.Text type="secondary" className="table-header-name">
                  Metals
                </Typography.Text>
              </Col>
              <Col span={6}>
                <Typography.Text type="secondary" className="table-header-name">
                  Alloyed metal purity
                </Typography.Text>
              </Col>
            </Row>

            {fields.map(({ key, name, ...restField }) => (
              <Row key={key} gutter={8}>
                <Col span={3}>
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    rules={[FormRule.Required("Please, enter alloy name"), FormRule.MaxLength(32)]}>
                    {editing ? (
                      <Input id={`alloy-name-${key}`} maxLength={32} placeholder="Alloy name" />
                    ) : (
                      <Typography.Text>{form.getFieldValue(["items", name, "name"])}</Typography.Text>
                    )}
                  </Form.Item>
                </Col>

                <Col span={3} offset={1}>
                  <Form.Item
                    {...restField}
                    name={[name, "priceMetalNameId"]}
                    rules={[FormRule.Required("Please, select a price from the list")]}>
                    <Select
                      id={`price-metal-name-${key}`}
                      placeholder="Choose price"
                      options={metalLabels}
                      fieldNames={{ label: "name", value: "id" }}
                      disabled={!editing}
                    />
                  </Form.Item>
                </Col>

                <Col span={3}>
                  <Form.Item
                    {...restField}
                    name={[name, "waxCastingValue"]}
                    rules={[FormRule.Required("Please, specify the multiplier"), FormRule.SmallDecimal()]}>
                    <InputNumber
                      id={`wax-casting-${key}`}
                      placeholder="0.0"
                      disabled={!editing}
                      maxLength={32}
                      style={{ width: "100%" }}
                    />
                  </Form.Item>
                </Col>

                <Col span={6}>
                  <Form.Item
                    {...restField}
                    name={[name, "metalIds"]}
                    rules={[FormRule.Required("Please, specify at least one metal option for this alloy")]}>
                    {editing ? (
                      <Select
                        id={`metal-ids-${key}`}
                        tagRender={TagRender}
                        placeholder="Choose metals"
                        mode="multiple"
                        options={filterOptions(metals, form.getFieldValue(["items", name, "metalIds"]))}
                        fieldNames={{ label: "name", value: "id" }}
                        optionFilterProp="name"
                      />
                    ) : (
                      <div>
                        <TagList tags={getTags(name)} />
                      </div>
                    )}
                  </Form.Item>
                </Col>

                <Col span={7}>
                  <Form.Item {...restField} name={[name, "metalPurities"]}>
                    <TagList
                      tags={getMetalPurities(name)}
                      editable={editing}
                      creatable={editing}
                      deletable={editing}
                      onChange={(tags, deleteIds) => onMetalPuritiesTagsChange(tags, deleteIds, name)}
                      isNumber
                      min={1}
                      max={1000}
                    />
                  </Form.Item>
                </Col>

                {editing && (
                  <Col span={1}>
                    <Button
                      id={`remove-parameter-${key}`}
                      danger
                      type="text"
                      icon={<DeleteOutlined />}
                      onClick={() => {
                        onRowDelete(form.getFieldValue(["items", name, "id"]));
                        operation.remove(name);
                      }}
                    />
                  </Col>
                )}
              </Row>
            ))}
            {editing && (
              <Row gutter={8}>
                <Col span={5}>
                  <Button
                    id="add-parameter"
                    block
                    type="dashed"
                    onClick={() => operation.add(generateEmptyAlloyParametersItem())}
                    icon={<PlusOutlined />}>
                    Add Row
                  </Button>
                </Col>
              </Row>
            )}
          </>
        )}
      </Form.List>
    </Form>
  );
};

export default AlloyParametersForm;
