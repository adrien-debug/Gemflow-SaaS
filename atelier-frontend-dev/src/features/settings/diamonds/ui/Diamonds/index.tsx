import "./styles.scss";
import { useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import TagList from "@shared/ui/tag/components/TagList";
import useTagList from "@shared/hooks/useTagList.ts";
import DiamondShapesApi from "@entities/diamond/api/diamond-shapes.api.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import Typography from "antd/es/typography";
import { DIAMOND_SHAPES_QUERY_KEY } from "@entities/diamond/constants/diamond-query-keys.ts";

const TAG_LIMIT = 50;

const Diamonds = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [updateModel, setUpdateModel] = useState<BatchUpdateDto<BaseItem>>({ requestDtoList: [], deletedIds: [] });

  const { messageApi } = useMessage();

  const { tagItems, loading, mutation } = useTagList<BaseItem[], BatchUpdateDto<BaseItem>>({
    fetcher: DiamondShapesApi.getDiamondShapes,
    updater: DiamondShapesApi.updateDiamondShapes,
    key: "diamondsLabels",
    generalKey: "diamondsSettings",
    keysToInvalidate: [DIAMOND_SHAPES_QUERY_KEY],
  });

  const onSave = async () => {
    mutation.mutate(updateModel, {
      onSuccess: () => {
        messageApi.success("Diamonds saved successfully");
      },
      onError: () => {
        messageApi.error("Failed to save diamonds");
      },
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  const onTagsChange = (tags: BaseItem[], deletedIds: number[]) => {
    setUpdateModel({
      requestDtoList: tags,
      deletedIds,
    });
  };

  return (
    <Flex vertical className="diamonds-settings-widget">
      <EditFormController
        editing={editing}
        onEdit={() => setEditing(true)}
        onCancel={() => setEditing(false)}
        onSave={onSave}
        loading={mutation.isPending}
        title="Diamonds"
        id="diamonds"
      />
      {loading ? (
        <Skeleton />
      ) : (
        <Flex gap={8} className="tag-list-container">
          <Typography.Text className="title">Diamonds shapes</Typography.Text>
          {tagItems?.length || editing ? (
            <TagList
              tags={tagItems}
              editable={editing}
              creatable={editing}
              deletable={editing}
              onChange={(tags, deleteIds) => onTagsChange(tags as BaseItem[], deleteIds)}
              maxLength={32}
              tagLimit={TAG_LIMIT}
            />
          ) : (
            <div>-</div>
          )}
        </Flex>
      )}
    </Flex>
  );
};

export default Diamonds;
