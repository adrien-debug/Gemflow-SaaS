import "./style.scss";
import { Cylinder } from "@entities/cylinder/model/cylinder.model.ts";
import { useEffect, useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import { FormRule } from "@shared/utils/form-validators.ts";
import EmptyState from "@shared/ui/EmptyState";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Form from "antd/es/form";
import Skeleton from "antd/es/skeleton";
import Flex from "antd/es/flex";
import Input from "antd/es/input";
import Button from "antd/es/button";
import DeleteOutlined from "@ant-design/icons/lib/icons/DeleteOutlined";
import PlusOutlined from "@ant-design/icons/lib/icons/PlusOutlined";
import useUpdateCylinders from "@entities/cylinder/hooks/useUpdateCylinders.ts";
import useCylinders from "@entities/cylinder/hooks/useCylinders.ts";

const Cylinders = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [deletedIds, setDeletedIds] = useState<number[]>([]);

  const [form] = Form.useForm();

  const { data: cylinders, isPending } = useCylinders();
  const mutation = useUpdateCylinders();

  const { messageApi } = useMessage();

  const onCancel = () => {
    form.setFieldsValue({
      cylinders,
    });
    setEditing(false);
  };

  const onSubmit = async (values: { cylinders: Cylinder[] }) => {
    mutation.mutate(
      {
        requestDtoList: values.cylinders,
        deletedIds,
      },
      {
        onSuccess: () => {
          messageApi.success("Cylinders successfully saved");
        },
        onError: () => {
          messageApi.error("Failed to save cylinders");
          form.setFieldsValue({
            cylinders,
          });
        },
        onSettled: () => {
          setDeletedIds([]);
          setEditing(false);
        },
      },
    );
  };

  const deleteRow = (key: number, remove: (key: number) => void) => {
    const value = form.getFieldValue(["cylinders", key]);
    if (value) {
      setDeletedIds((prev) => [...prev, value.id]);
    }
    remove(key);
  };

  useEffect(() => {
    form.setFieldsValue({
      cylinders,
    });
  }, [form, cylinders]);

  return (
    <Flex vertical className="cylinders-widget">
      <EditFormController
        editing={editing}
        onEdit={() => setEditing(true)}
        onCancel={onCancel}
        onSave={() => form.submit()}
        title="Cylinders"
        description="Short description here"
        loading={mutation.isPending}
        id="cylinders"
      />
      {isPending ? (
        <Skeleton />
      ) : (
        <>
          {cylinders?.length || editing ? (
            <Form requiredMark={false} onFinish={onSubmit} form={form} className="cylinders-form" disabled={!editing}>
              <Form.List name="cylinders">
                {(fields, { add, remove }) => (
                  <>
                    {fields.map(({ key, name, ...restField }, index) => (
                      <Flex key={key} className="cylinders-content-wrap">
                        <Form.Item
                          {...restField}
                          name={[name, "name"]}
                          rules={[FormRule.Required("Please, enter cylinder name")]}
                          colon={false}
                          label={++index}>
                          <Input
                            id={`${index}-cylinder-name`}
                            className="cylinders-input"
                            placeholder="Enter cylinder name"
                            maxLength={32}
                          />
                        </Form.Item>
                        {editing && <DeleteOutlined className="remove-icon" onClick={() => deleteRow(name, remove)} />}
                      </Flex>
                    ))}
                    {editing && fields.length < 4 && (
                      <Button
                        id="add-cylinder"
                        icon={<PlusOutlined />}
                        className="add-button"
                        type="dashed"
                        onClick={() => add()}>
                        Add cylinder
                      </Button>
                    )}
                  </>
                )}
              </Form.List>
            </Form>
          ) : (
            <EmptyState title="cylinders" description="To get started, click “Edit” and add new cylinders" />
          )}
        </>
      )}
    </Flex>
  );
};

export default Cylinders;
