import "./styles.scss";
import EditFormController from "@shared/ui/EditFormController";
import TagList from "@shared/ui/tag/components/TagList";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { useState } from "react";
import useSingleTagList from "@shared/hooks/useSingleTagList.ts";
import PriceSettingsApi from "@entities/metal/api/price-settings.api.ts";
import EmptyState from "@shared/ui/EmptyState";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import PureMetalsApi from "@entities/metal/api/pure-metals.api.ts";

const MetalPriceLabels = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [updateModel, setUpdateModel] = useState<BatchUpdateDto<BaseItem>>({ requestDtoList: [], deletedIds: [] });

  const onTagsChange = (tags: BaseItem[], deletedIds: number[]) => {
    setUpdateModel({
      requestDtoList: tags,
      deletedIds,
    });
  };

  const { mutation, query } = useSingleTagList({
    fetcher: PureMetalsApi.getAll,
    updater: PriceSettingsApi.updatePriceLabels,
    key: "metalPriceLabels",
  });

  const onSave = async () => {
    mutation.mutate(updateModel, {
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  const onCancel = () => {
    setEditing(false);
  };

  return (
    <Flex vertical className="widget-metal-price-labels">
      <EditFormController
        editing={editing}
        onEdit={() => setEditing(true)}
        onSave={onSave}
        onCancel={onCancel}
        loading={query.isFetching || mutation.isPending}
        title="Metal price labels"
        description="List of price labels for metals"
        id="metal-price"
      />

      {query.isPending ? (
        <Skeleton />
      ) : (
        <>
          {query?.data?.length || editing ? (
            <div className="tag-list-container">
              <TagList
                tags={query.data}
                editable={editing}
                creatable={editing}
                deletable={editing}
                onChange={(tags, deleteIds) => onTagsChange(tags as BaseItem[], deleteIds)}
              />
            </div>
          ) : (
            <EmptyState title="price labels" description="To get started, click ‘Edit’ and add new price labels" />
          )}
        </>
      )}
    </Flex>
  );
};

export default MetalPriceLabels;
