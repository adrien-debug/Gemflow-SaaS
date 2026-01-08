import "./styles.scss";
import EditFormController from "@shared/ui/EditFormController";
import TagList from "@shared/ui/tag/components/TagList";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { useState } from "react";
import useSingleTagList from "@shared/hooks/useSingleTagList.ts";
import MetalsService from "@entities/metal/api/metals.api.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import EmptyState from "@shared/ui/EmptyState";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import { ALLOY_PARAMETERS_QUERY_KEY, METALS_QUERY_KEY } from "@entities/metal/constants/query-keys.ts";
import { OTHER_MATERIALS_QUERY_KEY } from "@entities/other-material/constants/query-keys.ts";

const KEYS_TO_INVALIDATE = [OTHER_MATERIALS_QUERY_KEY, METALS_QUERY_KEY, ALLOY_PARAMETERS_QUERY_KEY];

const Metals = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [updateModel, setUpdateModel] = useState<BatchUpdateDto<BaseItem>>({ requestDtoList: [], deletedIds: [] });

  const { messageApi } = useMessage();

  const onTagsChange = (tags: BaseItem[], deletedIds: number[]) => {
    setUpdateModel({
      requestDtoList: tags,
      deletedIds,
    });
  };

  const { tagItems, updateTagList, saving, loading } = useSingleTagList({
    fetcher: MetalsService.getMetals,
    updater: MetalsService.updateMetals,
    key: "metals",
    keysToInvalidate: KEYS_TO_INVALIDATE,
    onUpdated: () => {
      void messageApi.success("Metals updated successfully");
    },
  });

  const onSave = async () => {
    await updateTagList(updateModel);
    setEditing(false);
  };

  const onCancel = () => {
    setEditing(false);
  };

  return (
    <Flex vertical className="widget-metals">
      <EditFormController
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={onSave}
        onCancel={onCancel}
        loading={saving}
        title="Materials"
        description="List of materials used in jewelry items production"
        id="metals"
      />
      {loading ? (
        <Skeleton />
      ) : (
        <>
          {tagItems?.length || editing ? (
            <div className="tag-list-container">
              <TagList
                tags={tagItems}
                editable={editing}
                creatable={editing}
                deletable={editing}
                onChange={(tags, deleteIds) => onTagsChange(tags as BaseItem[], deleteIds)}
                maxLength={32}
              />
            </div>
          ) : (
            <EmptyState title="metals" description="To get started, click ‘Edit’ and Add new metal" />
          )}
        </>
      )}
    </Flex>
  );
};

export default Metals;
