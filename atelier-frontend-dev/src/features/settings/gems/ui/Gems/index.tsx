import { useState } from "react";
import EditFormController from "@shared/ui/EditFormController";
import MultiTagList from "@shared/ui/MultiTagList";
import useTagList from "@shared/hooks/useTagList.ts";
import GemsApi from "@entities/gem/api/gems.api.ts";
import { useMessage } from "@shared/hooks/useMessage.ts";
import Flex from "antd/es/flex";
import Skeleton from "antd/es/skeleton";
import { BatchUpdateDto } from "@shared/types/batch-update.dto.ts";
import { BaseItem } from "@shared/types/base-item.type.ts";
import { gemsTitle } from "@features/settings/gems/constants/gems-title.ts";
import { GEMSTONE_PAYMENT_STATUSES_QUERY_KEY } from "@entities/gemstone/constants/query-keys.ts";

const Gems = () => {
  const [editing, setEditing] = useState<boolean>(false);

  const [updateModel, setUpdateModel] = useState<Record<string, BatchUpdateDto<BaseItem>>>({});

  const { messageApi } = useMessage();

  const { tagItems, saving, loading, mutation } = useTagList<
    Record<string, BaseItem[]>,
    Record<string, BatchUpdateDto<BaseItem>>
  >({
    fetcher: GemsApi.get,
    updater: GemsApi.updateGems,
    key: "gemsLabels",
    generalKey: "gemsSettings",
    keysToInvalidate: [GEMSTONE_PAYMENT_STATUSES_QUERY_KEY],
  });

  const onSave = async () => {
    mutation.mutate(updateModel, {
      onSuccess: () => {
        messageApi.success("Gems saved successfully");
      },
      onError: () => {
        messageApi.error("Failed to save gems");
      },
      onSettled: () => {
        setEditing(false);
      },
    });
  };

  const onTagsChange = (tags: BaseItem[], deletedIds: number[], key?: string) => {
    if (key) {
      setUpdateModel((prev) => ({
        ...prev,
        [key]: {
          requestDtoList: tags,
          deletedIds,
        },
      }));
    }
  };

  return (
    <Flex vertical>
      <EditFormController
        editing={editing}
        onEdit={() => setEditing(true)}
        onCancel={() => setEditing(false)}
        onSave={onSave}
        loading={saving}
        title="Gems"
        id="gems"
      />
      {loading ? (
        <Skeleton />
      ) : (
        <MultiTagList titles={gemsTitle} editing={editing} onChange={onTagsChange} tagItems={tagItems} />
      )}
    </Flex>
  );
};

export default Gems;
