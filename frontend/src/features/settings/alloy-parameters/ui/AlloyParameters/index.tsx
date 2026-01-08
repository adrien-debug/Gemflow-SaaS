import EditFormController from "@shared/ui/EditFormController";
import { useState } from "react";
import AlloyParametersForm from "../AlloyParametersForm";
import { UpdateAlloysDto } from "@entities/metal/dto/update-alloys.dto.ts";
import useAlloyParameters from "@entities/metal/hooks/useAlloyParameters.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import { convertAlloyParametersToUpdateDto } from "@entities/metal/utils/alloy.converter.ts";
import EmptyState from "@shared/ui/EmptyState";
import Form from "antd/es/form";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";

const AlloyParameters = () => {
  const { mutation, alloys, alloysLoading, metals, metalLabels } = useAlloyParameters();

  const [editing, setEditing] = useState<boolean>(false);

  const [form] = Form.useForm<{ items: UpdateAlloysDto[] }>();

  const [removedRowIds, setRemovedRowIds] = useState<number[]>([]);

  const { messageApi } = useMessage();

  const resetFields = () => {
    form.setFieldsValue({
      items: alloys?.map(convertAlloyParametersToUpdateDto),
    });
  };

  const onSave = () => {
    form.validateFields().then(() => {
      mutation.mutate(
        {
          requestDtoList: form.getFieldsValue().items,
          deletedIds: removedRowIds,
        },
        {
          onSuccess: () => {
            void messageApi.success("Alloy successfully saved");
          },
          onError: (e) => {
            void messageApi.error(e.data?.friendlyMessage || "Failed to save alloys");
            resetFields();
          },
          onSettled: () => {
            setEditing(false);
          },
        },
      );
    });
  };

  const onRowDelete = (id: number) => {
    if (id) {
      setRemovedRowIds([...removedRowIds, id]);
    }
  };

  const onCancel = () => {
    resetFields();
    setEditing(false);
  };

  return (
    <Flex vertical gap={20}>
      <EditFormController
        title="Metal types"
        description="Types of metals and their corresponding parameters"
        editing={editing}
        onSave={() => onSave()}
        onEdit={() => setEditing(true)}
        onCancel={() => onCancel()}
        loading={mutation.isPending || alloysLoading}
        id="alloy-parameters"
      />

      {alloysLoading ? (
        <Skeleton />
      ) : (
        <div className="tag-list-container">
          {alloys?.length || editing ? (
            <AlloyParametersForm
              alloys={alloys}
              metals={metals || []}
              editing={editing}
              form={form}
              onRowDelete={onRowDelete}
              metalLabels={metalLabels || []}
            />
          ) : (
            <EmptyState title="alloys" description="To manage alloy parameters, click ‘Edit’ and new alloys" />
          )}
        </div>
      )}
    </Flex>
  );
};

export default AlloyParameters;
